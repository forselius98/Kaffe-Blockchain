import express, { Request, Response } from 'express';
import { Blockchain } from './Blockchain.js';
import { Transaction } from './types.js';

const app = express();
app.use(express.json());

const coffeeChain = new Blockchain();

//1. GET /blockchain
app.get('/blockchain', (_req: Request, res: Response) => {
  res.status(200).json({
    length: coffeeChain.chain.length,
    chain: coffeeChain.chain,
    pendingTransactions: coffeeChain.pendingTransactions
  });
});

// 2. POST /transactions
app.post('/transactions', (req: Request<{}, {}, Transaction>, res: Response) => {
  try {
    const { sender, recipient, batchId, weightKg } = req.body;
    coffeeChain.addTransaction({ sender, recipient, batchId, weightKg });

    res.status(201).json({
      message: 'Transaktion tillagd i väntelistan.',
      pendingCount: coffeeChain.pendingTransactions.length
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 3. POST /mine
app.post('/mine', (_req: Request, res: Response) => {
  if (coffeeChain.pendingTransactions.length === 0) {
    return res.status(400).json({ message: 'Inga väntande transaktioner att mina.' });
  }

  const minedBlock = coffeeChain.minePendingTransactions();
  res.status(200).json({
    message: 'Ett nytt block har minats framgångsrikt!',
    block: minedBlock
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Kaffe-noden körs på port 3000');
  });
}

export default app