import React, { useContext } from 'react'
import { TextEditorContext } from '../context/TextEditorContext'
import IconButton from '../ui/IconButton'

const DocumentToolbar = () => {
  const {
    activeStyles,
    toggleBoldStyle,
    toggleItalicStyle,
    toggleUnderlinedStyle,
    toggleStrikethroughStyle
  } = useContext(TextEditorContext)
  return (
    <div className='menu-bar surface horizontal-button-group combined-horizontal-button-group'>
      <IconButton 
        active={activeStyles.includes('bold')} 
        toggleActive={() => toggleBoldStyle()}
      >
        format_bold
      </IconButton>
      <IconButton 
        active={activeStyles.includes('underlined')} 
        toggleActive={() => toggleUnderlinedStyle()}
      >
        format_underlined
      </IconButton>
      <IconButton 
        active={activeStyles.includes('italics')} 
        toggleActive={() => toggleItalicStyle()}
      >
        format_italic
      </IconButton>
      <IconButton 
        active={activeStyles.includes('strikethrough')} 
        toggleActive={() => toggleStrikethroughStyle()}
      >
        format_strikethrough
      </IconButton>
    </div>
  )
}

export default DocumentToolbar