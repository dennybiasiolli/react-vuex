import React from 'react';
import PropTypes from 'prop-types';

export default class TestComponent extends React.PureComponent {
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
      this.props.onIncrementAsync().then(console.log);
    }
  }
  render() {
    return (
      <div>
        I am a Child1
        {this.props.test && ` with props test = ${this.props.test}`},
        count is {this.props.myCount !== undefined && `${this.props.myCount}, `}
        greater than {this.props.limitCount || 2}: {this.props.isGreaterThan2 ? 'yes' : 'no'}
        {this.props.onIncrement &&
          <button onClick={this.handleInc}>Test</button>
        }
        {this.props.onIncrementAsync &&
          <button onClick={this.handleIncAsync}>Test async</button>
        }
        {this.props.children}
      </div>
    );
  }
}

TestComponent.defaultProps = {
  children: undefined,
  isGreaterThan2: false,
  limitCount: 2,
  myCount: 0,
  test: undefined,
  onIncrement: undefined,
  onIncrementAsync: undefined,
};

TestComponent.propTypes = {
  children: PropTypes.node,
  isGreaterThan2: PropTypes.bool,
  limitCount: PropTypes.number,
  myCount: PropTypes.number,
  test: PropTypes.number,
  onIncrement: PropTypes.func,
  onIncrementAsync: PropTypes.func,
};
