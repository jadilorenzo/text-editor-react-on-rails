import React from 'react'
import Cursor from './Cursor'
import Element from './Element'

const Character = ({
  index, 
  element, 
  document, 
  setDocument, 
  selectionStartIndex, 
  setSelectionStartIndex, 
  hoverSelectionIndex, 
  setHoverSelectionIndex
}) => {
  const insideSelection = document.selection ? (
    index >= document.selection.start && index <= document.selection.end - 1
  ) : (selectionStartIndex !== undefined) ? (
    (index >= selectionStartIndex && index <= hoverSelectionIndex) || (index <= selectionStartIndex && index >= hoverSelectionIndex)
  ) : false

  return (
    <span 
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
}

export default Character