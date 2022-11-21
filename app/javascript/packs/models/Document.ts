import Character from './Character'
import EndOfFile from './EndOfFile'
import EndOfLine from './EndOfLine'
import { insert, remove } from './utils'

export type Element = EndOfFile | EndOfLine | Character

export interface Selection { start: number, end: number }

export default class Document {
  // position: Position = { x: 0, y: 0 }
  position: number = 0
  document: Element[] = []
  selection: undefined | Selection = undefined

  // breaks document into arrays of same type in
  // the original order
  get documentSplitByGroups(): Element[][] {
    const documentSplitByGroups: Element[][] = []
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
    const documentSplitByParagraphs: Element[][] = []
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
    this._removeEndOfFileCharacter()
    this._addEndOfFileCharacter()
    return this
  }

  _removeEndOfFileCharacter(): this {
    this.document = this.document.filter(Character => !(Character.type === 'EOF'))
    return this
  }

  _addEndOfFileCharacter(): this {
    this.document = [...this.document, this._createEndOfFile()]
    return this
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
    if (this.selection) this.backspace()

    this._handleEndOfFileCharacter()
    this.document = insert(
      this.document,
      this.position,
      endOfLine ? this._createEndOfLine() : this._createCharacter({ text: key })
    ) as Element[]
    this.cursorRight()
    this._handleEndOfFileCharacter()
    return this
  }

  cursorLeft(): this {
    if (this.position !== 0) this.position = this.position - 1
    return this
  }

  cursorRight(): this {
    if (this.position !== this.document.length - 1) this.position = this.position + 1
    return this
  }

  setSelection(selection: Selection): this {
    if (
      Math.abs(
        selection.start -
        selection.end
      ) > this.document.length
    ) throw new Error(`Invalid selection: ${JSON.stringify(selection)}`)

    let sortedSelection = selection
    if (selection.start > selection.end) sortedSelection = { start: selection.end, end: selection.start }

    this.selection = sortedSelection
    return this
  }

  resetSelection() {
    this.selection = undefined
    return this
  }

  _removeCharacter(): this {
    this._removeEndOfFileCharacter()

    const index = this.position
    const lastIndex = index === this.document.length
    this.document = remove(
      this.document,
      index - 1
    ) as Element[]
    this.cursorLeft()

    this._handleEndOfFileCharacter()
    return this
  }

  backspace(): this {
    if (this.selection) {
      this.position = this.selection.end
      while (
        this.position !==
        this.selection.start
      ) {
        this._removeCharacter()
      }
    } else {
      this._removeCharacter()
    }
    return this
  }
}
