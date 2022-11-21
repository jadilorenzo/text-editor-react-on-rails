import Character from '../../../app/javascript/packs/models/Character'
import Document, { Element } from '../../../app/javascript/packs/models/Document'
import EndOfFile from '../../../app/javascript/packs/models/EndOfFile'
import EndOfLine from '../../../app/javascript/packs/models/EndOfLine'

describe('Document', () => {
  const exampleElements = [
    new Character({text: 'A', type: 'bold'}),
    new Character({text: 'B', type: 'bold'}),
    new Character({text: 'a'}),
    new Character({text: 'b'})
  ]

  const exampleElementsWithParagraphBreak = [
    new Character({text: 'A', type: 'bold'}),
    new EndOfLine(),
    new Character({text: 'B'}),
  ]

  const setupDocument = (elements: Element[]): Document => {
    const document = new Document()
    document.document = elements
    document._handleEndOfFileCharacter()
    return document
  }

  it('#lengthsOfDocumentSplitByParagraphs', () => {
    const document = setupDocument(exampleElementsWithParagraphBreak)
    expect(document.lengthsOfDocumentSplitByParagraphs).toEqual([
      1, 2
    ])
  })

  it('#documentSplitByParagraphs', () => {
    const document = setupDocument(exampleElementsWithParagraphBreak)
    expect(document.documentSplitByParagraphs).toEqual([
      [new Character({text: 'A', type: 'bold'})],
      [new Character({text: 'B'}), new EndOfFile()]
    ])
  })

  it('#lengthsOfDocumentSplitByGroups', () => {
    const document = setupDocument(exampleElements)
    expect(document.lengthsOfDocumentSplitByGroups).toEqual([
      2, 2, 1
    ])
  })

  it('#documentSplitByGroups', () => {
    const document = setupDocument(exampleElements)
    expect(document.documentSplitByGroups.length).toBe(3);
    expect(document.documentSplitByGroups).toEqual([
      [
        new Character({text: 'A', type: 'bold'}),
        new Character({text: 'B', type: 'bold'}),
      ],
      [
        new Character({text: 'a'}),
        new Character({text: 'b'}),
      ],
      [new EndOfFile()]
    ])
  })


  describe('#typeCharacter', () => {
    it('can type characters', () => {
      const document = new Document()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeCharacter({ key: 'C' })
      document.typeCharacter({ key: 'D' })
      expect(document.document).toEqual([
        new Character({ text: 'A' }),
        new Character({ text: 'B' }),
        new Character({ text: 'C' }),
        new Character({ text: 'D' }),
        new EndOfFile()
      ])
    })

    it('can type characters with moved cursor', () => {
      const document = new Document()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeCharacter({ key: 'D' })
      document.cursorLeft()
      document.typeCharacter({ key: 'C' })
      expect(document.document).toEqual([
        new Character({ text: 'A' }),
        new Character({ text: 'B' }),
        new Character({ text: 'C' }),
        new Character({ text: 'D' }),
        new EndOfFile()
      ])
    })

    it('can type characters with newline', () => {
      const document = new Document()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeNewLine()
      document.typeCharacter({ key: 'C' })
      document.typeCharacter({ key: 'D' })
      expect(document.document).toEqual([
        new Character({ text: 'A' }),
        new Character({ text: 'B' }),
        new EndOfLine(),
        new Character({ text: 'C' }),
        new Character({ text: 'D' }),
        new EndOfFile()
      ])
    })

    it('can type characters with newline and moved cursor', () => {
      const document = new Document()
      document.typeCharacter({ key: 'A' })
      document.typeNewLine()
      document.typeCharacter({ key: 'C' })
      document.typeCharacter({ key: 'D' })
      document.cursorLeft()
      document.cursorLeft()
      document.cursorLeft()
      document.typeCharacter({ key: 'B' })
      expect(document.document).toEqual([
        new Character({ text: 'A' }),
        new Character({ text: 'B' }),
        new EndOfLine(),
        new Character({ text: 'C' }),
        new Character({ text: 'D' }),
        new EndOfFile()
      ])
    })
  })

  it('#cursorLeft', () => {
    const document = new Document()
    document.typeCharacter({ key: 'A' })
    document.typeCharacter({ key: 'B' })
    document.typeNewLine()
    document.typeCharacter({ key: 'C' })
    document.typeCharacter({ key: 'D' })
    const positions = [
      document.position,
      document.cursorLeft().position,
      document.cursorLeft().position,
      document.cursorLeft().position,
      document.cursorLeft().position,
      document.cursorLeft().position,
    ]
    expect(positions).toEqual([
      5,
      4,
      3,
      2,
      1,
      0
    ])
  })

  describe('#backspace', () => {
    it('removes single character', () => {
      const document = new Document()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.backspace()
      expect(document.document).toHaveLength(2)
      expect(document.position).toEqual(1)
    })

    it('removes selection', () => {
      const document = new Document()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.setSelection({
        start: 1,
        end: 0
      })
      document.backspace()
      expect(document.document).toHaveLength(2)
      expect(document.position).toEqual(0)
    })

    it('removes selection including new line', () => {
      const document = new Document()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeNewLine()
      document.typeCharacter({ key: 'C' })
      document.typeCharacter({ key: 'D' })
      document.setSelection({
        start: 0,
        end: 3
      })
      document.backspace()
      expect(document.document).toHaveLength(3)
      expect(document.position).toEqual(0)
      expect(document.document).toEqual([
        new Character({ text: 'C'}),
        new Character({ text: 'D'}),
        new EndOfFile()
      ])
    })
  })

  it('#setSelection', () => {
    const document = new Document()
    document.typeCharacter({ key: 'A' })
    document.typeCharacter({ key: 'B' })
    document.setSelection({
      start: 1,
      end: 0
    })
    expect(document.selection).toEqual({
      start: 0,
      end: 1
    })
  })
  
  it('#styleSelection', () => {
    const document = new Document()
    document.typeCharacter({ key: 'A' })
    document.typeCharacter({ key: 'B' })
    document.setSelection({
      start: 0,
      end: 2
    })
    document.styleSelection({ type: 'bold' })
    expect(document.document[0].type).toEqual('bold')
    expect(document.document[1].type).toEqual('bold')
  })
})
