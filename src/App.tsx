/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import Ribbon from './components/Ribbon';
import DocumentEditor, { EditorHandle } from './components/Editor';
import StatusBar from './components/StatusBar';

export default function App() {
  const editorRef = useRef<EditorHandle>(null);

  const handleFormat = (name: string, value: any) => {
    editorRef.current?.format(name, value);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans text-gray-900 bg-gray-50">
      {/* Ribbon Menu & Header */}
      <Ribbon 
        onFormat={handleFormat} 
        onRemoveFormat={() => editorRef.current?.removeFormat()}
        onAdjustFontSize={(delta) => editorRef.current?.adjustFontSize(delta)}
        onCut={() => editorRef.current?.cut()}
        onCopy={() => editorRef.current?.copy()}
        onPaste={() => editorRef.current?.paste()}
      />
      
      {/* Main Editing Surface */}
      <DocumentEditor ref={editorRef} />
      
      {/* Footer Status Bar */}
      <StatusBar />
    </div>
  );
}
