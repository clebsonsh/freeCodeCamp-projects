/* global React ReactDOM */
const Display = ({ text }) =>
  <div id='display'>
    <span>{text}</span>
  </div>

const DrumMachine = ({ text }) =>
  <div id='drum-machine'>
    <Display text={text} />
  </div>

DrumMachine.defaultProps = {
  text: 'it work\'s'
}

ReactDOM.render(<DrumMachine />, document.getElementById('root'))
