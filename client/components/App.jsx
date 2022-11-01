import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {users: []};

  }
  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(tests => {
        console.log('Fetched: ', tests)
        this.setState({users: tests})
      })
  }

  render() {
    console.log('Rendering Main App')
    const testArr = this.state.users.map(el => <li key={el}>What the {el}</li>)
    return (
      <div>
        <h1>Hello Bitches</h1>
        {testArr}
        <p>Log one, I am not feeling great but doing my best</p>
      </div>
    )
  }
}

export default App;