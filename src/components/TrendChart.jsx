import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cardHoverLift } from '@/lib/animationClasses';

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function aggregateByMonth(transactions) {
  const buckets = new Map();

  for (const t of transactions) {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, '0')}`;
    if (!buckets.has(key)) {
      buckets.set(key, {
        key,
        month: MONTH_LABELS[d.getMonth()],
        income: 0,
        expenses: 0,
        sortIndex: d.getFullYear() * 12 + d.getMonth(),
      });
    }
    const bucket = buckets.get(key);
    if (t.amount > 0) {
      bucket.income += t.amount;
    } else {
      bucket.expenses += Math.abs(t.amount);
    }
  }

  return Array.from(buckets.values())
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map(({ month, income, expenses }) => ({
      month,
      income: Math.round(income),
      expenses: Math.round(expenses),
    }));
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-sm shadow-md">
      <p className="font-label text-label text-on-surface mb-xs">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="font-small text-small" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function TrendChart({ transactions }) {
  const data = useMemo(() => aggregateByMonth(transactions ?? []), [transactions]);
  const hasSparseData = data.length < 3;

  return (
    <div
      className={`flex flex-col gap-lg rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:col-span-6 ${cardHoverLift}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-h3 text-h3 text-on-surface">Income vs Expenses</h2>
        <div className="flex gap-md">
          <div className="flex items-center gap-xs">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="font-label text-label text-on-surface-variant">Income</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="h-3 w-3 rounded-full bg-tertiary" />
            <span className="font-label text-label text-on-surface-variant">Expenses</span>
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              stroke="var(--color-on-surface-variant)"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--color-on-surface-variant)" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="var(--color-tertiary)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {hasSparseData && (
        <p className="font-small text-small text-on-surface-variant">
          Not enough data points in this range to show a detailed trend.
        </p>
      )}
    </div>
  );
}

export default TrendChart;
