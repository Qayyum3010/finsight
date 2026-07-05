// src/lib/mockDataGenerator.js

// Simple seeded PRNG (mulberry32) so output is reproducible across reloads/builds
function createSeededRandom(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CATEGORIES = [
  'Housing',
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Income',
  'Other',
];

const MERCHANTS_BY_CATEGORY = {
  Housing: ['Skyline Apartments', 'Property Management Co.'],
  Food: ["Trader Joe's", 'Whole Foods', 'Local Diner', 'Chipotle', 'Starbucks'],
  Transport: ['Shell Gas Station', 'Uber', 'Metro Transit', 'Parking Authority'],
  Entertainment: ['Netflix', 'Spotify', 'AMC Theatres', 'Steam', 'Concert Tickets Co.'],
  Utilities: ['City Power & Light', 'Comcast Internet', 'Water Utility Dept.'],
  Income: ['Acme Corp Payroll', 'Freelance Client Payment'],
  Other: ['Amazon', 'Target', 'CVS Pharmacy', 'Misc. Purchase'],
};

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function randomAmount(rng, min, max) {
  return Math.round((rng() * (max - min) + min) * 100) / 100;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateId(rng) {
  return 'txn_' + Math.floor(rng() * 1e9).toString(36);
}

/**
 * Generates a realistic set of mock transactions spanning the past 12 months.
 * @param {number} seed - seed for reproducible output
 * @returns {Array} array of transaction objects
 */
export function generateMockTransactions(seed = 42) {
  const rng = createSeededRandom(seed);
  const transactions = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 11);
  startDate.setDate(1);

  // Walk month by month for 12 months
  for (let m = 0; m < 12; m++) {
    const monthDate = new Date(startDate);
    monthDate.setMonth(startDate.getMonth() + m);
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    // Recurring: rent on the 1st
    transactions.push({
      id: generateId(rng),
      date: formatDate(new Date(year, month, 1)),
      merchant: 'Skyline Apartments',
      category: 'Housing',
      amount: -randomAmount(rng, 1400, 1600),
      type: 'expense',
    });

    // Recurring: biweekly paycheck (2 per month, ~1st and 15th)
    [1, 15].forEach((day) => {
      transactions.push({
        id: generateId(rng),
        date: formatDate(new Date(year, month, day)),
        merchant: 'Acme Corp Payroll',
        category: 'Income',
        amount: randomAmount(rng, 2200, 2600),
        type: 'income',
      });
    });

    // Recurring: weekly groceries (~4 per month)
    for (let w = 0; w < 4; w++) {
      const day = Math.min(28, w * 7 + 1 + Math.floor(rng() * 5));
      transactions.push({
        id: generateId(rng),
        date: formatDate(new Date(year, month, day)),
        merchant: pick(rng, MERCHANTS_BY_CATEGORY.Food),
        category: 'Food',
        amount: -randomAmount(rng, 40, 140),
        type: 'expense',
      });
    }

    // Recurring: monthly utilities (2-3 bills)
    const utilityCount = 2 + Math.floor(rng() * 2);
    for (let u = 0; u < utilityCount; u++) {
      const day = 5 + Math.floor(rng() * 20);
      transactions.push({
        id: generateId(rng),
        date: formatDate(new Date(year, month, day)),
        merchant: pick(rng, MERCHANTS_BY_CATEGORY.Utilities),
        category: 'Utilities',
        amount: -randomAmount(rng, 40, 180),
        type: 'expense',
      });
    }

    // Recurring: subscriptions (entertainment, 2-3 per month)
    const subCount = 2 + Math.floor(rng() * 2);
    for (let s = 0; s < subCount; s++) {
      const day = 1 + Math.floor(rng() * 27);
      transactions.push({
        id: generateId(rng),
        date: formatDate(new Date(year, month, day)),
        merchant: pick(rng, MERCHANTS_BY_CATEGORY.Entertainment),
        category: 'Entertainment',
        amount: -randomAmount(rng, 8, 60),
        type: 'expense',
      });
    }

    // Random one-off transactions: transport + other (variable count per month)
    const oneOffCount = 6 + Math.floor(rng() * 8); // 6-13 per month
    for (let o = 0; o < oneOffCount; o++) {
      const day = 1 + Math.floor(rng() * 27);
      const category = pick(rng, ['Transport', 'Other']);
      transactions.push({
        id: generateId(rng),
        date: formatDate(new Date(year, month, day)),
        merchant: pick(rng, MERCHANTS_BY_CATEGORY[category]),
        category,
        amount: -randomAmount(rng, 10, 200),
        type: 'expense',
      });
    }

    // Occasional freelance income (30% chance per month)
    if (rng() < 0.3) {
      const day = 1 + Math.floor(rng() * 27);
      transactions.push({
        id: generateId(rng),
        date: formatDate(new Date(year, month, day)),
        merchant: 'Freelance Client Payment',
        category: 'Income',
        amount: randomAmount(rng, 200, 900),
        type: 'income',
      });
    }
  }

  // Sort chronologically
  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  return transactions;
}

export { CATEGORIES };
