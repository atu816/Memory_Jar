import * as types from '../constants/actionTypes.js';


// TODO: Try fetching and populating my initial state with info from DB
// Goal: Confirm communication works and that I will receive what I am asking for.


const initialState = {
  memoryBank: [],
  newMemory: '',
  newDate: '',
}


const memoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_FETCH": {
      console.log('Firing fetch!')
      return {
        ...state,
        memoryBank: action.payload
      }
      break;
    }
    default: {
      return state;
    }
  }
}

export default memoryReducer;