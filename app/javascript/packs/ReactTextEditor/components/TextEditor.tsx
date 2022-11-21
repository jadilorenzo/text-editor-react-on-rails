import React, { startTransition, useState } from 'react'
import Document from '../../models/Document'
import useHandleDocument from '../hooks/useHandleDocument'
import Cursor from './Cursor';

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
  const [selectionStartIndex, setSelectionStartIndex] = useState(0)

  useHandleDocument({ setDocument })
  
  return (
    <div className='text-editor surface'>
      {document.document.length === 0 ? <Cursor/> : null}
      {document.document.map((element, index) => {
        const insideSelection = document.selection ? index >= document.selection.start && index <= document.selection.end : false
        return (
          <span 
            key={JSON.stringify({element, index})}
            onMouseDown={() => setSelectionStartIndex(index)} 
            onMouseUp={() => {
              if (selectionStartIndex !== index) setDocument((prevDocument) => prevDocument.setSelection({start: selectionStartIndex, end: index}))
            }}
            style={{background: insideSelection ? '#90CAF9' : undefined}}
          >
            {document.position === index ? <Cursor/> : null}
            {(element.type === 'EOL') ? (
              <br/>
            ) : (element.type === 'none') ? (
              element.text
            ) : null}
          </span>
        )
      })}
    </div>
  )
}