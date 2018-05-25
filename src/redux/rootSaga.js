import { fork, all} from 'redux-saga/effects';

import demoSaga from 'redux/demo/saga';


export default function* rootSaga(context) {
  yield all([
    fork(demoSaga, context),
  ]);
}
