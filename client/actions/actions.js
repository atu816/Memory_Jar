import * as types from '../constants/actionTypes.js';

export const initialLoad = (loadData) => (
  {
    type: types.INITIAL_FETCH,
    payload: loadData
  }
)

export const generateMemory = (currentMemory) => (
  {
    type: types.GENERATE_MEMORY,
    payload: currentMemory,
  }
)

export const updateMemory = (newData) => ({
  type: types.UPDATE_MEMORY,
  payload: newData,
})

export const depositMemory = (newMemory, pastfuture) => ({
  type: types.DEPOSIT_MEMORY,
  payload: {
    newMemory: newMemory,
    pastfuture: pastfuture
  }
})

export const updatePastFuture = (currState) => ({
  type: types.UPDATE_PAST_FUTURE,
  payload: currState,
})