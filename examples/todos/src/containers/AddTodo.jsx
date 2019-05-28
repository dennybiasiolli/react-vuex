import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-vuex'
import { addTodo } from '../actions'

const TodoForm = ({ onAddTodo }) => {
  const input = React.useRef(null)
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.current.value.trim()) {
          return
        }
        onAddTodo(input.current.value)
        input.current.value = ''
      }}>
        <input ref={input} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
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
