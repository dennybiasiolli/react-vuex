import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-dom/test-utils';

import Provider from '@/components/Provider';
import { STORE_KEY } from '@/constants';

const store = { foo: 'bar' };

// const TestComponent = () => <div>saccsac</div>;
class TestComponent extends React.PureComponent {
  render() {
    return <div />;
  }
}
TestComponent.contextTypes = {
  [STORE_KEY]: PropTypes.object.isRequired,
};

describe('Provider', () => {
  test('should render correctly', () => {
    const component = renderer.create((
      <Provider store={store}>
        <TestComponent />
      </Provider>
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should have expected propTypes', () => {
    expect(Provider.propTypes.store)
      .toEqual(PropTypes.object.isRequired);
    expect(Provider.propTypes.children)
      .toEqual(PropTypes.node.isRequired);
  });

  test('should have expected childContextTypes', () => {
    expect(Provider.childContextTypes[STORE_KEY])
      .toEqual(PropTypes.object.isRequired);
  });

  test('should add the store to the child context', () => {
    const tree = renderIntoDocument((
      <Provider store={store}>
        <TestComponent />
      </Provider>
    ));
    const child = findRenderedComponentWithType(tree, TestComponent);
    expect(child.context[STORE_KEY]).toBe(store);
  });
});
