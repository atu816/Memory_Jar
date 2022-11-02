import { combineReducers } from 'redux';
import memoryReducer from './memoryReducer.js'

// Send this to our store. It is our combined reducers which in this case is just one labeled memories.
const reducers = combineReducers({
  memories: memoryReducer
})

export default reducers;