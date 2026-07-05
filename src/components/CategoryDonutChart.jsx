import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cardHoverLift } from '@/lib/animationClasses';

const CATEGORY_COLORS = {
  Housing: 'var(--color-primary)',
  Food: 'var(--color-secondary)',
  Transport: 'var(--color-tertiary)',
  Entertainment: '#94A3B8',
  Utilities: '#c3c6d7',
  Other: 'var(--color-outline)',
};

function getColor(category) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;
}

function aggregateByCategory(transactions) {
  const totals = new Map();
  let grandTotal = 0;

  for (const t of transactions) {
    if (t.amount >= 0) continue; // expenses only
    const amount = Math.abs(t.amount);
    totals.set(t.category, (totals.get(t.category) ?? 0) + amount);
    grandTotal += amount;
  }

  const entries = Array.from(totals.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percent: grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  return { entries, grandTotal };
}

function CategoryDonutChart({ transactions }) {
  const { entries, grandTotal } = useMemo(
    () => aggregateByCategory(transactions ?? []),
    [transactions]
  );

  return (
    <div
      className={`flex flex-col gap-lg rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:col-span-4 ${cardHoverLift}`}
    >
      <h2 className="font-h3 text-h3 text-on-surface">Spending by Category</h2>
      <div className="flex h-full flex-col items-center gap-xl md:flex-row">
        <div className="relative h-40 w-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={entries}
                dataKey="amount"
                nameKey="category"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
              >
                {entries.map((entry) => (
                  <Cell key={entry.category} fill={getColor(entry.category)} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-label text-label text-on-surface-variant">Total</span>
            <span className="font-h3 text-h3 text-on-surface">${grandTotal.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-sm">
          {entries.map((entry) => (
            <div key={entry.category} className="flex items-center justify-between">
              <div className="flex items-center gap-sm">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: getColor(entry.category) }}
                />
                <span className="font-body text-body text-on-surface">{entry.category}</span>
              </div>
              <span className="font-label text-label text-on-surface">{entry.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryDonutChart;
