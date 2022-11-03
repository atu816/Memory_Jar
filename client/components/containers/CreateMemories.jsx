import React, { Component } from 'react';
import DateInput from '../dateInput.jsx';
import Server from '../../fetchMethods.js';

function CreateMemories(props) {
  return (<div id='create-box'>
    <form onSubmit={(e) => {
      e.preventDefault();
      props.depositMemory(props.newMemory, props.currState, props.newDate);
      Server.syncDB(props.initialFetch)
      document.querySelector('#memory-text').value = '';
      document.querySelector('#past-radio').checked = false;
      document.querySelector('#future-radio').checked = false;

      const memoryEvent = document.getElementById('memory-event');
      const memoryDate = document.getElementById('memory-date');
      const memoryBox = document.getElementById('memory-box')
      const stateText = props.currState === 'past' ? 'past memories!' : 'future memories!'
      memoryEvent.innerText =
        `Just added...\n${props.newMemory}\n to\n${stateText}`;
      if (props.newDate) memoryDate.innerText = 'Memory made on ' + props.newDate;
      
      memoryBox.lastChild.style.visibility = 'visible';
    }}>
      <span>Add some memories</span>
      <br></br>
      <span>Past: <input
        required className='radio-button'
        id='past-radio' type='radio'
        name='memory'
        onChange={() => {
          props.updatePastFuture('past')
        }}></input></span>
      <span>Future: <input
        className='radio-button'
        id='future-radio'
        type='radio'
        name='memory'
        onChange={() => {
          props.updatePastFuture('future')
        }}
      ></input></span>
      {props.currState === 'past' && <DateInput id='date-input' updateDate={props.updateDate} />}
      <br></br>
      <input required className='submit-line' id='memory-text' type='text' placeholder="What's next?" onChange={() => {
        const textEle = document.querySelector('#memory-text');
        props.textChange(textEle.value);
      }
      }></input>
      <input className='submit-line' id='memory-submit' type='submit' value='Submit'></input>
    </form>
  </div>)
}

export default CreateMemories;