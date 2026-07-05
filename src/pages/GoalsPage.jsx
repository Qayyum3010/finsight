import GoalCard from '@/components/GoalCard';
import ContributionHistoryChart from '@/components/ContributionHistoryChart';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { goals } from '@/data/goals';
import { goalContributions } from '@/data/goalContributions';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function GoalsPageContent() {
  const [goalsGridRef] = useAutoAnimate();

  const activeGoalCount = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-lg md:py-xl pb-24 md:pb-xl max-w-[1440px] mx-auto w-full">
      {/* Page title row */}
      <div className="flex flex-col gap-md md:flex-row md:justify-between md:items-end mb-xl">
        <div>
          <h1 className="font-h1-mobile md:font-h1 text-h1-mobile md:text-h1 text-on-surface dark:text-on-surface-variant mb-xs">
            Savings Goals
          </h1>
          <p className="font-body text-body text-on-surface-variant">
            {activeGoalCount} active goal{activeGoalCount === 1 ? '' : 's'} ·{' '}
            <span className="font-semibold text-on-surface dark:text-on-surface-variant">
              {formatCurrency(totalSaved)} saved total
            </span>
          </p>
        </div>
      </div>

      {/* Goals Grid */}
      <div
        ref={goalsGridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-2xl"
      >
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Contribution History */}
      <ContributionHistoryChart data={goalContributions} />
    </main>
  );
}

export default function GoalsPage() {
  return (
    <ErrorBoundary>
      <GoalsPageContent />
    </ErrorBoundary>
  );
}
