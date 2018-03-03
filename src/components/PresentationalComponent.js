import { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

import { STORE_KEY } from '../constants'
import { shallowEqual } from '../utils/shallowEqual'

export const connect = (
  mapStateToPropsFn,
  mapDispatchToPropsFn,
  mapCommitToPropsFn,
  mapGetterToPropsFn
) => (WrappedComponent) => {
  class PresentationalComponent extends Component {
    constructor(props, context) {
      super(props, context)
      this.store = props[STORE_KEY] || context[STORE_KEY]
      this.mappedState = mapStateToPropsFn && mapStateToPropsFn(this.store.state, props)
      this.mappedGetters = mapGetterToPropsFn && mapGetterToPropsFn(this.store.getters, props)
      this.state = Object.assign(
        {},
        this.mappedState,
        mapDispatchToPropsFn && mapDispatchToPropsFn(this.store.dispatch, props),
        mapCommitToPropsFn && mapCommitToPropsFn(this.store.commit, props),
        this.mappedGetters
      )
      this.mappedState && this.store.subscribe((mutation, state, aaa) => {
        let newState = {}
        // update state from store state
        const newMappedState = mapStateToPropsFn(state, this.props)
        if (!shallowEqual(this.mappedState, newMappedState)) {
          this.mappedState = newMappedState
          newState = Object.assign({}, newState, this.mappedState)
        }

        // update state from store getters, if any
        if (this.mappedGetters) {
          const newMappedGetters = mapGetterToPropsFn(this.store.getters, this.props)
          if (!shallowEqual(this.mappedGetters, newMappedGetters)) {
            this.mappedGetters = newMappedGetters
            newState = Object.assign({}, newState, this.mappedGetters)
          }
        }

        if (Object.keys(newState).length) {
          this.setState(newState)
        }
      })
    }

    render() {
      return createElement(WrappedComponent, Object.assign({}, this.props, this.state), this.props.children)
    }
  }
  PresentationalComponent.WrappedComponent = WrappedComponent
  PresentationalComponent.contextTypes = {
    [STORE_KEY]: PropTypes.object,
  }
  PresentationalComponent.propTypes = {
    [STORE_KEY]: PropTypes.object,
  }
  PresentationalComponent.displayName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'

  return hoistStatics(PresentationalComponent, WrappedComponent)
}
