
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Brain, Eye, FileText, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced Deep Learning',
    description: 'State-of-the-art CNN architecture trained on thousands of labeled poultry images',
  },
  {
    icon: Eye,
    title: 'Visual Interpretability',
    description: 'Grad-CAM heatmaps show exactly where the model detects disease indicators',
  },
  {
    icon: FileText,
    title: 'Comprehensive Reports',
    description: 'AI-generated diagnostic reports with symptoms, treatment, and prevention strategies',
  },
  {
    icon: Smartphone,
    title: 'User-Friendly Interface',
    description: 'Simple upload and instant results accessible from any device',
  },
];

const doctorMetrics = [
  { disease: 'Bumblefoot', precision: 68, recall: 62 },
  { disease: 'CRD', precision: 71, recall: 69 },
  { disease: 'Fowl Pox', precision: 72, recall: 71 },
  { disease: 'Infectious Coryza', precision: 69, recall: 63 },
];

const bouncerMetrics = [
  { class: 'Healthy', precision: 79, recall: 84 },
  { class: 'Sick', precision: 81, recall: 80 },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About - Poultry AI</title>
        <meta name="description" content="Learn about our AI-powered poultry disease detection platform and model performance" />
      </Helmet>

      <div className="min-h-screen mesh-bg-about text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-panel-cyan rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
          >
            <div className="text-center mb-12 relative z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                About The Project
              </h1>
              <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
                A cutting-edge platform helping farmers and veterinarians diagnose poultry diseases 
                quickly and accurately using advanced artificial intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-cyan-500/20 shadow-inner">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-md">
                  <span className="w-2 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span> Our Mission
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  We aim to democratize veterinary diagnostics by making advanced AI technology 
                  accessible to poultry farmers worldwide. Early disease detection can save entire 
                  flocks and prevent significant economic losses.
                </p>
              </div>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-purple-500/20 shadow-inner">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-md">
                  <span className="w-2 h-8 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span> Why It Matters
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  Poultry diseases can spread rapidly through flocks, causing devastating losses. 
                  Traditional diagnosis requires expert veterinarians and laboratory testing. Our 
                  AI provides instant preliminary diagnosis, enabling faster intervention.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <h2 className="text-3xl font-bold mb-10 text-center tracking-tight relative z-10 drop-shadow-md">Key Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-slate-800/40 rounded-2xl border border-white/10 hover:bg-slate-700/60 hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300 shadow-lg group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-10 glass-panel p-8 rounded-3xl inline-block w-full">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
                Model Performance & Evaluation
              </h2>
              <p className="text-cyan-200">Rigorous metrics proving diagnostic reliability</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="glass-panel p-8 hover:border-cyan-400/50 transition-all duration-300 group rounded-3xl">
                <div className="inline-block px-4 py-1.5 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-sm font-bold rounded-lg mb-6 shadow-[0_0_10px_rgba(6,182,212,0.2)]">4-Disease Classifier</div>
                <h3 className="text-2xl font-bold text-white mb-2">The Doctor Model</h3>
                <p className="text-slate-400 mb-8 text-sm">Classifies between Bumblefoot, CRD, Fowl Pox, and Coryza</p>
                
                <div className="space-y-6 mb-8">
                  {[
                    { label: 'Overall Accuracy', val: '72%', w: '72%', c: 'bg-cyan-400' },
                    { label: 'Macro Precision', val: '70%', w: '70%', c: 'bg-teal-400' },
                    { label: 'Macro Recall', val: '66%', w: '66%', c: 'bg-purple-400' }
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2 font-medium text-slate-200">
                        <span>{m.label}</span>
                        <span className="text-white font-bold">{m.val}</span>
                      </div>
                      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }} whileInView={{ width: m.w }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i*0.1 }}
                          className={`h-full ${m.c} rounded-full shadow-[0_0_10px_currentColor]`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-white mb-3">Per-Disease Performance:</p>
                  {doctorMetrics.map((metric) => (
                    <div key={metric.disease} className="bg-slate-900/50 rounded-xl p-4 border border-white/10 hover:border-cyan-500/30 transition-colors">
                      <p className="text-sm font-bold text-cyan-300 mb-2">{metric.disease}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Precision</span>
                          <span className="font-bold text-white">{metric.precision}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Recall</span>
                          <span className="font-bold text-white">{metric.recall}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 hover:border-purple-400/50 transition-all duration-300 group rounded-3xl">
                <div className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-400/40 text-purple-300 text-sm font-bold rounded-lg mb-6 shadow-[0_0_10px_rgba(168,85,247,0.2)]">Binary Classifier</div>
                <h3 className="text-2xl font-bold text-white mb-2">The Bouncer Model</h3>
                <p className="text-slate-400 mb-8 text-sm">Distinguishes strictly between Healthy and Sick birds</p>
                
                <div className="space-y-6 mb-8">
                  {[
                    { label: 'Overall Accuracy', val: '82%', w: '82%', c: 'bg-purple-400' },
                    { label: 'Macro Precision', val: '80%', w: '80%', c: 'bg-pink-400' },
                    { label: 'Macro Recall', val: '82%', w: '82%', c: 'bg-cyan-400' }
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2 font-medium text-slate-200">
                        <span>{m.label}</span>
                        <span className="text-white font-bold">{m.val}</span>
                      </div>
                      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }} whileInView={{ width: m.w }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i*0.1 }}
                          className={`h-full ${m.c} rounded-full shadow-[0_0_10px_currentColor]`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-sm font-bold text-white mb-3">Per-Class Performance:</p>
                  {bouncerMetrics.map((metric) => (
                    <div key={metric.class} className="bg-slate-900/50 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-colors">
                      <p className="text-sm font-bold text-purple-300 mb-2">{metric.class}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Precision</span>
                          <span className="font-bold text-white">{metric.precision}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Recall</span>
                          <span className="font-bold text-white">{metric.recall}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/20">
                    <p className="font-bold text-cyan-300">Higher Recall (84%)</p>
                    <p className="text-cyan-100/70 text-xs mt-1">Excellent at identifying truly healthy poultry</p>
                  </div>
                  <div className="bg-pink-900/30 rounded-xl p-4 border border-pink-500/20">
                    <p className="font-bold text-pink-300">Balanced Precision</p>
                    <p className="text-pink-100/70 text-xs mt-1">Reliable sick vs healthy differentiation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-16 border-t border-white/10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center tracking-tight drop-shadow-lg">
                Evaluation Visualizations
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Card 1: The Doctor: Confusion Matrix */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="glass-panel p-8 flex flex-col hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 rounded-3xl"
                >
                  <h3 className="text-xl font-bold text-cyan-300 mb-6 text-center tracking-tight drop-shadow-md">
                    The Doctor: Confusion Matrix
                  </h3>
                  <div className="flex-1 w-full bg-slate-900/80 rounded-2xl p-4 mb-6 flex items-center justify-center border border-white/5">
                    <img
                      src="https://horizons-cdn.hostinger.com/33a171e6-4bd0-47c2-a7a9-fddd2fa980f6/760668a9b3e7cc7c0adfe28585648d71.png"
                      alt="The Doctor Confusion Matrix showing 4 disease classifications"
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-slate-300 text-center leading-relaxed">
                    Visualizes the true vs. predicted classifications for the multi-class disease diagnosis model, highlighting detection accuracy and misclassification patterns.
                  </p>
                </motion.div>

                {/* Card 2: The Bouncer: Confusion Matrix */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-panel-green p-8 flex flex-col hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 rounded-3xl"
                >
                  <h3 className="text-xl font-bold text-emerald-300 mb-6 text-center tracking-tight drop-shadow-md">
                    The Bouncer: Confusion Matrix
                  </h3>
                  <div className="flex-1 w-full bg-slate-900/80 rounded-2xl p-4 mb-6 flex items-center justify-center border border-white/5">
                    <img
                      src="https://horizons-cdn.hostinger.com/33a171e6-4bd0-47c2-a7a9-fddd2fa980f6/0b792c579c2b82c23846103787c237a8.png"
                      alt="The Bouncer Confusion Matrix showing binary classification"
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-slate-300 text-center leading-relaxed">
                    Demonstrates binary health-status classification performance, showing effectiveness in distinguishing healthy and diseased poultry subjects.
                  </p>
                </motion.div>
              </div>

              {/* Card 3: Prediction Confidence Distribution (Centered, 60-70% width on Desktop) */}
              <div className="flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
                  className="w-full lg:w-[65%] glass-panel p-8 flex flex-col hover:border-teal-400/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-300 rounded-3xl"
                >
                  <h3 className="text-xl font-bold text-teal-300 mb-6 text-center tracking-tight drop-shadow-md">
                    Prediction Confidence Distribution
                  </h3>
                  <div className="flex-1 w-full bg-slate-900/80 rounded-2xl p-4 mb-6 flex items-center justify-center border border-white/5">
                    <img
                      src="https://horizons-cdn.hostinger.com/33a171e6-4bd0-47c2-a7a9-fddd2fa980f6/7673de13972ea9b3a1c7ac846d43ee0f.png"
                      alt="Histogram and KDE Plot of Prediction Confidence distribution"
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-slate-300 text-center leading-relaxed">
                    Shows the distribution of prediction confidence scores, providing insight into model certainty and diagnostic reliability.
                  </p>
                </motion.div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
}
