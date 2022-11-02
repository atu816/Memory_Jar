// Holds complete state of our tree
import { createStore } from 'redux';
import reducers from './reducers/index.js'

// Creating our store and our object which we can access it via
const store = createStore(reducers);

export default store;