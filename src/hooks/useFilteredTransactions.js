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
 * @param {string} params.dateRange - one of DATE_RANGE_OPTIONS
 * @param {string} params.search - free-text search on merchant name
 * @param {string} params.category - category name, or "All Categories"
 * @param {{ field: 'date'|'amount', direction: 'asc'|'desc' }} [params.sort]
 * @returns {Array} filtered and sorted transactions
 */
export function useFilteredTransactions(
  transactions,
  { dateRange = 'All Time', search = '', category = 'All Categories', sort } = {}
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

    // Sort
    if (sort?.field) {
      const { field, direction = 'asc' } = sort;
      const multiplier = direction === 'desc' ? -1 : 1;

      result = [...result].sort((a, b) => {
        if (field === 'date') {
          return (new Date(a.date) - new Date(b.date)) * multiplier;
        }
        if (field === 'amount') {
          return (a.amount - b.amount) * multiplier;
        }
        return 0;
      });
    }

    return result;
  }, [transactions, dateRange, search, category, sort]);
}
