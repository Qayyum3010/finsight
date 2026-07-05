import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
} from 'lucide-react';
import TransactionRow from '@/components/TransactionRow';
import TransactionCard from '@/components/TransactionCard';
import EmptyState from '@/components/EmptyState';
import { useDateRange } from '@/context/DateRangeContext';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';

const DEBOUNCE_MS = 300;
const PAGE_SIZE = 10;
const CATEGORIES = [
  'All Categories',
  'Housing',
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Income',
  'Other',
];

function SortIcon({ active, dir }) {
  if (!active)
    return <ChevronsUpDown size={16} className="text-outline group-hover:text-primary" />;
  return dir === 'asc' ? (
    <ArrowUp size={16} className="text-primary" />
  ) : (
    <ArrowDown size={16} className="text-primary" />
  );
}

export default function TransactionsTable({ transactions }) {
  const { dateRange } = useDateRange();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);

  // Auto Animate refs — animate row/card changes on filter, sort, and page changes
  // instead of snapping (7D.1.1)
  const [tableBodyRef] = useAutoAnimate();
  const [mobileListRef] = useAutoAnimate();

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(searchInput), DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [searchInput]);

  // Reset to page 1 whenever a filter/sort input changes.
  // Done during render (not in an effect) per React's "adjusting state when
  // props change" pattern — avoids the cascading-render warning that comes
  // from calling setState synchronously inside a useEffect body.
  const filterSignature = `${debouncedSearch}|${category}|${sortBy}|${sortDir}|${dateRange}`;
  const [prevFilterSignature, setPrevFilterSignature] = useState(filterSignature);
  if (filterSignature !== prevFilterSignature) {
    setPrevFilterSignature(filterSignature);
    setPage(1);
  }

  const filtered = useFilteredTransactions(transactions, {
    dateRange,
    search: debouncedSearch,
    category,
    sortBy,
    sortDir,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  function toggleSort(column) {
    if (sortBy === column) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDir('desc');
    }
  }

  function handleClearFilters() {
    setSearchInput('');
    setDebouncedSearch('');
    setCategory('All Categories');
    setSortBy('date');
    setSortDir('desc');
  }

  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const hasResults = filtered.length > 0;

  return (
    <div className="bg-surface-container-lowest dark:bg-surface-container-lowest">
      {/* Filter bar */}
      <div className="p-lg flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-outline-variant dark:border-outline">
        <h2 className="font-h3 text-h3 text-on-surface dark:text-on-surface-variant">
          Recent Transactions
        </h2>
        <div className="flex flex-col sm:flex-row gap-sm w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search
              size={20}
              className="absolute left-sm top-1/2 -translate-y-1/2 text-outline pointer-events-none"
            />
            <input
              className="w-full pl-xl pr-md py-sm min-h-[44px] border border-outline-variant dark:border-outline rounded-lg font-body text-body bg-surface dark:bg-surface-container-low text-on-surface dark:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Search merchant..."
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <select
              className="w-full sm:w-auto appearance-none pl-md pr-xl py-sm min-h-[44px] border border-outline-variant dark:border-outline rounded-lg font-label text-label text-on-surface-variant bg-surface dark:bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-md top-1/2 -translate-y-1/2 text-outline pointer-events-none"
            />
          </div>
        </div>
      </div>

      {hasResults ? (
        <>
          {/* Desktop table (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-low dark:bg-surface-container">
                <tr>
                  <th className="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">
                    Merchant
                  </th>
                  <th className="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">
                    Category
                  </th>
                  <th
                    className="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider cursor-pointer select-none group"
                    onClick={() => toggleSort('date')}
                  >
                    <div className="flex items-center gap-xs">
                      Date
                      <SortIcon active={sortBy === 'date'} dir={sortDir} />
                    </div>
                  </th>
                  <th
                    className="px-lg py-md text-right font-label text-label text-on-surface-variant uppercase tracking-wider cursor-pointer select-none group"
                    onClick={() => toggleSort('amount')}
                  >
                    <div className="flex items-center justify-end gap-xs">
                      Amount
                      <SortIcon active={sortBy === 'amount'} dir={sortDir} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody
                ref={tableBodyRef}
                className="divide-y divide-outline-variant dark:divide-outline"
              >
                {paginated.map((t) => (
                  <TransactionRow key={t.id} transaction={t} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list (< md) */}
          <div ref={mobileListRef} className="md:hidden">
            {paginated.map((t) => (
              <TransactionCard key={t.id} transaction={t} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          message="No transactions match your filters"
          actionLabel="Clear Filters"
          onAction={handleClearFilters}
        />
      )}

      {/* Pagination */}
      <div className="p-lg border-t border-outline-variant dark:border-outline flex flex-col sm:flex-row items-center justify-between gap-md">
        <span className="font-label text-label text-on-surface-variant">
          {hasResults
            ? `Showing ${rangeStart}-${rangeEnd} of ${filtered.length} transactions`
            : 'Showing 0 of 0 transactions'}
        </span>
        {hasResults && (
          <div className="flex items-center gap-xs">
            <button
              className="w-11 h-11 flex items-center justify-center rounded border border-outline-variant dark:border-outline text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors disabled:opacity-30"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            {pageNumbers.map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-11 h-11 flex items-center justify-center rounded font-label text-label transition-colors ${
                  n === currentPage
                    ? 'bg-primary text-on-primary'
                    : 'border border-outline-variant dark:border-outline text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              className="w-11 h-11 flex items-center justify-center rounded border border-outline-variant dark:border-outline text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors disabled:opacity-30"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
