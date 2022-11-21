import { useEffect } from "react"

const useHandleDocument = ({setDocument}) => {
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      const {key} = e
      console.log(e)
      if (e.metaKey) {
        switch (key) {
          case 'b':
            setDocument((prevDocument) => prevDocument.styleSelection({ type: 'bold'}))
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