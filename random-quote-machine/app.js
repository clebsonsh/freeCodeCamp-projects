const Quote = ({quote: {text, author}}) =>
  <div id='quote'>
    <p id='text'>{text}</p>
    <p id='author'>- {author}</p>
  </div>

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

    this.getRandomQuote = () => {
      let randomQuoteIndex = Math.floor(Math.random() * this.state.quotes.length)
      this.setState({
        quote: this.state.quotes[randomQuoteIndex]
      })
    }
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

    return (
      <div id='quote-box'>
        <Quote quote={this.state.quote} />
        <div className='btn-group'>
          <a id='tweet-quote' className='btn' href={`https://twitter.com/intent/tweet?hashtags=freeCodeCamp,randomQuotesMachine&text=${text} - ${author}`}>
            Share on Twitter
          </a>
          <a id='new-quote' className='btn' onClick={this.getRandomQuote}>New random quote</a>
        </div>
      </div>
    )
  }
}

const App = () => <QuoteBox />

ReactDOM.render(<App />, document.getElementById('root'))
