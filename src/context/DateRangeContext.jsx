import { createContext, useContext, useState } from 'react';

const DateRangeContext = createContext(undefined);

export const DATE_RANGE_OPTIONS = [
  'This Month',
  'Last 3 Months',
  'Last 6 Months',
  'This Year',
  'All Time',
];

export function DateRangeProvider({ children }) {
  const [dateRange, setDateRange] = useState('This Month');

  const value = {
    dateRange,
    setDateRange,
  };

  return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>;
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
}
