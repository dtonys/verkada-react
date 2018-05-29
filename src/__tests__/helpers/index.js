import React from 'react';
import createMemoryHistory from 'history/createMemoryHistory';
import configureStore from 'redux/configureStore';
import { Provider as ReduxStoreProvider } from 'react-redux';


export function wrapWithReduxProvider( Component, initialState = {}) { // eslint-disable-line
  const history = createMemoryHistory({ initialEntries: [ '/' ] });
  const store = configureStore( initialState, history );

  return (
    <ReduxStoreProvider store={store} >
      { Component }
    </ReduxStoreProvider>
  );
}
