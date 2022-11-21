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
            setDocument((prevDocument) => prevDocument.styleSelection({ type: 'bold' }))
            break;
          
          case 'i':
            setDocument((prevDocument) => prevDocument.styleSelection({ type: 'italics' }))
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
              break;

            case 'ArrowRight':
              setDocument((prevDocument) => prevDocument.cursorRight())
              break;

            case 'Enter':
              setDocument((prevDocument) => prevDocument.typeNewLine())
              break;

            case 'Backspace':
              setDocument((prevDocument) => prevDocument.backspace())
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