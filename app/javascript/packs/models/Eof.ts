import Char from "./Char"

export default class Eof extends Char {
  constructor() {
    super({ text: '' })
  }
  type = 'EOF'
}
