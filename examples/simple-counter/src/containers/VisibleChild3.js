import { connect } from 'react-vuex';
import Child1 from '../components/Child1';

const mapStateToProps = (state, ownProps) => ({
  limitCount: 1002,
  myCount: state.mod1.count,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onIncrementAsync: val => dispatch('mod1/incrementAsync'),
});
const mapCommitToProps = (commit, ownProps) => ({
  onIncrement: () => commit('mod1/increment'),
});
const mapGetterToProps = (getter, ownProps) => ({
  isGreaterThan2: getter['mod1/countGreaterThan1002'],
});
const VisibleChild3 = connect(
  mapStateToProps,
  mapDispatchToProps,
  mapCommitToProps,
  mapGetterToProps,
)(Child1);

export default VisibleChild3;
