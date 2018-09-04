const Quote = ({quote: {text, author}}) => {
  return (
    <div>
      <p id='text'>{text}</p>
      <p id='author'>-{author}</p>
    </div>
  )
}

class QuoteBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      quote: {
        author: '',
        text: ''
      },
      quotes: []
    }

    this.getRandomQuote = this.getRandomQuote.bind(this)
  }

  getRandomQuote () {
    let randomQuoteIndex = Math.floor(Math.random() * this.state.quotes.length)
    this.setState({
      quote: this.state.quotes[randomQuoteIndex]
    })
  }

  componentDidMount () {
    fetch('https://raw.githubusercontent.com/clebsonsh/freeCodeCamp-projects/master/random-quote-machine/quotes.json')
      .then(data => data.json())
      .then(quotes => {
        this.setState({quotes})
        this.getRandomQuote()
      })
  }

  render () {
    return (
      <div id='quote-box'>
        <Quote quote={this.state.quote} />
      </div>
    )
  }
}

const App = () => <QuoteBox />

ReactDOM.render(<App />, document.getElementById('root'))
