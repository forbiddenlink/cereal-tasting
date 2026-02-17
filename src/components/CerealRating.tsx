import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { springs, fadeInUp, scaleIn } from '../utils/motion';

interface CerealRatingProps {
    cerealId?: string;
    initialRating?: number;
}

export const CerealRating: React.FC<CerealRatingProps> = ({ cerealId, initialRating = 0 }) => {
    const storageKey = cerealId ? `cereal-cellar-rating-${cerealId}` : null;
    const [rating, setRating] = useState(() => {
        if (!storageKey) return initialRating;
        const persisted = window.localStorage.getItem(storageKey);
        const parsed = persisted ? Number.parseInt(persisted, 10) : Number.NaN;
        return Number.isFinite(parsed) && parsed >= 1 && parsed <= 5 ? parsed : initialRating;
    });
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleRate = (value: number) => {
        setRating(value);
        setSubmitted(true);

        // Reset submitted state after 2 seconds
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            setSubmitted(false);
            timeoutRef.current = null;
        }, 2000);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!storageKey) return;
        window.localStorage.setItem(storageKey, String(rating));
    }, [rating, storageKey]);

    const ratingLabels = [
        "Soggy Disappointment",
        "Breakfast Regret",
        "Mediocre Morning",
        "Acceptable Crunch",
        "Nostalgic Perfection"
    ];

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => {
                    const filled = star <= (hoverRating || rating);

                    return (
                        <motion.button
                            key={star}
                            type="button"
                            onHoverStart={() => setHoverRating(star)}
                            onHoverEnd={() => setHoverRating(0)}
                            onClick={() => handleRate(star)}
                            whileHover={{ scale: 1.15, transition: springs.snappy }}
                            whileTap={{ scale: 0.9, transition: springs.snappy }}
                            className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-md"
                            aria-label={`Rate ${star} out of 5`}
                            aria-pressed={rating === star}
                        >
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: filled ? 1.1 : 1,
                                }}
                                transition={springs.snappy}
                            >
                                <svg
                                    className={`w-8 h-8 transition-colors ${filled ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'text-white/20'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </motion.div>
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                {(hoverRating || rating) > 0 && (
                    <motion.div
                        key="label"
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-center"
                    >
                        <p className="text-xs font-mono text-gold/80">
                            {ratingLabels[(hoverRating || rating) - 1]}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {submitted && (
                    <motion.div
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-center"
                    >
                        <span className="text-sm text-slime font-mono" aria-live="polite">
                            ✓ Your refined palate has been recorded
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
