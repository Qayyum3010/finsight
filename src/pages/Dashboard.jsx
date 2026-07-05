import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SummaryCard from '@/components/SummaryCard';
import TrendChart from '@/components/TrendChart';
import CategoryDonutChart from '@/components/CategoryDonutChart';
import TransactionRow from '@/components/TransactionRow';
import TransactionCard from '@/components/TransactionCard';
import GoalCard from '@/components/GoalCard';
import Skeleton from '@/components/Skeleton';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useDateRange } from '@/context/DateRangeContext';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';
import { useSummaryTotals } from '@/hooks/useSummaryTotals';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { transactions } from '@/data/transactions';
import { goals } from '@/data/goals';

const SIMULATED_LOAD_MS = 400;
const PREVIEW_ROW_COUNT = 5;

function DashboardContent() {
  const { dateRange } = useDateRange();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), SIMULATED_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = useFilteredTransactions(transactions, {
    dateRange,
    search: '',
    category: 'All Categories',
    sortBy: 'date',
    sortDir: 'desc',
  });

  const { balance, income, expenses, netSavings } = useSummaryTotals(filteredTransactions);
  const recentTransactions = filteredTransactions.slice(0, PREVIEW_ROW_COUNT);

  const [goalsGridRef] = useAutoAnimate();

  if (isLoading) {
    return (
      <main className="flex-grow px-margin-mobile md:px-margin-desktop py-lg md:py-xl pb-24 md:pb-xl max-w-[1440px] mx-auto w-full space-y-lg md:space-y-xl bg-background dark:bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
          <Skeleton className="h-[110px]" />
          <Skeleton className="h-[110px]" />
          <Skeleton className="h-[110px]" />
          <Skeleton className="h-[110px]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-md md:gap-lg">
          <Skeleton className="lg:col-span-6 h-[340px]" />
          <Skeleton className="lg:col-span-4 h-[340px]" />
        </div>
        <Skeleton className="h-[320px] rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          <Skeleton className="h-[220px]" />
          <Skeleton className="h-[220px]" />
          <Skeleton className="h-[220px]" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-lg md:py-xl pb-24 md:pb-xl max-w-[1440px] mx-auto w-full space-y-lg md:space-y-xl bg-background dark:bg-background text-on-surface dark:text-on-surface-variant">
      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
        <SummaryCard label="Total Balance" value={balance} showTrend={false} />
        <SummaryCard label="Monthly Income" value={income} showTrend={false} />
        <SummaryCard label="Monthly Expenses" value={expenses} showTrend={false} />
        <SummaryCard label="Net Savings" value={netSavings} showTrend={false} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-md md:gap-lg">
        <div className="lg:col-span-6">
          <TrendChart transactions={filteredTransactions} />
        </div>
        <div className="lg:col-span-4">
          <CategoryDonutChart transactions={filteredTransactions} />
        </div>
      </div>

      {/* Transactions Preview */}
      <section className="bg-surface-container-lowest dark:bg-surface-container-lowest rounded-xl custom-shadow border border-outline-variant dark:border-outline overflow-hidden">
        <div className="p-lg flex items-center justify-between border-b border-outline-variant dark:border-outline">
          <h2 className="font-h3 text-h3 text-on-surface dark:text-on-surface-variant">
            Recent Transactions
          </h2>
          <Link
            to="/transactions"
            className="flex items-center gap-xs font-label text-label text-primary hover:underline"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Desktop preview rows */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <tbody className="divide-y divide-outline-variant dark:divide-outline">
              {recentTransactions.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile preview cards */}
        <div className="md:hidden">
          {recentTransactions.map((t) => (
            <TransactionCard key={t.id} transaction={t} />
          ))}
        </div>
      </section>

      {/* Savings Goals Preview */}
      <section className="space-y-lg">
        <div className="flex items-center justify-between">
          <h2 className="font-h3 text-h3 text-on-surface dark:text-on-surface-variant">
            Savings Goals
          </h2>
          <Link
            to="/goals"
            className="flex items-center gap-xs font-label text-label text-primary hover:underline"
          >
            View all goals
            <ArrowRight size={16} />
          </Link>
        </div>
        <div ref={goalsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <DashboardContent />
    </ErrorBoundary>
  );
}
