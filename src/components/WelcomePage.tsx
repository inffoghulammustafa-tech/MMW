import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ArrowRight, Sparkles, Clock, Star, Lock, Unlock, KeyRound, ShieldCheck, X, AlertCircle } from 'lucide-react';

interface WelcomePageProps {
  onStart: (content?: string) => void;
}

const CV_TEMPLATE = `
  <div style="font-family: 'Inter', sans-serif; background-color: #ffffff; padding: 40px; color: #000000; min-height: 1000px;">
    <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #000000; padding-bottom: 20px;">
      <h1 style="font-size: 32px; font-weight: 800; margin: 0; letter-spacing: 2px; text-transform: uppercase;">JOHN DOE</h1>
      <p style="font-size: 14px; font-weight: 600; margin: 10px 0 0 0; letter-spacing: 1px; text-transform: uppercase;">Software Engineer</p>
    </div>

    <div style="display: flex; gap: 40px; margin-bottom: 30px;">
      <div style="flex: 1;">
        <h3 style="font-size: 14px; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase;">Contact</h3>
        <p style="font-size: 13px; margin: 8px 0;">Email: john.doe@example.com</p>
        <p style="font-size: 13px; margin: 8px 0;">Phone: +1 234 567 890</p>
        <p style="font-size: 13px; margin: 8px 0;">Location: New York, USA</p>
        <p style="font-size: 13px; margin: 8px 0;">Website: johndoe.dev</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 14px; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase;">Education</h3>
        <p style="font-size: 14px; font-weight: 700; margin: 0;">Bachelor of Science in Computer Science</p>
        <p style="font-size: 13px; margin: 2px 0;">State University | 2012 - 2016</p>
      </div>
    </div>

    <div style="margin-bottom: 35px;">
      <h3 style="font-size: 14px; font-weight: 800; border-bottom: 1px solid #000000; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase;">Professional Summary</h3>
      <p style="font-size: 14px; line-height: 1.6; text-align: justify; margin: 0;">Goal-oriented Software Engineer with 5+ years of experience in high-growth environments. Specialized in building high-performance web systems and intuitive user interfaces. Passionate about leveraging cutting-edge technologies to solve complex business challenges and delivering high-quality, scalable code.</p>
    </div>

    <div style="margin-bottom: 35px;">
      <h3 style="font-size: 14px; font-weight: 800; border-bottom: 1px solid #000000; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase;">Work Experience</h3>
      
      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
          <h4 style="font-size: 15px; font-weight: 700; margin: 0;">Senior Software Engineer</h4>
          <span style="font-size: 12px; font-weight: 600;">2022 - Present</span>
        </div>
        <p style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Tech Solutions Inc.</p>
        <ul style="font-size: 13px; line-height: 1.6; padding-left: 20px; margin: 0;">
          <li>Led design and implementation of microservices architecture reducing server costs by 30%.</li>
          <li>Spearheaded front-end migration to React 18, improving initial load times by 45%.</li>
          <li>Mentored a team of 4 developers, increasing overall team productivity by 20%.</li>
        </ul>
      </div>

      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
          <h4 style="font-size: 15px; font-weight: 700; margin: 0;">Full Stack Developer</h4>
          <span style="font-size: 12px; font-weight: 600;">2018 - 2021</span>
        </div>
        <p style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Cloud Services Ltd</p>
        <ul style="font-size: 13px; line-height: 1.6; padding-left: 20px; margin: 0;">
          <li>Developed core payment processing engine handling $5M+ in monthly transactions.</li>
          <li>Optimized SQL queries reducing dashboard data retrieval time by 80%.</li>
          <li>Implemented responsive designs using modern CSS frameworks.</li>
        </ul>
      </div>
    </div>

    <div>
      <h3 style="font-size: 14px; font-weight: 800; border-bottom: 1px solid #000000; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase;">Technical Skills</h3>
      <p style="font-size: 13px; line-height: 1.6; margin: 0;">
        <strong>Languages:</strong> JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, SQL<br>
        <strong>Frameworks:</strong> React, Next.js, Node.js, Express, Tailwind CSS<br>
        <strong>Tools:</strong> Git, Docker, AWS, PostgreSQL, MongoDB, Jest
      </p>
    </div>
  </div>
`;

export default function WelcomePage({ onStart }: WelcomePageProps) {
  const [activeCategory, setActiveCategory] = useState<'Personal' | 'Business'>('Business');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'enter' | 'create'>('enter');
  
  const savedPin = localStorage.getItem('mmw_personal_pin');

  useEffect(() => {
    if (activeCategory === 'Personal' && !isUnlocked) {
      setShowLockScreen(true);
      if (!savedPin) {
        setMode('create');
      } else {
        setMode('enter');
      }
    }
  }, [activeCategory, isUnlocked, savedPin]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'create') {
      if (pin.length < 4) {
        setError('PIN must be at least 4 digits');
        return;
      }
      localStorage.setItem('mmw_personal_pin', pin);
      setIsUnlocked(true);
      setShowLockScreen(false);
      setPin('');
    } else {
      if (pin === savedPin) {
        setIsUnlocked(true);
        setShowLockScreen(false);
        setPin('');
      } else {
        setError('Incorrect PIN');
        setPin('');
      }
    }
  };

  const handleCloseLock = () => {
    setShowLockScreen(false);
    setActiveCategory('Business');
    setPin('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f8fafc] flex items-center justify-center overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-400/20 blur-[140px] rounded-full" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-400/20 blur-[140px] rounded-full" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl flex overflow-hidden border border-white/50 backdrop-blur-sm relative"
      >
        {/* Left Side: Brand & Actions */}
        <div className="w-[350px] bg-[#2b579a] p-10 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-12"
            >
              <div className="bg-white p-2 rounded-xl shadow-lg shadow-blue-900/20">
                <FileText className="w-8 h-8 text-[#2b579a]" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Word</h1>
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-xl font-medium opacity-90">New</h2>
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStart('')}
                className="w-full flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 transition-colors group cursor-pointer"
              >
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">Blank document</p>
                  <p className="text-xs opacity-60">Start from scratch</p>
                </div>
              </motion.button>
            </div>
          </div>

          <div className="text-[10px] opacity-40 uppercase tracking-widest font-bold">
            Modern Microsoft Word © 2026
          </div>
        </div>

        {/* Right Side: Templates & Recent */}
        <div className="flex-1 p-10 bg-white/80">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Welcome to MMW
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveCategory('Personal')}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
                  activeCategory === 'Personal' 
                    ? "bg-[#2b579a] text-white" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
              >
                {activeCategory === 'Personal' && (isUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />)}
                Personal
              </button>
              <button 
                onClick={() => {
                  setActiveCategory('Business');
                  setIsUnlocked(false);
                }}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer",
                  activeCategory === 'Business' 
                    ? "bg-[#2b579a] text-white" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
              >
                Business
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showLockScreen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-center p-10"
              >
                <div className="w-full max-w-sm text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative"
                  >
                    <button 
                      onClick={handleCloseLock}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="mb-6 inline-flex p-4 bg-blue-50 rounded-full text-blue-600">
                      {mode === 'create' ? <ShieldCheck className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                    </div>

                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {mode === 'create' ? 'Set Personal Lock' : 'Personal Vault Locked'}
                    </h4>
                    <p className="text-sm text-gray-500 mb-8">
                      {mode === 'create' 
                        ? 'Choose a PIN to protect your personal documents.' 
                        : 'Please enter your PIN to access your personal data.'}
                    </p>

                    <form onSubmit={handlePinSubmit} className="space-y-4">
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="password"
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          placeholder="Enter PIN"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center tracking-[1em] font-bold text-lg"
                          autoFocus
                        />
                      </div>

                      {error && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-500 font-medium flex items-center justify-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {error}
                        </motion.p>
                      )}

                      <button 
                        type="submit"
                        className="w-full py-3 bg-[#2b579a] text-white rounded-xl font-bold hover:bg-[#1e3a8a] transition-all shadow-lg shadow-blue-200 active:scale-95"
                      >
                        {mode === 'create' ? 'Set & Unlock' : 'Unlock Now'}
                      </button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-3 gap-6 mb-12">
            {(activeCategory === 'Personal' && isUnlocked ? [
              { id: 'p1', title: "Personal Diary", icon: <Star className="w-10 h-10 text-yellow-400" />, content: "<h1>Personal Diary</h1><p>Start writing your thoughts here...</p>" },
              { id: 'p2', title: "Passwords List", icon: <Lock className="w-10 h-10 text-red-400" />, content: "<h1>Vault</h1><p>Private information here.</p>" },
              { id: 'p3', title: "Bucket List", icon: <Sparkles className="w-10 h-10 text-emerald-400" />, content: "<h1>Bucket List 2026</h1>" },
            ] : [
              { id: 1, title: "Blank document", icon: <FileText className="w-10 h-10 text-gray-300" />, active: true, content: "" },
              { id: 2, title: "Modern CV", icon: <Star className="w-10 h-10 text-blue-400" />, content: CV_TEMPLATE },
              { id: 3, title: "Annual Report", icon: <Sparkles className="w-10 h-10 text-purple-400" />, content: "<h1>Annual Report 2026</h1>" },
            ]).map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                onClick={() => onStart(template.content)}
                className={cn(
                  "aspect-[3/4] border rounded-xl p-4 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors relative group",
                  template.active ? "border-blue-200 bg-blue-50/30" : "border-gray-100 hover:border-gray-200"
                )}
              >
                <div className="bg-white shadow-sm p-4 rounded-lg group-hover:scale-110 transition-transform">
                  {template.icon}
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600 transition-colors">{template.title}</span>
                {template.active && (
                   <div className="absolute top-2 right-2 flex items-center justify-center bg-blue-500 text-white p-1 rounded-full animate-pulse shadow-lg shadow-blue-200">
                      <ArrowRight className="w-3 h-3" />
                   </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Documents
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                   <div className="bg-blue-50 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                     <FileText className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-700">Project Proposal.docx</p>
                     <p className="text-xs text-gray-400 italic">OneDrive » Documents » Work</p>
                   </div>
                </div>
                <span className="text-[10px] font-bold text-gray-300 uppercase">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                   <div className="bg-gray-50 p-2 rounded-lg text-gray-400 group-hover:bg-gray-200 transition-colors">
                     <FileText className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-700">Meeting Notes.docx</p>
                     <p className="text-xs text-gray-400 italic">This PC » Desktop</p>
                   </div>
                </div>
                <span className="text-[10px] font-bold text-gray-300 uppercase">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Utility for cleaner class names
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
