// test/todo-api.test.js
require('@babel/register')({ presets: ['@babel/preset-react'] });
const { ESLint } = require('eslint');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const request = require('supertest');
const { Db } = require('tingodb')();
const path = require('path');
const { render, screen } = require('@testing-library/react');
const React = require('react');
const { JSDOM } = require('jsdom');

const app = require('../backend/app');
const Frontend = require('../frontend/App').default;

describe('To-Do API – TingoDB Full Stack Test', () => {
  let db, todos;

  beforeAll(() => {
    db = new Db(path.join(__dirname, '../backend/data'), {});
    todos = db.collection('todos');
  });

  afterEach((done) => todos.remove({}, { multi: true }, done));

  it('Backend: should add, list, and delete tasks', async () => {
    const res = await request(app).post('/todos').send({ task: 'Buy Milk' });
    expect(res.statusCode).toBe(201);
    const id = res.body._id;

    const list = await request(app).get('/todos');
    expect(list.body.some(t => t.task === 'Buy Milk')).toBe(true);

    const del = await request(app).delete(`/todos/${id}`);
    expect(del.statusCode).toBe(204);
  });

  it('Frontend: should show task input field', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;

    render(<Frontend />);
    expect(screen.getByPlaceholderText(/task/i)).toBeInTheDocument();
  });

  it('Static: ESLint + AST (App.jsx has input placeholder)', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['frontend/**/*.jsx', 'backend/**/*.js']);
    const errors = results.flatMap(r => r.messages).filter(m => m.severity === 2);
    expect(errors.length).toBe(0);

    const code = fs.readFileSync('frontend/App.jsx', 'utf8');
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

    let hasTaskInput = false;
    traverse(ast, {
      JSXAttribute(path) {
        if (path.node.name.name === 'placeholder' &&
            path.node.value?.value?.toLowerCase().includes('task')) {
          hasTaskInput = true;
        }
      }
    });
    expect(hasTaskInput).toBe(true);
  });
});
