/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from 'react';
import Ribbon from './components/Ribbon';
import DocumentEditor, { EditorHandle } from './components/Editor';
import StatusBar from './components/StatusBar';
import WelcomePage from './components/WelcomePage';
import EditorSidePanel from './components/EditorSidePanel';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const editorRef = useRef<EditorHandle>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showEditorPanel, setShowEditorPanel] = useState(false);

  const handleFormat = (name: string, value: any) => {
    editorRef.current?.format(name, value);
  };

  const handleStart = (content?: string) => {
    setShowWelcome(false);
    if (content !== undefined) {
      setTimeout(() => {
        editorRef.current?.setContent(content);
      }, 300);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans text-gray-900 bg-gray-50">
      <AnimatePresence>
        {showWelcome && (
          <WelcomePage onStart={handleStart} />
        )}
      </AnimatePresence>

      {/* Ribbon Menu & Header */}
      <Ribbon 
        onFormat={handleFormat} 
        onRemoveFormat={() => editorRef.current?.removeFormat()}
        onAdjustFontSize={(delta) => editorRef.current?.adjustFontSize(delta)}
        onCut={() => editorRef.current?.cut()}
        onCopy={() => editorRef.current?.copy()}
        onPaste={() => editorRef.current?.paste()}
        onShowWelcome={() => setShowWelcome(true)}
        onToggleEditorPanel={() => setShowEditorPanel(!showEditorPanel)}
      />
      
      {/* Main Editing Surface with Side Panel */}
      <div className="flex-1 flex overflow-hidden relative">
        <DocumentEditor ref={editorRef} />
        <AnimatePresence>
          {showEditorPanel && (
            <EditorSidePanel onClose={() => setShowEditorPanel(false)} />
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Status Bar */}
      <StatusBar />
    </div>
  );
}
