import * as types from '../constants/actionTypes.js';



const initialState = {
  memoryBank: [],
  currMemory: '',
  newMemory: '',
  newDate: '',
}


const memoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_FETCH: {
      console.log('Firing fetch GET!')
      // Fils our memorybank with all the events in past_memories
      return {
        ...state,
        memoryBank: action.payload
      }
    }
    case types.GENERATE_MEMORY: {
      // Updates the times seen an event has appeared
      fetch('/db', {
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
      fetch('/db')
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

    // Default initial state
    default: {
      console.log('Initial load state', state);
      return state;
    }
  }
}

export default memoryReducer;