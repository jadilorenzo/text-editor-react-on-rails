export default class Char {
  constructor({ text, type = '' }) {
    this.text = text
    this.type = type
  }
  text: string
  type: string = 'none'
}
