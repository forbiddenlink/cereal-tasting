import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
    return (
        <div className="min-h-screen pt-40 pb-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.header
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-heading text-gold mb-4">
                        Contact The Cellar
                    </h1>
                    <p className="text-gold/60 font-mono uppercase tracking-wider text-sm">
                        For partnerships, press, and premium nostalgia inquiries
                    </p>
                </motion.header>

                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="glass-panel-heavy rounded-2xl border border-gold/20 p-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
                        <div>
                            <h2 className="text-2xl font-heading text-gold mb-3">General</h2>
                            <p className="text-cream/80 mb-2">hello@sommeliersspoon.example</p>
                            <p className="text-cream/60">Response window: 1-2 business days</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-heading text-gold mb-3">Press</h2>
                            <p className="text-cream/80 mb-2">press@sommeliersspoon.example</p>
                            <p className="text-cream/60">Media kit available on request</p>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};
