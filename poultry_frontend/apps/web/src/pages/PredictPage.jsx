
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Upload, X, Loader2, AlertTriangle, Sparkles, CheckCircle, RefreshCw, ScanSearch, Download, Printer, Settings, CheckCircle2, ShieldAlert, HeartPulse, Activity } from 'lucide-react';
import { useApiKey } from '@/hooks/useApiKey';
import { toast } from 'sonner';
import SettingsModal from '@/components/SettingsModal';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { generateDiagnosticPDF } from '@/utils/generateDiagnosticPDF';

function AnimatedCounter({ value, isPercentage = false }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(1) + (isPercentage ? '%' : ''));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

function FormattedReport({ text }) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc marker:text-cyan-400 ml-6 my-4 space-y-2 text-slate-300">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('#')) {
      flushList();
      const content = trimmed.replace(/^#+\s*/, '').replace(/\*/g, '');
      elements.push(
        <h4 key={`h-${i}`} className="text-lg md:text-xl font-heading font-bold text-cyan-300 mt-8 mb-4 border-b border-white/10 pb-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
          {content}
        </h4>
      );
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      let content = trimmed.substring(2);
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
      listItems.push(
        <li key={`li-${i}`} className="pl-2 leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </li>
      );
    } else if (trimmed.length > 0) {
      flushList();
      let content = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
      elements.push(
        <p key={`p-${i}`} className="mb-4 text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
      );
    }
  });

  flushList();

  return <div className="font-sans">{elements}</div>;
}

export default function PredictPage() {
  const { apiKey, isConfigured } = useApiKey();
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid format. Please select an image file.', { closeButton: true });
      return;
    }

    setUploadedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setAnalysisResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid format. Please drop an image file.', { closeButton: true });
      return;
    }

    setUploadedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setAnalysisResult(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      toast.error('Clinical image required for analysis.');
      return;
    }

    if (!isConfigured) {
      toast.error('Authentication required. Configure Gemini API key.');
      setSettingsOpen(true);
      return;
    }

    setIsAnalyzing(true);
    toast.info('Initializing diagnostic pipeline...', { id: 'analyze-toast' });

    try {
      const formData = new FormData();
      formData.append('image', uploadedImage);
      formData.append('gemini_api_key', apiKey);

      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://poultryvision-ai.onrender.com';
      
      const response = await fetch(`${baseUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.message || 'Diagnostic assessment failed');
      }

      setAnalysisResult(result);
      toast.success('Diagnostic report generated.', { id: 'analyze-toast' });
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: 'analyze-toast' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getBase64Src = (base64Str) => {
    if (!base64Str) return '';
    return base64Str.startsWith('data:image') ? base64Str : `data:image/jpeg;base64,${base64Str}`;
  };

  const handlePrint = async () => {
    if (!analysisResult) return;
    
    setIsGeneratingPDF(true);
    const toastId = toast.loading('Generating PDF report...');
    
    try {
      await generateDiagnosticPDF({
        imagePreview,
        analysisResult
      });
      toast.success('PDF report downloaded successfully', { id: toastId });
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('Failed to generate PDF report', { id: toastId });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const rawConfidence = analysisResult?.confidence || 0;
  const confidencePercent = rawConfidence <= 1 ? rawConfidence * 100 : rawConfidence;
  const cappedConfidence = Math.min(100, Math.max(0, confidencePercent));
  
  // Status color logic based on diagnosis
  const isHealthy = analysisResult?.primary_diagnosis?.toLowerCase() === 'healthy';
  const statusColorClass = isHealthy ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'text-coral-400 drop-shadow-[0_0_10px_rgba(255,107,107,0.8)]';
  const bgStatusClass = isHealthy ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-coral-500 shadow-[0_0_10px_rgba(255,107,107,0.8)]';

  return (
    <>
      <Helmet>
        <title>Diagnostic Analysis - Veterinary AI</title>
      </Helmet>

      <div className="min-h-screen mesh-bg-predict py-10 print:bg-white print:py-0 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* PAGE HEADER */}
          <div className="mb-8 print:mb-4 glass-panel p-6 rounded-3xl text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight mb-2 drop-shadow-md">Poultry Health Diagnostic Analysis</h1>
            <p className="text-cyan-200 text-lg">Comprehensive avian pathology assessment using dual-stage AI models.</p>
          </div>

          {/* MEDICAL ALERT BANNER */}
          {!analysisResult && (
            <div className="mb-8 p-4 bg-amber-950/50 border border-amber-500/50 rounded-2xl flex items-start gap-3 shadow-[0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-md print:hidden">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <div>
                <p className="font-bold text-amber-300 text-sm uppercase tracking-wide mb-1">Clinical Requirement Note</p>
                <p className="text-amber-100/90 text-sm leading-relaxed font-medium">
                  This diagnostic system is calibrated exclusively for avian pathology. Please ensure only clear images of poultry are uploaded. Non-poultry inputs will yield invalid results and compromise diagnostic accuracy.
                </p>
              </div>
            </div>
          )}

          {/* UPLOAD INTERFACE */}
          {!analysisResult && (
            <div className="glass-panel-cyan rounded-3xl overflow-hidden mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3">
                
                {/* Instructions Side */}
                <div className="p-8 bg-slate-900/60 border-r border-white/10">
                  <h3 className="font-heading font-semibold text-white mb-6 flex items-center gap-2 drop-shadow-md">
                    <Activity className="w-5 h-5 text-cyan-400" /> Assessment Protocol
                  </h3>
                  <div className="space-y-6">
                    {[
                      { step: 1, text: 'Upload a clear clinical image of the poultry specimen' },
                      { step: 2, text: 'Ensure LLM API credentials (Gemini) are configured' },
                      { step: 3, text: 'Initialize analysis to generate diagnostic report' }
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-cyan-900/50 border border-cyan-400/50 flex items-center justify-center text-sm font-bold text-cyan-300 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                          {s.step}
                        </div>
                        <p className="text-sm text-slate-300 pt-1 font-medium leading-relaxed">{s.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* API Key Status integrated in flow */}
                  <div className="mt-10 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-300">API Connection</span>
                      <button onClick={() => setSettingsOpen(true)} className="text-cyan-400 text-xs font-semibold hover:text-cyan-300 hover:underline flex items-center gap-1">
                        <Settings className="w-3 h-3" /> Configure
                      </button>
                    </div>
                    {isConfigured ? (
                      <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium bg-emerald-950/50 px-3 py-2 rounded-lg border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <CheckCircle className="w-4 h-4" /> Secure link established
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-coral-400 font-medium bg-coral-950/50 px-3 py-2 rounded-lg border border-coral-500/30 shadow-[0_0_10px_rgba(255,107,107,0.2)]">
                        <AlertTriangle className="w-4 h-4" /> Credentials required
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Area */}
                <div className="p-8 md:col-span-2 flex flex-col justify-center relative">
                  {!uploadedImage ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer group ${
                        isDragging 
                          ? 'border-cyan-400 bg-cyan-900/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                          : 'border-slate-500 hover:border-cyan-400/80 hover:bg-slate-800/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                      }`}
                    >
                      <div className="w-20 h-20 bg-slate-800/80 rounded-2xl shadow-inner border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                        <Upload className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_currentColor]" />
                      </div>
                      <p className="font-heading font-semibold text-white mb-2 text-lg drop-shadow-md">Drag and drop specimen image</p>
                      <p className="text-sm text-slate-400 mb-8">or click to browse local files (JPG, PNG)</p>
                      <button className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/20 hover:border-cyan-400/50 shadow-sm transition-all duration-300">
                        Select File
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/40 flex justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)] max-h-[400px]">
                        <img
                          src={imagePreview}
                          alt="Specimen"
                          className="w-auto h-auto max-h-[400px] object-contain"
                        />
                        <button
                          onClick={clearImage}
                          className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500/80 text-white rounded-lg backdrop-blur-md border border-white/20 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !isConfigured}
                        className="w-full py-5 btn-accent-avant rounded-2xl text-lg flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAnalyzing ? (
                          <><Loader2 className="w-6 h-6 animate-spin" /> Processing Diagnostic Pipeline...</>
                        ) : (
                          <><ScanSearch className="w-6 h-6 drop-shadow-md" /> Execute Clinical Analysis</>
                        )}
                      </button>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                </div>
              </div>
            </div>
          )}

          {/* RESULTS DISPLAY - 3 SECTION DASHBOARD */}
          <AnimatePresence>
            {analysisResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                
                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2 print:hidden glass-panel px-6 py-4 rounded-2xl">
                  <h2 className="font-heading font-bold text-xl text-white">Diagnostic Assessment Report</h2>
                  <div className="flex gap-3">
                    <button onClick={clearImage} className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-semibold text-white hover:bg-white/20 transition-colors shadow-sm">
                      <RefreshCw className="w-4 h-4" /> New Case
                    </button>
                    <button 
                      onClick={handlePrint} 
                      disabled={isGeneratingPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-semibold text-white hover:bg-white/20 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingPDF ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                    </button>
                  </div>
                </div>

                {/* SECTION 1: DIAGNOSTIC BREAKDOWN */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Primary card */}
                  <div className="lg:col-span-4 glass-panel rounded-3xl p-8 border-t border-l border-white/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-colors"></div>
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                      <ShieldAlert className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-xs font-bold text-cyan-200 uppercase tracking-widest">Primary Finding</h3>
                    </div>
                    
                    <h4 className={`text-4xl font-heading font-extrabold capitalize mb-2 relative z-10 ${statusColorClass}`}>
                      {analysisResult.primary_diagnosis || 'Unknown'}
                    </h4>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                      <p className="text-sm font-semibold text-slate-300 mb-3">Model Confidence</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-white/5">
                          <div className={`h-full ${bgStatusClass} rounded-full`} style={{ width: `${cappedConfidence}%` }}></div>
                        </div>
                        <span className="font-bold text-white text-lg w-14 text-right">{cappedConfidence.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="mt-8 relative z-10">
                      <p className="text-sm font-semibold text-slate-300 mb-4">Probability Distribution</p>
                      <div className="space-y-4">
                        {Object.entries(analysisResult.distribution || {})
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 3)
                          .map(([className, prob]) => {
                            const cProb = Math.min(100, Math.max(0, prob <= 1 ? prob * 100 : prob));
                            return (
                              <div key={className}>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                  <span className="capitalize text-slate-300 truncate pr-2">{className}</span>
                                  <span className="text-white font-bold">{cProb.toFixed(1)}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-800 rounded-full border border-white/5">
                                  <div className="h-full bg-cyan-400 rounded-full shadow-[0_0_8px_currentColor]" style={{ width: `${cProb}%` }}></div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  {/* Grad-CAM visuals */}
                  {(analysisResult.original_image_base64 || analysisResult.heatmap_image_base64) && (
                    <div className="lg:col-span-8 glass-panel rounded-3xl p-8 border-t border-l border-white/20">
                      <div className="flex items-center gap-2 mb-4">
                        <ScanSearch className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-xs font-bold text-cyan-200 uppercase tracking-widest">Visual Pathology</h3>
                      </div>
                      <p className="text-sm text-slate-300 mb-6">The heatmap highlights regions the AI model focused on for diagnosis. High-intensity areas indicate significant pathology indicators.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {analysisResult.original_image_base64 && (
                          <div className="bg-black/40 rounded-2xl p-4 border border-white/10 shadow-inner">
                            <span className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Original Image</span>
                            <div className="rounded-xl overflow-hidden border border-white/20">
                              <img src={getBase64Src(analysisResult.original_image_base64)} alt="Original" className="w-full h-auto object-cover" />
                            </div>
                          </div>
                        )}
                        {analysisResult.heatmap_image_base64 && (
                          <div className="bg-black/40 rounded-2xl p-4 border border-white/10 shadow-inner">
                            <span className="block text-xs font-semibold text-cyan-400 mb-3 uppercase tracking-wider drop-shadow-md">AI Attention Map (Grad-CAM)</span>
                            <div className="rounded-xl overflow-hidden border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                              <img src={getBase64Src(analysisResult.heatmap_image_base64)} alt="Heatmap" className="w-full h-auto object-cover" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* LLM Report Sections */}
                {analysisResult.report && (
                  <div className="grid grid-cols-1 gap-6">
                    <div className="glass-panel-purple rounded-3xl p-8 md:p-10">
                      <div className="flex items-center gap-4 mb-4 pb-6 border-b border-white/10">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                          <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white drop-shadow-md">Clinical Consultation Details</h3>
                      </div>
                      <FormattedReport text={analysisResult.report} />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
