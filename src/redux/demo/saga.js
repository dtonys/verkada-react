import querystring from 'querystring';
import { put, call, fork, all } from 'redux-saga/effects';
import { takeOne, delay } from 'redux/sagaHelpers';
import {
  INCREMENT_COUNTER, DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC,
  LOAD_DATA_REQUESTED, LOAD_DATA_STARTED, LOAD_DATA_SUCCESS, LOAD_DATA_ERROR,
} from 'redux/demo/actions';


function* incrementCounterAsync(/* ...args */) {
  yield call(delay(1000));
  yield put({ type: INCREMENT_COUNTER });
}

function* decrementCounterAsync(/* ...args */) {
  yield call(delay(1000));
  yield put({ type: DECREMENT_COUNTER });
}

function* loadData(/* ...args */) {
  yield put({ type: LOAD_DATA_STARTED });


  try {
    const request = yield call(
      fetch,
      `https://jsonplaceholder.typicode.com/posts?
${querystring.stringify({ _limit: 5 })}`,
    );
    const data = yield call( request.json.bind(request) );
    yield put({ type: LOAD_DATA_SUCCESS, payload: data });
  }
  catch ( error ) {
    console.log(error); // eslint-disable-line
    yield put({ type: LOAD_DATA_ERROR });
  }
}

export default function* ( context ) {
  yield all([
    fork( takeOne(INCREMENT_COUNTER_ASYNC, incrementCounterAsync, context) ),
    fork( takeOne(DECREMENT_COUNTER_ASYNC, decrementCounterAsync, context) ),
    fork( takeOne(LOAD_DATA_REQUESTED, loadData, context) ),
  ]);
}
