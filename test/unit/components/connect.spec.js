import React from 'react';
import PropTypes from 'prop-types';
import Vue from 'vue';
import Vuex from 'vuex';
import renderer from 'react-test-renderer';
import connect from '@/components/connect';
import { STORE_KEY } from '@/constants';
import TestComponent from './TestComponent';

Vue.use(Vuex);

describe('connect', () => {
  const getInitialStore = () => ({
    state: {
      count: 12,
    },
    subscribe: jest.fn().mockReturnValue('foo'),
    getters: 'getters',
    dispatch: 'dispatch',
    commit: 'commit',
  });

  const getTestContainer = (
    _mapStateToProps_,
    _mapDispatchToProps_,
    _mapCommitToProps_,
    _mapGetterToProps_,
    _TestComponent_,
  ) => connect(
    _mapStateToProps_,
    _mapDispatchToProps_,
    _mapCommitToProps_,
    _mapGetterToProps_,
  )(_TestComponent_);

  beforeEach(() => {
    TestComponent.displayName = undefined;
  });

  describe('return class', () => {
    test('should assign Component\'s displayName', () => {
      TestComponent.displayName = 'foo';
      const TestContainer = getTestContainer(
        null,
        null,
        null,
        null,
        TestComponent,
      );
      expect(TestContainer.displayName).toBe(TestComponent.displayName);
    });

    test('should use Component\'s name as displayName', () => {
      const TestContainer = getTestContainer(
        null,
        null,
        null,
        null,
        TestComponent,
      );
      expect(TestContainer.displayName).toBe(TestComponent.name);
    });

    test('should use default name as displayName', () => {
      const TestContainer = getTestContainer(
        null,
        null,
        null,
        null,
        name => ({ [name]: class { } })[name],
      );
      expect(TestContainer.displayName).toBe('Component');
    });

    test('should have default properties', () => {
      const TestContainer = getTestContainer(
        null,
        null,
        null,
        null,
        TestComponent,
      );
      expect(TestContainer.WrappedComponent).toBe(TestComponent);
      expect(TestContainer.contextTypes[STORE_KEY]).toBe(PropTypes.object);
      expect(TestContainer.propTypes[STORE_KEY]).toBe(PropTypes.object);
      expect(TestContainer.propTypes.children).toBeDefined();
      expect(TestContainer.displayName).toBe(TestComponent.name);
    });
  });

  test('should works without store', () => {
    const TestContainer = getTestContainer(
      null,
      null,
      null,
      null,
      TestComponent,
    );
    const store = getInitialStore();
    const component = renderer.create((
      <TestContainer />
    ));
    const instance = component.getInstance();
    expect(instance.state).toEqual({});
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(store.subscribe).not.toHaveBeenCalled();

    expect(instance.unsubscribeFn).toBeNull();
    component.unmount();
  });

  test('should works without mapping', () => {
    const TestContainer = getTestContainer(
      null,
      null,
      null,
      null,
      TestComponent,
    );
    const store = getInitialStore();
    const component = renderer.create((
      <TestContainer $store={store} />
    ));
    const instance = component.getInstance();
    expect(instance.state).toEqual({});
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(store.subscribe).not.toHaveBeenCalled();

    expect(instance.unsubscribeFn).toBeNull();
    component.unmount();
  });

  test('should works calling mapStateToPropsFn', () => {
    const mapStateToPropsFn = jest.fn();
    const TestContainer = getTestContainer(
      mapStateToPropsFn,
      null,
      null,
      null,
      TestComponent,
    );
    const store = getInitialStore();
    const component = renderer.create((
      <TestContainer $store={store} />
    ));
    const instance = component.getInstance();
    expect(instance.state).toEqual({});
    expect(mapStateToPropsFn).toHaveBeenCalledWith(store.state, instance.props);
    expect(store.subscribe).not.toHaveBeenCalled();

    expect(instance.unsubscribeFn).toBeNull();
    component.unmount();
  });

  test('should works calling mapGetterToPropsFn', () => {
    const mapGetterToPropsFn = jest.fn();
    const TestContainer = getTestContainer(
      null,
      null,
      null,
      mapGetterToPropsFn,
      TestComponent,
    );
    const store = getInitialStore();
    const component = renderer.create((
      <TestContainer $store={store} />
    ));
    const instance = component.getInstance();
    expect(instance.state).toEqual({});
    expect(mapGetterToPropsFn).toHaveBeenCalledWith(store.getters, instance.props);
    expect(store.subscribe).not.toHaveBeenCalled();

    expect(instance.unsubscribeFn).toBeNull();
    component.unmount();
  });

  test('should works calling mapDispatchToPropsFn', () => {
    const mapDispatchToPropsFn = jest.fn();
    const TestContainer = getTestContainer(
      null,
      mapDispatchToPropsFn,
      null,
      null,
      TestComponent,
    );
    const store = getInitialStore();
    const component = renderer.create((
      <TestContainer $store={store} />
    ));
    const instance = component.getInstance();
    expect(instance.state).toEqual({});
    expect(mapDispatchToPropsFn).toHaveBeenCalledWith(store.dispatch, instance.props);
    expect(store.subscribe).not.toHaveBeenCalled();

    expect(instance.unsubscribeFn).toBeNull();
    component.unmount();
  });

  test('should works calling mapCommitToPropsFn', () => {
    const mapCommitToPropsFn = jest.fn();
    const TestContainer = getTestContainer(
      null,
      null,
      mapCommitToPropsFn,
      null,
      TestComponent,
    );
    const store = getInitialStore();
    const component = renderer.create((
      <TestContainer $store={store} />
    ));
    const instance = component.getInstance();
    expect(instance.state).toEqual({});
    expect(mapCommitToPropsFn).toHaveBeenCalledWith(store.commit, instance.props);
    expect(store.subscribe).not.toHaveBeenCalled();

    expect(instance.unsubscribeFn).toBeNull();
    component.unmount();
  });

  test('should subscribe to the store if has a mappedState', () => {
    const mapStateToPropsFn = jest.fn().mockReturnValue({});
    const TestContainer = getTestContainer(
      mapStateToPropsFn,
      null,
      null,
      null,
      TestComponent,
    );
    const store = getInitialStore();
    const component = renderer.create((
      <TestContainer $store={store} />
    ));
    const instance = component.getInstance();
    expect(instance.state).toEqual({});
    expect(mapStateToPropsFn).toHaveBeenCalledWith(store.state, instance.props);
    expect(store.subscribe).toHaveBeenCalled();

    expect(instance.unsubscribeFn).toBe('foo');
    instance.unsubscribeFn = jest.fn();
    component.unmount();
    expect(instance.unsubscribeFn).toHaveBeenCalledWith();
  });

  test('should work with real store mutations', () => {
    const TestContainer = getTestContainer(
      (state, ownProps) => ({
        myCount: state.count,
        myCount2: state.count + ownProps.count,
      }),
      null,
      null,
      null,
      TestComponent,
    );
    const store = new Vuex.Store({
      state: {
        count: 12,
      },
      mutations: {
        inc(state) {
          state.count += 1; // eslint-disable-line no-param-reassign
        },
        foo() { },
      },
    });
    jest.spyOn(store, 'subscribe');
    const component = renderer.create((
      <TestContainer $store={store} count={12} />
    ));
    const instance = component.getInstance();
    expect(instance.state.myCount).toBe(12);
    expect(instance.state.myCount2).toBe(24);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(store.subscribe).toHaveBeenCalled();
    store.commit('foo');
    expect(instance.state.myCount).toBe(12);
    expect(instance.state.myCount2).toBe(24);
    store.commit('inc');
    expect(instance.state.myCount).toBe(13);
    expect(instance.state.myCount2).toBe(25);

    jest.spyOn(console, 'error');
    expect(typeof instance.unsubscribeFn).toBe('function');
    component.unmount();
    store.commit('inc');
    expect(console.error).not.toHaveBeenCalled();

    console.error.mockRestore();
  });

  test('should work with real store mutations and getters', () => {
    const TestContainer = getTestContainer(
      (state, ownProps) => ({
        myCount: state.count,
        myCount2: state.count + ownProps.count,
      }),
      null,
      null,
      getter => ({
        isGreaterThan2: getter.countGreaterThan2,
      }),
      TestComponent,
    );
    const store = new Vuex.Store({
      state: {
        count: 0,
      },
      getters: {
        countGreaterThan2: state => state.count > 2,
      },
      mutations: {
        inc(state) {
          state.count += 1; // eslint-disable-line no-param-reassign
        },
        foo() { },
      },
    });
    jest.spyOn(store, 'subscribe');
    const component = renderer.create((
      <TestContainer $store={store} count={12} />
    ));
    const instance = component.getInstance();
    expect(instance.state.myCount).toBe(0);
    expect(instance.state.myCount2).toBe(12);
    expect(instance.state.isGreaterThan2).toBeDefined();
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(store.subscribe).toHaveBeenCalled();
    store.commit('foo');
    expect(instance.state.myCount).toBe(0);
    expect(instance.state.myCount2).toBe(12);
    expect(instance.state.isGreaterThan2).toBeDefined();
    store.commit('inc');
    expect(instance.state.myCount).toBe(1);
    expect(instance.state.myCount2).toBe(13);
    expect(instance.state.isGreaterThan2).toBeDefined();
    store.commit('inc');
    expect(instance.state.myCount).toBe(2);
    expect(instance.state.myCount2).toBe(14);
    expect(instance.state.isGreaterThan2).toBeDefined();
    store.commit('inc');
    expect(instance.state.myCount).toBe(3);
    expect(instance.state.myCount2).toBe(15);
    expect(instance.state.isGreaterThan2).toBeDefined();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    jest.spyOn(console, 'error');
    expect(typeof instance.unsubscribeFn).toBe('function');
    component.unmount();
    store.commit('inc');
    expect(console.error).not.toHaveBeenCalled();

    console.error.mockRestore();
  });
});
