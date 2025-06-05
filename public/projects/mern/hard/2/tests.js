// test/social-dashboard.test.js
require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  ignore: [/node_modules/],
});const path = require('path');
const fs = require('fs');
const { ESLint } = require('eslint');
const request = require('supertest');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { Db } = require('tingodb')();
const { render, screen } = require('@testing-library/react');
const { JSDOM } = require('jsdom');
require('@testing-library/dom');
const React = require('react');

const app = require('./backend/index.js');
const Frontend = require('./frontend/src/App.jsx').default;

describe('Social Media Dashboard – Full Stack', () => {
  const db = new Db(path.join(__dirname, '../backend/data'), {});
  const posts = db.collection('posts');

  afterEach(done => posts.remove({}, { multi: true }, done));

  it('Backend: allows like, profile fetching, and notifications', async () => {
    const res = await request(app).post('/posts').send({ content: 'Hey there!' });
    expect(res.statusCode).toBe(201);
    const like = await request(app).post(`/posts/${res.body.id}/like`);
    expect(like.statusCode).toBe(200);
    const notif = await request(app).get('/notifications');
    expect(Array.isArray(notif.body)).toBe(true);
  });

  it('Frontend: displays profile and like button', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    render(<Frontend />);
    expect(screen.getByText(/my profile/i)).toBeInTheDocument();
    expect(screen.getByText(/like/i)).toBeInTheDocument();
  });

  it('Static: has useEffect and renders profile', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['frontend/**/*.jsx']);
    expect(results.flatMap(r => r.messages).filter(m => m.severity === 2).length).toBe(0);
    const code = fs.readFileSync('frontend/src/App.jsx', 'utf8');
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

    let hasEffect = false, hasProfileText = false;
    traverse(ast, {
      CallExpression({ node }) {
        if (node.callee.name === 'useEffect') hasEffect = true;
      },
      JSXText({ node }) {
        if (/profile/i.test(node.value)) hasProfileText = true;
      }
    });
    expect(hasEffect && hasProfileText).toBe(true);
  });
});
