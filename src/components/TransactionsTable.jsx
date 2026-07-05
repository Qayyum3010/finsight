import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TransactionRow from '@/components/TransactionRow';
import { useDateRange } from '@/context/DateRangeContext';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';

const DEBOUNCE_MS = 300;

export default function TransactionsTable({ transactions }) {
  const { dateRange } = useDateRange();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce the search input before it hits the filtering hook
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [searchInput]);

  const filtered = useFilteredTransactions(transactions, {
    dateRange,
    search: debouncedSearch,
    category: 'All Categories',
    sortBy: 'date',
    sortDir: 'desc',
  });

  return (
    <div>
      <div className="p-lg flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-outline-variant">
        <h2 className="font-h3 text-h3 text-on-surface">Recent Transactions</h2>
        <div className="relative w-full md:w-64">
          <Search
            size={20}
            className="absolute left-sm top-1/2 -translate-y-1/2 text-outline pointer-events-none"
          />
          <input
            className="w-full pl-xl pr-md py-sm border border-outline-variant rounded-lg font-body text-body bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search merchant..."
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">
                Merchant
              </th>
              <th className="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">
                Category
              </th>
              <th className="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">
                Date
              </th>
              <th className="px-lg py-md text-right font-label text-label text-on-surface-variant uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((t) => (
              <TransactionRow key={t.id} transaction={t} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
