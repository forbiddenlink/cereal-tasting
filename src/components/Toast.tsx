import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import type { Toast as ToastType } from '../contexts/ToastContext';

const ICONS: Record<ToastType['type'], string> = {
    success: '🥣',
    warning: '⚠️',
    info: '🥄',
    achievement: '🏆',
};

const BORDER_COLORS: Record<ToastType['type'], string> = {
    success: 'border-slime/40',
    warning: 'border-zap/40',
    info: 'border-gold/30',
    achievement: 'border-gold/60',
};

export const CEREAL_TOASTS = {
    addedToCart: (name: string) => `${name} has been cereal-ously acquired`,
    removedFromCart: (name: string) => `${name} returned to the cellar. It'll remember this.`,
    pairingFound: () => 'A match made in breakfast heaven',
    compareMode: () => 'Preparing the tasting flight...',
    filterApplied: () => "Sommelier's selection refined",
    easterEgg: (msg: string) => msg,
    copied: () => 'Copied to clipboard — spread the gospel of grain',
    quizComplete: (cereal: string) => `The spoon has spoken: you are ${cereal}`,
};

function ToastItem({ toast, onClose }: { toast: ToastType; onClose: () => void }) {
    const isAchievement = toast.type === 'achievement';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`
                relative flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl
                bg-merlot-dark/90 shadow-2xl min-w-[280px] max-w-[380px]
                ${BORDER_COLORS[toast.type]}
                ${isAchievement ? 'ring-1 ring-gold/30' : ''}
            `}
        >
            {isAchievement && (
                <div
                    className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s linear infinite',
                    }}
                />
            )}
            <span className="text-xl flex-shrink-0 mt-0.5">{ICONS[toast.type]}</span>
            <p className="text-sm text-cream/90 font-mono leading-relaxed flex-1 relative z-10">
                {toast.message}
            </p>
            <button
                type="button"
                onClick={onClose}
                className="text-cream/40 hover:text-cream/80 transition-colors text-lg leading-none flex-shrink-0 mt-0.5"
                aria-label="Dismiss notification"
            >
                ×
            </button>
        </motion.div>
    );
}

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-3 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}
