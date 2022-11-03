import React, { Component } from 'react';

class RandomDateButton extends Component {
  render() {
    return (
      // Add logic and an onClick
      <button onClick={this.props.generateRandom}>Memories to create</button>
    )
  }
}

export default RandomDateButton;