import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { springs, fadeInUp, fadeOverlay, slideInRight } from '../utils/motion';
import type { CartItem } from '../types/cart';

interface FloatingCartProps {
    items: CartItem[];
    onRemove: (cerealId: string) => void;
    onUpdateQuantity: (cerealId: string, quantity: number) => void;
    onCheckout: () => void;
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
    isOpen,
    onOpenChange,
}) => {
    const [undoItem, setUndoItem] = useState<CartItem | null>(null);
    const undoTimerRef = useRef<number | null>(null);

    const total = items.reduce((sum, item) => sum + (item.cereal.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        return () => {
            if (undoTimerRef.current !== null) {
                window.clearTimeout(undoTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (items.length === 0 && isOpen) {
            onOpenChange(false);
        }
    }, [items.length, isOpen, onOpenChange]);

    const handleRemoveWithUndo = (item: CartItem) => {
        onRemove(item.cereal.id);
        setUndoItem(item);

        if (undoTimerRef.current !== null) {
            window.clearTimeout(undoTimerRef.current);
        }

        undoTimerRef.current = window.setTimeout(() => {
            setUndoItem(null);
            undoTimerRef.current = null;
        }, 5000);
    };

    const handleUndo = () => {
        if (!undoItem) return;
        onUpdateQuantity(undoItem.cereal.id, undoItem.quantity);
        setUndoItem(null);
        if (undoTimerRef.current !== null) {
            window.clearTimeout(undoTimerRef.current);
            undoTimerRef.current = null;
        }
    };

    if (items.length === 0) return null;

    return (
        <>
            {/* Floating Cart Button */}
            <motion.button
                onClick={() => onOpenChange(!isOpen)}
                className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-gold via-gold to-gold-dim text-void rounded-full p-5 shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.6)] transition-all border-2 border-gold-dim/30 hover:border-gold/50"
                aria-label="Open shopping cart"
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

            {/* Cart Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            variants={fadeOverlay}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onClick={() => onOpenChange(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Cart Content */}
                        <motion.div
                            variants={slideInRight}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            id="floating-cart-panel"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="cart-panel-title"
                            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-gradient-to-b from-merlot-dark to-void border-l border-gold/20 shadow-2xl z-50 overflow-y-auto"
                        >
                            <div className="p-6 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                                    <h2 id="cart-panel-title" className="text-2xl font-heading text-gold">Your Cellar</h2>
                                    <button
                                        onClick={() => onOpenChange(false)}
                                        className="text-cream/60 hover:text-cream transition-colors"
                                        aria-label="Close cart"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Cart Items */}
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
                                                        onClick={() => onUpdateQuantity(item.cereal.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-md border border-gold/30 text-gold hover:border-gold transition-colors"
                                                        aria-label={`Decrease ${item.cereal.name} quantity`}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-8 text-center font-mono text-xs text-cream">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => onUpdateQuantity(item.cereal.id, item.quantity + 1)}
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
                                                aria-label={`Remove ${item.cereal.name} from cart`}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="border-t border-gold/20 pt-4 space-y-2">
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="font-heading text-gold">Grand Total</span>
                                        <span className="font-mono text-cream font-bold">${total.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-cream/40 font-mono">
                                        *Prices include emotional value and childhood memories
                                    </p>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    onClick={onCheckout}
                                    whileHover={{ scale: 1.02, y: -2, transition: springs.snappy }}
                                    whileTap={{ scale: 0.98, transition: springs.snappy }}
                                    className="w-full bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading text-lg py-4 rounded-lg shadow-[0_6px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_36px_rgba(212,175,55,0.5)] transition-all border-2 border-gold-dim/30 hover:border-gold/50 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wide">
                                        <span className="text-xl">✦</span>
                                        Proceed to Checkout
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gold-dim/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.button>
                                
                                <p className="text-center text-xs text-cream/30 font-mono">
                                    (This is a portfolio project, no actual purchase will occur)
                                </p>

                                <AnimatePresence>
                                    {undoItem && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="rounded-lg border border-gold/20 bg-gold/5 p-3 flex items-center justify-between gap-3"
                                        >
                                            <p className="text-xs text-cream/80">
                                                Removed {undoItem.cereal.name}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={handleUndo}
                                                className="text-xs font-mono text-gold hover:text-cream transition-colors"
                                            >
                                                Undo
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
