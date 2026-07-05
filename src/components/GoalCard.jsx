import { Shield, Plane, Laptop, PiggyBank } from 'lucide-react';

const ICONS = {
  'Emergency Fund': Shield,
  'Vacation to Japan': Plane,
  Vacation: Plane,
  'New Laptop': Laptop,
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function estimateCompletion(currentAmount, targetAmount, targetDate) {
  if (currentAmount >= targetAmount) return null;
  const date = new Date(targetDate);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function GoalCard({ goal }) {
  const { name, targetAmount, currentAmount, targetDate } = goal;
  const Icon = ICONS[name] || PiggyBank;
  const percent = Math.min(100, Math.round((currentAmount / targetAmount) * 100));
  const isComplete = currentAmount >= targetAmount;
  const estCompletion = estimateCompletion(currentAmount, targetAmount, targetDate);

  const barColor = isComplete ? 'bg-[#22C55E]' : 'bg-primary';
  const textColor = isComplete ? 'text-[#166534] dark:text-[#4ADE80]' : 'text-primary';

  return (
    <div className="bg-surface-container-lowest dark:bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant dark:border-outline flex flex-col gap-lg transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-md">
        <div className="flex items-center gap-md">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isComplete
                ? 'bg-[#DCFCE7] dark:bg-[#166534]/30 text-[#166534] dark:text-[#4ADE80]'
                : 'bg-surface-container-low dark:bg-surface-container text-primary'
            }`}
          >
            <Icon size={20} strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-body text-body font-bold text-on-surface dark:text-on-surface-variant">
              {name}
            </h3>
            <p className="font-small text-small text-on-surface-variant">
              Target: {formatCurrency(targetAmount)}
            </p>
          </div>
        </div>
        {isComplete && (
          <span className="inline-flex items-center rounded-full bg-[#DCFCE7] dark:bg-[#166534]/30 px-sm py-[2px] text-[11px] font-semibold text-[#166534] dark:text-[#4ADE80] whitespace-nowrap">
            Goal Reached! 🎉
          </span>
        )}
      </div>

      <div className="space-y-sm">
        <div className="flex items-center justify-between font-label text-label">
          <span className={textColor}>{percent}% complete</span>
          <span className="text-on-surface-variant">{formatCurrency(currentAmount)} saved</span>
        </div>
        <div className="h-2 w-full bg-surface-container-low dark:bg-surface-container rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        {isComplete ? (
          <p className="font-small text-small text-on-surface-variant mt-xs">
            Completed on{' '}
            {new Date(targetDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        ) : (
          <p className="font-small text-small text-on-surface-variant mt-xs italic">
            Est. completion: {estCompletion}
          </p>
        )}
      </div>
    </div>
  );
}
