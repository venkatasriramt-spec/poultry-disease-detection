
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, BrainCircuit, ScanSearch, Eye, Stethoscope } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Veterinary AI Platform - Poultry Diagnostic System</title>
        <meta name="description" content="Enterprise-grade diagnostic system powered by dual-stage AI models and clinical expertise." />
      </Helmet>

      <div className="min-h-screen mesh-bg-home text-white">
        {/* HERO SECTION */}
        <section className="relative min-h-[90dvh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1678995635432-d9e89c7a8fc5" 
              alt="AI poultry disease detection diagnostic system" 
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl glass-panel p-8 md:p-12 rounded-3xl border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)]"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide uppercase">Clinical Grade Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                PoultryVision <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">AI</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                Enterprise-grade diagnostic system powered by dual-stage AI models and clinical expertise. Rapid, accurate pathology assessment to safeguard flock integrity in a vibrant, data-driven environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/predict"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg btn-primary-avant"
                >
                  Initiate Diagnosis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                >
                  Review Specifications
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

        {/* HIERARCHICAL ARCHITECTURE SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center max-w-3xl mx-auto glass-panel p-8 rounded-3xl"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 drop-shadow-md">Dual-Stage Diagnostic Pipeline</h2>
              <p className="text-cyan-200 text-lg">A sequential routing architecture ensuring high precision pathology classification.</p>
            </motion.div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* Stage 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-panel-cyan rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.5)] text-white">
                      <ScanSearch className="w-8 h-8" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-900/50 text-cyan-300 rounded-full font-bold text-sm border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      <Activity className="w-4 h-4" /> 82% Accuracy
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2 drop-shadow-md">Stage 1</h3>
                  <h4 className="text-2xl font-heading font-bold text-white mb-3">Bouncer Model (Binary Triage)</h4>
                  <p className="text-cyan-100 font-medium mb-4">"Is this poultry healthy or diseased?"</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The initial triage model operates with high recall to confidently differentiate between strictly healthy subjects and those exhibiting potential pathology.
                  </p>
                </motion.div>

                {/* Stage 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-panel-purple rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] text-white">
                      <Stethoscope className="w-8 h-8" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-900/50 text-purple-300 rounded-full font-bold text-sm border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                      <Activity className="w-4 h-4" /> 72% Accuracy
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-2 drop-shadow-md">Stage 2</h3>
                  <h4 className="text-2xl font-heading font-bold text-white mb-3">Doctor Model (Classification)</h4>
                  <p className="text-purple-200 font-medium mb-4">"Which specific disease is present?"</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Subjects flagged by Stage 1 are analyzed by a specialized multi-class network to identify the precise condition (e.g., Coryza, CRD, Fowl Pox, Bumblefoot).
                  </p>
                </motion.div>
              </div>

              {/* Visual Connector for Desktop */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                <div className="w-14 h-14 glass-panel rounded-full border-2 border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                  <ArrowRight className="w-7 h-7" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

        {/* KEY FEATURES SECTION */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Eye,
                  title: 'Grad-CAM Visualization',
                  desc: 'Visual explanations of AI decisions',
                  body: 'Heatmaps expose the exact spatial regions triggering the diagnostic conclusion, ensuring clinical transparency and trust.',
                  glow: 'rgba(6, 182, 212, 0.4)'
                },
                {
                  icon: BrainCircuit,
                  title: 'Gemini LLM Integration',
                  desc: 'AI-powered clinical consultation',
                  body: 'Automated synthesis of specialized treatment protocols, preventive measures, and comprehensive action plans.',
                  glow: 'rgba(168, 85, 247, 0.4)'
                },
                {
                  icon: Activity,
                  title: 'Real-time Analysis',
                  desc: 'Instant diagnostic results',
                  body: 'Optimized inference pipelines deliver professional-grade diagnostic assessments within seconds of image upload.',
                  glow: 'rgba(16, 185, 129, 0.4)'
                }
              ].map((feature, idx) => (
                <motion.div key={idx} variants={itemVariants} className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group" style={{ '--hover-glow': feature.glow }}>
                  <div className="w-14 h-14 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/30 transition-colors shadow-inner">
                    <feature.icon className="w-7 h-7 text-white drop-shadow-[0_0_8px_currentColor]" style={{ color: idx === 0 ? '#06B6D4' : idx === 1 ? '#A855F7' : '#10B981' }} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">{feature.title}</h3>
                  <p className="font-semibold text-sm mb-4" style={{ color: idx === 0 ? '#22D3EE' : idx === 1 ? '#D946EF' : '#34D399' }}>{feature.desc}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{feature.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
