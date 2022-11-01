import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemoryButton from '../memoryButton.jsx'


const mapStateToProps = (store) => {
  console.log('Store inside of container', store)
  return {
    memories: store.memories.memoryBank
  }
}

class MemoryContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    fetch('/db')
      .then(res => res.json())
      .then(dbData => {
        console.log('dbData', dbData)
        dispatchEvent()
        console.log(initialState)
      })
      .catch(err => { log: err });
  }

  render() {
    console.log('Memory log', this.props.memories);
    const memoryArr = this.props.memories.map(el => <li>Memory: {el.name} Date: {el.date}</li>);
    return (
      <div id='main-container'>
        <h1>Your most important reminders...</h1>
        <MemoryButton />
        {memoryArr}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(MemoryContainer);