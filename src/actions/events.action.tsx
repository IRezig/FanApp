import { createActionThunk } from 'redux-thunk-actions';
import { handleActions } from 'redux-actions';

import Fire from '../services/Fire.service'

export const fetchEvents = createActionThunk('FETCH_EVENTS', async ({ getState }) => {
  const ref = Fire.store().collection('events')
  const events = await Fire.list(ref)
  return events
})

export const clearEvents = createActionThunk('CLEAR_EVENTS', () => void 0)

const initialState = {
  list: [],
  loading: false,
};

// Reducer
export const eventsReducer = handleActions(
  {
    'FETCH_EVENTS_STARTED': (state: any, action: any) => ({
      ...state,
      loading: true,
    }),
    'FETCH_EVENTS_SUCCEEDED': (state: any, action: any) => ({
      ...state,
      loading: false,
      list: action.payload,
    }),
    'FETCH_EVENTS_FAILED': (state: any, action: any) => ({
      ...state,
      loading: false,
    }),

    'CLEAR_EVENTS_SUCCEEDED': (state: any, action: any) => (initialState),
  },
  initialState
);
