import { motion } from 'framer-motion';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen pt-48 pb-20 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    {/* Top decorative line */}
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"></div>
                    
                    <h1 className="text-5xl md:text-7xl font-heading text-gold mb-4">Privacy Policy</h1>
                    <p className="text-gold/60 font-mono uppercase tracking-wider text-sm mb-2">
                        Your Nostalgia, Our Commitment
                    </p>
                    <p className="text-cream/50 text-xs font-mono">
                        Last Updated: When we remembered to write this
                    </p>

                    {/* Bottom decorative line */}
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"></div>
                </motion.header>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel-heavy rounded-2xl border-2 border-gold/20 p-8 mb-8 relative overflow-hidden group hover:border-gold/40 transition-all duration-500"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-500"></div>
                    <div className="relative z-10">
                        <p className="text-cream/80 leading-relaxed mb-4">
                            Welcome to The Sommelier's Spoon, where we take your privacy as seriously as we take our cereal (which is to say, with an absurd amount of pretension).
                        </p>
                        <p className="text-cream/70 leading-relaxed text-sm">
                            This is a satirical portfolio project. We don't actually collect, store, or sell any data because there's nothing to collect. But if we did, here's how we'd handle it with the utmost sophistication.
                        </p>
                    </div>
                </motion.div>

                {/* Cookie Policy */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="glass-panel-heavy rounded-2xl border-2 border-gold/20 p-8 mb-8 relative overflow-hidden group hover:border-gold/40 transition-all duration-500"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slime/5 rounded-full blur-3xl group-hover:bg-slime/10 transition-all duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center text-2xl">
                                🍪
                            </div>
                            <h2 className="text-3xl font-heading text-gold">Cookie Policy</h2>
                        </div>
                        <p className="text-cream/80 leading-relaxed mb-4">
                            We use cookies. Not the cereal kind (though we wish). These are digital cookies that help us remember your preferences, like whether you prefer whole milk or the existential void of almond milk.
                        </p>
                        <ul className="space-y-3 text-cream/70 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span><strong className="text-gold">Essential Cookies</strong> - Required for the site to function, like milk is required for cereal</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span><strong className="text-gold">Preference Cookies</strong> - Remember your cart items (your "flight" of cereals)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span><strong className="text-gold">Crispy Cookies</strong> - Not actually used, but they sound delicious</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Data We Don't Collect */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-panel-heavy rounded-2xl border-2 border-gold/20 p-8 mb-8 relative overflow-hidden group hover:border-gold/40 transition-all duration-500"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-berry/5 rounded-full blur-3xl group-hover:bg-berry/10 transition-all duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-berry to-merlot flex items-center justify-center text-2xl">
                                🚫
                            </div>
                            <h2 className="text-3xl font-heading text-gold">Data We Don't Collect</h2>
                        </div>
                        <p className="text-cream/80 leading-relaxed mb-4">
                            Because this is a portfolio project with no backend, we literally cannot collect any of the following (even if we wanted to):
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-cream/70 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-slime">✗</span>
                                <span>Your childhood cereal preferences</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slime">✗</span>
                                <span>Milk temperature preferences</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slime">✗</span>
                                <span>Bowl-to-cereal ratios</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slime">✗</span>
                                <span>Saturday morning cartoon choices</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slime">✗</span>
                                <span>Your deepest nostalgia triggers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slime">✗</span>
                                <span>Credit card information (seriously, don't try)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slime">✗</span>
                                <span>Whether you eat cereal for dinner</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slime">✗</span>
                                <span>Your opinions on soggy vs. crunchy</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Your Rights */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="glass-panel-heavy rounded-2xl border-2 border-gold/20 p-8 mb-8 relative overflow-hidden group hover:border-gold/40 transition-all duration-500"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zap/5 rounded-full blur-3xl group-hover:bg-zap/10 transition-all duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zap to-slime flex items-center justify-center text-2xl">
                                ⚖️
                            </div>
                            <h2 className="text-3xl font-heading text-gold">Your Rights</h2>
                        </div>
                        <p className="text-cream/80 leading-relaxed mb-4">
                            As a visitor to this satirical cereal appreciation platform, you have the following inalienable rights:
                        </p>
                        <ul className="space-y-3 text-cream/70 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">✓</span>
                                <span><strong className="text-gold">Right to Remain Nostalgic</strong> - You may reminisce about breakfast cereals at any time</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">✓</span>
                                <span><strong className="text-gold">Right to Disagree</strong> - You may disagree with our milk pairings (though you'd be wrong)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">✓</span>
                                <span><strong className="text-gold">Right to Laugh</strong> - You may find this entire concept ridiculous (we do too)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">✓</span>
                                <span><strong className="text-gold">Right to Leave</strong> - You may close this tab at any time without judgment</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">✓</span>
                                <span><strong className="text-gold">Right to Not Pay $2,100 for Grape-Nuts</strong> - Seriously, please don't</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Third-Party Services */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="glass-panel-heavy rounded-2xl border-2 border-gold/20 p-8 mb-8 relative overflow-hidden group hover:border-gold/40 transition-all duration-500"
                >
                    <div className="relative z-10">
                        <h2 className="text-2xl font-heading text-gold mb-4">Third-Party Services</h2>
                        <p className="text-cream/80 leading-relaxed mb-4">
                            This site is hosted on Vercel, which may collect standard web analytics. We don't have access to this data, and frankly, we're too busy rating cereal to care.
                        </p>
                        <p className="text-cream/70 text-sm">
                            For more information on Vercel's privacy practices, please visit their privacy policy.
                        </p>
                    </div>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="glass-panel-heavy rounded-2xl border-2 border-gold/20 p-8 relative overflow-hidden group hover:border-gold/40 transition-all duration-500"
                >
                    <div className="relative z-10">
                        <h2 className="text-2xl font-heading text-gold mb-4">Questions?</h2>
                        <p className="text-cream/80 leading-relaxed mb-4">
                            If you have any questions about this privacy policy, or if you're concerned about how we're handling your non-existent data, please visit our <a href="/contact/" className="text-slime hover:text-gold transition-colors underline">Contact page</a>.
                        </p>
                        <p className="text-cream/60 text-sm italic">
                            Remember: This is a portfolio project. There is no actual commerce, no actual data collection, and no actual sommeliers. Just vibes and nostalgia.
                        </p>
                    </div>
                </motion.div>

                {/* Bottom decorative line */}
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-slime to-transparent mx-auto mt-16"></div>
            </div>
        </div>
    );
};
