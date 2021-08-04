import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo
        key={todo.id}
        onClick={() => onTodoClick(todo.id)}
        completed={todo.completed}
        text={todo.text}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
