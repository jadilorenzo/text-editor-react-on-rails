import Char from './Char'
import Eof from './Eof'
import Eol from './Eol'

type Element = Eof | Eol | Char

export default class Document {
  position: { x: number, y: number } = { x: 0, y: 0 }
  document: Element[] = []

  // breaks document into arrays of same type in
  // the original order
  get groupedDocument(): Element[][] {
    const groupedDocument = []
    let groupCounter = 0
    this.document.forEach((element, index) => {
      if (index === 0) {
        groupedDocument.push([element])
      } else {
        if (this.document[index - 1].type !== element.type) {
          groupCounter++
          groupedDocument.push([])
        }
        groupedDocument[groupCounter].push(element)
      }
    })
    return groupedDocument
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
