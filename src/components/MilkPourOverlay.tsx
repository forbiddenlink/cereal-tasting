import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

interface MilkPourOverlayProps {
  active: boolean;
  cerealName?: string;
  onComplete: () => void;
}

export function MilkPourOverlay({ active, cerealName, onComplete }: MilkPourOverlayProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const ms = shouldReduceMotion ? 400 : 1600;
    const id = window.setTimeout(onComplete, ms);
    return () => window.clearTimeout(id);
  }, [active, onComplete, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[95] pointer-events-none flex items-end justify-center pb-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div className="relative w-40 h-48">
            {/* Milk stream */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3 rounded-full origin-top"
                style={{
                  top: -80,
                  background: 'linear-gradient(180deg, rgba(245,240,225,0.95), rgba(240,240,224,0.55))',
                  boxShadow: '0 0 18px rgba(240,240,224,0.35)',
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 120, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.1, times: [0, 0.15, 0.75, 1], ease: 'easeOut' }}
              />
            )}

            {/* Bowl */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-16"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-x-2 bottom-0 h-10 rounded-b-[2rem] border-2 border-gold/50"
                style={{
                  background: 'linear-gradient(180deg, rgba(26,5,13,0.2), rgba(5,5,5,0.85))',
                }}
              />
              <div className="absolute inset-x-0 top-2 h-4 rounded-full border border-gold/40 bg-merlot-dark/80" />

              {/* Rising milk fill */}
              <motion.div
                className="absolute inset-x-4 bottom-1 h-7 rounded-b-[1.5rem] overflow-hidden"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.25, duration: shouldReduceMotion ? 0.2 : 0.9, ease: 'easeOut' }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(180deg, #f7f3e6, #e8e0c8)',
                  }}
                />
              </motion.div>
            </motion.div>

            {cerealName && (
              <motion.p
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.2em] text-gold/80"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                Pouring for {cerealName}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
