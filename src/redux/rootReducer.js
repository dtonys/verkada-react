import { combineReducers } from 'redux';
import demoReducer, { STORE_KEY as DEMO_STORE_KEY } from 'redux/demo/reducer';


export default ( routeReducer ) => {
  return combineReducers({
    [DEMO_STORE_KEY]: demoReducer,
    location: routeReducer,
  });
};
