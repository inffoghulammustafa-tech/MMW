import { motion } from 'motion/react';
import { 
  Plus, Minus, Maximize2, Globe, FileText,
  CheckCircle2, ChevronDown
} from 'lucide-react';

export default function StatusBar() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="h-6 bg-[#2b579a] text-white text-[11px] flex items-center px-4 justify-between select-none"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer">
          <span>Page 1 of 1</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer border-r border-white/20 pr-3">
          <span>0 words</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer">
          <CheckCircle2 className="w-3 h-3" />
          <span>No accessibility issues found</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer">
          <Globe className="w-3 h-3" />
          <span>English (United States)</span>
          <ChevronDown className="w-2.5 h-2.5" />
        </div>
        <div className="flex items-center gap-3 ml-4">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span className="opacity-70">Focus</span>
          </div>
          <div className="flex items-center gap-3 border-l border-white/20 pl-3">
            <Minus className="w-3 h-3 cursor-pointer hover:bg-white/10 rounded" />
            <span className="w-10 text-center">100%</span>
            <Plus className="w-3 h-3 cursor-pointer hover:bg-white/10 rounded" />
            <input 
              type="range" 
              className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <Maximize2 className="w-3 h-3 cursor-pointer hover:bg-white/10 rounded ml-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
