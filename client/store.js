// Holds complete state of our tree
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index.js'

// Creating our store and our object which we can access it via
const store = createStore(
  reducers,
  composeWithDevTools());

export default store;