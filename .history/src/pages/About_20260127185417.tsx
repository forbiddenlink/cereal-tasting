import { motion } from 'framer-motion';
import React from 'react';

export const About: React.FC = () => {
    return (
        <div className="min-h-screen pt-40 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <div className="inline-block mb-6">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"></div>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-heading text-gold mb-8 leading-tight">
                        About The <span className="italic text-cream">Cellar</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gold/60 font-mono max-w-3xl mx-auto">
                        Where breakfast meets pretension
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"></div>
                </motion.div>

                {/* Story Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                    {/* Section 1 - Heritage */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel-heavy p-12 rounded-2xl border-2 border-gold/20 relative overflow-hidden group hover:border-gold/40 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                                    <span className="text-2xl text-void font-heading">I</span>
                                </div>
                                <h2 className="text-3xl font-heading text-gold">Our Heritage</h2>
                            </div>
                            <p className="text-cream/80 leading-relaxed mb-4 text-lg">
                                Founded in the sacred Saturday morning hours of 1994, <strong className="text-gold">The Cereal Cellar</strong> emerged 
                                from a simple question: "What if we treated cereal like wine?"
                            </p>
                            <p className="text-cream/70 leading-relaxed text-base">
                                The answer? Absolutely nothing changes except you can now charge $450 for a box of 
                                Cap'n Crunch and people will nod thoughtfully while eating it.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 2 - Sommelier */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-panel-heavy [padding:3rem] rounded-2xl border-2 border-gold/20 relative overflow-hidden group hover:border-gold/40 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                                    <span className="text-2xl text-void font-heading">II</span>
                                </div>
                                <h2 className="text-3xl font-heading text-gold">Our Sommelier</h2>
                            </div>
                            <p className="text-cream/80 leading-relaxed mb-4 text-lg">
                                Head Sommelier <strong className="text-gold">Jacques Flakémont III</strong> trained for decades 
                                (by watching cartoons) to develop an unparalleled palate for distinguishing between 47 shades 
                                of artificial strawberry flavor.
                            </p>
                            <p className="text-cream/70 leading-relaxed text-base">
                                He holds a Ph.D. in Breakfast Studies from the prestigious University of Saturday Morning 
                                and has been banned from 3 grocery stores for sniffing cereal boxes.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Section 3 - Process (Full Width) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel-heavy [padding:3rem] md:[padding:4rem] rounded-2xl border-2 border-gold/20 relative overflow-hidden mb-16 hover:border-gold/40 transition-all duration-500"
                >
                    <div className="absolute top-0 left-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                                <span className="text-2xl text-void font-heading">III</span>
                            </div>
                            <h2 className="text-3xl font-heading text-gold">Our Process</h2>
                        </div>
                        <p className="text-cream/80 leading-relaxed mb-8 text-lg max-w-4xl">
                            Each box is carefully aged in our climate-controlled cellar (actually just a basement) 
                            where temperature and humidity are monitored to prevent staleness while maximizing nostalgia.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: 'Vintage Selection', desc: 'Only cereals from years when cartoon quality peaked' },
                                { title: 'Crunch Analysis', desc: 'Measured in dB using professional sound equipment' },
                                { title: 'Decay Testing', desc: 'Stopwatch-timed immersion in milk solutions' },
                                { title: 'Nostalgia Score', desc: 'Determined by how many adults cry when tasting' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 p-6 rounded-lg bg-merlot/30 border border-gold/10 hover:border-gold/30 transition-all duration-300"
                                >
                                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong className="text-gold text-base block mb-1">{item.title}</strong>
                                        <span className="text-cream/70 text-sm">{item.desc}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Section 4 - Tech Stack (Portfolio) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="border-2 border-gold/30 [padding:3rem] md:[padding:4rem] rounded-2xl bg-gradient-to-br from-merlot/50 to-merlot-dark/50 relative overflow-hidden mb-16"
                >
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
                            <h2 className="text-4xl font-heading text-gold mb-4">Built With</h2>
                            <p className="text-cream/60 font-mono text-sm tracking-wider uppercase">
                                A portfolio project demonstrating modern web technologies
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {[
                                { name: 'React 19', abbr: 'R' },
                                { name: 'TypeScript', abbr: 'TS' },
                                { name: 'Framer Motion', abbr: 'FM' },
                                { name: 'Vite', abbr: 'V' },
                                { name: 'Tailwind CSS', abbr: 'TW' },
                                { name: 'Custom Animations', abbr: 'CA' },
                            ].map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -4, scale: 1.05 }}
                                    className="bg-gradient-to-br from-merlot-dark/80 to-merlot/40 backdrop-blur-sm border-2 border-gold/20 rounded-xl p-8 text-center hover:border-gold/40 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center mx-auto mb-3 text-void font-heading font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                        {tech.abbr}
                                    </div>
                                    <div className="text-cream/90 font-mono font-semibold text-sm">{tech.name}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-6 py-8 border-t border-gold/10"
                >
                    <p className="text-cream/40 text-sm font-mono max-w-3xl mx-auto leading-relaxed">
                        <strong className="text-gold/60">Legal Disclaimer:</strong> The Cereal Cellar is a satirical portfolio project. 
                        No actual cereal sommeliers were consulted (or exist). All prices are fictional and absurd. 
                        Please don't actually pay $1,500 for Lucky Charms. All trademark cereals mentioned are property 
                        of their respective copyright holders and are used here purely for comedic and educational purposes.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-1 bg-gradient-to-r from-transparent via-slime to-transparent"></div>
                        <p className="text-slime/70 text-sm font-mono">
                            Made with care and excessive amounts of sugar
                        </p>
                        <div className="w-8 h-1 bg-gradient-to-r from-transparent via-slime to-transparent"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
