import React from 'react';
import PropTypes from 'prop-types';

const Child1 = ({
  test, myCount, limitCount, isGreaterThan2, onIncrement, onIncrementAsync,
  children,
}) => {
  function handleInc() {
    if (onIncrement) {
      onIncrement();
    }
  }

  function handleIncAsync() {
    if (onIncrementAsync) {
      // eslint-disable-next-line no-console
      onIncrementAsync().then(console.log);
    }
  }

  return (
    <div>
      I am a Child1
      {test && ` with props test = ${test}`}
      , count is&nbsp;
      {myCount !== undefined && `${myCount}, `}
      greater than&nbsp;
      {limitCount || 2}
      :&nbsp;
      {isGreaterThan2 ? 'yes' : 'no'}
      {onIncrement
        && <button type="button" onClick={handleInc}>Test</button>}
      {onIncrementAsync
        && <button type="button" onClick={handleIncAsync}>Test async</button>}
      {children}
    </div>
  );
};

Child1.defaultProps = {
  children: undefined,
  isGreaterThan2: false,
  limitCount: 2,
  myCount: 0,
  test: undefined,
  onIncrement: undefined,
  onIncrementAsync: undefined,
};

Child1.propTypes = {
  children: PropTypes.node,
  isGreaterThan2: PropTypes.bool,
  limitCount: PropTypes.number,
  myCount: PropTypes.number,
  test: PropTypes.number,
  onIncrement: PropTypes.func,
  onIncrementAsync: PropTypes.func,
};

export default Child1;
