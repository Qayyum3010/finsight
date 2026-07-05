import { useDateRange } from '@/context/DateRangeContext';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';
import { useSummaryTotals } from '@/hooks/useSummaryTotals';
import SummaryCard from '@/components/SummaryCard';
import TrendChart from '@/components/TrendChart';
import CategoryDonutChart from '@/components/CategoryDonutChart';
import transactions from '@/data/transactions';

function Dashboard() {
  const { dateRange } = useDateRange();

  const filteredTransactions = useFilteredTransactions(transactions, {
    dateRange,
  });

  const { balance, income, expenses, netSavings } = useSummaryTotals(filteredTransactions);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-xl px-margin-desktop py-xl">
      {/* Summary Row */}
      <section id="overview" className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Balance" value={balance} showTrend={false} />
        <SummaryCard label="Monthly Income" value={income} showTrend={false} />
        <SummaryCard label="Monthly Expenses" value={expenses} showTrend={false} />
        <SummaryCard label="Net Savings" value={netSavings} showTrend={false} />
      </section>

      {/* Charts Row */}
      <section id="trends" className="grid grid-cols-1 gap-lg lg:grid-cols-10">
        <TrendChart transactions={filteredTransactions} />
        <CategoryDonutChart transactions={filteredTransactions} />
      </section>

      {/* Transactions placeholder — real build in Phase 7B */}
      <section
        id="transactions"
        className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg text-on-surface-variant"
      >
        Transactions table coming in Phase 7B.
      </section>

      {/* Goals placeholder — real build in Phase 7C */}
      <section
        id="goals"
        className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg text-on-surface-variant"
      >
        Savings goals coming in Phase 7C.
      </section>
    </div>
  );
}

export default Dashboard;
