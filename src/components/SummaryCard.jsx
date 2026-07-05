import { TrendingUp, TrendingDown } from 'lucide-react';
import { cardHoverLift } from '@/lib/animationClasses';

/**
 * @param {string} label - e.g. "Total Balance"
 * @param {number} value - raw numeric value (formatted as currency here)
 * @param {number} [trendPercent] - signed percent change, e.g. 4.2 or -8.1
 * @param {boolean} [showTrend] - whether to render the trend badge at all
 */
function SummaryCard({ label, value, trendPercent, showTrend = true }) {
  const formattedValue = value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const isPositive = (trendPercent ?? 0) >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={`flex flex-col gap-sm rounded-xl border border-outline-variant bg-surface-container-lowest p-lg ${cardHoverLift}`}
    >
      <span className="font-label text-label text-on-surface-variant">{label}</span>
      <div className="flex items-end justify-between gap-sm">
        <span className="font-h1 text-h1 text-on-surface tracking-tighter">{formattedValue}</span>
        {showTrend && trendPercent !== undefined && (
          <span
            className={`flex items-center gap-xs rounded-full px-sm py-[2px] font-label text-[12px] ${
              isPositive
                ? 'bg-secondary-container/20 text-secondary'
                : 'bg-error-container/30 text-error'
            }`}
          >
            <TrendIcon size={14} />
            {isPositive ? '+' : ''}
            {trendPercent}%
          </span>
        )}
      </div>
    </div>
  );
}

export default SummaryCard;
