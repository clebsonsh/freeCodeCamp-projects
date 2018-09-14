/* global React ReactDOM */

const DrumPad = ({ drumPad: { name, id, audio }, handleClick }) =>
  <div className='drum-pad' id={name} onClick={handleClick}>
    <span>{id}</span>
    <audio className='clip' src={audio} id={id} />
  </div>

const Display = ({ text }) =>
  <div id='display'>
    <span>{text}</span>
  </div>

const drumKitURL = 'https://raw.githubusercontent.com/clebsonsh/freeCodeCamp-projects/master/drum-machine/sounds/'

let drumPads = [
  { name: 'boom', keyCode: 81, id: 'Q' },
  { name: 'clap', keyCode: 87, id: 'W' },
  { name: 'hihat', keyCode: 69, id: 'E' },
  { name: 'kick', keyCode: 65, id: 'A' },
  { name: 'openhat', keyCode: 83, id: 'S' },
  { name: 'ride', keyCode: 68, id: 'D' },
  { name: 'snare', keyCode: 90, id: 'Z' },
  { name: 'tink', keyCode: 88, id: 'X' },
  { name: 'tom', keyCode: 67, id: 'C' }
]

// Give a audio object to each drum kit
drumPads = drumPads.map(drumPad => {
  drumPad.audio = `${drumKitURL}${drumPad.name}.wav`
  return drumPad
})

class DrumMachine extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      displayText: 'Let\'s play!',
      drumPads: drumPads
    }
  }

  handleClick = event => {
    this.setState({
      displayText: event.currentTarget.id
    })
    event.currentTarget.children[1].currentTime = 0
    event.currentTarget.children[1].play()
  }

  keyCodes = drumPads.reduce((keyCodes, drumPad) => {
    return [...keyCodes, drumPad.keyCode]
  }, [])

  handleKeyDown = event => {
    if (this.keyCodes.includes(event.keyCode)) {
      let drumPad = document.querySelector(`#${String.fromCharCode(event.keyCode)}`)
      drumPad.click()
    }
  }

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount =() => {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  render () {
    const { displayText, drumPads } = this.state
    return (
      <div id='drum-machine'>
        <Display text={displayText} />
        <div id='drum-pads'>
          {
            drumPads.map(drumPad =>
              <DrumPad
                key={drumPad.id}
                drumPad={drumPad}
                handleClick={this.handleClick}
              />
            )
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById('root'))
