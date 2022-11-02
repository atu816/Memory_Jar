import { bindActionCreators } from 'redux';
import * as types from '../constants/actionTypes.js';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const initialState = {
  memoryBank: [],
  newMemoryBank: [],
  currMemory: '',
  newMemory: '',
  pastfuture: '',
  newDate: '',
}


const memoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_FETCH: {
      console.log('Firing fetch GET!')
      // Fills our memorybank with all the events in past_memories
      return {
        ...state,
        memoryBank: action.payload
      }
    }
    case types.GENERATE_MEMORY: {
      // Updates the times seen an event has appeared
      fetch('/db/updateFreq', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log('Error on PUT:', err)
        });
      // Issue: State is not updated in the frontend until we refresh the page.
      // Backend is responding well.
      // Check async firing order.
      fetch('/db/past_memories')
        .then(res => res.json())
        .then(dbData => {
          // This isn't doing anything right now
          newMemoryBank = dbData;
        })
        .catch(err => { log: err });

      return {
        ...state,
        currMemory: action.payload.name,
      };
    }
    case types.UPDATE_MEMORY: {
      return {
        ...state,
        newMemory: action.payload,
      }
    }
    case types.UPDATE_PAST_FUTURE: {
      console.log('updating past future');
      return {
        ...state,
        pastfuture: action.payload,
      }
    }
    case types.DEPOSIT_MEMORY: {
      console.log('Firing deposit memory!')
      const memoryIdea = action.payload.newMemory;
      const currState = action.payload.pastfuture;

      // Put into future depending on state
      if (currState === 'future') {
        console.log('Future POSTING')
        const today = new Date();
        const date = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
        fetch('/db/future', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date_idea: memoryIdea,
            curr_date: date,
          })
        })
          .then(res => res.json())
          .then(data => console.log(data));
      } else if (currState === 'past') {

      }

      return {
        ...state,
        newMemory: '',
        pastfuture: ''
      }
    }
    // Default initial state
    default: {
      console.log('Initial load state', state);
      return state;
    }
  }
}

export default memoryReducer;