// src/data/transactions.js
import { generateMockTransactions } from '@/lib/mockDataGenerator';

// Fixed seed ensures the dataset is stable across reloads and builds —
// important for a consistent portfolio demo experience.
const SEED = 42;

export const transactions = generateMockTransactions(SEED);
