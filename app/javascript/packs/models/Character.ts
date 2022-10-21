export default class Character {
  constructor({ text, type = 'none' }) {
    this.text = text
    this.type = type
  }
  text: string
  type: string
}
