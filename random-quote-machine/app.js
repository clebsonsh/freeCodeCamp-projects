const Quote = ({quote: {text, author}}) => {
  const textStyle = {
    fontSize: 20
  }

  const authorStyle = {
    textAlign: 'right'
  }

  return (
    <div>
      <p style={textStyle} id='text'>{text}</p>
      <p style={authorStyle} id='author'>- {author}</p>
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
    let text = this.state.quote.text
    let author = this.state.quote.author

    const quoteBoxStyle = {
      margin: 20,
      padding: 80,
      backgroundColor: 'white',
      borderRadius: 10
    }

    return (
      <div id='quote-box' style={quoteBoxStyle}>
        <Quote quote={this.state.quote} />
        <button id='new-quote' onClick={this.getRandomQuote}>Random quote</button>
        <a
          id='tweet-quote'
          href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${text} - ${author}`}>
          Share on Twitter
        </a>
      </div>
    )
  }
}

const App = () => <QuoteBox />

ReactDOM.render(<App />, document.getElementById('root'))
