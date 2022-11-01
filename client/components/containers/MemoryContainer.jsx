import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemoryButton from '../memoryButton.jsx';
import * as actions from '../../actions/actions.js';

const mapStateToProps = (store) => {
  console.log('Store inside of container', store)
  return {
    memories: store.memories.memoryBank
  }
}

const mapDispatchToProps = dispatch => ({
  initialFetch: (initialData) => dispatch(actions.initialLoad(initialData)),
})

class MemoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('/db')
      .then(res => res.json())
      .then(dbData => {
        console.log('dbData', dbData)
        this.props.initialFetch(dbData)
      })
      .catch(err => { log: err });
  }

  render() {
    console.log('Memory log', this.props.memories);
    const memoryArr = this.props.memories.map(el => <p key={el.name}>Memory: {el.name} Date: {el.time}</p>);
    return (
      <div id='main-container'>
        <h1>Your most important reminders...</h1>
        <MemoryButton />
        {memoryArr}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryContainer);