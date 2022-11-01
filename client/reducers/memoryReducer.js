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
    default: {
      return state;
    }
  }
}

export default memoryReducer;