import { Wallet, ChevronDown, Sun, Moon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDateRange, DATE_RANGE_OPTIONS } from '@/context/DateRangeContext';
import { useTheme } from '@/context/ThemeContext';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/goals', label: 'Savings Goals' },
];

function Header() {
  const { dateRange, setDateRange } = useDateRange();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-[72px] w-full items-center justify-between border-b border-outline-variant bg-surface px-margin-mobile md:px-margin-desktop dark:border-outline dark:bg-surface-container-lowest">
      <div className="flex items-center gap-xl">
        <div className="flex items-center gap-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container text-on-primary">
            <Wallet size={20} strokeWidth={2.25} />
          </div>
          <h1 className="font-h3 text-h3 font-semibold tracking-tight text-on-surface dark:text-on-surface-variant">
            FinSight
          </h1>
        </div>

        <nav className="hidden h-full items-center gap-lg md:flex" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-label text-label rounded-lg px-md py-sm transition-colors ${
                  isActive
                    ? 'font-bold text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low dark:text-outline dark:hover:bg-surface-container'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-sm md:gap-lg">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-sm rounded-full bg-surface-container-low px-md py-sm font-label text-label text-on-surface-variant transition-colors hover:bg-surface-container-high">
              <span className="hidden sm:inline">{dateRange}</span>
              <ChevronDown size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {DATE_RANGE_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={() => setDateRange(option)}
                className={option === dateRange ? 'font-semibold text-primary' : ''}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low"
        >
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
