import { motion } from 'framer-motion';

const LAST_UPDATED = 'February 10, 2026';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen pt-40 pb-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.header
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-heading text-gold mb-3">Privacy Policy</h1>
                    <p className="text-gold/60 font-mono text-xs uppercase tracking-wider">
                        Last updated: {LAST_UPDATED}
                    </p>
                </motion.header>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="glass-panel-heavy rounded-2xl border border-gold/20 p-8 md:p-10 space-y-6 text-cream/80 leading-relaxed"
                >
                    <section>
                        <h2 className="text-2xl font-heading text-gold mb-2">Overview</h2>
                        <p>
                            This is a portfolio experience. We do not process payments, create accounts, or collect sensitive personal information.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-heading text-gold mb-2">Data We Store</h2>
                        <p>
                            The app stores cart and rating selections locally in your browser so your session feels continuous.
                            This data does not leave your device.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-heading text-gold mb-2">Contact</h2>
                        <p>
                            Questions can be sent to privacy@sommeliersspoon.example.
                        </p>
                    </section>
                </motion.article>
            </div>
        </div>
    );
};
