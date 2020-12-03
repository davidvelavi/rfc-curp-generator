import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, compose } from 'redux';
import reducer from './reducers';
import Home from './containers/Home';

const initialState = {
  dataUser: {
    name: '',
    lastName: '',
    secondLastName: '',
    birthDate: '',
  },
  rfc: '',
  curp: '',
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers());
ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>, document.getElementById('App'),
);
