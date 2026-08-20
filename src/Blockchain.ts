import { Block } from './Block.js';
import { Transaction } from './types.js';

export class Blockchain {
  public chain: Block[];
  public pendingTransactions: Transaction[];
  public difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 1; 
  }

  private createGenesisBlock(): Block {
    return new Block(0, '2026-01-01', 'Genesis Block - Fair Trade Coffee Origin', '0');
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addTransaction(transaction: Transaction): void {
    if (!transaction.sender || !transaction.recipient || !transaction.batchId || !transaction.weightKg) {
      throw new Error('Ogiltig transaktion: Alla fält krävs.');
    }
    this.pendingTransactions.push(transaction);
  }

  public minePendingTransactions(): Block {
    const newBlock = new Block(
      this.chain.length,
      new Date().toISOString(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);

    this.pendingTransactions = []; 
    return newBlock;
  }
}