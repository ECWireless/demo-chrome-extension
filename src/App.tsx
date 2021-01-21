import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
     joke: ''
    }
    this.getNewJoke = this.getNewJoke.bind(this)
  }

  componentDidMount() {
    this.getNewJoke()
  }

  getNewJoke() {
    this.setState({
      joke: ''
    })
    fetch("https://api.chucknorris.io/jokes/random")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            joke: result.value
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            joke: error
          });
        }
      )
  }

  render() {
    const { joke } = this.state
    return (
      <>
        <div className="container flex flex-col items-center my-10">
          <img src={'./images/chuck-kick.png'} alt="Roundhouse Kick!" className="h-48"></img>
          <div className="border-2 rounded-lg shadow-md p-5 m-5">
            {!joke ? <img src={'./images/loader.gif'}></img> : joke}
          </div>
          <button
            className="focus:outline-none bg-green-500 hover:bg-green-300 rounded-lg shadow-lg p-2"
            onClick={this.getNewJoke}
          >
            <span className="text-lg text-white font-bold">Random Joke</span>
          </button>
        </div>
      </>
    );
  }
}

export default App;
