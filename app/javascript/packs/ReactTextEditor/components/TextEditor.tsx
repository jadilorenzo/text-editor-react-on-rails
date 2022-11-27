import React, { startTransition, useState } from 'react'
import Document from '../../models/Document'
import useHandleDocument from '../hooks/useHandleDocument'
import Character from './Character';
import Cursor from './Cursor';
import Element from './Element';

export default function TextEditor() {
  // to force update upon class change
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);
  // will require you to say "window.document." vs. "document."
  const [document, setDocumentState] = useState(new Document())
  const setDocument = (props) => {
    setDocumentState(props)
    forceUpdate()
  }
  const [selectionStartIndex, setSelectionStartIndex] = useState<number | undefined>(undefined)
  const [hoverSelectionIndex, setHoverSelectionIndex] = useState(0)

  useHandleDocument({ setDocument })
  
  return (
    <div className='text-editor surface'>
      {document.document.length === 0 ? <Cursor/> : null}
      <span onMouseLeave={() => {
        setHoverSelectionIndex(0)
        setSelectionStartIndex(undefined)
      }}>
        {document.document.map((element, index) => (
          <Character 
            index={index} 
            element={element} 
            document={document} 
            setDocument={setDocument}
            selectionStartIndex={selectionStartIndex} 
            setSelectionStartIndex={setSelectionStartIndex}
            hoverSelectionIndex={hoverSelectionIndex}
            setHoverSelectionIndex={setHoverSelectionIndex}
          />
        ))}
      </span>
    </div>
  )
}
