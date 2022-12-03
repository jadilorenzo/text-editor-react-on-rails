import React, { useEffect, useState } from 'react'
import Document from './components/Document';
import TextEditorProvider from './context/TextEditorContext';

export default function ReactTextEditor() {
  return (
    <div>
      <TextEditorProvider>
        <Document/>
      </TextEditorProvider>
    </div>
  )
}
