import React, { Component } from 'react';
import { connect } from 'react-redux';
import Delete from '../delete.jsx'
import Edit from '../edit.jsx'
import * as actions from '../../actions/actions.js';

const mapStateToProps = (store) => {
  return {
    viewPast: store.memories.viewPast,
  }
}

const mapDispatchToProps = dispatch => ({
  deleteMemory: (memoryData) => dispatch(actions.deleteMemory(memoryData)),
  editMemory: (memoryData) => dispatch(actions.editMemory(memoryData)),
})

class ModifyContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='modify-container'>
        <Edit editMemory={this.props.editMemory}/>
        <Delete deleteMemory={this.props.deleteMemory}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyContainer);