import Character from './Character'
import EndOfFile from './EndOfFile'
import EndOfLine from './EndOfLine'
import { insert } from './utils'

export type Element = EndOfFile | EndOfLine | Character

export interface Position {
  x: number;
  y: number;
}

export default class Document {
  position: Position = { x: 0, y: 0 }
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

  _createCharacter({ text, type = 'none' }: { text: string, type?: string }): Character {
    return new Character({ text, type })
  }

  _createEndOfFile(): EndOfFile {
    return new EndOfFile()
  }

  _createEndOfLine(): EndOfLine {
    return new EndOfLine()
  }

  _handleEndOfFileCharacter(): this {
    this.document = this.document.filter(Character => !(Character.type === 'EOF'))
    this.document = [...this.document, this._createEndOfFile()]
    return this
  }

  _changeLocationBy(delta: number): this {
    const { x, y } = this.position
    let newX = x,
        newY = y
    let deltaXLeft = Math.abs(delta)
    let lineRemainder = (delta > 0) ? (this.lengthsOfDocumentSplitByParagraphs[y] - x) : (x)

    while (deltaXLeft > 0) {
      if ((delta > 0) ? (deltaXLeft <= lineRemainder) : (deltaXLeft <= x)) {
        newX = newX + ((delta > 0) ? deltaXLeft : -deltaXLeft)
        deltaXLeft = 0
      } else {
        if (delta > 0) {
          newY += 1
          newX = 0
        } else {
          newY -= 1
          newX = this.lengthsOfDocumentSplitByParagraphs[newY]
        }
        deltaXLeft -= lineRemainder + 1
        if (!this.lengthsOfDocumentSplitByParagraphs[newY]) throw new Error('Location out of range.')
        lineRemainder = this.lengthsOfDocumentSplitByParagraphs[newY]
      }
    }

    this.position = { x: newX, y: newY }
    return this
  }

  positionToIndex({ position } : { position: Position }): number {
    const totalCharactersToY = this.lengthsOfDocumentSplitByParagraphs
      .slice(0, position.y)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    return totalCharactersToY + position.x
  }

  typeNewLine(): this {
    return this.typeCharacter({ key: '', endOfLine: true })
  }

  typeCharacter({ key, endOfLine = false }: {
      key: string,
      endOfLine?: boolean
  }): this {
    if (key.split('').length !== 1 && !endOfLine) {
      throw new Error(`Single key expected. Received "${key}"`)
    }

    this._handleEndOfFileCharacter()
    this.document = insert(
      this.document,
      this.positionToIndex({ position: this.position }),
      endOfLine ? this._createEndOfLine() : this._createCharacter({ text: key })
    ) as Element[]
    this.cursorRight()
    if (endOfLine) this.cursorRight() // to move after the last line
    this._handleEndOfFileCharacter()
    return this
  }

  cursorLeft(): this {
    this._changeLocationBy(-1)
    return this
  }

  cursorRight(): this {
    this._changeLocationBy(+1)
    return this
  }
}
