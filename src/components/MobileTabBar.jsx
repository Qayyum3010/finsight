import { useEffect, useState } from 'react';
import { LayoutDashboard, TrendingUp, Receipt, Target } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'goals', label: 'Goals', icon: Target },
];

function MobileTabBar() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  useEffect(() => {
    const sections = TABS.map(({ id }) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveTab(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(id);
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-outline-variant bg-surface-container-lowest md:hidden dark:border-outline dark:bg-surface-container-lowest"
      aria-label="Section navigation"
    >
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => handleTabClick(id)}
            aria-current={isActive ? 'true' : undefined}
            className={`flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center gap-xs py-sm transition-colors ${
              isActive
                ? 'text-primary'
                : 'text-on-surface-variant hover:text-primary dark:text-outline'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span
              className={`font-small text-[11px] leading-none ${isActive ? 'font-semibold' : ''}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default MobileTabBar;
