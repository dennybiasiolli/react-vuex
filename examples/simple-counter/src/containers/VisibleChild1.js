import { connect } from 'react-vuex';
import Child1 from '../components/Child1';
import mutations from '../mutations';
import actions from '../actions';

const mapStateToProps = (state/* , ownProps */) => ({
  myCount: state.count,
});
const mapDispatchToProps = (dispatch/* , ownProps */) => ({
  onIncrementAsync: (val) => dispatch(actions.incrementAsync(val)),
});
const mapCommitToProps = (commit/* , ownProps */) => ({
  onIncrement: () => commit(mutations.increment()),
});
const mapGetterToProps = (getter/* , ownProps */) => ({
  isGreaterThan2: getter.countGreaterThan2,
});

const VisibleChild1 = connect(
  mapStateToProps,
  mapDispatchToProps,
  mapCommitToProps,
  mapGetterToProps,
)(Child1);

export default VisibleChild1;
