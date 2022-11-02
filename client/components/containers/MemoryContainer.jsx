import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CreateMemory from './CreateMemories.jsx';
import MemoryButton from '../memoryButton.jsx';
import RandomDateButton from '../randomDateButton.jsx';
import MemoryBox from '../memoryBox.jsx';
import * as actions from '../../actions/actions.js';

// Storing array of memories and last memory seen in props
const mapStateToProps = (store) => {
  return {
    memories: store.memories.memoryBank,
    newMemories: store.memories.newMemoryBank,
    currMemory: store.memories.currMemory,
    newMemory: store.memories.newMemory,
    pastfuture: store.memories.pastfuture,
  }
}

// Method to initially retrieve our state via DB
// Method to update and see new state
const mapDispatchToProps = dispatch => ({
  initialFetch: (initialData) => dispatch(actions.initialLoad(initialData)),
  generateMemory: (currentMemory) => dispatch(actions.generateMemory(currentMemory)),
  updateMemory: (newMemoryData) => dispatch(actions.updateMemory(newMemoryData)),
  depositMemory: (newMemory, pastfuture) => dispatch(actions.depositMemory(newMemory, pastfuture)),
  updatePastFuture: (pastfuture) => dispatch(actions.updatePastFuture(pastfuture)),
})

class MemoryContainer extends Component {
  // Pass in props so we can access and use them
  constructor(props) {
    super(props);
  }

  // Creates and populates our memory div
  // Passed as click handler 
  rememberMemory = () => {
    // Choose a new memory from the bank
    const memory = this.props.memories;
    let randomMemory = memory[Math.floor(Math.random() * memory.length)];
    // Ensure you don't have the same memory as last time
    while (randomMemory.name === this.props.currMemory) {
      randomMemory = memory[Math.floor(Math.random() * memory.length)];
    }
    // Vanilla DOM to populate our memory div box
    const memoryEvent = document.getElementById('memory-event');
    const memoryDate = document.getElementById('memory-date');
    memoryEvent.innerText = `${randomMemory.name}`;
    memoryDate.innerText = `Date: ${randomMemory.time} \nTimes Seen: ${randomMemory.times_called} `
    // Change our state by updating view count on memory
    this.props.generateMemory(randomMemory);
  }

  // random generator for dates from DB
  createDateMemory = () => {

  }

  // Fetch data once mounted
  componentDidMount() {
    fetch('/db/past_memories')
      .then(res => res.json())
      .then(dbData => {
        console.log('Succesfully mounted!')
        this.props.initialFetch(dbData)
      })
      .catch(err => { log: err });
  }

  // Info on our current state each render
  componentDidUpdate() {
    console.log('State has been updated', this.props)
  }

  render() {
    return (
      <Router>
        <div id='main-container'>
          <h1>Your most important memories...</h1>
          <div>
            <MemoryButton generateRandom={this.rememberMemory} />
            <RandomDateButton />
          </div>
          <MemoryBox memory={this.props.memories} />
          <CreateMemory
            textChange={this.props.updateMemory}
            depositMemory={this.props.depositMemory}
            updatePastFuture={this.props.updatePastFuture}
            currState = {this.props.pastfuture}
            newMemory={this.props.newMemory}
          />
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryContainer);