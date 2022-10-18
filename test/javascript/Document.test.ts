import Char from '../../app/javascript/packs/models/Char'
import Document from '../../app/javascript/packs/models/Document'
import Eof from '../../app/javascript/packs/models/Eof'

describe('Document', () => {
  test('#groupedDocument', () => {
    const document = new Document()
    document.document = [
      new Char({text: 'A', type: 'bold'}),
      new Char({text: 'B', type: 'bold'}),
      new Char({text: 'a'}),
      new Char({text: 'b'})
    ]
    document._checkForEof()
    expect(document.groupedDocument.length).toBe(3);
    expect(document.groupedDocument).toEqual([
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
