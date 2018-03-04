import React from 'react';
import VisibleChild1 from '../containers/VisibleChild1';
import VisibleChild2 from '../containers/VisibleChild2';
import VisibleChild3 from '../containers/VisibleChild3';

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
        <VisibleChild1 />
        <VisibleChild2 />
        <VisibleChild3 />
        <VisibleChild3 test={this.state.testValue}>
          <p>&nbsp;&nbsp;- Great!</p>
        </VisibleChild3>
      </div>
    );
  }
}
