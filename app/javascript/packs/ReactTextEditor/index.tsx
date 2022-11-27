import React, { useEffect, useState } from 'react'
import TextEditor from './components/TextEditor';

export default function ReactTextEditor() {
  return (
    <div>
      <div className='document-title surface'>Document Name</div>
      <div className='editor surface'>
        <TextEditor/>
      </div>
    </div>
  )
}
