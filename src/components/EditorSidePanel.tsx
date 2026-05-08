import React from 'react';
import { X, CheckCircle2, ChevronRight, AlertCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface EditorSidePanelProps {
  onClose: () => void;
}

export default function EditorSidePanel({ onClose }: EditorSidePanelProps) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="w-[300px] bg-white border-l border-gray-200 h-full flex flex-col shadow-xl z-20"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h2 className="font-bold text-gray-800">Editor</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">
        {/* Editor Score */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-tight">Editor Score</span>
            <span className="text-2xl font-black text-emerald-600">81%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '81%' }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
            />
          </div>
          <p className="text-[11px] text-gray-400 italic">Excellent! You're above average for professional writing.</p>
        </section>

        {/* Corrections */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            Corrections
            <div className="h-[1px] flex-1 bg-gray-100" />
          </h3>
          
          <div className="space-y-2">
            <CorrectionItem icon={<AlertCircle className="text-red-500" />} label="Spelling" count={1} />
            <CorrectionItem icon={<Info className="text-blue-500" />} label="Grammar" count={2} />
          </div>
        </section>

        {/* Refinements */}
        <section className="space-y-4">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            Refinements
            <div className="h-[1px] flex-1 bg-gray-100" />
          </h3>
          <div className="space-y-2 opacity-60">
            <CorrectionItem icon={<CheckCircle2 className="text-emerald-500" />} label="Clarity" count={0} />
            <CorrectionItem icon={<CheckCircle2 className="text-emerald-500" />} label="Conciseness" count={0} />
          </div>
        </section>

        <div className="pt-10 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500">Your document is looking great!</p>
        </div>
      </div>
    </motion.div>
  );
}

function CorrectionItem({ icon, label, count }: { icon: React.ReactNode, label: string, count: number }) {
  return (
    <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn(
            "text-xs font-bold px-2 py-0.5 rounded-full",
            count > 0 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
        )}>
          {count}
        </span>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400" />
      </div>
    </button>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
