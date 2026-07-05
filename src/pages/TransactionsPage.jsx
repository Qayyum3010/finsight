import { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  Download,
} from 'lucide-react';
import TransactionRow from '@/components/TransactionRow';
import TransactionCard from '@/components/TransactionCard';
import EmptyState from '@/components/EmptyState';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { transactions } from '@/data/transactions';

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
const TYPES = ['All Types', 'Income', 'Expense'];

function SortIcon({ active, dir }) {
  if (!active)
    return <ChevronsUpDown size={16} className="text-outline group-hover:text-primary" />;
  return dir === 'asc' ? (
    <ArrowUp size={16} className="text-primary" />
  ) : (
    <ArrowDown size={16} className="text-primary" />
  );
}

function downloadCsv(rows) {
  const header = ['Date', 'Merchant', 'Category', 'Type', 'Amount'];
  const lines = rows.map((t) =>
    [t.date, `"${t.merchant.replace(/"/g, '""')}"`, t.category, t.type, t.amount].join(',')
  );
  const csv = [header.join(','), ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `finsight-transactions-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function TransactionsPageContent() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [type, setType] = useState('All Types');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);

  const [tableBodyRef] = useAutoAnimate();
  const [mobileListRef] = useAutoAnimate();

  const filtered = useFilteredTransactions(transactions, {
    dateRange: 'All Time',
    search,
    category,
    type,
    minAmount: minAmount === '' ? undefined : Number(minAmount),
    maxAmount: maxAmount === '' ? undefined : Number(maxAmount),
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
    setPage(1);
    if (sortBy === column) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDir('desc');
    }
  }

  function handleClearFilters() {
    setSearch('');
    setCategory('All Categories');
    setType('All Types');
    setMinAmount('');
    setMaxAmount('');
    setSortBy('date');
    setSortDir('desc');
    setPage(1);
  }

  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const hasResults = filtered.length > 0;

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-lg md:py-xl pb-24 md:pb-xl max-w-[1440px] mx-auto w-full">
      {/* Page title row */}
      <div className="flex flex-col gap-md md:flex-row md:items-end md:justify-between mb-xl">
        <div>
          <h1 className="font-h1-mobile md:font-h1 text-h1-mobile md:text-h1 text-on-surface dark:text-on-surface-variant mb-xs">
            Transactions
          </h1>
          <p className="font-body text-body text-on-surface-variant">
            {filtered.length} transaction{filtered.length === 1 ? '' : 's'} matching your filters
          </p>
        </div>
        <button
          onClick={() => downloadCsv(filtered)}
          disabled={!hasResults}
          className="flex items-center justify-center gap-sm px-lg h-11 border border-primary text-primary rounded-xl font-label text-label hover:bg-surface-container-low dark:hover:bg-surface-container transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Filter bar */}
      <section className="bg-surface-container-lowest dark:bg-surface-container-lowest custom-shadow border border-outline-variant dark:border-outline rounded-xl p-lg mb-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-lg items-end">
          <div className="lg:col-span-4">
            <label className="block font-label text-label text-on-surface-variant mb-xs">
              Search
            </label>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-md top-1/2 -translate-y-1/2 text-outline pointer-events-none"
              />
              <input
                className="w-full pl-[44px] pr-md h-11 rounded-xl border border-outline-variant dark:border-outline focus:ring-2 focus:ring-primary focus:border-primary font-body text-body bg-surface dark:bg-surface-container-low text-on-surface dark:text-on-surface-variant outline-none transition-all"
                placeholder="Merchant, category..."
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label className="block font-label text-label text-on-surface-variant mb-xs">
              Category
            </label>
            <select
              className="w-full px-md h-11 rounded-xl border border-outline-variant dark:border-outline focus:ring-2 focus:ring-primary font-body text-body bg-surface dark:bg-surface-container-low text-on-surface dark:text-on-surface-variant outline-none transition-all"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block font-label text-label text-on-surface-variant mb-xs">
              Type
            </label>
            <select
              className="w-full px-md h-11 rounded-xl border border-outline-variant dark:border-outline focus:ring-2 focus:ring-primary font-body text-body bg-surface dark:bg-surface-container-low text-on-surface dark:text-on-surface-variant outline-none transition-all"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <label className="block font-label text-label text-on-surface-variant mb-xs">
              Amount Range
            </label>
            <div className="flex items-center gap-sm">
              <input
                className="w-1/2 px-md h-11 rounded-xl border border-outline-variant dark:border-outline focus:ring-2 focus:ring-primary font-body text-body bg-surface dark:bg-surface-container-low text-on-surface dark:text-on-surface-variant outline-none transition-all"
                placeholder="Min"
                type="number"
                min="0"
                value={minAmount}
                onChange={(e) => {
                  setMinAmount(e.target.value);
                  setPage(1);
                }}
              />
              <span className="text-outline">to</span>
              <input
                className="w-1/2 px-md h-11 rounded-xl border border-outline-variant dark:border-outline focus:ring-2 focus:ring-primary font-body text-body bg-surface dark:bg-surface-container-low text-on-surface dark:text-on-surface-variant outline-none transition-all"
                placeholder="Max"
                type="number"
                min="0"
                value={maxAmount}
                onChange={(e) => {
                  setMaxAmount(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-1 flex items-center h-11">
            <button
              onClick={handleClearFilters}
              className="min-h-[44px] font-label text-label text-primary hover:underline whitespace-nowrap"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* Table / Cards */}
      <section className="bg-surface-container-lowest dark:bg-surface-container-lowest custom-shadow border border-outline-variant dark:border-outline rounded-xl overflow-hidden">
        {hasResults ? (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-container-low dark:bg-surface-container border-b border-outline-variant dark:border-outline">
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

        <div className="p-lg border-t border-outline-variant dark:border-outline flex flex-col sm:flex-row items-center justify-between gap-md">
          <span className="font-label text-label text-on-surface-variant">
            {hasResults
              ? `Showing ${rangeStart}-${rangeEnd} of ${filtered.length}`
              : 'Showing 0 of 0'}
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
      </section>
    </main>
  );
}

export default function TransactionsPage() {
  return (
    <ErrorBoundary>
      <TransactionsPageContent />
    </ErrorBoundary>
  );
}