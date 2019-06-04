import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

import { STORE_KEY } from '../constants';
import shallowEqual from '../utils/shallowEqual';

export default (
  mapStateToPropsFn,
  mapDispatchToPropsFn,
  mapCommitToPropsFn,
  mapGetterToPropsFn,
) => (WrappedComponent) => {
  class PresentationalComponent extends Component {
    constructor(props, context) {
      super(props, context);
      this.store = props[STORE_KEY] || context[STORE_KEY];
      this.mappedState = mapStateToPropsFn && mapStateToPropsFn(this.store.state, props);
      this.mappedGetters = mapGetterToPropsFn && mapGetterToPropsFn(this.store.getters, props);

      // will be used to unsubscribe from store changes when the component unmounts
      this.unsubscribeFn = null;

      this.state = Object.assign(
        {},
        this.mappedState,
        mapDispatchToPropsFn && mapDispatchToPropsFn(this.store.dispatch, props),
        mapCommitToPropsFn && mapCommitToPropsFn(this.store.commit, props),
        this.mappedGetters,
      );

      if (this.mappedState) {
        this.unsubscribeFn = this.store.subscribe((mutation, state) => {
          let newState = {};
          // update state from store state
          const newMappedState = mapStateToPropsFn(state, this.props);
          if (!shallowEqual(this.mappedState, newMappedState)) {
            this.mappedState = newMappedState;
            newState = Object.assign({}, newState, this.mappedState);
          }

          // update state from store getters, if any
          if (this.mappedGetters) {
            const newMappedGetters = mapGetterToPropsFn(this.store.getters, this.props);
            if (!shallowEqual(this.mappedGetters, newMappedGetters)) {
              this.mappedGetters = newMappedGetters;
              newState = Object.assign({}, newState, this.mappedGetters);
            }
          }

          if (Object.keys(newState).length) {
            this.setState(newState);
          }
        });
      }
    }

    componentWillUnmount() {
      if (typeof this.unsubscribeFn === 'function') {
        this.unsubscribeFn();
      }
    }

    render() {
      return createElement(
        WrappedComponent,
        Object.assign({}, this.props, this.state),
        this.props.children, // eslint-disable-line react/destructuring-assignment
      );
    }
  }
  PresentationalComponent.WrappedComponent = WrappedComponent;
  PresentationalComponent.contextTypes = {
    /* eslint-disable react/forbid-prop-types */
    [STORE_KEY]: PropTypes.object,
    /* eslint-enable react/forbid-prop-types */
  };
  PresentationalComponent.propTypes = {
    /* eslint-disable react/require-default-props */
    /* eslint-disable react/forbid-prop-types, react/no-unused-prop-types, max-len */
    [STORE_KEY]: PropTypes.object,
    /* eslint-enable react/forbid-prop-types, react/no-unused-prop-types, max-len */
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    /* eslint-enable react/require-default-props */
  };
  PresentationalComponent.displayName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  return hoistStatics(PresentationalComponent, WrappedComponent);
};
