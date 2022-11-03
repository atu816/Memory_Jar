import React, { Component } from 'react';
import MemoryContainer from './components/containers/MemoryContainer.jsx';
import {
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (


          <MemoryContainer />


    )
  }
}

export default App;