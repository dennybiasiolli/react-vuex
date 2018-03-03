import { STORE_KEY } from '../constants'
import { shallowEqual } from '../utils/shallowEqual'

export const connect = (
  mapStateToPropsFn,
  mapDispatchToPropsFn,
  mapCommitToPropsFn,
  mapGetterToPropsFn
) => (Component) => {
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
      const propsKeysArray = Object.keys(this.mappedState)
      this.mappedState && this.store.subscribe((mutation, state, aaa) => {
        let newState = {}
        // update state from store state
        const newMappedState = mapStateToPropsFn(state)
        if (!shallowEqual(this.mappedState, newMappedState)) {
          this.mappedState = newMappedState
          newState = Object.assign({}, newState, this.mappedState)
        }

        // update state from store getters
        const newMappedGetters = mapGetterToPropsFn(this.store.getters)
        if (!shallowEqual(this.mappedGetters, newMappedGetters)) {
          this.mappedGetters = newMappedGetters
          newState = Object.assign({}, newState, this.mappedGetters)
        }

        if (Object.keys(newState).length) {
          this.setState(newState)
        }
      })
    }

    componentDidUpdate() {
      console.log('componentDidUpdate')
    }

    render() {
      return React.createElement(Component, Object.assign({}, this.props, this.state), this.props.children)
    }
  }
  PresentationalComponent.contextTypes = {
    [STORE_KEY]: PropTypes.object,
  }
  PresentationalComponent.propTypes = {
    [STORE_KEY]: PropTypes.object,
  }
  return PresentationalComponent
}
