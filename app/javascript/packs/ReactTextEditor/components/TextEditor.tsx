import React, { startTransition, useState } from 'react'
import Document from '../../models/Document'
import useHandleDocument from '../hooks/useHandleDocument'
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
        {document.document.map((element, index) => {
          const insideSelection = document.selection ? (
            index >= document.selection.start && index <= document.selection.end - 1
          ) : (selectionStartIndex !== undefined) ? (
            (index >= selectionStartIndex && index <= hoverSelectionIndex) || (index <= selectionStartIndex && index >= hoverSelectionIndex)
          ) : false
          return (
            <span 
              key={JSON.stringify({element, index})}
              onMouseDown={() => setSelectionStartIndex(index)} 
              onMouseUp={() => {
                if (Math.abs(selectionStartIndex || 0 - index) > 1) {
                  setDocument((prevDocument) => prevDocument.setSelection({start: (selectionStartIndex || 0) + ((selectionStartIndex || 0) > index ? +1 : 0 ), end: index + ((selectionStartIndex || 0) > index ? 0 : +1)}))
                  setSelectionStartIndex(undefined)
                }
              }}
              onMouseEnter={() => setHoverSelectionIndex(index)}
              style={{background: insideSelection ? '#90CAF9' : undefined}}
            >
              {document.position === index ? <Cursor/> : null}
              {(element.type === 'EOL') ? (
                <br/>
              ) : <Element element={element} />}
            </span>
          )
        })}
      </span>
    </div>
  )
}
