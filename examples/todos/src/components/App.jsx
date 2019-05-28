import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

export default () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
