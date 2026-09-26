import React from 'react';
import { Box, CheckCircle2, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Brand Panel - Desktop only */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden border-r border-slate-800">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="auth-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-grid)" />
          </svg>
        </div>

        {/* Top Header */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-[6px] bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Box className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white block">StockSense</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Inventory Management</span>
            </div>
          </div>
        </div>

        {/* Center Product Statement */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-medium text-blue-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise Inventory Infrastructure</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Precision control across your supply chain network.
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            StockSense provides real-time stock balances, double-entry inventory ledger traceability, warehouse routing, and complete operational workflows for high-growth operations.
          </p>

          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-start space-x-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Full audit history tracking every SKU adjustment, receipt, and delivery.</span>
            </div>
            <div className="flex items-start space-x-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Multi-warehouse location management with bin-level stock balances.</span>
            </div>
            <div className="flex items-start space-x-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Automated safety stock and reorder notifications to avoid stockouts.</span>
            </div>
          </div>
        </div>

        {/* Bottom Status / Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} StockSense Systems Inc.</span>
          <span className="font-mono text-[11px]">System Status: Operational</span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-10 bg-slate-50">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center space-x-2.5 mb-8">
            <div className="w-9 h-9 rounded-[6px] bg-blue-600 flex items-center justify-center text-white">
              <Box className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">StockSense</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Inventory</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
          </div>

          {/* Card Body */}
          <div className="bg-white border border-slate-200 rounded-[8px] p-6 sm:p-8 shadow-2xs">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
