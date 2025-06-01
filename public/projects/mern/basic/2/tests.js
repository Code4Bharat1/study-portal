// test/blog-backend.test.js
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

describe('Blog Backend – TingoDB Full Stack Test', () => {
  let db, posts;

  beforeAll(() => {
    db = new Db(path.join(__dirname, '../backend/data'), {});
    posts = db.collection('posts');
  });

  afterEach((done) => posts.remove({}, { multi: true }, done));

  it('Backend: should create and fetch blog posts', async () => {
    let res = await request(app).post('/posts').send({ title: 'Test Post', content: 'Lorem Ipsum' });
    expect(res.statusCode).toBe(201);
    const id = res.body._id;

    res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body.some(p => p._id === id)).toBe(true);

    res = await request(app).get(`/posts/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Test Post');
  });

  it('Frontend: should render blog title', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;

    render(<Frontend />);
    expect(screen.getByText(/blog/i)).toBeInTheDocument();
  });

  it('Static: ESLint + AST (App renders blog)', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['frontend/**/*.jsx', 'backend/**/*.js']);
    const errors = results.flatMap(r => r.messages).filter(m => m.severity === 2);
    expect(errors.length).toBe(0);

    const code = fs.readFileSync('frontend/App.jsx', 'utf8');
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

    let hasBlogJSX = false;
    traverse(ast, {
      JSXText(path) {
        if (path.node.value.toLowerCase().includes('blog')) hasBlogJSX = true;
      }
    });
    expect(hasBlogJSX).toBe(true);
  });
});
