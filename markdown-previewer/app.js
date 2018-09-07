/* global React ReactDOM marked */

// Create a custom filter for links to open them in a new tab
const renderer = new marked.Renderer()
renderer.link = (href, title, text) =>
  `<a target='_blank' href='${href}' title='${title}'>${text}</a>`

const markedjs = marked
markedjs.setOptions({
  sanitize: true,
  breaks: true,
  renderer: renderer
})

const defaultText = `
  # Spicy jalapeno
  ## bacon ipsum dolor amet
  [pork loin chicken frankfurter](https://baconipsum.com)
  - pig \`landjaeger\` drumstick kevin
  \`\`\` javascript
  const porkSausage = 'round sausage prosciutto'
  \`\`\`
  - short ribs
  > Flank buffalo shank

  ![bacon](https://baconmockup.com/200/200/)
  __tenderloin ground__
`
class MarkdownPreviewer extends React.Component {
  state = {
    text: defaultText
  }

  handleChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  toHTML = str => {
    return {
      __html: markedjs(str)
    }
  }

  render = () => {
    const { text } = this.state
    return (
      <div>
        <textarea id='editor' onChange={this.handleChange} value={text} />
        <div id='preview' dangerouslySetInnerHTML={this.toHTML(text)} />
      </div>
    )
  }
}

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('root'))
