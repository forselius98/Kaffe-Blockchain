import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('REST API', () => {
  it('GET /blockchain - ska returnera status 200', async () => {
    const res = await request(app).get('/blockchain');
    expect(res.status).toBe(200);
  });

  it('POST /transactions - ska lägga till transaktion', async () => {
    const res = await request(app)
      .post('/transactions')
      .send({ sender: 'A', recipient: 'B', batchId: '1', weightKg: 10 });
    expect(res.status).toBe(201);
  });

  it('POST /mine - ska mina och returnera nytt block', async () => {
    await request(app)
      .post('/transactions')
      .send({ sender: 'A', recipient: 'B', batchId: '1', weightKg: 10 });

    const res = await request(app).post('/mine');
    expect(res.status).toBe(200);
    expect(res.body.block).toBeDefined();
  });
});