import SummaryCard from '@/components/SummaryCard';
import TrendChart from '@/components/TrendChart';
import CategoryDonutChart from '@/components/CategoryDonutChart';
import TransactionsTable from '@/components/TransactionsTable';
import GoalCard from '@/components/GoalCard';
import { useDateRange } from '@/context/DateRangeContext';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';
import { useSummaryTotals } from '@/hooks/useSummaryTotals';
import transactions from '@/data/transactions';
import goals from '@/data/goals';

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
      {/* Summary Row */}
      <div id="overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg scroll-mt-24">
        <SummaryCard label="Total Balance" value={balance} showTrend={false} />
        <SummaryCard label="Monthly Income" value={income} showTrend={false} />
        <SummaryCard label="Monthly Expenses" value={expenses} showTrend={false} />
        <SummaryCard label="Net Savings" value={netSavings} showTrend={false} />
      </div>

      {/* Charts Row */}
      <div id="trends" className="grid grid-cols-1 lg:grid-cols-10 gap-md md:gap-lg scroll-mt-24">
        <div className="lg:col-span-6">
          <TrendChart transactions={filteredTransactions} />
        </div>
        <div className="lg:col-span-4">
          <CategoryDonutChart transactions={filteredTransactions} />
        </div>
      </div>

      {/* Transactions Section — now real */}
      <section
        id="transactions"
        className="bg-surface-container-lowest rounded-xl custom-shadow border border-outline-variant overflow-hidden scroll-mt-24"
      >
        <TransactionsTable transactions={transactions} />
      </section>

      {/* Savings Goals Section — now real */}
      <section id="goals" className="space-y-lg scroll-mt-24">
        <div className="flex items-center justify-between">
          <h2 className="font-h3 text-h3 text-on-surface">Savings Goals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </section>
    </main>
  );
}