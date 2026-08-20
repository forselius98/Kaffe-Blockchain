import { describe, it, expect } from 'vitest';
import { Blockchain } from '../../src/Blockchain.js';

describe('Blockchain', () => {
  it('ska starta med ett genesis-block', () => {
    const chain = new Blockchain();
    expect(chain.chain.length).toBe(1);
  });

  it('ska lägga till transaktion i pendingTransactions', () => {
    const chain = new Blockchain();
    chain.addTransaction({ sender: 'A', recipient: 'B', batchId: '1', weightKg: 10 });
    expect(chain.pendingTransactions.length).toBe(1);
  });
});