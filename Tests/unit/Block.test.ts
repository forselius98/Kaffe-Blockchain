import { describe, it, expect } from 'vitest';
import Block from '../src/Block';

describe('Block (Enhetstest)', () => {
  it('ska beräkna en korrekt SHA-256 hash', () => {
    const block = new Block(
      1, 
      '2026-08-19', 
      [{ sender: 'Gård A', recipient: 'Rosteri B', batchId: '123', weightKg: 100 }], 
      '0'
    );
    
    const hash = block.calculateHash();
    expect(hash).toBeTypeOf('string');
    expect(hash.length).toBe(64);
  });
});