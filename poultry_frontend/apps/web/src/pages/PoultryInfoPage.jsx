
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Stethoscope, Shield, Pill, ChevronRight, AlertCircle, Activity, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const diseaseData = {
  'bumblefoot': {
    name: 'Bumblefoot',
    description: 'Bacterial infection causing swelling and lesions on the feet',
    severity: 'caution',
    icon: Activity,
    symptoms: [
      'Swelling on the bottom of the foot',
      'Lameness or difficulty walking',
      'Black scabs or lesions on footpads',
      'Heat and tenderness in affected area',
      'Reluctance to perch or stand',
    ],
    causes: [
      'Rough or sharp surfaces in coop',
      'Splinters or cuts on footpads',
      'Obesity increasing foot pressure',
      'Bacterial infection through wounds',
    ],
    treatment: [
      'Soak foot in warm Epsom salt solution',
      'Remove scab and drain abscess if needed',
      'Apply antibiotic ointment and bandage',
      'Administer oral antibiotics if severe',
    ],
    prevention: [
      'Provide smooth, rounded perches',
      'Keep coop floor clean and dry',
      'Regular foot inspections',
    ],
  },
  'fowl-pox': {
    name: 'Fowl Pox',
    description: 'Viral disease causing scabs and lesions on skin and mucous membranes',
    severity: 'critical',
    icon: AlertCircle,
    symptoms: [
      'Scabs and lesions on comb, wattles, face',
      'White nodules in mouth and throat',
      'Difficulty breathing if respiratory form',
      'Lethargy and loss of appetite',
    ],
    causes: [
      'Mosquito bites transmitting virus',
      'Direct contact with infected birds',
      'Wounds allowing viral entry',
    ],
    treatment: [
      'No specific antiviral treatment available',
      'Supportive care with clean water and food',
      'Apply iodine to lesions to prevent infection',
      'Isolate infected birds',
    ],
    prevention: [
      'Vaccinate flock against fowl pox',
      'Control mosquito populations',
      'Maintain biosecurity protocols',
    ],
  },
  'infectious-coryza': {
    name: 'Infectious Coryza',
    description: 'Bacterial respiratory infection with nasal discharge and facial swelling',
    severity: 'critical',
    icon: AlertCircle,
    symptoms: [
      'Nasal discharge (clear to thick)',
      'Facial swelling around eyes and wattles',
      'Foul odor from discharge',
      'Sneezing and coughing',
    ],
    causes: [
      'Avibacterium paragallinarum bacteria',
      'Direct contact with infected birds',
      'Stress weakening immune system',
      'Poor ventilation and overcrowding',
    ],
    treatment: [
      'Administer antibiotics (sulfadimethoxine, erythromycin)',
      'Isolate infected birds immediately',
      'Improve ventilation in coop',
    ],
    prevention: [
      'Maintain closed flock (no new birds)',
      'Ensure proper ventilation',
      'Practice strict biosecurity',
    ],
  },
  'crd': {
    name: 'CRD (Chronic Respiratory)',
    description: 'Mycoplasma infection causing chronic respiratory symptoms',
    severity: 'caution',
    icon: Activity,
    symptoms: [
      'Coughing and sneezing',
      'Nasal discharge',
      'Labored breathing and wheezing',
      'Swollen sinuses',
    ],
    causes: [
      'Mycoplasma gallisepticum bacteria',
      'Airborne transmission',
      'Vertical transmission from hen to chick',
      'Stress and poor nutrition',
    ],
    treatment: [
      'Antibiotics (tylosin, oxytetracycline)',
      'Improve air quality and ventilation',
      'Supportive care with vitamins',
    ],
    prevention: [
      'Purchase mycoplasma-free breeding stock',
      'Maintain excellent biosecurity',
      'Reduce flock density',
    ],
  },
  'healthy': {
    name: 'Healthy Poultry',
    description: 'Normal, disease-free poultry with no visible symptoms',
    severity: 'healthy',
    icon: HeartPulse,
    symptoms: [
      'Bright, alert eyes',
      'Active and energetic behavior',
      'Smooth, glossy feathers',
      'Clear nostrils and breathing',
    ],
    causes: [
      'Proper nutrition and balanced diet',
      'Clean living environment',
      'Adequate space and ventilation',
    ],
    treatment: [
      'No treatment needed',
      'Continue regular health checks',
      'Keep vaccination schedule current',
    ],
    prevention: [
      'Provide balanced, quality feed',
      'Ensure clean, fresh water daily',
      'Minimize stress factors',
    ],
  },
};

const getSeverityStyles = (severity) => {
  switch(severity) {
    case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_15px_rgba(248,113,113,0.3)]';
    case 'healthy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
    default: return 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.3)]';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export default function PoultryInfoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedKey, setSelectedKey] = useState('bumblefoot');

  useEffect(() => {
    const disease = searchParams.get('disease');
    if (disease && diseaseData[disease]) {
      setSelectedKey(disease);
    }
  }, [searchParams]);

  const handleSelect = (key) => {
    setSelectedKey(key);
    setSearchParams({ disease: key });
  };

  const current = diseaseData[selectedKey];
  const Icon = current.icon;

  return (
    <>
      <Helmet>
        <title>Pathology Reference - Veterinary AI</title>
        <meta name="description" content="Clinical reference guide for common poultry pathologies." />
      </Helmet>

      <div className="min-h-screen mesh-bg-info py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 glass-panel p-6 rounded-3xl text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight mb-2 drop-shadow-md">
              Clinical Pathology Reference
            </h1>
            <p className="text-lg text-pink-200">Standardized diagnostic criteria and management protocols.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="glass-panel-purple rounded-3xl p-5 sticky top-24">
                <h2 className="text-xs font-bold text-pink-300 uppercase tracking-widest mb-4 px-2 drop-shadow-sm">Pathology Index</h2>
                <nav className="space-y-2">
                  {Object.entries(diseaseData).map(([key, data]) => (
                    <button
                      key={key}
                      onClick={() => handleSelect(key)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-between group ${
                        selectedKey === key
                          ? `bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white font-bold border border-pink-400/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]`
                          : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <data.icon className={`w-4 h-4 ${selectedKey === key ? 'text-pink-400 drop-shadow-[0_0_8px_currentColor]' : 'text-slate-400 group-hover:text-pink-300 transition-colors'}`} />
                        {data.name}
                      </div>
                      <ChevronRight className={`w-4 h-4 ${selectedKey === key ? 'opacity-100 text-pink-400' : 'opacity-0 group-hover:opacity-50'}`} />
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-3xl overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-8 border-b border-white/10 bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border mb-5 backdrop-blur-md ${getSeverityStyles(current.severity)}`}>
                        <Icon className="w-4 h-4" />
                        Status: {current.severity}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-3 drop-shadow-md">{current.name}</h2>
                      <p className="text-slate-300 font-medium text-lg">{current.description}</p>
                    </div>
                  </div>

                  {/* Body Grid */}
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-pink-500/20 text-pink-400 rounded-lg border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.2)]">
                          <Activity className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white drop-shadow-md">Clinical Presentation</h3>
                      </div>
                      <ul className="space-y-3">
                        {current.symptoms.map((symptom, idx) => (
                          <motion.li key={idx} variants={itemVariants} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 shrink-0 shadow-[0_0_8px_currentColor]" />
                            <span className="text-slate-200 leading-relaxed">{symptom}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white drop-shadow-md">Etiology & Causes</h3>
                      </div>
                      <ul className="space-y-3">
                        {current.causes.map((cause, idx) => (
                          <motion.li key={idx} variants={itemVariants} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0 shadow-[0_0_8px_currentColor]" />
                            <span className="text-slate-200 leading-relaxed">{cause}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg border border-teal-500/30 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                          <Pill className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white drop-shadow-md">Treatment Protocol</h3>
                      </div>
                      <ul className="space-y-3">
                        {current.treatment.map((item, idx) => (
                          <motion.li key={idx} variants={itemVariants} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0 shadow-[0_0_8px_currentColor]" />
                            <span className="text-slate-200 leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                          <Shield className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white drop-shadow-md">Preventive Measures</h3>
                      </div>
                      <ul className="space-y-3">
                        {current.prevention.map((item, idx) => (
                          <motion.li key={idx} variants={itemVariants} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_currentColor]" />
                            <span className="text-slate-200 leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
