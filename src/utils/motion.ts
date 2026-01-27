import { useReducedMotion } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';

/**
 * Shared spring presets for consistent motion feel
 */
export const springs = {
  // Quick, responsive - for hover states, small interactions
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as Transition,

  // Smooth, professional - for modals, panels, page transitions
  smooth: { type: 'spring', stiffness: 200, damping: 25 } as Transition,

  // Playful with slight bounce - for delightful moments
  bouncy: { type: 'spring', stiffness: 300, damping: 20, bounce: 0.15 } as Transition,

  // Tactile, physical - for drag/tilt interactions
  tactile: { type: 'spring', stiffness: 150, damping: 15 } as Transition,
};

/**
 * Standard enter animation (Jakub's recipe: opacity + translateY + blur)
 */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springs.smooth,
  },
  exit: {
    opacity: 0,
    y: 6, // Subtler exit (half the enter distance)
    filter: 'blur(2px)',
    transition: { ...springs.smooth, duration: 0.15 },
  },
};

/**
 * Slide in from right (for panels/drawers)
 */
export const slideInRight: Variants = {
  initial: {
    x: '100%',
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: springs.smooth,
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { ...springs.smooth, duration: 0.2 },
  },
};

/**
 * Scale in (for badges, tooltips - never from 0!)
 */
export const scaleIn: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: springs.snappy,
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

/**
 * Fade overlay (for backdrops)
 */
export const fadeOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/**
 * Mobile menu dropdown
 */
export const dropDown: Variants = {
  initial: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
  },
  exit: {
    opacity: 0,
    y: -6, // Subtler exit
    filter: 'blur(2px)',
    transition: { duration: 0.15 },
  },
};

/**
 * List item stagger container
 */
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/**
 * Hook to get motion-safe animation props
 * Returns reduced/no animation when user prefers reduced motion
 */
export function useMotionSafe() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    // Return static values if reduced motion is preferred
    getTransition: (transition: Transition): Transition =>
      prefersReducedMotion ? { duration: 0 } : transition,
    getVariants: (variants: Variants): Variants =>
      prefersReducedMotion ? {} : variants,
  };
}
