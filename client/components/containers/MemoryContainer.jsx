import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateMemory from './CreateMemories.jsx';
import MemoryButton from '../memoryButton.jsx';
import RandomDateButton from '../randomDateButton.jsx';
import MemoryBox from '../memoryBox.jsx';
import Server from '../../fetchMethods.js';

import * as actions from '../../actions/actions.js';

// Storing array of memories and last memory seen in props
const mapStateToProps = (store) => {
  return {
    memories: store.memories.memoryBank,
    newMemories: store.memories.newMemoryBank,
    currMemory: store.memories.currMemory,
    newMemory: store.memories.newMemory,
    pastfuture: store.memories.pastfuture,
    newDate: store.memories.newDate,
    // memoryDisplay: store.memories.memoryDisplayed,
    viewPast: store.memories.viewPast,
  }
}

// Method to initially retrieve our state via DB
// Method to update and see new state
const mapDispatchToProps = dispatch => ({
  initialFetch: (initialData) => dispatch(actions.initialLoad(initialData)),
  updateCount: (currentMemory) => dispatch(actions.updateCount(currentMemory)),
  updateMemory: (newMemoryData) => dispatch(actions.updateMemory(newMemoryData)),
  depositMemory: (newMemory, pastfuture, newDate) => dispatch(actions.depositMemory(newMemory, pastfuture, newDate)),
  updatePastFuture: (pastfuture) => dispatch(actions.updatePastFuture(pastfuture)),
  updateDate: (date) => dispatch(actions.updateDate(date)),
  memoryDisplayed: (memory) => dispatch(actions.memoryDisplayed(memory)),
  viewingPast: (boolean) => dispatch(actions.viewingPast(boolean)),
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
    const memoryEvent = document.getElementById('memory-event');
    const memoryDate = document.getElementById('memory-date');
    const memoryBox = document.getElementById('memory-box')
    if (randomMemory !== undefined) {
      while (randomMemory.name === this.props.currMemory && this.props.memories.length > 1) {
        randomMemory = memory[Math.floor(Math.random() * memory.length)];
      }
      // Vanilla DOM to populate our memory div box

      memoryEvent.innerText = `Do you remember...\n${randomMemory.name}`;
      memoryDate.innerText = `Date: ${randomMemory.time} \nTimes Seen: ${randomMemory.times_called} `
      memoryBox.lastChild.style.visibility = 'visible';
      // Change our state by updating view count on memory and update DB
      this.props.updateCount(randomMemory);
      this.props.viewingPast(true);
      this.props.memoryDisplayed(randomMemory.name);
    }
    else {
      memoryEvent.innerText = 'Why don\'t you create some?'
      memoryDate.innerText = ''
      memoryBox.lastChild.style.visibility = 'hidden';
    }
    Server.syncDB(this.props.initialFetch)
  }

  // random generator for dates from DB
  createDateMemory = () => {
    // Choose a new memory from the bank
    const memory = this.props.newMemories;
    let randomMemory = memory[Math.floor(Math.random() * memory.length)];
    // Ensure you don't have the same memory as last time
    const memoryEvent = document.getElementById('memory-event');
    const memoryDate = document.getElementById('memory-date');
    const memoryBox = document.getElementById('memory-box')
    if (randomMemory !== undefined) {
      while (randomMemory.name === this.props.currMemory) {
        randomMemory = memory[Math.floor(Math.random() * memory.length)];
      }
      // Vanilla DOM to populate our memory div box
      memoryEvent.innerText = `How about...\n${randomMemory.date_idea}`;
      memoryDate.innerText = `Date entered: ${randomMemory.date_entered}`
      // Update store to know it displays now then resync store to db
      memoryBox.lastChild.style.visibility = 'visible';
      this.props.memoryDisplayed(randomMemory.date_idea);
      this.props.viewingPast(false);
    } else {
      memoryEvent.innerText = 'Why don\'t you create some?'
      memoryDate.innerText = ''
      memoryBox.lastChild.style.visibility = 'hidden';
    }
    Server.syncDB(this.props.initialFetch)
  }

  // Fetch data once mounted
  componentDidMount() {
    Server.syncDB(this.props.initialFetch)
  }

  // Info on our current state each render
  componentDidUpdate(previousProps, previousState) {
    console.log('State has been updated', this.props)
  }

  render() {
    return (
      <div id='main-container'>
        <h1>Your most important memories...</h1>
        <div>
          <MemoryButton generateRandom={this.rememberMemory} />
          <RandomDateButton generateRandom={this.createDateMemory} />
        </div>
        <MemoryBox memory={this.props.memories} displayState={this.props.memoryDisplay} />
        <CreateMemory
          textChange={this.props.updateMemory}
          depositMemory={this.props.depositMemory}
          updatePastFuture={this.props.updatePastFuture}
          updateDate={this.props.updateDate}
          currState={this.props.pastfuture}
          newMemory={this.props.newMemory}
          newDate={this.props.newDate}
          initialFetch={this.props.initialFetch}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryContainer);