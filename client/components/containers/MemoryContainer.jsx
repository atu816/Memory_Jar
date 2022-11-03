import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    newDate: store.memories.newDate,
    memoryDisplay: store.memories.memoryDisplayed,
    viewPast: store.memories.viewPast,
  }
}

// Method to initially retrieve our state via DB
// Method to update and see new state
const mapDispatchToProps = dispatch => ({
  initialFetch: (initialData) => dispatch(actions.initialLoad(initialData)),
  generateMemory: (currentMemory) => dispatch(actions.generateMemory(currentMemory)),
  updateMemory: (newMemoryData) => dispatch(actions.updateMemory(newMemoryData)),
  depositMemory: (newMemory, pastfuture, newDate) => dispatch(actions.depositMemory(newMemory, pastfuture, newDate)),
  updatePastFuture: (pastfuture) => dispatch(actions.updatePastFuture(pastfuture)),
  updateDate: (date) => dispatch(actions.updateDate(date)),
  memoryDisplayed: () => dispatch(actions.memoryDisplayed()),
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
    while (randomMemory.name === this.props.currMemory) {
      randomMemory = memory[Math.floor(Math.random() * memory.length)];
    }
    // Vanilla DOM to populate our memory div box
    const memoryEvent = document.getElementById('memory-event');
    const memoryDate = document.getElementById('memory-date');
    memoryEvent.innerText = `Do you remember...\n${randomMemory.name}`;
    memoryDate.innerText = `Date: ${randomMemory.time} \nTimes Seen: ${randomMemory.times_called} `
    // Change our state by updating view count on memory
    this.props.generateMemory(randomMemory);
    this.props.viewingPast(true);
    // Update store to know it displays now
    this.props.memoryDisplayed();
    // Resync data with new db updates
    fetch('/db/past_memories')
      .then(res => res.json())
      .then(dbData => {
        console.log('Succesfully mounted!')
        this.props.initialFetch(dbData)
      })
      .catch(err => { log: err });
    //
  }

  // random generator for dates from DB
  createDateMemory = () => {
    // Choose a new memory from the bank
    const memory = this.props.newMemories;
    let randomMemory = memory[Math.floor(Math.random() * memory.length)];
    // Ensure you don't have the same memory as last time
    while (randomMemory.name === this.props.currMemory) {
      randomMemory = memory[Math.floor(Math.random() * memory.length)];
    }
    // Vanilla DOM to populate our memory div box
    const memoryEvent = document.getElementById('memory-event');
    const memoryDate = document.getElementById('memory-date');
    memoryEvent.innerText = `How about...\n${randomMemory.date_idea}`;
    memoryDate.innerText = `Date entered: ${randomMemory.date_entered}`

    // Update store to know it displays now
    this.props.memoryDisplayed();
    this.props.viewingPast(false);
    // Resync data with new db updates
    fetch('/db/past_memories')
      .then(res => res.json())
      .then(dbData => {
        console.log('Succesfully mounted!')
        this.props.initialFetch(dbData)
      })
      .catch(err => { log: err });
    //
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
        <MemoryBox memory={this.props.memories} displayState={this.props.memoryDisplay}/>
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