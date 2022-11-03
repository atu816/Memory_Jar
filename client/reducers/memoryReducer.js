import * as types from '../constants/actionTypes.js';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const initialState = {
  memoryBank: [],
  newMemoryBank: [],
  currMemory: '',
  newMemory: '',
  pastfuture: '',
  newDate: '',
  viewPast: null,
}


const memoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_FETCH: {
      console.log('Firing fetch GET!')
      // console.log('action paylod', action.payload)
      // Fills our memorybank with all the events in past_memories
      return {
        ...state,
        memoryBank: action.payload.past_memories,
        newMemoryBank: action.payload.future,
      }
    }
    case types.GENERATE_MEMORY: {
      console.log('Upping views!')
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
      return {
        ...state,
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
        const date = action.payload.newDate;
        fetch('/db/past', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            old_memory: memoryIdea,
            old_date: date,
          })
        })
      }
      return {
        ...state,
        newMemory: '',
        pastfuture: '',
        newDate: '',
        currMemory: memoryIdea
      }
    }
    case types.UPDATE_DATE: {
      console.log('updating date!')
      console.log(action.payload)
      const dateArr = action.payload.split('-')
      if (dateArr[2][0] === '0') dateArr[2] = dateArr[2].slice(1);
      console.log(dateArr)
      const newDate = `${months[dateArr[1] - 1]} ${dateArr[2]}, ${dateArr[0]}`;
      console.log(newDate);
      return {
        ...state,
        newDate
      };
    }
    case types.MEMORY_DISPLAYED: {
      console.log('Memory is displayed!')
      return {
        ...state,
        currMemory: action.payload
      }
    }
    case types.VIEWING_PAST: {
      console.log('Viewing past or future memory currently');
      return {
        ...state,
        viewPast: action.payload
      }
    }
    case types.DELETE_MEMORY: {
      console.log('Deleting memory!');
      console.log(action.payload)
      return {
        ...state,
        currMemory: '',
        viewPast: null,
      }
    }
    case types.EDIT_MEMORY: {
      console.log('Editing memory!');
      return {
        ...state
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