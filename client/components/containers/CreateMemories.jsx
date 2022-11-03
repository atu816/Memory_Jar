import React, { Component } from 'react';
import DateInput from '../dateInput.jsx';

function CreateMemories(props) {
  return (<div id='create-box'>
    <form onSubmit={(e) => {
      e.preventDefault();
      props.depositMemory(props.newMemory, props.currState, props.newDate);
      // Function to resync to DB
      fetch('/db/past_memories')
        .then(res => res.json())
        .then(dbData => {
          console.log('Succesfully mounted!')
          console.log('DidMount dbData', dbData)
          this.props.initialFetch(dbData)
        })
        .catch(err => { log: err });
      //
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