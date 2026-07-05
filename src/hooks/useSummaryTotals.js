import { useMemo } from 'react';

/**
 * Computes summary totals from a transactions array.
 *
 * @param {Array} transactions - transactions to summarize (already
 *   date/search/category filtered upstream, typically via useFilteredTransactions)
 * @returns {{ balance: number, income: number, expenses: number, netSavings: number }}
 */
export function useSummaryTotals(transactions) {
  return useMemo(() => {
    const list = transactions ?? [];

    let income = 0;
    let expenses = 0;

    for (const t of list) {
      if (t.amount > 0) {
        income += t.amount;
      } else {
        expenses += Math.abs(t.amount);
      }
    }

    const balance = income - expenses;
    const netSavings = balance;

    return {
      balance,
      income,
      expenses,
      netSavings,
    };
  }, [transactions]);
}
