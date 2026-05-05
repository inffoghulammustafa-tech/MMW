import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, 
  Image as ImageIcon, Table, FileText, Type,
  AlignLeft, AlignCenter, AlignRight, Layout, AlignJustify,
  Hash, Search, HelpCircle, Save, Printer,
  Share2, ChevronDown, Undo2, Redo2,
  Strikethrough, Highlighter, Palette,
  Scissors, Copy, Clipboard,
  Superscript, Subscript, Eraser,
  ChevronUp, ChevronDown as ChevronDownIcon,
  List, ListOrdered, ListPlus,
  ArrowUpDown
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
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-1 rounded transition-all hover:bg-gray-100",
      small ? "min-w-[24px]" : "min-w-[48px]",
      active && "bg-blue-50 text-blue-700",
      className
    )}
  >
    <div className={cn(small ? "w-3.5 h-3.5" : "w-5 h-5")}>{icon}</div>
    {label && <span className="text-[10px] mt-1 leading-tight">{label}</span>}
  </button>
);

const ToolbarGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="flex flex-col items-center border-r border-gray-200 px-2 last:border-0 h-full">
    <div className="flex items-center gap-1 flex-1">
      {children}
    </div>
    <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-medium">{label}</span>
  </div>
);

type Tab = 'File' | 'Home' | 'Insert' | 'Layout' | 'References' | 'Review' | 'View' | 'Help';

interface RibbonProps {
  onFormat?: (name: string, value: any) => void;
  onRemoveFormat?: () => void;
  onAdjustFontSize?: (delta: number) => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
}

export default function Ribbon({ onFormat, onRemoveFormat, onAdjustFontSize, onCut, onCopy, onPaste }: RibbonProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [script, setScript] = useState<'sub' | 'super' | null>(null);

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
      <div className="h-8 bg-[#2b579a] flex items-center px-4 justify-between text-white text-xs font-medium">
        <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-2 bg-blue-700/50 px-2 py-0.5 rounded cursor-pointer">
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </div>
          <div className="flex gap-2">
            <button className="hover:bg-white/10 px-2">_</button>
            <button className="hover:bg-white/10 px-2">□</button>
            <button className="hover:bg-red-600 px-2">✕</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center bg-gray-50 border-b border-gray-200 px-2 pt-1">
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
              <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white" />
            )}
          </button>
        ))}
      </div>

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
                <ToolbarGroup label="Clipboard">
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
                <ToolbarGroup label="Font">
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
                <ToolbarGroup label="Paragraph">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-0.5">
                      <ToolbarButton icon={<List className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('list', 'bullet')} />
                      <ToolbarButton icon={<ListOrdered className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('list', 'ordered')} />
                      <ToolbarButton icon={<ListPlus className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('indent', '+1')} />
                      <div className="w-[1px] h-4 bg-gray-200 mx-1" />
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
                    <div className="flex items-center gap-0.5">
                      <ToolbarButton icon={<AlignLeft className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('align', '')} />
                      <ToolbarButton icon={<AlignCenter className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('align', 'center')} />
                      <ToolbarButton icon={<AlignRight className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('align', 'right')} />
                      <ToolbarButton icon={<AlignJustify className="w-4 h-4 text-gray-700" />} small onClick={() => onFormat?.('align', 'justify')} />
                    </div>
                  </div>
                </ToolbarGroup>
              </>
            )}
            {activeTab === 'Insert' && (
              <>
                <ToolbarGroup label="Pages">
                  <ToolbarButton icon={<FileText />} label="Blank Page" />
                  <ToolbarButton icon={<Layout />} label="Page Break" />
                </ToolbarGroup>
                <ToolbarGroup label="Tables">
                  <ToolbarButton icon={<Table />} label="Table" />
                </ToolbarGroup>
                <ToolbarGroup label="Illustrations">
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
    </div>
  );
}
