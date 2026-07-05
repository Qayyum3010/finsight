import { SearchX } from 'lucide-react';

export default function EmptyState({
  icon: Icon = SearchX,
  message = 'No results found',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-md py-2xl px-lg text-center">
      <div className="w-12 h-12 rounded-full bg-surface-container-low dark:bg-surface-container flex items-center justify-center text-on-surface-variant">
        <Icon size={24} />
      </div>
      <p className="font-body text-body text-on-surface-variant">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="min-h-[44px] px-lg rounded-lg border border-outline-variant text-primary font-label text-label hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
