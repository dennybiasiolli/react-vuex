# react-vuex

React bindings for [Vuex](https://vuex.vuejs.org/)
inspired by [`react-redux`](https://github.com/reactjs/react-redux) project.

[![Build Status](https://travis-ci.org/dennybiasiolli/react-vuex.svg?branch=master)](https://travis-ci.org/dennybiasiolli/react-vuex)
[![CircleCI](https://circleci.com/gh/dennybiasiolli/react-vuex/tree/master.svg?style=svg)](https://circleci.com/gh/dennybiasiolli/react-vuex/tree/master)
[![codecov](https://codecov.io/gh/dennybiasiolli/react-vuex/branch/master/graph/badge.svg)](https://codecov.io/gh/dennybiasiolli/react-vuex)

[![Beerpay](https://beerpay.io/dennybiasiolli/react-vuex/badge.svg)](https://beerpay.io/dennybiasiolli/react-vuex)
[![Donate with Liberapay](https://liberapay.com/assets/widgets/donate.svg)](https://liberapay.com/~36404/donate)


## Installation

react-vuex requires **React 16.0+**, **Vue 2.0+** and **Vuex 3.0+**

```
npm install --save react-vuex
```

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).


## Documentation

To look at some example projects, take a look at the [examples](https://github.com/dennybiasiolli/react-vuex/tree/master/examples) section of this repo.

- [API](docs/api.md#api)
  - [`<Provider store>`](docs/api.md#provider-store)
  - [`connect([mapStateToProps], [mapDispatchToProps], [mapCommitToProps], [mapGetterToProps])(Component)`](docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mapcommittoprops-mapgettertoprops)


## Example use

- configure your store with state, getters, mutations and actions, according to [Vuex documentation](https://vuex.vuejs.org/en/getting-started.html)

  ```javascript
  /*
   * actions.js
   */

  export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';

  export default {
    incrementAsync: (value = 1) => ({
      type: INCREMENT_ASYNC,
      value,
    }),
  };


  /*
   * mutations.js
   */

  export const INCREMENT = 'INCREMENT';
  export const INCREMENT_START = 'INCREMENT_START';
  export const INCREMENT_STOP = 'INCREMENT_STOP';

  export default {
    increment: (value = 1) => ({
      type: INCREMENT,
      value,
    }),
  };


  /*
   * store.js
   */

  import Vue from 'vue';
  import Vuex from 'vuex';
  import { INCREMENT, INCREMENT_START, INCREMENT_STOP } from './mutations';
  import { INCREMENT_ASYNC } from './actions';

  Vue.use(Vuex);

  export default new Vuex.Store({
    state: {
      count: 0,
      isIncrementing: false,
    },
    getters: {
      countGreaterThan2: (state, getters) => state.count > 2,
    },
    mutations: {
      [INCREMENT](state) {
        state.count += 1;
      },
      [INCREMENT_START](state) {
        state.isIncrementing = true;
      },
      [INCREMENT_STOP](state) {
        state.isIncrementing = false;
      },
    },
    actions: {
      [INCREMENT_ASYNC]({ commit, state }, payload) {
        commit(INCREMENT_START);
        return new Promise((resolve) => {
          setTimeout(() => {
            commit(INCREMENT);
            resolve();
          }, 500);
        }).then(() => commit(INCREMENT_STOP))
          .then(() => state.count);
      },
    },
  });
  ```

- use `Provider` in your app

  This will pass the store to all subcomponents of the app

  ```javascript
  /*
   * index.js
   */

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
  ```

- create your container component mapping state, dispatch, commit and getter to the store

  ```javascript
  /*
   * containers/MyContainer.js
   */

  import { connect } from 'react-vuex';
  import MyComponent from '../components/MyComponent';
  import mutations from '../mutations';
  import actions from '../actions';

  const mapStateToProps = (state, ownProps) => ({
    myCount: state.count,
  });
  const mapDispatchToProps = (dispatch, ownProps) => ({
    onIncrementAsync: val => dispatch(actions.incrementAsync(val)),
  });
  const mapCommitToProps = (commit, ownProps) => ({
    onIncrement: () => commit(mutations.increment()),
  });
  const mapGetterToProps = (getter, ownProps) => ({
    isGreaterThan2: getter.countGreaterThan2,
  });

  const MyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mapCommitToProps,
    mapGetterToProps,
  )(MyComponent);

  export default MyContainer;
  ```

- create your presentational component using mapped props

  ```javascript
  /*
   * components/MyComponent.js
   */

  import React from 'react';
  import PropTypes from 'prop-types';

  export default class MyComponent extends React.PureComponent {
    constructor(props, context) {
      super(props, context);
      this.handleInc = this.handleInc.bind(this);
      this.handleIncAsync = this.handleIncAsync.bind(this);
    }
    handleInc() {
      if (this.props.onIncrement) {
        this.props.onIncrement();
      }
    }
    handleIncAsync() {
      if (this.props.onIncrementAsync) {
        this.props.onIncrementAsync().then(() => {}));
      }
    }
    render() {
      return (
        <div>
          Count is {this.props.myCount !== undefined && `${this.props.myCount}, `}
          greater than 2: {this.props.isGreaterThan2 ? 'yes' : 'no'}
          {this.props.onIncrement &&
            <button onClick={this.handleInc}>Increment Sync</button>
          }
          {this.props.onIncrementAsync &&
            <button onClick={this.handleIncAsync}>Increment Async</button>
          }
        </div>
      );
    }
  }

  MyComponent.defaultProps = {
    children: undefined,
    isGreaterThan2: false,
    myCount: 0,
    onIncrement: undefined,
    onIncrementAsync: undefined,
  };

  MyComponent.propTypes = {
    children: PropTypes.node,
    isGreaterThan2: PropTypes.bool,
    myCount: PropTypes.number,
    onIncrement: PropTypes.func,
    onIncrementAsync: PropTypes.func,
  };
  ```

- use your container component in app

  ```javascript
  import React from 'react';
  import MyContainer from '../containers/MyContainer';

  export default class App extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        testValue: 123,
      };
    }

    render() {
      return (
        <div>
          <MyContainer />
        </div>
      );
    }
  }
  ```

## License

MIT

## Support on Beerpay or Liberapay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/dennybiasiolli/react-vuex/badge.svg?style=beer-square)](https://beerpay.io/dennybiasiolli/react-vuex)  [![Beerpay](https://beerpay.io/dennybiasiolli/react-vuex/make-wish.svg?style=flat-square)](https://beerpay.io/dennybiasiolli/react-vuex?focus=wish)

[![Donate with Liberapay](https://liberapay.com/assets/widgets/donate.svg)](https://liberapay.com/~36404/donate)
