import { useEffect } from "react"

const useHandleDocument = ({setDocument}) => {
  useEffect(() => {
    window.addEventListener('keydown', ({ key }) => {
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
    })
  }, [])
}

export default useHandleDocument