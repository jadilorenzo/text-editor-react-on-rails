import Char from "./Char"

export default class Eol extends Char {
  constructor() {
    super({ text: '' })
  }
  type = 'EOL'
}
