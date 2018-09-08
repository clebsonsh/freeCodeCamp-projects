/* global React ReactDOM marked */

const Editor = ({ handleChange, text }) =>
  <div id='editor-wrapper'>
    <header id='editor-header'>
      Editor
    </header>
    <textarea
      id='editor'
      onChange={handleChange}
      value={text}
      rows='15'
    />
  </div>

const Preview = ({ text }) =>
  <div id='preview-wrapper'>
    <header id='preview-header'>
      Previewer
    </header>
    <div
      id='preview'
      dangerouslySetInnerHTML={text}
    />
  </div>

// Create a custom filter for links to open them in a new tab
const renderer = new marked.Renderer()
renderer.link = (href, title, text) =>
  `<a target='_blank' href='${href}' title='${title}'>${text}</a>`

marked.setOptions({
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

  handleChange = event =>
    this.setState({ text: event.target.value })

  mdToHTML = str =>
    ({ __html: marked(str) })

  render = () =>
    <div id='markdown-previewer-wrapper'>
      <Editor
        handleChange={this.handleChange}
        text={this.state.text}
      />
      <Preview
        text={this.mdToHTML(this.state.text)}
      />
    </div>
}

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('root'))
