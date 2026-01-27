import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-void">
            <div className="text-center space-y-8">
                {/* Animated Spoon */}
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-8xl"
                >
                    🥄
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-heading text-gold mb-2">
                        Curating your experience...
                    </h2>
                    <p className="text-sm font-mono text-cream/60">
                        Dusting off vintage boxes
                    </p>
                </motion.div>

                {/* Animated Dots */}
                <div className="flex gap-2 justify-center">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-gold rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
