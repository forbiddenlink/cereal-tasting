import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { springs, fadeInUp, fadeOverlay, slideInRight } from '../utils/motion';
import type { CartItem } from '../types/cart';
import { flightName, sogStatus } from '../data/jacques';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface FloatingCartProps {
    items: CartItem[];
    onRemove: (cerealId: string, options?: { silent?: boolean }) => void;
    onUpdateQuantity: (cerealId: string, quantity: number, options?: { silent?: boolean }) => void;
    onCheckout: () => void;
    onOpenMenu: () => void;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const badgeAnimation = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
};

export const FloatingCart: React.FC<FloatingCartProps> = ({
    items,
    onRemove,
    onUpdateQuantity,
    onCheckout,
    onOpenMenu,
    isOpen,
    onOpenChange,
}) => {
    const [undoItem, setUndoItem] = useState<CartItem | null>(null);
    const undoTimerRef = useRef<number | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const leadCereal = items[0]?.cereal;
    const [sogLeft, setSogLeft] = useState(leadCereal?.specs.decayRate ?? 0);

    const total = items.reduce((sum, item) => sum + (item.cereal.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const namedFlight = flightName(itemCount, total);
    const isEmpty = items.length === 0;

    useFocusTrap(isOpen, panelRef);

    useEffect(() => {
        return () => {
            if (undoTimerRef.current !== null) {
                window.clearTimeout(undoTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!leadCereal) return;
        setSogLeft(leadCereal.specs.decayRate);
        const id = window.setInterval(() => {
            setSogLeft((prev) => Math.max(0, prev - 1));
        }, 1000);
        return () => window.clearInterval(id);
    }, [leadCereal?.id, leadCereal?.specs.decayRate]);

    const scheduleUndoExpiry = () => {
        if (undoTimerRef.current !== null) {
            window.clearTimeout(undoTimerRef.current);
        }
        undoTimerRef.current = window.setTimeout(() => {
            setUndoItem(null);
            undoTimerRef.current = null;
        }, 5000);
    };

    const handleRemoveWithUndo = (item: CartItem) => {
        onRemove(item.cereal.id, { silent: true });
        setUndoItem(item);
        scheduleUndoExpiry();
    };

    const handleQuantityChange = (item: CartItem, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveWithUndo(item);
            return;
        }
        onUpdateQuantity(item.cereal.id, quantity);
    };

    const handleUndo = () => {
        if (!undoItem) return;
        onUpdateQuantity(undoItem.cereal.id, undoItem.quantity, { silent: true });
        setUndoItem(null);
        if (undoTimerRef.current !== null) {
            window.clearTimeout(undoTimerRef.current);
            undoTimerRef.current = null;
        }
    };

    // Hide FAB when empty and closed; still allow open empty state from nav
    if (isEmpty && !isOpen && !undoItem) return null;

    const sogPct = leadCereal ? (sogLeft / leadCereal.specs.decayRate) * 100 : 0;

    return (
        <>
            {!isEmpty && (
                <motion.button
                    onClick={() => onOpenChange(!isOpen)}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-gold via-gold to-gold-dim text-void rounded-full p-5 shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.6)] transition-all border-2 border-gold-dim/30 hover:border-gold/50"
                    aria-label={`Open your flight (${itemCount} bowls)`}
                    aria-expanded={isOpen}
                    aria-controls="floating-cart-panel"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0.8, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={springs.bouncy}
                >
                    <div className="relative">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>

                        <AnimatePresence mode="popLayout">
                            {itemCount > 0 && (
                                <motion.span
                                    key={itemCount}
                                    {...badgeAnimation}
                                    transition={springs.snappy}
                                    className="absolute -top-2 -right-2 bg-slime text-void text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.button>
            )}

            <AnimatePresence>
                {undoItem && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] rounded-xl border border-gold/25 bg-merlot-dark/95 backdrop-blur-md px-4 py-3 flex items-center gap-4 shadow-2xl"
                    >
                        <p className="text-xs text-cream/80 font-mono">
                            Banished {undoItem.cereal.name}. Jacques is watching.
                        </p>
                        <button
                            type="button"
                            onClick={handleUndo}
                            className="text-xs font-mono text-gold hover:text-cream transition-colors uppercase tracking-wider"
                        >
                            Restore
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            variants={fadeOverlay}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onClick={() => onOpenChange(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        <motion.div
                            ref={panelRef}
                            variants={slideInRight}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            id="floating-cart-panel"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="cart-panel-title"
                            tabIndex={-1}
                            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-gradient-to-b from-merlot-dark to-void border-l border-gold/20 shadow-2xl z-50 overflow-y-auto outline-none"
                        >
                            <div className="p-6 space-y-6">
                                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                                    <div>
                                        <h2 id="cart-panel-title" className="text-2xl font-heading text-gold">Your Flight</h2>
                                        <p className="text-[10px] font-mono text-gold/50 uppercase tracking-wider mt-1">
                                            {isEmpty ? 'An Empty Promise' : namedFlight}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onOpenChange(false)}
                                        className="text-cream/60 hover:text-cream transition-colors"
                                        aria-label="Close flight panel"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {isEmpty ? (
                                    <div className="rounded-xl border border-gold/15 bg-white/[0.03] p-8 text-center space-y-4">
                                        <p className="text-2xl font-heading text-gold">The Flight Is Empty</p>
                                        <p className="text-sm text-cream/60 leading-relaxed">
                                            No bowls aboard. Jacques refuses to take off without at least one vintage.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => onOpenChange(false)}
                                            className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-xs"
                                        >
                                            Return to The Cellar
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {leadCereal && (
                                            <div className="rounded-xl border border-gold/15 bg-white/[0.03] p-4">
                                                <div className="flex justify-between text-[10px] font-mono text-gold/60 uppercase tracking-wider mb-2">
                                                    <span>Live sog clock · {leadCereal.name}</span>
                                                    <span>{sogLeft}s</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-gold/10 mb-2">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-slime via-gold to-berry transition-[width] duration-1000 linear"
                                                        style={{ width: `${sogPct}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-cream/55 font-mono">
                                                    {sogStatus(sogLeft, leadCereal.specs.decayRate)}
                                                </p>
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            {items.map((item) => (
                                                <motion.div
                                                    key={item.cereal.id}
                                                    layout
                                                    variants={fadeInUp}
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                                                >
                                                    <div className="flex-1">
                                                        <h3 className="font-heading text-cream mb-1">{item.cereal.name}</h3>
                                                        <p className="text-xs font-mono text-gold/60">Vintage {item.cereal.vintage}</p>
                                                        <p className="text-sm font-mono text-slime mt-2">
                                                            ${item.cereal.price.toFixed(2)} × {item.quantity}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                                className="w-8 h-8 rounded-md border border-gold/30 text-gold hover:border-gold transition-colors"
                                                                aria-label={`Decrease ${item.cereal.name} quantity`}
                                                            >
                                                                −
                                                            </button>
                                                            <span className="w-8 text-center font-mono text-xs text-cream">{item.quantity}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                                className="w-8 h-8 rounded-md border border-gold/30 text-gold hover:border-gold transition-colors"
                                                                aria-label={`Increase ${item.cereal.name} quantity`}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveWithUndo(item)}
                                                        className="text-berry/60 hover:text-berry transition-colors"
                                                        aria-label={`Remove ${item.cereal.name} from flight`}
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="border-t border-gold/20 pt-4 space-y-2">
                                            <div className="flex justify-between items-center text-lg">
                                                <span className="font-heading text-gold">Emotional Ledger</span>
                                                <span className="font-mono text-cream font-bold">${total.toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-cream/40 font-mono">
                                                *Includes childhood memories, excludes dental work
                                            </p>
                                        </div>

                                        <motion.button
                                            onClick={onCheckout}
                                            whileHover={{ scale: 1.02, y: -2, transition: springs.snappy }}
                                            whileTap={{ scale: 0.98, transition: springs.snappy }}
                                            className="w-full bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading text-lg py-4 rounded-lg shadow-[0_6px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_36px_rgba(212,175,55,0.5)] transition-all border-2 border-gold-dim/30 hover:border-gold/50 relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wide">
                                                <span className="text-xl">✦</span>
                                                Begin Closing Ceremony
                                            </span>
                                        </motion.button>

                                        <button
                                            type="button"
                                            onClick={onOpenMenu}
                                            className="w-full px-4 py-3 rounded-lg border border-gold/30 text-gold font-heading font-bold uppercase tracking-wider text-xs hover:border-gold/60 hover:bg-gold/5 transition-colors"
                                        >
                                            Print Tasting Menu
                                        </button>

                                        <p className="text-center text-xs text-cream/30 font-mono">
                                            Portfolio ritual only — no card required, no cereal shipped
                                        </p>
                                    </>
                                )}

                                <AnimatePresence>
                                    {undoItem && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="rounded-lg border border-gold/20 bg-gold/5 p-3 flex items-center justify-between gap-3"
                                        >
                                            <p className="text-xs text-cream/80">
                                                Banished {undoItem.cereal.name}. Jacques is watching.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={handleUndo}
                                                className="text-xs font-mono text-gold hover:text-cream transition-colors"
                                            >
                                                Restore
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
