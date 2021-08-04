import { connect } from 'react-vuex';
import Child1 from '../components/Child1';

const mapGetterToProps2 = (getter/* , ownProps */) => ({
  isGreaterThan2: getter.countGreaterThan2,
});

const VisibleChild2 = connect(
  () => ({}),
  () => ({}),
  () => ({}),
  mapGetterToProps2,
)(Child1);

export default VisibleChild2;
