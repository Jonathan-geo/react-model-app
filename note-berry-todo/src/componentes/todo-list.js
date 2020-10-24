import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import ListOfTodos from './list-of-todos'
import AddTodo from './add-todo'
import './todo-list.css';
export default TodoList

function TodoList({
  todoList,
  onAddTodo,
  onCompleteTodo,
  onDeleteTodo,
  onRenameList,
  onDeleteList,
}) {
  return (
    <div>
      <form className="form-list"
        onSubmit={onDeleteSubmit}
      >
        <h2 className="h2-text" onClick={onNameClick}>Lista Selecionada:    {todoList.name}</h2>
        <button type="submit" className="button-delete">Delete List</button>
      </form>

      <AddTodo
        onAdd={onAddTodo}
      />
      
      <ListOfTodos
        todos={todoList.todos}
        onComplete={onCompleteTodo}
        onDelete={onDeleteTodo}
      />
    </div>
  )

  function onDeleteSubmit(event) {
    event.preventDefault()
    const result = window.confirm(`Do you want to delete the ${todoList.name} list?`)
    if (result) {
      onDeleteList(todoList)
    }
  }

  function onNameClick(event) {
    event.preventDefault()
    const result = window.prompt(`Rename ${todoList.name} to:`)
    if (result) {
      onRenameList(todoList, result)
    }
  }
}

TodoList.propTypes = {
  todoList: PropTypes.shape({
    name: PropTypes.string,
    list: PropTypes.array,
  }).isRequired,
  onAddTodo: PropTypes.func,
  onCompleteTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func,
  onRenameList: PropTypes.func,
  onDeleteList: PropTypes.func,
}
