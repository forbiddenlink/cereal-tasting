import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Cereal } from '../data/mockData';
import { springs, fadeInUp, fadeOverlay, slideInRight } from '../utils/motion';

// Scale animation for badge (inline to avoid Variant type issues)
const badgeAnimation = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
};

interface CartItem {
    cereal: Cereal;
    quantity: number;
}

interface FloatingCartProps {
    items: CartItem[];
    onRemove: (cerealId: string) => void;
    onCheckout: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({ items, onRemove, onCheckout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const total = items.reduce((sum, item) => sum + (item.cereal.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    if (items.length === 0) return null;

    return (
        <>
            {/* Floating Cart Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 z-50 bg-linear-to-br from-gold via-gold-dim to-gold text-merlot rounded-full p-4 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-shadow"
                aria-label="Open shopping cart"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
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
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Cart Content */}
                        <motion.div
                            variants={slideInRight}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-merlot-dark border-l border-gold/20 shadow-2xl z-50 overflow-y-auto"
                        >
                            <div className="p-6 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                                    <h2 className="text-2xl font-heading text-gold">Your Cellar</h2>
                                    <button
                                        onClick={() => setIsOpen(false)}
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
                                            </div>
                                            <button
                                                onClick={() => onRemove(item.cereal.id)}
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
                                    whileHover={{ scale: 1.02, transition: springs.snappy }}
                                    whileTap={{ scale: 0.98, transition: springs.snappy }}
                                    className="w-full bg-linear-to-r from-gold via-gold to-gold-dim text-merlot font-heading text-lg py-4 rounded-lg shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow"
                                >
                                    Proceed to Checkout
                                </motion.button>
                                
                                <p className="text-center text-xs text-cream/30 font-mono">
                                    (This is a portfolio project, no actual purchase will occur)
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
