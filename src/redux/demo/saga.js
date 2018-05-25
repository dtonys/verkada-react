import { put, call, fork, all } from 'redux-saga/effects';
import { takeOne, delay } from 'redux/sagaHelpers';
import {
  INCREMENT_COUNTER, DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC,
} from 'redux/demo/actions';


function* incrementCounterAsync(/* ...args */) {
  yield call(delay(1000));
  yield put({ type: INCREMENT_COUNTER });
}

function* decrementCounterAsync(/* ...args */) {
  yield call(delay(1000));
  yield put({ type: DECREMENT_COUNTER });
}

export default function* ( context ) {
  yield all([
    fork( takeOne(INCREMENT_COUNTER_ASYNC, incrementCounterAsync, context) ),
    fork( takeOne(DECREMENT_COUNTER_ASYNC, decrementCounterAsync, context) ),
  ]);
}
