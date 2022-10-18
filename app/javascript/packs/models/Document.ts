import Char from './Char'
import Eof from './Eof'
import Eol from './Eol'

export type Element = Eof | Eol | Char

export default class Document {
  position: { x: number, y: number } = { x: 0, y: 0 }
  document: Element[] = []

  // breaks document into arrays of same type in
  // the original order
  get documentSplitByGroups(): Element[][] {
    const documentSplitByGroups = []
    let counter = 0
    this.document.forEach((element, index) => {
      if (index === 0) {
        documentSplitByGroups.push([element])
      } else {
        if (this.document[index - 1].type !== element.type) {
          counter++
          documentSplitByGroups.push([])
        }
        documentSplitByGroups[counter].push(element)
      }
    })
    return documentSplitByGroups
  }

  get lengthsOfDocumentSplitByGroups() {
    return this.documentSplitByGroups.map(group => group.length)
  }

  get documentSplitByParagraphs(): Element[][] {
    const documentSplitByParagraphs = []
    let counter = 0
    this.document.forEach((element, index) => {
      if (index === 0) {
        documentSplitByParagraphs.push([element])
      } else {
        if (element.type === 'EOL') {
          counter++
          documentSplitByParagraphs.push([])
        } else {
          documentSplitByParagraphs[counter].push(element)
        }
      }
    })
    return documentSplitByParagraphs
  }

  get lengthsOfDocumentSplitByParagraphs() {
    return this.documentSplitByParagraphs.map(paragraph => paragraph.length)
  }

  _createChar({ text, type }: { text: string, type: string }): Char {
    return new Char({ text, type })
  }

  _createEof(): Eof {
    return new Eof()
  }

  _checkForEof(): this {
    this.document = this.document.filter(char => !(char.type === 'EOF'))
    this.document = [...this.document, this._createEof()]
    return this
  }

  _changeLocationBy(delta: number): this {
    return this
  }

  cursorLeft(): this {
    this._changeLocationBy(-1)
    return this
  }

  cursorRight(): this {
    this._changeLocationBy(1)
    return this
  }
}
