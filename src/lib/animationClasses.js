/**
 * Shared Tailwind class strings for consistent motion across the app.
 * Import and spread/concatenate into a component's className as needed.
 */

// Card hover-lift: subtle raise + shadow increase on hover, matching
// DESIGN_SYSTEM.md's resting/hover shadow spec.
export const cardHoverLift =
  'transition-transform transition-shadow duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]';

// Fade-in: for elements entering the DOM (e.g. filtered list items).
export const fadeIn = 'animate-in fade-in duration-200 ease-out';

// Combined helper for card components that want both behaviors.
export const cardMotion = `${cardHoverLift}`;
