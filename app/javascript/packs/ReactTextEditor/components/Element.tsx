import React from 'react'

const Element = ({ element }) => {
  const activeStyles = {
    bold: false,
    underlined: false,
    italics: false,
    strikethrough: false
  }
  element.styles.forEach((style) => {
    activeStyles[style] = true
  })
  const {bold, underlined, italics, strikethrough} = activeStyles

  console.log(element.styles, bold)
  return (
    <span style={{
      fontWeight: bold ? 'bold' : undefined,
      textDecoration: underlined ? 'underlined' : strikethrough ? 'line-through' : undefined,
      fontStyle: italics ? 'italic' : undefined,
    }}>
      {element.text}
    </span>
  )
}

export default Element