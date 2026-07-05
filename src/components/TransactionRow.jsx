import { Home, ShoppingBasket, Car, Film, Zap, Wallet, CircleDollarSign } from 'lucide-react';

const CATEGORY_ICONS = {
  Housing: Home,
  Food: ShoppingBasket,
  Transport: Car,
  Entertainment: Film,
  Utilities: Zap,
  Income: CircleDollarSign,
  Other: Wallet,
};

const CATEGORY_STYLES = {
  Housing: 'bg-primary-container/10 text-primary',
  Food: 'bg-secondary-container/10 text-on-secondary-container',
  Transport: 'bg-tertiary-container/10 text-tertiary',
  Entertainment: 'bg-tertiary-container/10 text-tertiary',
  Utilities: 'bg-outline-variant/30 text-on-surface-variant',
  Income: 'bg-secondary-container/10 text-on-secondary-container',
  Other: 'bg-outline-variant/30 text-on-surface-variant',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));
}

export default function TransactionRow({ transaction }) {
  const { merchant, category, date, amount, type } = transaction;
  const Icon = CATEGORY_ICONS[category] || Wallet;
  const pillClass = CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
  const isIncome = type === 'income' || amount > 0;

  return (
    <tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
      <td className="px-lg py-md">
        <div className="flex items-center gap-md min-w-0">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container flex-shrink-0">
            <Icon size={20} strokeWidth={2} />
          </div>
          <span className="font-body text-body font-semibold text-on-surface truncate">
            {merchant}
          </span>
        </div>
      </td>
      <td className="px-lg py-md">
        <span
          className={`font-label text-[12px] px-sm py-[2px] rounded-full uppercase tracking-wider whitespace-nowrap ${pillClass}`}
        >
          {category}
        </span>
      </td>
      <td className="px-lg py-md font-body text-body text-on-surface-variant whitespace-nowrap">
        {formatDate(date)}
      </td>
      <td
        className={`px-lg py-md text-right font-body text-body font-bold whitespace-nowrap ${
          isIncome ? 'text-secondary' : 'text-error'
        }`}
      >
        {isIncome ? '+' : '-'}
        {formatCurrency(amount)}
      </td>
    </tr>
  );
}
