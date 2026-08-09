import { motion } from 'framer-motion';
import React from 'react';

const GITHUB_REPO = 'https://github.com/forbiddenlink/cereal-tasting';

export const Contact: React.FC = () => {
    return (
        <div className="min-h-screen pt-48 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <div className="inline-block mb-6">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"></div>
                    </div>
                    <p className="text-4xl mb-4" aria-hidden="true">☎️</p>
                    <h1 className="text-6xl md:text-8xl font-heading text-gold mb-8 leading-tight">
                        Contact <span className="italic text-cream">The Cellar</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gold/60 font-mono max-w-3xl mx-auto">
                        The switchboard is mostly decorative. The GitHub is not.
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl border-2 border-gold/20 bg-merlot-dark/60 relative overflow-hidden group hover:border-gold/40 transition-all duration-500 p-12"
                    >
                        <div className="relative z-10">
                            <h2 className="text-3xl font-heading text-gold mb-4">Confessions & Collabs</h2>
                            <p className="text-cream/80 leading-relaxed mb-6 text-lg">
                                Questions, collabs, or confessions about eating cereal for dinner. Jacques reads these between spoon polishes.
                            </p>
                            <a
                                href={GITHUB_REPO}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-xs"
                            >
                                Open the GitHub Issue Desk
                            </a>
                            <p className="text-cream/40 text-xs font-mono mt-4">
                                Response window: whenever Jacques finishes judging your milk choice
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="rounded-2xl border-2 border-gold/20 bg-merlot-dark/60 relative overflow-hidden group hover:border-gold/40 transition-all duration-500 p-12"
                    >
                        <div className="relative z-10">
                            <h2 className="text-3xl font-heading text-gold mb-4">Press & Pretension</h2>
                            <p className="text-cream/80 leading-relaxed mb-6 text-lg">
                                Interview requests, hot takes, and people who want to argue that cereal is soup. Bring receipts.
                            </p>
                            <a
                                href={`${GITHUB_REPO}/discussions`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gold/40 text-gold font-heading font-bold uppercase tracking-wider text-xs hover:bg-gold/10 transition-colors"
                            >
                                Start a Discussion
                            </a>
                            <p className="text-cream/40 text-xs font-mono mt-4">
                                Media kit: this entire website, plus your imagination
                            </p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl border-2 border-gold/20 bg-gradient-to-br from-merlot/40 to-merlot-dark/60 relative overflow-hidden mb-16 p-12"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl font-heading text-gold mb-4">Built By a Human (Allegedly)</h2>
                        <p className="text-cream/75 leading-relaxed mb-6 max-w-3xl">
                            This is a satirical portfolio piece: React 19, Vite, Framer Motion, prerendered routes, a11y-minded overlays,
                            and an unhealthy amount of Jacques Flakémont lore. If you hire people who make weird things carefully, hello.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={GITHUB_REPO}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg border border-gold/30 text-gold text-xs font-mono uppercase tracking-wider hover:border-gold/60"
                            >
                                github.com/forbiddenlink/cereal-tasting
                            </a>
                            <a
                                href="https://github.com/forbiddenlink"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg border border-cream/20 text-cream/70 text-xs font-mono uppercase tracking-wider hover:border-cream/40"
                            >
                                @forbiddenlink
                            </a>
                        </div>
                    </div>
                </motion.div>

                <p className="text-center text-cream/35 text-sm font-mono">
                    No .example emails were harmed. Real inbox routing lives on GitHub.
                </p>
            </div>
        </div>
    );
};
