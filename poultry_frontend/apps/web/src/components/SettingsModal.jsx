
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Key, XCircle, Trash2, ShieldCheck } from 'lucide-react';
import { useApiKey } from '@/hooks/useApiKey';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsModal({ isOpen, onClose }) {
  const { apiKey, isVisible, toggleVisibility, saveKey, clearKey } = useApiKey();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputValue(apiKey);
    }
  }, [isOpen, apiKey]);

  const handleSave = () => {
    if (!inputValue.trim()) {
      toast.error('API key cannot be empty');
      return;
    }

    const success = saveKey(inputValue);
    if (success) {
      toast.success('API credentials securely saved.');
      onClose();
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to revoke these API credentials?')) {
      clearKey();
      setInputValue('');
      toast.success('API credentials revoked.');
    }
  };

  const handleCancel = () => {
    setInputValue(apiKey);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={handleCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg mesh-bg-modal rounded-2xl border border-purple-400/30 overflow-hidden z-10 shadow-[0_0_40px_rgba(217,70,239,0.2)]"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/10 bg-slate-950/40 backdrop-blur-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-semibold text-white">System Configuration</h2>
                  <p className="text-purple-200/80 text-sm">Manage API credentials for clinical analysis</p>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="text-purple-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                aria-label="Close configuration"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 bg-slate-950/60 backdrop-blur-md">
              {/* Alert Banner */}
              {!apiKey && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-start gap-3 p-4 bg-amber-950/50 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)] rounded-xl"
                >
                  <XCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-200 leading-relaxed font-medium">
                    Diagnostic functions are currently suspended. Please provide a valid Gemini API key to restore service.
                  </p>
                </motion.div>
              )}

              {/* Input Section */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-purple-200">
                  <Key className="w-4 h-4 mr-2 text-purple-400" />
                  Gemini LLM API Key
                  <span className="ml-auto text-pink-400 text-xs font-bold uppercase tracking-wider shadow-pink-500/50">Required</span>
                </label>
                <div className="relative">
                  <input
                    type={isVisible ? 'text' : 'password'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your API credential string"
                    className="w-full pl-4 pr-12 py-4 bg-black/40 border border-purple-500/40 rounded-xl text-white placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] transition-all font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Helper Text */}
              <div className="glass-panel-purple rounded-xl p-4">
                <p className="text-sm text-purple-100/80 leading-relaxed">
                  Keys are stored exclusively in your local browser environment and transmitted directly to the secure processing endpoint during analysis. 
                  Generate credentials via <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 hover:underline font-medium hover:drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]">Google AI Studio</a>.
                </p>
              </div>
            </div>

            {/* Action Footer */}
            <div className="px-6 py-5 border-t border-white/10 bg-slate-950/80 flex items-center justify-between backdrop-blur-md">
              {apiKey ? (
                <button
                  onClick={handleClear}
                  className="flex items-center text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Revoke Key
                </button>
              ) : (
                <div></div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 border border-white/20 text-slate-300 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 btn-secondary-avant rounded-lg"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
