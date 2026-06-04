
import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Mail } from 'lucide-react';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="relative bg-slate-950/80 backdrop-blur-xl text-slate-300 py-16 mt-auto border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-600 via-cyan-500 to-teal-500 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-white font-heading font-bold text-xl tracking-tight group-hover:text-cyan-300 transition-colors">
                Veterinary AI Platform
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md text-slate-400">
              Enterprise-grade diagnostic system powered by advanced computer vision 
              and clinical AI. Specialized in rapid, accurate assessment of poultry 
              health to support veterinary professionals and commercial operations.
            </p>
          </div>

          <div>
            <h3 className="text-white font-heading font-semibold mb-4 text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
              Clinical Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">System Overview</Link>
              </li>
              <li>
                <Link to="/predict" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">Diagnostic Analysis</Link>
              </li>
              <li>
                <Link to="/poultry-info" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">Pathology Reference</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">Model Specifications</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-semibold mb-4 text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
              Support
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group">
                <Mail className="w-4 h-4 text-purple-400 mt-0.5 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span>venkatasriramt@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group">
                <Mail className="w-4 h-4 text-purple-400 mt-0.5 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span>ayushmsingh2004@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Veterinary AI Diagnostics Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>;
}
