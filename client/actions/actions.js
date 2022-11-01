import * as types from '../constants/actionTypes.js';

export const initialLoad = (loadData) => (
  {
    type: types.INITIAL_FETCH,
    payload: loadData
  }
)