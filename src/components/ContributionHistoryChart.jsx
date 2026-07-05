import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-sm shadow-md dark:border-outline dark:bg-surface-container-lowest">
      <p className="font-label text-label text-on-surface dark:text-on-surface-variant mb-xs">
        {label}
      </p>
      <p className="font-small text-small text-primary">${value.toLocaleString()}</p>
    </div>
  );
}

function ContributionHistoryChart({ data }) {
  return (
    <section className="bg-surface-container-lowest dark:bg-surface-container-lowest custom-shadow border border-outline-variant dark:border-outline rounded-xl p-lg md:p-xl">
      <div className="flex items-center justify-between mb-xl">
        <h3 className="font-h3 text-h3 text-on-surface dark:text-on-surface-variant">
          Contribution History
        </h3>
        <div className="flex items-center gap-sm">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="font-label text-label text-on-surface-variant">Monthly Totals</span>
        </div>
      </div>
      <div className="h-[260px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-outline-variant)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              stroke="var(--color-on-surface-variant)"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--color-on-surface-variant)" />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'var(--color-surface-container-low)' }}
            />
            <Bar
              dataKey="totalContributed"
              name="Contributed"
              fill="var(--color-primary)"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ContributionHistoryChart;
