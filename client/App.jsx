import React, { Component } from 'react';
import MemoryContainer from './components/containers/MemoryContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <MemoryContainer />
      </div>
    )
  }
}

export default App;