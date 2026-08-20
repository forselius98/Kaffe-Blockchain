import crypto from 'node:crypto';
import { Transaction } from './types';

export class Block {
  public index: number;
  public timestamp: string;
  public transactions: Transaction[] | string;
  public previousHash: string;
  public nonce: number;
  public hash: string;

  constructor(index: number, timestamp: string, transactions: Transaction[] | string, previousHash: string = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  public calculateHash(): string {
    return crypto
      .createHash('sha256')
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
      .digest('hex');
  }

  public mineBlock(difficulty: number): void {
    const target = '0'.repeat(difficulty);
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}