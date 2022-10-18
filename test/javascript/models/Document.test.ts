import Char from '../../../app/javascript/packs/models/Char'
import Document, { Element } from '../../../app/javascript/packs/models/Document'
import Eof from '../../../app/javascript/packs/models/Eof'
import Eol from '../../../app/javascript/packs/models/Eol'

describe('Document', () => {
  const exampleElements = [
    new Char({text: 'A', type: 'bold'}),
    new Char({text: 'B', type: 'bold'}),
    new Char({text: 'a'}),
    new Char({text: 'b'})
  ]

  const exampleElementsWithParagraphBreak = [
    new Char({text: 'A', type: 'bold'}),
    new Eol(),
    new Char({text: 'B'}),
  ]

  const setupDocument = (elements: Element[]): Document => {
    const document = new Document()
    document.document = elements
    document._checkForEof()
    return document
  }

  test('#lengthsOfDocumentSplitByParagraphs', () => {
    const document = setupDocument(exampleElementsWithParagraphBreak)
    expect(document.lengthsOfDocumentSplitByParagraphs).toEqual([
      1, 2
    ])
  })

  test('#documentSplitByParagraphs', () => {
    const document = setupDocument(exampleElementsWithParagraphBreak)
    expect(document.documentSplitByParagraphs).toEqual([
      [new Char({text: 'A', type: 'bold'})],
      [new Char({text: 'B'}), new Eof()]
    ])
  })

  test('#lengthsOfDocumentSplitByGroups', () => {
    const document = setupDocument(exampleElements)
    expect(document.lengthsOfDocumentSplitByGroups).toEqual([
      2, 2, 1
    ])
  })

  test('#documentSplitByGroups', () => {
    const document = setupDocument(exampleElements)
    expect(document.documentSplitByGroups.length).toBe(3);
    expect(document.documentSplitByGroups).toEqual([
      [
        new Char({text: 'A', type: 'bold'}),
        new Char({text: 'B', type: 'bold'}),
      ],
      [
        new Char({text: 'a'}),
        new Char({text: 'b'}),
      ],
      [new Eof()]
    ])
  })
})
