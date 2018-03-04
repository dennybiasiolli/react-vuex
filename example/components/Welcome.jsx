import React from 'react';
import PropTypes from 'prop-types';
import { store } from '../store';
import { Main } from './Main';

const { Provider } = ReactVuex;

export default class Welcome extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    );
  }
}

Welcome.propTypes = {
  name: PropTypes.string.isRequired,
};
