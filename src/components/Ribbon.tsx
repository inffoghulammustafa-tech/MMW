import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, 
  Image as ImageIcon, Table, FileText, Type,
  AlignLeft, AlignCenter, AlignRight, Layout, AlignJustify,
  Hash, HelpCircle, Save, Printer,
  Share2, ChevronDown, Undo2, Redo2,
  Strikethrough, Highlighter, Palette,
  Scissors, Copy, Clipboard,
  Superscript, Subscript, Eraser,
  ChevronUp, ChevronDown as ChevronDownIcon,
  List, ListOrdered, ListPlus,
  ArrowUpDown, Indent, Outdent, PaintBucket, Maximize, ArrowLeft, ArrowDownRight, X, Settings2,
  Search, Mic, CheckCircle2, Puzzle, Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  small?: boolean;
}

const ToolbarButton = ({ icon, label, onClick, active, className, small }: ToolbarButtonProps) => (
  <motion.button 
    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-1 rounded transition-colors",
      small ? "min-w-[24px]" : "min-w-[48px]",
      active && "bg-blue-50 text-blue-700",
      className
    )}
  >
    <div className={cn(small ? "w-3.5 h-3.5" : "w-5 h-5")}>{icon}</div>
    {label && <span className="text-[10px] mt-1 leading-tight">{label}</span>}
  </motion.button>
);

const ToolbarGroup = ({ label, children, delay = 0 }: { label: string, children: React.ReactNode, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="flex flex-col items-center border-r border-gray-200 px-2 last:border-0 h-full"
  >
    <div className="flex items-center gap-1 flex-1">
      {children}
    </div>
    <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-medium">{label}</span>
  </motion.div>
);

type Tab = 'File' | 'Home' | 'Insert' | 'Layout' | 'References' | 'Review' | 'View' | 'Help';

interface RibbonProps {
  onFormat?: (name: string, value: any) => void;
  onRemoveFormat?: () => void;
  onAdjustFontSize?: (delta: number) => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onShowWelcome?: () => void;
  onToggleEditorPanel?: () => void;
}

export default function Ribbon({ 
  onFormat, 
  onRemoveFormat, 
  onAdjustFontSize, 
  onCut, 
  onCopy, 
  onPaste,
  onShowWelcome,
  onToggleEditorPanel
}: RibbonProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [script, setScript] = useState<'sub' | 'super' | null>(null);
  const [showParaSettings, setShowParaSettings] = useState(false);
  const [showStyleSettings, setShowStyleSettings] = useState(false);
  const [lineHeight, setLineHeight] = useState('1.15');
  const [paraIndent, setParaIndent] = useState(0);
  const [isDictating, setIsDictating] = useState(false);

  const handleDictate = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    // @ts-ignore
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new Recognition();
    
    recognition.onstart = () => setIsDictating(true);
    recognition.onend = () => setIsDictating(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onFormat?.('insert-text', transcript);
    };
    
    recognition.start();
  };

  const handleFind = () => {
    // Standard browser search is usually better for simple demos, 
    // but we can trigger a simple prompt
    const text = prompt("Enter text to find:");
    if (text) {
      // In a real app we'd use quill.find(), for now we'll alert success/fail
      alert(`Searching for: ${text}\n(Tip: Press Ctrl+F for advanced search)`);
    }
  };

  const handleFormat = (name: string, value: any) => {
    if (name === 'bold') setIsBold(!isBold);
    if (name === 'italic') setIsItalic(!isItalic);
    if (name === 'underline') setIsUnderline(!isUnderline);
    if (name === 'strike') setIsStrike(!isStrike);
    if (name === 'script') {
        const newValue = script === value ? null : value;
        setScript(newValue);
        onFormat?.(name, newValue || false);
        return;
    }
    onFormat?.(name, value);
  };

  const handleClear = () => {
      setIsBold(false);
      setIsItalic(false);
      setIsUnderline(false);
      setIsStrike(false);
      setScript(null);
      onRemoveFormat?.();
  };

  const tabs: Tab[] = ['File', 'Home', 'Insert', 'Layout', 'References', 'Review', 'View', 'Help'];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm z-10 select-none">
      {/* Title Bar Placeholder */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-8 bg-[#2b579a] flex items-center px-2 justify-between text-white text-xs font-medium"
      >
        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onShowWelcome}
            className="p-1 rounded-md flex items-center gap-1.5 px-2 transition-colors cursor-pointer"
            title="Back to Welcome Page"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </motion.button>
          <div className="w-[1px] h-4 bg-white/20 mx-1" />
          <div className="flex items-center gap-2">
            <div className="bg-white p-0.5 rounded">
               <FileText className="w-3 h-3 text-[#2b579a]" />
            </div>
            <span>Document1 - Modern Microsoft Word</span>
          </div>
          <div className="flex items-center gap-3">
             <Save className="w-3.5 h-3.5 opacity-80 hover:opacity-100 cursor-pointer" />
             <Undo2 className="w-3.5 h-3.5 opacity-80 hover:opacity-100 cursor-pointer" />
             <Redo2 className="w-3.5 h-3.5 opacity-80 hover:opacity-100 cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-700/50 px-2 py-0.5 rounded cursor-pointer transition-colors hover:bg-blue-600">
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </div>
          <div className="flex gap-2">
            <button className="hover:bg-white/10 px-2 transition-colors">_</button>
            <button className="hover:bg-white/10 px-2 transition-colors">□</button>
            <button className="hover:bg-red-600 px-2 transition-colors">✕</button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center bg-gray-50 border-b border-gray-200 px-2 pt-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-1.5 text-sm transition-colors relative",
              activeTab === tab 
                ? "text-blue-700 font-semibold bg-white border border-b-0 border-gray-200 rounded-t"
                : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white" 
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Toolbar Area */}
      <div className="h-24 bg-white flex items-stretch p-1 overflow-x-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="flex items-stretch"
          >
            {activeTab === 'Home' && (
              <>
                <ToolbarGroup label="Clipboard" delay={0.05}>
                  <div className="flex items-center gap-1">
                    <ToolbarButton icon={<Clipboard />} label="Paste" onClick={onPaste} />
                    <div className="flex flex-col">
                      <button onClick={onCut} className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded text-[11px] h-6 px-2">
                        <Scissors className="w-3 h-3" /> Cut
                      </button>
                      <button onClick={onCopy} className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded text-[11px] h-6 px-2">
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                  </div>
                </ToolbarGroup>
                <ToolbarGroup label="Font" delay={0.1}>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                      <select 
                        className="text-xs border border-gray-200 rounded px-1 w-24 h-6 outline-none"
                        onChange={(e) => onFormat?.('font', e.target.value)}
                      >
                        <option value="serif">Playfair</option>
                        <option value="sans-serif">Inter</option>
                        <option value="monospace">JetBrains</option>
                      </select>
                      <select 
                        className="text-xs border border-gray-200 rounded px-1 w-14 h-6 outline-none"
                        defaultValue="16px"
                        onChange={(e) => onFormat?.('size', e.target.value)}
                      >
                        {["8", "10", "12", "14", "16", "18", "24", "36", "48", "72"].map(s => (
                          <option key={s} value={`${s}px`}>{s}</option>
                        ))}
                      </select>
                      <div className="flex gap-0.5 ml-1">
                        <ToolbarButton 
                            icon={<ChevronUp />} 
                            small 
                            onClick={() => onAdjustFontSize?.(2)} 
                        />
                        <ToolbarButton 
                            icon={<ChevronDownIcon />} 
                            small 
                            onClick={() => onAdjustFontSize?.(-2)} 
                        />
                      </div>
                      <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                      <div className="flex flex-col items-center justify-center relative">
                        <ToolbarButton 
                            icon={<Highlighter className="text-yellow-500" />} 
                            small 
                            onClick={() => document.getElementById('highlight-picker')?.click()}
                        />
                        <input 
                            id="highlight-picker"
                            type="color" 
                            className="invisible absolute w-0 h-0" 
                            onChange={(e) => onFormat?.('background', e.target.value)}
                        />
                        <div className="w-3 h-0.5 bg-yellow-500 mt-[-2px] rounded-full" />
                      </div>
                      <div className="flex flex-col items-center justify-center relative">
                        <ToolbarButton 
                            icon={<Palette className="text-red-500" />} 
                            small 
                            onClick={() => document.getElementById('font-color-picker')?.click()}
                        />
                        <input 
                            id="font-color-picker"
                            type="color" 
                            className="invisible absolute w-0 h-0" 
                            onChange={(e) => onFormat?.('color', e.target.value)}
                        />
                        <div className="w-3 h-0.5 bg-red-500 mt-[-2px] rounded-full" />
                      </div>
                      <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                      <ToolbarButton 
                        icon={<Eraser />} 
                        small 
                        onClick={handleClear}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <ToolbarButton 
                        icon={<Bold />} 
                        className="w-8 h-8 min-w-0" 
                        active={isBold}
                        onClick={() => handleFormat('bold', !isBold)} 
                      />
                      <ToolbarButton 
                        icon={<Italic />} 
                        className="w-8 h-8 min-w-0" 
                        active={isItalic}
                        onClick={() => handleFormat('italic', !isItalic)} 
                      />
                      <ToolbarButton 
                        icon={<Underline />} 
                        className="w-8 h-8 min-w-0" 
                        active={isUnderline}
                        onClick={() => handleFormat('underline', !isUnderline)}
                      />
                      <ToolbarButton 
                        icon={<Strikethrough />} 
                        className="w-8 h-8 min-w-0" 
                        active={isStrike}
                        onClick={() => handleFormat('strike', !isStrike)}
                      />
                      <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                      <ToolbarButton 
                        icon={<Subscript />} 
                        className="w-8 h-8 min-w-0" 
                        active={script === 'sub'}
                        onClick={() => handleFormat('script', 'sub')}
                      />
                      <ToolbarButton 
                        icon={<Superscript />} 
                        className="w-8 h-8 min-w-0" 
                        active={script === 'super'}
                        onClick={() => handleFormat('script', 'super')}
                      />
                    </div>
                  </div>
                </ToolbarGroup>
                <ToolbarGroup label="Paragraph" delay={0.15}>
                  <div className="flex flex-col gap-1 relative h-full">
                    <div className="flex items-center gap-0.5">
                      <ToolbarButton icon={<List className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('list', 'bullet')} />
                      <ToolbarButton icon={<ListOrdered className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('list', 'ordered')} />
                      <div className="w-[1px] h-4 bg-gray-200 mx-0.5" />
                      <ToolbarButton icon={<Outdent className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('indent', '-1')} />
                      <ToolbarButton icon={<Indent className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('indent', '+1')} />
                      <div className="w-[1px] h-4 bg-gray-200 mx-0.5" />
                      <div className="relative group flex flex-col items-center">
                        <ToolbarButton 
                          icon={<PaintBucket className="w-4 h-4 text-gray-700" />} 
                          small 
                          onClick={() => document.getElementById('shading-picker')?.click()}
                        />
                        <input 
                            id="shading-picker"
                            type="color" 
                            className="invisible absolute w-0 h-0" 
                            onChange={(e) => onFormat?.('background', e.target.value)}
                        />
                        <div className="w-3 h-0.5 bg-gray-300 mt-[-2px] rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <ToolbarButton icon={<AlignLeft className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('align', '')} />
                      <ToolbarButton icon={<AlignCenter className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('align', 'center')} />
                      <ToolbarButton icon={<AlignRight className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('align', 'right')} />
                      <ToolbarButton icon={<AlignJustify className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('align', 'justify')} />
                      <div className="w-[1px] h-4 bg-gray-200 mx-0.5" />
                      <div className="relative group">
                        <ToolbarButton icon={<ArrowUpDown className="w-4 h-4 text-gray-700" />} small />
                        <div className="absolute top-full left-0 hidden group-hover:block bg-white border border-gray-200 shadow-lg p-1 z-50 min-w-[80px]">
                            {['1.0', '1.15', '1.5', '2.0'].map(val => (
                                <button 
                                    key={val}
                                    onClick={() => onFormat?.('line-height', val)}
                                    className="block w-full text-left px-2 py-1 hover:bg-blue-50 text-[11px]"
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                      </div>
                    </div>
                    {/* Dialog Launcher */}
                    <button 
                      onClick={() => setShowParaSettings(true)}
                      className="absolute bottom-[-4px] right-[-4px] p-0.5 hover:bg-gray-200 rounded text-gray-400 group/launcher"
                      title="Paragraph Settings"
                    >
                        <ArrowDownRight className="w-2.5 h-2.5 transition-transform group-hover/launcher:scale-110" />
                    </button>
                  </div>
                </ToolbarGroup>
                <ToolbarGroup label="Styles" delay={0.2}>
                  <div className="flex items-center gap-1 relative h-full pr-4">
                    <button 
                      onClick={() => {
                        onFormat?.('font', 'sans-serif');
                        onFormat?.('size', '11px');
                        onFormat?.('bold', false);
                      }}
                      className="flex flex-col items-start justify-center p-2 rounded border border-gray-100 bg-white hover:bg-gray-50 transition-all min-w-[100px] h-[64px] text-left group shadow-sm active:translate-y-0.5"
                    >
                      <span className="text-[13px] font-medium text-gray-800 group-hover:text-blue-700">Normal</span>
                      <span className="text-[9px] text-gray-400">Inter, 11pt</span>
                      <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-blue-500/20" />
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => {
                        onFormat?.('font', 'serif');
                        onFormat?.('size', '26pt');
                        handleFormat('bold', true);
                      }}
                      className="flex flex-col items-start justify-center p-2 rounded border border-gray-100 bg-white hover:bg-gray-50 transition-all min-w-[100px] h-[64px] text-left group shadow-sm active:translate-y-0.5"
                    >
                      <span className="text-[13px] font-bold text-gray-800 group-hover:text-blue-700">Title</span>
                      <span className="text-[9px] text-gray-400">Playfair, 26pt</span>
                      <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-blue-600" />
                      </div>
                    </button>

                    <button 
                      onClick={() => setShowStyleSettings(true)}
                      className="absolute bottom-[-4px] right-[-4px] p-0.5 hover:bg-gray-200 rounded text-gray-400 group/launcher"
                      title="Styles Manager"
                    >
                        <ArrowDownRight className="w-2.5 h-2.5 transition-transform group-hover/launcher:scale-110" />
                    </button>
                  </div>
                </ToolbarGroup>

                <ToolbarGroup label="Editing" delay={0.25}>
                  <div className="flex flex-col gap-1 justify-center h-full">
                    <button 
                      onClick={handleFind}
                      className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-[11px] font-medium text-gray-700 transition-colors"
                    >
                      <Search className="w-3.5 h-3.5 text-blue-600" />
                      Find
                    </button>
                    <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-[11px] font-medium text-gray-700 transition-colors">
                      <Languages className="w-3.5 h-3.5 text-blue-600" />
                      Replace
                    </button>
                  </div>
                </ToolbarGroup>

                <ToolbarGroup label="Voice" delay={0.3}>
                  <div className="flex items-center justify-center h-full px-2">
                    <button 
                      onClick={handleDictate}
                      className={cn(
                        "flex flex-col items-center gap-1 p-2 rounded-md transition-all active:scale-95 group",
                        isDictating ? "bg-red-50 text-red-600 ring-2 ring-red-200" : "hover:bg-gray-100 text-gray-700"
                      )}
                    >
                      <div className={cn(
                        "p-1.5 rounded-full",
                        isDictating ? "bg-red-500 text-white animate-pulse" : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                      )}>
                        <Mic className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Dictate</span>
                    </button>
                  </div>
                </ToolbarGroup>

                <ToolbarGroup label="Proofing" delay={0.35}>
                  <div className="flex items-center justify-center h-full px-2">
                    <button 
                      onClick={onToggleEditorPanel}
                      className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-all active:scale-95 group"
                    >
                      <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md group-hover:bg-emerald-100">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Editor</span>
                    </button>
                  </div>
                </ToolbarGroup>

                <ToolbarGroup label="Add-ins" delay={0.4}>
                  <div className="flex items-center justify-center h-full px-2">
                    <button className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-all active:scale-95 group">
                      <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md group-hover:bg-purple-100">
                        <Puzzle className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Add-ins</span>
                    </button>
                  </div>
                </ToolbarGroup>
              </>
            )}
            {activeTab === 'Insert' && (
              <>
                <ToolbarGroup label="Pages" delay={0.05}>
                  <ToolbarButton icon={<FileText />} label="Blank Page" />
                  <ToolbarButton icon={<Layout />} label="Page Break" />
                </ToolbarGroup>
                <ToolbarGroup label="Tables" delay={0.1}>
                  <ToolbarButton icon={<Table />} label="Table" />
                </ToolbarGroup>
                <ToolbarGroup label="Illustrations" delay={0.15}>
                  <ToolbarButton icon={<ImageIcon />} label="Pictures" />
                  <ToolbarButton icon={<Hash />} label="Shapes" />
                </ToolbarGroup>
              </>
            )}
            {/* Other tabs can be generic for demo */}
            {!['Home', 'Insert', 'File'].includes(activeTab) && (
              <div className="flex items-center px-8 text-gray-400 italic text-sm">
                Advanced controls for {activeTab} will appear here...
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Paragraph Settings Modal */}
      <AnimatePresence>
        {showParaSettings && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowParaSettings(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-md border border-gray-200 overflow-hidden relative z-50 text-black leading-normal"
            >
              <div className="bg-[#f3f4f6] px-4 py-2 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-blue-700" />
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Paragraph Settings</span>
                </div>
                <button 
                  onClick={() => setShowParaSettings(false)}
                  className="p-1 hover:bg-gray-200 rounded-full text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Indentation</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500">Left Indent Level</label>
                      <div className="flex items-center gap-2">
                         <input 
                          type="number" 
                          min="0"
                          value={paraIndent}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setParaIndent(val);
                            onFormat?.('indent', val);
                          }}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Spacing</h4>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Line Spacing</span>
                        <select 
                          value={lineHeight}
                          onChange={(e) => {
                            setLineHeight(e.target.value);
                            onFormat?.('line-height', e.target.value);
                          }}
                          className="border border-gray-300 rounded px-2 py-1 text-sm outline-none w-32"
                        >
                          <option value="1.0">Single</option>
                          <option value="1.15">1.15 Lines</option>
                          <option value="1.5">1.5 Lines</option>
                          <option value="2.0">Double</option>
                        </select>
                      </div>
                   </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 text-black">
                  <button 
                    onClick={() => setShowParaSettings(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded transition-colors"
                  >
                    CLOSE
                  </button>
                  <button 
                    onClick={() => setShowParaSettings(false)}
                    className="px-4 py-2 bg-[#2b579a] text-white text-xs font-bold rounded hover:bg-blue-800 transition-all shadow-md active:scale-95"
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Styles Manager Modal */}
      <AnimatePresence>
        {showStyleSettings && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStyleSettings(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden relative z-50 text-black"
            >
              <div className="bg-[#f3f4f6] px-4 py-2 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-blue-700" />
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Styles Manager</span>
                </div>
                <button 
                  onClick={() => setShowStyleSettings(false)}
                  className="p-1 hover:bg-gray-200 rounded-full text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Predefined Styles</div>
                {[
                  { name: 'Normal', desc: 'Standard paragraph text', font: 'sans-serif', size: '11pt' },
                  { name: 'Title', desc: 'Large title text', font: 'serif', size: '26pt', bold: true },
                  { name: 'Heading 1', desc: 'Main section header', font: 'sans-serif', size: '16pt', bold: true },
                  { name: 'Subtitle', desc: 'Descriptive text', font: 'sans-serif', size: '12pt', italic: true },
                  { name: 'Subtle Reference', desc: 'Light emphasized text', font: 'sans-serif', size: '11pt', italic: true, color: '#6b7280' },
                  { name: 'Intense Reference', desc: 'Bold emphasized text', font: 'sans-serif', size: '11pt', bold: true, italic: true, color: '#1e3a8a' },
                  { name: 'Book Title', desc: 'Stylized title format', font: 'serif', size: '14pt', italic: true, bold: true },
                ].map((style) => (
                  <button
                    key={style.name}
                    onClick={() => {
                        onFormat?.('font', style.font);
                        onFormat?.('size', style.size);
                        if (style.bold) onFormat?.('bold', true);
                        if (style.italic) onFormat?.('italic', true);
                        if (style.color) onFormat?.('color', style.color);
                        setShowStyleSettings(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div>
                        <div className="text-sm font-bold text-gray-800 group-hover:text-blue-700">{style.name}</div>
                        <div className="text-[10px] text-gray-500">{style.desc}</div>
                    </div>
                    <div className="text-[10px] text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        Apply
                    </div>
                  </button>
                ))}

                <div className="pt-4 mt-2 border-t border-gray-100 space-y-1">
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Actions</div>
                  <button 
                    onClick={() => onRemoveFormat?.()}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors flex items-center gap-2"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    Clear Formatting of Selection
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded transition-colors flex items-center gap-2">
                    <ListPlus className="w-3.5 h-3.5" />
                    Create New Style from Selection
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded transition-colors flex items-center gap-2">
                    <Settings2 className="w-3.5 h-3.5" />
                    Manage Default Styles
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => setShowStyleSettings(false)}
                    className="px-6 py-2 bg-[#2b579a] text-white text-xs font-bold rounded-md hover:bg-blue-800 transition-all shadow-md"
                  >
                    DONE
                  </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
