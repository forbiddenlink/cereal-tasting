import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import type { CartItem } from '../types/cart';
import { flightName } from '../data/jacques';
import { springs } from '../utils/motion';

interface FlightMenuProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onPrinted?: () => void;
}

function formatMenuDate(): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());
}

export function FlightMenu({ isOpen, items, onClose, onPrinted }: FlightMenuProps) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.cereal.price * item.quantity, 0),
    [items]
  );
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const namedFlight = flightName(itemCount, total);

  const handlePrint = () => {
    onPrinted?.();
    // Let the toast fire, then print so the dialog isn't mid-transition
    window.setTimeout(() => window.print(), 120);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[76] bg-black/75 backdrop-blur-sm print:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="fixed inset-0 z-[77] flex items-start justify-center overflow-y-auto px-4 py-10 print:p-0 print:static print:inset-auto print:block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={springs.smooth}
            role="dialog"
            aria-modal="true"
            aria-labelledby="flight-menu-title"
          >
            <div className="w-full max-w-2xl">
              <div
                className="flight-menu-printable relative overflow-hidden rounded-2xl border-4 border-double border-[#d4af37] bg-[#f5f0e1] p-8 md:p-12 text-[#1a1a1a] shadow-2xl print:shadow-none print:rounded-none print:border-[3px]"
              >
                <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#d4af37]" />
                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#d4af37]" />
                <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#d4af37]" />
                <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#d4af37]" />

                <div className="relative z-10 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#997b28] mb-2">
                    The Sommelier&apos;s Spoon
                  </p>
                  <h2 id="flight-menu-title" className="font-heading text-4xl md:text-5xl text-[#1a1a1a] mb-1">
                    Tasting Flight Menu
                  </h2>
                  <p className="font-mono text-xs text-[#666] mb-1">{namedFlight}</p>
                  <p className="font-mono text-[10px] text-[#999] uppercase tracking-wider mb-8">
                    {formatMenuDate()} · Service temperature: childhood
                  </p>

                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8" />

                  <ol className="space-y-6 text-left max-w-lg mx-auto mb-10">
                    {items.map((item, index) => (
                      <li key={item.cereal.id} className="border-b border-[#d4af37]/35 pb-5">
                        <div className="flex items-baseline justify-between gap-4 mb-1">
                          <p className="font-heading text-xl text-[#1a1a1a]">
                            <span className="text-[#997b28] mr-2 font-mono text-sm">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            {item.cereal.name}
                            {item.quantity > 1 && (
                              <span className="ml-2 font-mono text-xs text-[#997b28]">×{item.quantity}</span>
                            )}
                          </p>
                          <p className="font-mono text-sm text-[#555] whitespace-nowrap">
                            ${(item.cereal.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-[#997b28] mb-2">
                          Vintage {item.cereal.vintage} · {item.cereal.region}
                        </p>
                        <p className="text-sm text-[#555] italic leading-relaxed">
                          {item.cereal.tastingNotes[0]}
                        </p>
                        <p className="mt-2 font-mono text-[10px] text-[#888]">
                          Crunch {item.cereal.flavor.crunch} · Sweetness {item.cereal.flavor.sweetness} · Nostalgia{' '}
                          {item.cereal.flavor.nostalgia} · Sog clock {item.cereal.specs.decayRate}s
                        </p>
                      </li>
                    ))}
                  </ol>

                  <div className="flex justify-between items-end max-w-lg mx-auto mb-8 font-mono text-sm">
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-wider text-[#997b28] mb-1">Emotional ledger</p>
                      <p className="text-2xl font-heading text-[#1a1a1a]">${total.toFixed(2)}</p>
                    </div>
                    <div className="text-right text-[10px] text-[#888] max-w-[12rem]">
                      Gratuity optional. Tears encouraged. Dental insurance recommended.
                    </div>
                  </div>

                  <p className="font-mono text-[10px] text-[#aaa] leading-relaxed max-w-md mx-auto">
                    Prepared under the supervision of Jacques Flakémont III. Not affiliated with any cereal brand,
                    governing body, or functioning adult.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 print:hidden">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-6 py-3 rounded-xl bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-sm"
                >
                  Print Menu
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl border border-gold/30 text-gold font-heading font-bold uppercase tracking-wider text-sm hover:border-gold/60"
                >
                  Back to Flight
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
