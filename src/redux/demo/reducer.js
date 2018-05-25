import {
  INCREMENT_COUNTER, DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC,
  LOAD_DATA_STARTED, LOAD_DATA_SUCCESS, LOAD_DATA_ERROR,
} from 'redux/demo/actions';

export const STORE_KEY = 'demo';

export function extractState( globalState ) {
  return globalState[STORE_KEY];
}

const initialState = {
  count: 0,
};
export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case INCREMENT_COUNTER: {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    case DECREMENT_COUNTER: {
      return {
        ...state,
        count: state.count - 1,
      };
    }
    default: {
      return state;
    }
  }
};
