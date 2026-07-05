import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Target } from 'lucide-react';

const TABS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/transactions', label: 'Transactions', icon: Receipt, end: false },
  { to: '/goals', label: 'Goals', icon: Target, end: false },
];

function MobileTabBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-outline-variant bg-surface-container-lowest md:hidden dark:border-outline dark:bg-surface-container-lowest"
      aria-label="Main navigation"
    >
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center gap-xs py-sm transition-colors ${
              isActive
                ? 'text-primary'
                : 'text-on-surface-variant hover:text-primary dark:text-outline'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span
                className={`font-small text-[11px] leading-none ${isActive ? 'font-semibold' : ''}`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileTabBar;
