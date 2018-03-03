import React from 'react'
import PropTypes from 'prop-types'
import { STORE_KEY } from '../constants'

export class Provider extends React.Component {
  getChildContext() {
    return {
      [STORE_KEY]: this[STORE_KEY],
    }
  }

  constructor(props, context) {
    super(props, context)
    this[STORE_KEY] = props.store;
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}
Provider.childContextTypes = {
  [STORE_KEY]: PropTypes.object.isRequired,
}
