import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-vuex';
import App from './components/App';
import store from './store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
