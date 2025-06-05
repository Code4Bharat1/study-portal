require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  ignore: [/node_modules/],
});const { ESLint } = require('eslint');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const request = require('supertest');
const { Db } = require('tingodb')();
const path = require('path');
const { render, screen } = require('@testing-library/react');
const React = require('react');
const { JSDOM } = require('jsdom');
require('@testing-library/dom');

const app = require('./backend/index.js');
const Frontend = require('./frontend/src/App.jsx').default;

const attemptsFile = path.join(__dirname, 'attempts.tests');
const resultsFile = path.join(__dirname, 'results.tests');

function readAttempts() {
  try {
    return parseInt(fs.readFileSync(attemptsFile, 'utf8'), 10) || 0;
  } catch {
    return 0;
  }
}

function writeAttempts(n) {
  fs.writeFileSync(attemptsFile, String(n));
}

function writeResults(status) {
  const result = {
    status: status ? 'pass' : 'fail',
    timestamp: new Date().toISOString(),
  };
  fs.writeFileSync(resultsFile, JSON.stringify(result, null, 2));
}

let testPassed = true;
const originalExpect = global.expect;

beforeAll(() => {
  const attempts = readAttempts();
  writeAttempts(attempts + 1);
});

afterAll(() => {
  writeResults(testPassed);
});

describe('Blog Backend – TingoDB Full Stack Test', () => {
  let db, posts;

  beforeAll(() => {
    db = new Db(path.join(__dirname, '../backend/data'), {});
    posts = db.collection('posts');
  });

  afterEach((done) => posts.remove({}, { multi: true }, done));

  it('Backend: should create and fetch blog posts', async () => {
    try {
      let res = await request(app).post('/posts').send({ title: 'Test Post', content: 'Lorem Ipsum' });
      expect(res.statusCode).toBe(201);
      const id = res.body._id;

      res = await request(app).get('/posts');
      expect(res.statusCode).toBe(200);
      expect(res.body.some(p => p._id === id)).toBe(true);

      res = await request(app).get(`/posts/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Test Post');
    } catch (err) {
      testPassed = false;
      throw err;
    }
  });

  it('Frontend: should render blog title', () => {
    try {
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
      global.window = dom.window;
      global.document = dom.window.document;

      render(<Frontend />);
      expect(screen.getByText(/blog/i)).toBeInTheDocument();
    } catch (err) {
      testPassed = false;
      throw err;
    }
  });

  it('Static: ESLint + AST (App renders blog)', async () => {
    try {
      const eslint = new ESLint();
      const results = await eslint.lintFiles(['frontend/**/*.jsx', 'backend/**/*.js']);
      const errors = results.flatMap(r => r.messages).filter(m => m.severity === 2);
      expect(errors.length).toBe(0);

      const code = fs.readFileSync('frontend/src/App.jsx', 'utf8');
      const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

      let hasBlogJSX = false;
      traverse(ast, {
        JSXText(path) {
          if (path.node.value.toLowerCase().includes('blog')) hasBlogJSX = true;
        }
      });
      expect(hasBlogJSX).toBe(true);
    } catch (err) {
      testPassed = false;
      throw err;
    }
  });
});
