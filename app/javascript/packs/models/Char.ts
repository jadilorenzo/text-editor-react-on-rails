export default class Char {
  constructor({ text, type = 'none' }) {
    this.text = text
    this.type = type
  }
  text: string
  type: string
}
