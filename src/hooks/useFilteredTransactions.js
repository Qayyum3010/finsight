import { useMemo } from 'react';

/**
 * Maps a DATE_RANGE_OPTIONS label to a start date (inclusive).
 * Returns null for "All Time" (no lower bound).
 */
function getRangeStartDate(dateRange, referenceDate = new Date()) {
  const start = new Date(referenceDate);
  start.setHours(0, 0, 0, 0);

  switch (dateRange) {
    case 'This Month':
      start.setDate(1);
      return start;
    case 'Last 3 Months':
      start.setMonth(start.getMonth() - 3);
      return start;
    case 'Last 6 Months':
      start.setMonth(start.getMonth() - 6);
      return start;
    case 'This Year':
      start.setMonth(0, 1);
      return start;
    case 'All Time':
    default:
      return null;
  }
}

/**
 * Filters, searches, and sorts a transactions array.
 *
 * @param {Array} transactions - full transactions dataset
 * @param {Object} params
 * @param {string} [params.dateRange] - one of DATE_RANGE_OPTIONS
 * @param {string} [params.search] - free-text search on merchant name
 * @param {string} [params.category] - category name, or "All Categories"
 * @param {string} [params.type] - "All Types" | "Income" | "Expense"
 * @param {number} [params.minAmount] - absolute-value floor (inclusive)
 * @param {number} [params.maxAmount] - absolute-value ceiling (inclusive)
 * @param {'date'|'amount'} [params.sortBy]
 * @param {'asc'|'desc'} [params.sortDir]
 * @returns {Array} filtered and sorted transactions
 */
export function useFilteredTransactions(
  transactions,
  {
    dateRange = 'All Time',
    search = '',
    category = 'All Categories',
    type = 'All Types',
    minAmount,
    maxAmount,
    sortBy = 'date',
    sortDir = 'desc',
  } = {}
) {
  return useMemo(() => {
    let result = transactions ?? [];

    // Date range filter
    const startDate = getRangeStartDate(dateRange);
    if (startDate) {
      result = result.filter((t) => new Date(t.date) >= startDate);
    }

    // Search filter (merchant name, case-insensitive)
    const trimmedSearch = search.trim().toLowerCase();
    if (trimmedSearch) {
      result = result.filter((t) => t.merchant.toLowerCase().includes(trimmedSearch));
    }

    // Category filter
    if (category && category !== 'All Categories') {
      result = result.filter((t) => t.category === category);
    }

    // Type filter (Income / Expense)
    if (type && type !== 'All Types') {
      const wantIncome = type === 'Income';
      result = result.filter((t) => t.amount > 0 === wantIncome);
    }

    // Amount range filter (compares absolute value, since expenses are negative)
    if (typeof minAmount === 'number' && !Number.isNaN(minAmount)) {
      result = result.filter((t) => Math.abs(t.amount) >= minAmount);
    }
    if (typeof maxAmount === 'number' && !Number.isNaN(maxAmount)) {
      result = result.filter((t) => Math.abs(t.amount) <= maxAmount);
    }

    // Sort
    if (sortBy) {
      const multiplier = sortDir === 'asc' ? 1 : -1;
      result = [...result].sort((a, b) => {
        if (sortBy === 'date') {
          return (new Date(a.date) - new Date(b.date)) * multiplier;
        }
        if (sortBy === 'amount') {
          return (a.amount - b.amount) * multiplier;
        }
        return 0;
      });
    }

    return result;
  }, [transactions, dateRange, search, category, type, minAmount, maxAmount, sortBy, sortDir]);
}
