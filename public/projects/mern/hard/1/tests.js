// test/blog-platform.test.js
require('@babel/register')({ presets: ['@babel/preset-react'] });
const fs = require('fs');
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

describe('Blog Platform – Full Stack', () => {
  const db = new Db(path.join(__dirname, '../backend/data'), {});
  const posts = db.collection('posts');

  afterEach(done => posts.remove({}, { multi: true }, done));

  it('Backend: handles post creation and comment adding', async () => {
    const create = await request(app).post('/posts').send({ title: 'Hello', content: 'World' });
    expect(create.statusCode).toBe(201);
    const comment = await request(app).post(`/posts/${create.body.id}/comments`).send({ text: 'Nice post!' });
    expect(comment.statusCode).toBe(200);
  });

  it('Frontend: renders post editor and comment form', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    render(<Frontend />);
    expect(screen.getByText(/new post/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/write a comment/i)).toBeInTheDocument();
  });

  it('Static: uses rich text editor and useState', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['frontend/**/*.jsx']);
    expect(results.flatMap(r => r.messages).filter(m => m.severity === 2).length).toBe(0);
    const code = fs.readFileSync('frontend/App.jsx', 'utf8');
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let hasEditor = false, hasUseState = false;
    traverse(ast, {
      ImportDeclaration({ node }) {
        if (/quill|draft-js/i.test(node.source.value)) hasEditor = true;
      },
      CallExpression({ node }) {
        if (node.callee.name === 'useState') hasUseState = true;
      }
    });
    expect(hasEditor && hasUseState).toBe(true);
  });
});
