/* global React ReactDOM */
class JSCalculator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      text: 'yay!'
    }
  }

  render () {
    const { text } = this.state
    return (
      <div id='calculator'>
        <h1>{text}</h1>
      </div>
    )
  }
}

ReactDOM.render(<JSCalculator />, document.getElementById('root'))
