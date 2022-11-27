export default class Character {
  styles: string[]
  text: string
  type: string
  constructor({ text, type = 'text', styles = [] } : {text: string, type?: 'text' | 'EOF' | 'EOL', styles?: string[]}) {
    this.text = text
    this.type = type
    this.styles = styles
  }
}
