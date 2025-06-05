import request from 'supertest';
import { ESLint } from 'eslint';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import babelParser from '@babel/parser';
import traverse from '@babel/traverse';
import fs from 'fs';
import path from 'path';
import io from 'socket.io-client';
require('@testing-library/dom');

const backendEntryPath = path.resolve('./backend/app.js');
const frontendEntryPath = path.resolve('./frontend/src/App.jsx');
const socketUrl = 'http://localhost:4000';

const attemptsPath = path.resolve('./attempts.tests');
const resultsPath = path.resolve('./results.tests');

let app;
let testPassed = true;

beforeAll(() => {
  delete require.cache[backendEntryPath];
  app = require(backendEntryPath).default || require(backendEntryPath);
});

afterAll(() => {
  let attempts = 0;
  if (fs.existsSync(attemptsPath)) {
    try {
      attempts = parseInt(fs.readFileSync(attemptsPath, 'utf-8'), 10) || 0;
    } catch {
      attempts = 0;
    }
  }
  attempts += 1;
  fs.writeFileSync(attemptsPath, String(attempts));

  const result = {
    passed: testPassed,
    timestamp: new Date().toISOString(),
  };
  fs.writeFileSync(resultsPath, JSON.stringify(result, null, 2));
});

const track = (fn) => async () => {
  try {
    await fn();
  } catch (err) {
    testPassed = false;
    throw err;
  }
};

describe('Real-Time Chat App - Backend API Tests', () => {
  it('Should connect socket.io client and receive welcome message', (done) => {
    const clientSocket = io(socketUrl);

    clientSocket.on('connect', () => {
      clientSocket.on('welcome', (msg) => {
        try {
          expect(typeof msg).toBe('string');
          clientSocket.disconnect();
          done();
        } catch (err) {
          testPassed = false;
          done(err);
        }
      });
    });

    clientSocket.on('connect_error', (err) => {
      testPassed = false;
      done(err);
    });
  });

  it('Should broadcast messages to all connected clients', (done) => {
    const client1 = io(socketUrl);
    const client2 = io(socketUrl);

    client1.on('connect', () => {
      client2.on('message', (msg) => {
        try {
          expect(msg).toHaveProperty('text', 'Hello everyone!');
          client1.disconnect();
          client2.disconnect();
          done();
        } catch (err) {
          testPassed = false;
          done(err);
        }
      });

      client1.emit('message', { text: 'Hello everyone!' });
    });

    client1.on('connect_error', (err) => {
      testPassed = false;
      done(err);
    });
    client2.on('connect_error', (err) => {
      testPassed = false;
      done(err);
    });
  });
});

describe('Real-Time Chat App - Frontend React Tests', () => {
  let App;
  beforeAll(() => {
    delete require.cache[frontendEntryPath];
    App = require(frontendEntryPath).default || require(frontendEntryPath);
  });

  it('Should render chat input and messages area', track(() => {
    render(<App />);
    expect(screen.getByPlaceholderText(/type a message/i)).toBeInTheDocument();
    expect(screen.getByTestId('messages')).toBeInTheDocument();
  }));

  it('Should send and display messages in the chat UI', track(async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hello everyone!' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
    });
  }));
});

describe('Real-Time Chat App - AST Checks', () => {
  it('Backend should use socket.io server', track(() => {
    const code = fs.readFileSync(backendEntryPath, 'utf-8');
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties'],
    });

    let socketIoUsed = false;

    traverse.default(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value.includes('socket.io')) {
          socketIoUsed = true;
        }
      },
      NewExpression(path) {
        if (path.node.callee.name === 'Server') {
          const arg0 = path.node.arguments[0];
          if (arg0?.type === 'Identifier' && arg0.name === 'server') {
            socketIoUsed = true;
          }
        }
      },
    });

    expect(socketIoUsed).toBe(true);
  }));

  it('Frontend should use useEffect to connect socket', track(() => {
    const code = fs.readFileSync(frontendEntryPath, 'utf-8');
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties'],
    });

    let useEffectUsed = false;

    traverse.default(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value === 'react') {
          for (const specifier of path.node.specifiers) {
            if (specifier.imported?.name === 'useEffect') {
              useEffectUsed = true;
            }
          }
        }
      },
    });

    expect(useEffectUsed).toBe(true);
  }));
});

describe('ESLint Syntax Check', () => {
  it('Backend should pass ESLint', track(async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([backendEntryPath]);
    const hasErrors = results.some((r) => r.errorCount > 0);
    expect(hasErrors).toBe(false);
  }));

  it('Frontend should pass ESLint', track(async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([frontendEntryPath]);
    const hasErrors = results.some((r) => r.errorCount > 0);
    expect(hasErrors).toBe(false);
  }));
});
