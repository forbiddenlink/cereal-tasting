import { motion } from 'framer-motion';
import React from 'react';

export const Contact: React.FC = () => {
    return (
        <div className="min-h-screen pt-48 pb-20 px-4">
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
                        Contact <span className="italic text-cream">The Cellar</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gold/60 font-mono max-w-3xl mx-auto">
                        For partnerships, press, and premium nostalgia inquiries
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"></div>
                </motion.div>

                {/* Contact Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                    {/* General Inquiries */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel-heavy rounded-2xl border-2 border-gold/20 relative overflow-hidden group hover:border-gold/40 transition-all duration-500 p-12"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                                    <span className="text-2xl text-void font-heading">✉</span>
                                </div>
                                
<h2 className="text-3xl font-heading text-gold" style={{ color: '#d4af37' }}>General Inquiries</h2>
                            </div>
                            <p className="text-cream/80 leading-relaxed mb-4 text-lg">
                                For general questions, collaboration opportunities, or to discuss your own cereal tasting journey.
                            </p>
                            <div className="space-y-3">
                                <p className="text-cream/90 font-mono text-base">
                                    <span className="text-gold/70">Email:</span> hello@sommeliersspoon.example
                                </p>
                                <p className="text-cream/70 text-sm">
                                    Response window: 1-2 business days
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Press & Media */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-panel-heavy rounded-2xl border-2 border-gold/20 relative overflow-hidden group hover:border-gold/40 transition-all duration-500 p-12"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                                    <span className="text-2xl text-void font-heading">📰</span>
                                </div>
                                
<h2 className="text-3xl font-heading text-gold" style={{ color: '#d4af37' }}>Press & Media</h2>
                            </div>
                            <p className="text-cream/80 leading-relaxed mb-4 text-lg">
                                Media inquiries, interview requests, and press kit access for journalists and content creators.
                            </p>
                            <div className="space-y-3">
                                <p className="text-cream/90 font-mono text-base">
                                    <span className="text-gold/70">Email:</span> press@sommeliersspoon.example
                                </p>
                                <p className="text-cream/70 text-sm">
                                    Media kit available on request
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Partnerships Section (Full Width) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel-heavy rounded-2xl border-2 border-gold/20 relative overflow-hidden mb-16 hover:border-gold/40 transition-all duration-500 p-12"
                >
                    <div className="absolute top-0 left-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                                <span className="text-2xl text-void font-heading">🤝</span>
                            </div>
                            <h2 className="text-3xl font-heading text-gold">Partnerships & Collaborations</h2>
                        </div>
                        <p className="text-cream/80 leading-relaxed mb-8 text-lg max-w-4xl">
                            Interested in collaborating on a project, sponsoring a vintage tasting event, or exploring 
                            custom cereal curation experiences? We're always open to creative partnerships.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: 'Brand Collaborations', desc: 'Custom cereal experiences and co-branded tastings' },
                                { title: 'Event Sponsorships', desc: 'Vintage cereal showcases and nostalgia exhibitions' },
                                { title: 'Content Partnerships', desc: 'Video series, podcasts, and editorial features' },
                                { title: 'Technical Projects', desc: 'Portfolio collaborations and creative web experiences' },
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
                        <div className="mt-8 pt-6 border-t border-gold/10">
                            <p className="text-cream/90 font-mono text-base">
                                <span className="text-gold/70">Email:</span> partnerships@sommeliersspoon.example
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Social & Portfolio Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-6 py-8 border-t border-gold/10"
                >
                    <p className="text-cream/40 text-sm font-mono max-w-3xl mx-auto leading-relaxed">
                        <strong className="text-gold/60">Portfolio Note:</strong> The Sommelier's Spoon is a satirical 
                        portfolio project showcasing modern web development. All contact addresses are examples for 
                        demonstration purposes. For actual inquiries about this project, please visit the developer's 
                        portfolio or GitHub.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-1 bg-gradient-to-r from-transparent via-slime to-transparent"></div>
                        <p className="text-slime/70 text-sm font-mono">
                            Built with care and excessive attention to detail
                        </p>
                        <div className="w-8 h-1 bg-gradient-to-r from-transparent via-slime to-transparent"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
