import { combineReducers } from 'redux';
import memoryReducer from './memoryReducer.js'

const reducers = combineReducers({
  memories: memoryReducer
})

export default reducers;