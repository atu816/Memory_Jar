import * as types from '../constants/actionTypes.js';

export const initialLoad = (loadData) => (
  {
    type: types.INITIAL_FETCH,
    payload: loadData
  }
)

export const updateCount = (currentMemory) => (
  {
    type: types.GENERATE_MEMORY,
    payload: currentMemory,
  }
)

export const updateMemory = (newData) => ({
  type: types.UPDATE_MEMORY,
  payload: newData,
})

export const depositMemory = (newMemory, pastfuture, newDate) => ({
  type: types.DEPOSIT_MEMORY,
  payload: {
    newMemory: newMemory,
    pastfuture: pastfuture,
    newDate: newDate
  }
})

export const updatePastFuture = (currState) => ({
  type: types.UPDATE_PAST_FUTURE,
  payload: currState,
})

export const updateDate = (date) => ({
  type: types.UPDATE_DATE,
  payload: date
})

export const memoryDisplayed = (memory) => ({
  type: types.MEMORY_DISPLAYED,
  payload: memory
})

export const viewingPast = (boolean) => ({
  type: types.VIEWING_PAST,
  payload: boolean
})

export const deleteMemory = (memoryData) => ({
  type: types.DELETE_MEMORY,
  payload: memoryData
})

export const editMemory = (memoryData) => ({
  type: types.EDIT_MEMORY,
  payload: memoryData
})