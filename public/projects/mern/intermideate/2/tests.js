import request from 'supertest';
import { ESLint } from 'eslint';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import babelParser from '@babel/parser';
import traverse from '@babel/traverse';
import fs from 'fs';
import path from 'path';

const backendEntryPath = path.resolve('./backend/app.js');
const frontendEntryPath = path.resolve('./frontend/src/App.jsx');

let app;

beforeAll(() => {
  delete require.cache[backendEntryPath];
  app = require(backendEntryPath).default || require(backendEntryPath);
});

describe('E-Commerce Product Listing - Backend API Tests', () => {
  const product1 = { name: 'Alpha', price: 20, category: 'Books' };
  const product2 = { name: 'Beta', price: 10, category: 'Books' };
  const product3 = { name: 'Gamma', price: 15, category: 'Electronics' };

  beforeAll(async () => {
    // Clear DB & insert products for test
    await request(app).delete('/api/products/all');
    await request(app).post('/api/products').send(product1);
    await request(app).post('/api/products').send(product2);
    await request(app).post('/api/products').send(product3);
  });

  it('Should return all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Alpha' }),
        expect.objectContaining({ name: 'Beta' }),
        expect.objectContaining({ name: 'Gamma' }),
      ])
    );
  });

  it('Should support filtering products by category', async () => {
    const res = await request(app).get('/api/products?category=Books');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(p => p.category === 'Books')).toBe(true);
  });

  it('Should support sorting products by price ascending', async () => {
    const res = await request(app).get('/api/products?sort=price_asc');
    expect(res.statusCode).toBe(200);
    for (let i = 1; i < res.body.length; i++) {
      expect(res.body[i].price).toBeGreaterThanOrEqual(res.body[i - 1].price);
    }
  });
});

describe('E-Commerce Product Listing - Frontend React Tests', () => {
  let App;
  beforeAll(() => {
    delete require.cache[frontendEntryPath];
    App = require(frontendEntryPath).default || require(frontendEntryPath);
  });

  it('Should render product list and filter UI', () => {
    render(<App />);
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort by price/i)).toBeInTheDocument();
  });

  it('Should filter and display only selected category products', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/filter by category/i), { target: { value: 'Books' } });

    await waitFor(() => {
      const products = screen.getAllByTestId('product-item');
      expect(products.length).toBeGreaterThan(0);
      products.forEach(product => {
        expect(product.textContent.toLowerCase()).toContain('book');
      });
    });
  });

  it('Should sort products by price ascending', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/sort by price/i), { target: { value: 'asc' } });

    await waitFor(() => {
      const products = screen.getAllByTestId('product-item');
      let lastPrice = 0;
      products.forEach(product => {
        const priceMatch = product.textContent.match(/\$?(\d+(\.\d+)?)/);
        if (priceMatch) {
          const price = parseFloat(priceMatch[1]);
          expect(price).toBeGreaterThanOrEqual(lastPrice);
          lastPrice = price;
        }
      });
    });
  });
});

describe('E-Commerce Product Listing - AST Checks', () => {
  it('Backend should implement filtering and sorting query parameters', () => {
    const code = fs.readFileSync(backendEntryPath, 'utf-8');
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties'],
    });

    let usesQueryCategory = false;
    let usesQuerySort = false;

    traverse.default(ast, {
      MemberExpression(path) {
        if (
          path.node.object.name === 'req' &&
          path.node.property.name === 'query'
        ) {
          const parent = path.parentPath;
          if (parent.isMemberExpression()) {
            if (parent.node.property.name === 'category') usesQueryCategory = true;
            if (parent.node.property.name === 'sort') usesQuerySort = true;
          }
        }
      },
    });

    expect(usesQueryCategory).toBe(true);
    expect(usesQuerySort).toBe(true);
  });

  it('Frontend should have filter and sort controls in JSX', () => {
    const code = fs.readFileSync(frontendEntryPath, 'utf-8');
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties'],
    });

    let hasFilter = false;
    let hasSort = false;

    traverse.default(ast, {
      JSXElement(path) {
        const openingName = path.node.openingElement.name.name;
        if (openingName === 'select') {
          const label = path.parentPath.node.children
            .map(c => c.value)
            .join('')
            .toLowerCase();
          if (label.includes('filter')) hasFilter = true;
          if (label.includes('sort')) hasSort = true;
        }
      },
    });

    expect(hasFilter || hasSort).toBe(true);
  });
});

describe('ESLint Syntax Check', () => {
  it('Backend should pass ESLint', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([backendEntryPath]);
    const hasErrors = results.some(r => r.errorCount > 0);
    expect(hasErrors).toBe(false);
  });

  it('Frontend should pass ESLint', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([frontendEntryPath]);
    const hasErrors = results.some(r => r.errorCount > 0);
    expect(hasErrors).toBe(false);
  });
});
