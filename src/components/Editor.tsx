import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { motion } from 'motion/react';

export interface EditorHandle {
  format: (name: string, value: any) => void;
  removeFormat: () => void;
  adjustFontSize: (delta: number) => void;
  cut: () => void;
  copy: () => void;
  paste: () => void;
}

const Component = ReactQuill as any;

const DocumentEditor = forwardRef<EditorHandle>((props, ref) => {
  const [value, setValue] = useState('');
  const quillRef = useRef<ReactQuill>(null);

  useImperativeHandle(ref, () => ({
    format: (name, value) => {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        editor.format(name, value);
      }
    },
    removeFormat: () => {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        const range = editor.getSelection();
        if (range) {
          editor.removeFormat(range.index, range.length);
        }
      }
    },
    adjustFontSize: (delta: number) => {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        const range = editor.getSelection();
        if (range) {
          const currentFormat = editor.getFormat(range);
          const currentSize = currentFormat.size || '16px';
          const numericSize = parseInt(currentSize.toString());
          const newSize = Math.max(1, numericSize + delta);
          editor.format('size', `${newSize}px`);
        }
      }
    },
    cut: () => {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        editor.focus();
        document.execCommand('cut');
      }
    },
    copy: () => {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        editor.focus();
        document.execCommand('copy');
      }
    },
    paste: () => {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        editor.focus();
        document.execCommand('paste');
      }
    }
  }));

  const modules = {
    toolbar: false,
  };

  return (
    <div className="flex-1 bg-gray-200 overflow-y-auto p-8 flex flex-col items-center custom-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-[816px] min-h-[1056px] shadow-xl p-[96px] mb-8 relative border border-gray-300"
      >
        <Component 
          ref={quillRef}
          theme="snow" 
          value={value} 
          onChange={setValue}
          modules={modules}
          placeholder="Start typing your document..."
          className="h-full font-serif"
        />
      </motion.div>
      <div className="w-[816px] h-4 bg-black/5 blur-md" />
    </div>
  );
});

DocumentEditor.displayName = 'DocumentEditor';
export default DocumentEditor;
