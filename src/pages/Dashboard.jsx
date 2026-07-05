import SummaryCard from '@/components/SummaryCard';
import TrendChart from '@/components/TrendChart';
import CategoryDonutChart from '@/components/CategoryDonutChart';
import { useDateRange } from '@/context/DateRangeContext';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';
import { useSummaryTotals } from '@/hooks/useSummaryTotals';
import transactions from '@/data/transactions';

export default function Dashboard() {
  const { dateRange } = useDateRange();

  const filteredTransactions = useFilteredTransactions(transactions, {
    dateRange,
    search: '',
    category: 'All Categories',
    sortBy: 'date',
    sortDir: 'desc',
  });

  const { balance, income, expenses, netSavings } = useSummaryTotals(filteredTransactions);

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-lg md:py-xl max-w-[1440px] mx-auto w-full space-y-lg md:space-y-xl">
      {/* Summary Row: 1-col mobile -> 2-col tablet -> 4-col desktop */}
      <div
        id="overview"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg scroll-mt-24"
      >
        <SummaryCard label="Total Balance" value={balance} showTrend={false} />
        <SummaryCard label="Monthly Income" value={income} showTrend={false} />
        <SummaryCard label="Monthly Expenses" value={expenses} showTrend={false} />
        <SummaryCard label="Net Savings" value={netSavings} showTrend={false} />
      </div>

      {/* Charts Row: stacked mobile/tablet -> side-by-side (6/4) at lg+ */}
      <div id="trends" className="grid grid-cols-1 lg:grid-cols-10 gap-md md:gap-lg scroll-mt-24">
        <div className="lg:col-span-6">
          <TrendChart transactions={filteredTransactions} />
        </div>
        <div className="lg:col-span-4">
          <CategoryDonutChart transactions={filteredTransactions} />
        </div>
      </div>

      {/* Transactions Section — real build lands in 7B.1.8 */}
      <section
        id="transactions"
        className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md md:p-lg text-on-surface-variant scroll-mt-24"
      >
        <h2 className="font-h3 text-h3 text-on-surface mb-sm">Recent Transactions</h2>
        <p className="font-body text-body">Transactions table coming in Phase 7B (7B.1.8).</p>
      </section>

      {/* Goals Section — real build lands in Phase 7C */}
      <section
        id="goals"
        className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md md:p-lg text-on-surface-variant scroll-mt-24"
      >
        <h2 className="font-h3 text-h3 text-on-surface mb-sm">Savings Goals</h2>
        <p className="font-body text-body">Goals section coming in Phase 7C.</p>
      </section>
    </main>
  );
}
