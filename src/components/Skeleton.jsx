export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-surface-container-high dark:bg-surface-container rounded-lg ${className}`}
      aria-hidden="true"
    />
  );
}
