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
    return React.Children.only(this.props.children);
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};
Provider.childContextTypes = {
  [STORE_KEY]: PropTypes.object.isRequired,
};
