// test/simple-crud-app.test.js
require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
});
const { ESLint } = require('eslint');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const request = require('supertest');
const { Db } = require('tingodb')();
const path = require('path');
const { render, screen } = require('@testing-library/react');
const React = require('react');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const app = require('../backend/app');
const Frontend = require('../frontend/App.jsx').default;

describe('Simple CRUD App with TingoDB – Full Stack Test', () => {
  let db;
  let users;

  beforeAll(() => {
    const dbPath = path.join(__dirname, '../backend/data');
    db = new Db(dbPath, {});
    users = db.collection('users');
  });

  afterEach((done) => {
    users.remove({}, { multi: true }, done); // Clear collection between tests
  });

  it('Backend: should perform full user CRUD flow', async () => {
    let res = await request(app).post('/users').send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.statusCode).toBe(201);
    const id = res.body._id;

    res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.some(u => u.email === 'alice@example.com')).toBe(true);

    res = await request(app).put(`/users/${id}`).send({ name: 'Alice Updated' });
    expect(res.body.name).toBe('Alice Updated');

    res = await request(app).delete(`/users/${id}`);
    expect(res.statusCode).toBe(204);
  });

  it('Frontend: should render user list UI', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
    global.window = dom.window;
    global.document = dom.window.document;

    render(<Frontend />);
    expect(screen.getByText(/users/i)).toBeInTheDocument();
  });

  it('Static Analysis: ESLint and AST check (backend & frontend)', async () => {
    const eslint = new ESLint();
    const backendResult = await eslint.lintFiles(['backend/**/*.js']);
    const frontendResult = await eslint.lintFiles(['frontend/**/*.jsx']);

    if (backendResult.some(r => r.errorCount > 0) || frontendResult.some(r => r.errorCount > 0)) {
      throw new Error('ESLint errors found.');
    }

    const frontendCode = fs.readFileSync('frontend/App.jsx', 'utf8');
    const ast = parser.parse(frontendCode, { sourceType: 'module', plugins: ['jsx'] });
    let foundComponent = false;

    traverse(ast, {
      FunctionDeclaration(path) {
        if (path.node.id.name === 'App') foundComponent = true;
      }
    });

    expect(foundComponent).toBe(true);
  });
});
