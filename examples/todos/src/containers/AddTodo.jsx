import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-vuex'
import { addTodo } from '../actions'

class TodoForm extends React.Component {
  render() {
    let input
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          this.props.onAddTodo(input.value)
          input.value = ''
        }}>
          <input ref={node => {
            input = node
          }} />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }
}
TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddTodo: (value) => dispatch(addTodo(value))
})

const AddTodo = connect(
  () => { },
  mapDispatchToProps
)(TodoForm)

export default AddTodo
