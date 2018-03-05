## API

<a id="provider"></a>
### `<Provider store>`

Makes the Vuex store available to the `connect()` calls in the component hierarchy below. Normally, you can’t use `connect()` without wrapping a parent or ancestor component in `<Provider>`.

#### Props

* `store` (*[Vuex Store](https://vuex.vuejs.org/en/api.html)*): The single Vuex store in your application.
* `children` (*ReactElement*) The root of your component hierarchy.

#### Example

##### Vanilla React

```js
ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
  rootEl
)
```

##### React Router

```js
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
```


<a id="connect"></a>
### `connect([mapStateToProps], [mapDispatchToProps], [mapCommitToProps], [mapGetterToProps])`

Connects a React component to a Vuex store.

It does not modify the component class passed to it; instead, it *returns* a new, connected component class for you to use.

<a id="connect-arguments"></a>
#### Arguments

* [`mapStateToProps(state, [ownProps]): stateProps`] \(*Function*): If this argument is specified, the new component will subscribe to Vuex store updates. This means that any time the store is updated, `mapStateToProps` will be called. The results of `mapStateToProps` must be a plain object, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass `null` or `undefined` in place of `mapStateToProps`.

  If your `mapStateToProps` function is declared as taking two parameters, it will be called with the store state as the first parameter and the props passed to the connected component as the second parameter, and will also be re-invoked whenever the connected component receives new props as determined by shallow equality comparisons. (The second parameter is normally referred to as `ownProps` by convention.)

  > The `mapStateToProps` function's first argument is the entire Vuex store’s state and it returns an object to be passed as props.

* [`mapDispatchToProps(dispatch, [ownProps]): dispatchProps`] \(*Function*): If an object is passed, each function inside it is assumed to be a Vuex action creator. An object with the same function names, but with every action creator wrapped into a `dispatch` call so they may be invoked directly, will be merged into the component’s props.

  It will be given `dispatch` as the first parameter. It’s up to you to return an object that somehow uses `dispatch` to bind action creators in your own way.

  If your `mapDispatchToProps` function is declared as taking two parameters, it will be called with `dispatch` as the first parameter and the props passed to the connected component as the second parameter, and will be re-invoked whenever the connected component receives new props. (The second parameter is normally referred to as `ownProps` by convention.)

  If you do not supply your own `mapDispatchToProps` function full of action creators, the default `mapDispatchToProps` implementation just injects `dispatch` into your component’s props.

* [`mapCommitToProps(commit, [ownProps]): commitProps`] \(*Function*): If an object is passed, each function inside it is assumed to be a Vuex mutation creator. An object with the same function names, but with every mutation creator wrapped into a `commit` call so they may be invoked directly, will be merged into the component’s props.

  It will be given `commit` as the first parameter. It’s up to you to return an object that somehow uses `commit` to bind mutation creators in your own way.

  If your `mapCommitToProps` function is declared as taking two parameters, it will be called with `commit` as the first parameter and the props passed to the connected component as the second parameter, and will be re-invoked whenever the connected component receives new props. (The second parameter is normally referred to as `ownProps` by convention.)

  If you do not supply your own `mapCommitToProps` function full of mutation creators, the default `mapCommitToProps` implementation just injects `commit` into your component’s props.

* [`mapGetterToProps(getters, [ownProps]): stateProps`] \(*Function*): If this argument is specified, the new component will subscribe to Vuex store getter updates. This means that any time the store getter is updated, `mapGetterToProps` will be called. The results of `mapGetterToProps` must be a plain object, which will be merged into the component’s props. If you don't want to subscribe to store getter updates, pass `null` or `undefined` in place of `mapGetterToProps`.

  If your `mapGetterToProps` function is declared as taking two parameters, it will be called with the store getters as the first parameter and the props passed to the connected component as the second parameter, and will also be re-invoked whenever the connected component receives new props as determined by shallow equality comparisons. (The second parameter is normally referred to as `ownProps` by convention.)

  > The `mapGetterToProps` function's first argument is the entire Vuex store’s state and it returns an object to be passed as props.


#### Returns

A higher-order React component class that passes state and action creators into your component derived from the supplied arguments. This is created by `connectAdvanced`, and details of this higher-order component are covered there.

<a id="connect-examples"></a>
#### Examples

##### Inject `todos`

```js
function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps)(TodoApp)
```

#####  Inject `todos` and `onAddTodo`

```js
import { addTodo } from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  onAddTodo: (id) => dispatch(addTodo(id))
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

##### Inject `todos` of a specific user depending on props

```js
function mapStateToProps(state, ownProps) {
  return { todos: state.todos[ownProps.userId] }
}

export default connect(mapStateToProps)(TodoApp)
```

#### Remarks

* Since `connect` returns a higher-order component, it needs to be invoked two times. The first time with its arguments as described above, and a second time, with the component: `connect(selectorFactory)(MyComponent)`.

* `connect` does not modify the passed React component. It returns a new, connected component, that you should use instead.
