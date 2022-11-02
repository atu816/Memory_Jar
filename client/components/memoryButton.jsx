import React, { Component } from 'react';

class MemoryButton extends Component {
  render() {
    return (
      <button onClick={this.props.generateRandom}>Memories to remember</button>
    )
  }
}

export default MemoryButton;