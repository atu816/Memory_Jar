import React, { Component } from 'react';
import { connect } from 'react-redux';
import Delete from '../delete.jsx'
import Edit from '../edit.jsx'
import * as actions from '../../actions/actions.js';

const mapStateToProps = (store) => {
  return {
    currMemory: store.memories.currMemory,
    viewPast: store.memories.viewPast,
  }
}

const mapDispatchToProps = dispatch => ({
  initialFetch: (initialData) => dispatch(actions.initialLoad(initialData)),
  deleteMemory: (memoryData) => dispatch(actions.deleteMemory(memoryData)),
  editMode: (boolean) => dispatch(actions.editMode(boolean)),
})

class ModifyContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='modify-container' className='modify-container'>
        <Edit
          editMode={this.props.editMode}
          state={this.props.viewPast}
          memory={this.props.currMemory}
          update={this.props.initialFetch}
        />
        <Delete
          deleteMemory={this.props.deleteMemory}
          state={this.props.viewPast}
          memory={this.props.currMemory}
          update={this.props.initialFetch}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyContainer);