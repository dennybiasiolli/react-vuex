import React from 'react';
import PropTypes from 'prop-types';
import { STORE_KEY } from '../constants';

export default class Provider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this[STORE_KEY] = props.store;
  }

  getChildContext() {
    return {
      [STORE_KEY]: this[STORE_KEY],
    };
  }

  render() {
    /* eslint-disable react/destructuring-assignment */
    return React.Children.only(this.props.children);
    /* eslint-enable react/destructuring-assignment */
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};
Provider.childContextTypes = {
  /* eslint-disable react/forbid-prop-types */
  [STORE_KEY]: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};
