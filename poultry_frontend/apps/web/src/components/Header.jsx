
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, Stethoscope } from 'lucide-react';
import SettingsModal from './SettingsModal';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/predict', label: 'Diagnostic Tool' },
    { path: '/poultry-info', label: 'Pathology Reference' },
    { path: '/about', label: 'About Model' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all duration-300">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-heading font-bold text-lg leading-tight tracking-tight group-hover:text-cyan-300 transition-colors">
                  Veterinary AI Platform
                </span>
                <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest hidden sm:block">
                  Poultry Diagnostic System
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-t-md shadow-[0_-2px_10px_rgba(6,182,212,0.8)]"></span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSettingsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium btn-secondary-avant"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Settings</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-white/10 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border-l-2 border-cyan-400 shadow-[inset_4px_0_10px_rgba(6,182,212,0.1)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
