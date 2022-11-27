import { useEffect } from "react"

const useHandleDocument = ({setDocument}) => {
  useEffect(() => {
    window.addEventListener('mousedown', () => {
      setDocument((prevDocument) => prevDocument.resetSelection())
    })
    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      const {key} = e
      if (e.metaKey) {
        switch (key) {
          case 'b':
            setDocument((prevDocument) => prevDocument.styleSelection({ style: 'bold' }))
            break;
          
          case 'i':
            setDocument((prevDocument) => prevDocument.styleSelection({ style: 'italics' }))
            break;

          case 'u':
            setDocument((prevDocument) => prevDocument.styleSelection({ style: 'underlined' }))
            break;

          case 'x':
            setDocument((prevDocument) => prevDocument.styleSelection({ style: 'strikethrough' }))
            break;
            
          case 'r':
            window.location.reload()
            break;
        
          default:
            break;
        }
      } else {
        if (key.split('').length === 1) {
          setDocument((prevDocument) => prevDocument.typeCharacter({ key }))
        } else {
          switch (key) {
            case 'ArrowLeft':
              setDocument((prevDocument) => prevDocument.cursorLeft())
              setDocument((prevDocument) => prevDocument.resetSelection())
              break;

            case 'ArrowRight':
              setDocument((prevDocument) => prevDocument.cursorRight())
              setDocument((prevDocument) => prevDocument.resetSelection())
              break;

            case 'Enter':
              setDocument((prevDocument) => prevDocument.typeNewLine())
              break;

            case 'Backspace':
              setDocument((prevDocument) => prevDocument.backspace())
              setDocument((prevDocument) => prevDocument.resetSelection())
              break;

            default:
              break;
          }
        }
        setDocument((prevDocument) => prevDocument.resetSelection())
      }
    })
  }, [])
}

export default useHandleDocument