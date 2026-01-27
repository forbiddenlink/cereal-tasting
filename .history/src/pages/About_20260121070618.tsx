import { motion } from 'framer-motion';
import React from 'react';

export const About: React.FC = () => {
    return (
        <div className="min-h-screen pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-heading text-gold mb-6">
                        About The <span className="italic text-cream">Cellar</span>
                    </h1>
                    <p className="text-xl text-gold/60 font-mono max-w-2xl mx-auto">
                        Where breakfast meets pretension
                    </p>
                </motion.div>

                {/* Story Sections */}
                <div className="space-y-16">
                    {/* Section 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel p-8 rounded-xl"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-5xl">🏛️</span>
                            <div>
                                <h2 className="text-2xl font-heading text-gold mb-3">Our Heritage</h2>
                                <p className="text-cream/80 leading-relaxed mb-4">
                                    Founded in the sacred Saturday morning hours of 1994, <strong>The Cereal Cellar</strong> emerged 
                                    from a simple question: "What if we treated cereal like wine?"
                                </p>
                                <p className="text-cream/80 leading-relaxed">
                                    The answer? Absolutely nothing changes except you can now charge $450 for a box of 
                                    Cap'n Crunch and people will nod thoughtfully while eating it.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel p-8 rounded-xl"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-5xl">🎓</span>
                            <div>
                                <h2 className="text-2xl font-heading text-gold mb-3">Our Sommelier</h2>
                                <p className="text-cream/80 leading-relaxed mb-4">
                                    Head Sommelier <strong className="text-gold">Jacques Flakémont III</strong> trained for decades 
                                    (by watching cartoons) to develop an unparalleled palate for distinguishing between 47 shades 
                                    of artificial strawberry flavor.
                                </p>
                                <p className="text-cream/80 leading-relaxed">
                                    He holds a Ph.D. in Breakfast Studies from the prestigious University of Saturday Morning 
                                    and has been banned from 3 grocery stores for sniffing cereal boxes.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel p-8 rounded-xl"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-5xl">🔬</span>
                            <div>
                                <h2 className="text-2xl font-heading text-gold mb-3">Our Process</h2>
                                <p className="text-cream/80 leading-relaxed mb-4">
                                    Each box is carefully aged in our climate-controlled cellar (actually just a basement) 
                                    where temperature and humidity are monitored to prevent staleness while maximizing nostalgia.
                                </p>
                                <ul className="space-y-2 text-cream/70 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold">→</span>
                                        <span><strong>Vintage Selection:</strong> Only cereals from years when cartoon quality peaked</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold">→</span>
                                        <span><strong>Crunch Analysis:</strong> Measured in dB using professional sound equipment</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold">→</span>
                                        <span><strong>Decay Testing:</strong> Stopwatch-timed immersion in milk solutions</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold">→</span>
                                        <span><strong>Nostalgia Score:</strong> Determined by how many adults cry when tasting</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 4 - Tech Stack (Portfolio) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="border-2 border-gold/30 p-8 rounded-xl bg-gradient-to-br from-merlot/50 to-merlot-dark/50"
                    >
                        <div className="text-center mb-6">
                            <span className="text-4xl mb-4 block">💻</span>
                            <h2 className="text-2xl font-heading text-gold mb-3">Built With</h2>
                            <p className="text-cream/60 text-sm font-mono mb-6">
                                A portfolio project demonstrating modern web technologies
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { name: 'React 19', icon: '⚛️' },
                                { name: 'TypeScript', icon: '📘' },
                                { name: 'Framer Motion', icon: '🎬' },
                                { name: 'Vite', icon: '⚡' },
                                { name: 'Tailwind CSS', icon: '🎨' },
                                { name: 'Custom Animations', icon: '✨' },
                            ].map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center"
                                >
                                    <div className="text-2xl mb-2">{tech.icon}</div>
                                    <div className="text-cream/90 text-sm font-mono">{tech.name}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 pt-8"
                    >
                        <p className="text-cream/40 text-xs font-mono max-w-2xl mx-auto leading-relaxed">
                            <strong className="text-gold/60">Legal Disclaimer:</strong> The Cereal Cellar is a satirical portfolio project. 
                            No actual cereal sommeliers were consulted (or exist). All prices are fictional and absurd. 
                            Please don't actually pay $1,500 for Lucky Charms. All trademark cereals mentioned are property 
                            of their respective copyright holders and are used here purely for comedic and educational purposes.
                        </p>
                        <p className="text-slime/60 text-xs font-mono">
                            Made with 💚 and excessive amounts of sugar
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
