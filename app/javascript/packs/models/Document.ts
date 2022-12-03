import StyledDocument from "./DocumentStyled";
import { Element } from "./DocumentBase"
import Character from "./Character";
import { insert } from "./utils";

class Document extends StyledDocument {
  createMathElement() {
    // if (this.selection) {
    //   this._handleEndOfFileCharacter()
    //   this.elements = insert(
    //     this.elements,
    //     this.position,
    //     new Character({type: 'MATH', text: this._textOfSelection(this.selection)})
    //   ) as Element[]
    //   this.cursorRight()
    //   this._handleEndOfFileCharacter()
    // }
  }
}

export default Document