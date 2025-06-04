// test/task-manager.test.js
require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
});const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const request = require('supertest');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen } = require('@testing-library/react');
const { JSDOM } = require('jsdom');
const React = require('react');
const { Db } = require('tingodb')();

const app = require('../backend/app');
const Frontend = require('../frontend/App').default;

describe('Task Management – Full Stack', () => {
  const db = new Db(path.join(__dirname, '../backend/data'), {});
  const tasks = db.collection('tasks');

  afterEach(done => tasks.remove({}, { multi: true }, done));

  it('Backend: creates and updates task status', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Fix bug', status: 'pending' });
    expect(res.statusCode).toBe(201);
    const update = await request(app).put(`/tasks/${res.body.id}`).send({ status: 'done' });
    expect(update.statusCode).toBe(200);
  });

  it('Frontend: renders task input and status dropdown', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    render(<Frontend />);
    expect(screen.getByPlaceholderText(/new task/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });

  it('Static: ESLint + AST (has useReducer or state mgmt)', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['frontend/**/*.jsx']);
    expect(results.flatMap(r => r.messages).filter(m => m.severity === 2).length).toBe(0);
    const code = fs.readFileSync('frontend/App.jsx', 'utf8');
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

    let usesState = false;
    traverse(ast, {
      CallExpression({ node }) {
        const name = node.callee.name;
        if (name === 'useState' || name === 'useReducer') usesState = true;
      }
    });
    expect(usesState).toBe(true);
  });
});
