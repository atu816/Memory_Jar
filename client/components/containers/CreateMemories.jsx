import React, { Component } from 'react';

function CreateMemories(props) {
  return (<div id='create-box'>
    <form onSubmit={(e) => {
      e.preventDefault();
      props.depositMemory(props.newMemory, props.currState);
      document.querySelector('#memory-text').value = '';
      document.querySelector('#past-radio').checked = false;
      document.querySelector('#future-radio').checked = false;
    }}>
      <span>Add some memories</span>
      <br></br>
      <span>Past: <input
        required className='radio-button'
        id='past-radio' type='radio'
        name='memory'
        onChange={() => {
          console.log('Past event checked')
          props.updatePastFuture('past')
        }}></input></span>
      <span>Future: <input
        className='radio-button'
        id='future-radio'
        type='radio'
        name='memory'
        onChange={() => {
          console.log('Future event checked');
          props.updatePastFuture('future')
        }}
      ></input></span>
      <br></br>
      <input required id='memory-text' type='text' onChange={() => {
        const textEle = document.querySelector('#memory-text');
        props.textChange(textEle.value);
      }
      }></input>
      <input id='memory-submit' type='submit' value='Submit'></input>
    </form>
  </div>)
}

export default CreateMemories;