import mutations from '../mutations'
import actions from '../actions'
import { Child1 } from './Child1'

const { connect } = ReactVuex

const mapStateToProps = (state, ownProps) => ({
  myCount: state.count
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  onIncrementAsync: (val) => dispatch(actions.incrementAsync(val))
})
const mapCommitToProps = (commit, ownProps) => ({
  onIncrement: () => commit(mutations.increment())
})
const mapGetterToProps = (getter, ownProps) => ({
  isGreaterThan2: getter.countGreaterThan2
})

export const VisibleChild1 = connect(
  mapStateToProps,
  mapDispatchToProps,
  mapCommitToProps,
  mapGetterToProps
)(Child1)


const mapGetterToProps2 = (getter, ownProps) => ({
  isGreaterThan2: getter.countGreaterThan2
})

export const VisibleChild2 = connect(
  () => ({}),
  () => ({}),
  () => ({}),
  mapGetterToProps2
)(Child1)


const mapStateToProps3 = (state, ownProps) => ({
  limitCount: 1002,
  myCount: state.mod1.count
})
const mapDispatchToProps3 = (dispatch, ownProps) => ({
  onIncrementAsync: (val) => dispatch('mod1/incrementAsync')
})
const mapCommitToProps3 = (commit, ownProps) => ({
  onIncrement: () => commit('mod1/increment')
})
const mapGetterToProps3 = (getter, ownProps) => ({
  isGreaterThan2: getter['mod1/countGreaterThan1002']
})
export const VisibleChild3 = connect(
  mapStateToProps3,
  mapDispatchToProps3,
  mapCommitToProps3,
  mapGetterToProps3
)(Child1)

export class Main extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      testValue: 123
    }
  }

  render() {
    setTimeout(() => {
      this.setState({
        testValue: this.state.testValue + 333
      })
    }, 2000);
    return (
      <div>
        <VisibleChild1 />
        <VisibleChild2 />
        <VisibleChild3 />
        <VisibleChild3 test={this.state.testValue}>
          <p>&nbsp;&nbsp;- Great job!</p>
        </VisibleChild3>
      </div>
    )
  }
}
