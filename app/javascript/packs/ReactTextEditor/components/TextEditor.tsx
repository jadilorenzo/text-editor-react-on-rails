import React, { startTransition, useState } from 'react'
import Document from '../../models/Document'
import useHandleDocument from '../hooks/useHandleDocument'
import TextButton from '../ui/TextButton';
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
  const [activeStyles, setActiveStyles] = useState<string[]>([])
  
  const toggleActiveStyles = (style: string) => {
    console.log(style)
    setActiveStyles((prevStyles) => {
      if (prevStyles.includes(style)) {
        return prevStyles.filter(prevStyle => prevStyle !== style)
      } else {
        return [...prevStyles, style]
      }
    })
  }

  useHandleDocument({ document, setDocument, activeStyles, toggleActiveStyles })

  return (
    <div>
      <div className='document-title surface'>Document Name</div>
      <div className='document-menu-bar surface horizontal-btn-group'>
        <TextButton>Bold</TextButton>
        <TextButton>Underlined</TextButton>
        <TextButton>Italics</TextButton>
        <TextButton>Strikethrough</TextButton>
      </div>
      <div className='editor surface'>
        <div className='text-editor surface'>
          {document.document.length === 0 ? <Cursor/> : null}
          <span onMouseLeave={() => {
            setHoverSelectionIndex(0)
            setSelectionStartIndex(undefined)
          }}>
            {document.document.map((element, index) => (
              <Character 
                key={JSON.stringify({element, index})}
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
      </div>
    </div>
  )
}
