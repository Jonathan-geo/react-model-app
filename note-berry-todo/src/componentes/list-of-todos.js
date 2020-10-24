import React from 'react'
import {Motion, spring} from 'react-motion'
import PropTypes from 'prop-types';
import './list-of-todos.css';

const ITEM_HEIGHT = 80

export default ListOfTodos

function ListOfTodos({todos, onComplete, onDelete}) {
  return (
    <ol className="list" >
      {todos.map(todoToMotionTodo)}
    </ol>
  )

  function todoToMotionTodo(todo, index) {
    return (
      <Motion
        key={todo.id}
        style={{top: spring(index * ITEM_HEIGHT)}}
      >
        {getTodo}
      </Motion>
    )

    function getTodo(val) {
      return (
        <Todo
          style={{...val}}
          todo={todo.value}
          onComplete={() => onComplete(index)}
          onDelete={() => onDelete(index)}
        />
      )
    }
  }
}

ListOfTodos.propTypes = {
  todos: PropTypes.array,
  onComplete: PropTypes.func,
  onDelete: PropTypes.func,
}

function Todo({
  todo,
  onComplete,
  onDelete,
}) {
  return (
    <li className="task-text-list">
      <strong>{todo}</strong>
      <br />
      <button
        className="button-task"
        onClick={onComplete}
      >
        Tarefa Completa
      </button>
      <button
        className="button-task"
        onClick={verifyAndDelete}
      >
        Apagar Tarefa
      </button>
    </li>
  )

  function verifyAndDelete() {
    const result = window.confirm(`Você irá deletar o seguinte item: "${todo}"`) // eslint-disable-line no-alert
    if (result) {
      onDelete()
    }
  }
}

Todo.propTypes = {
  style: PropTypes.any,
  todo: PropTypes.string,
  onComplete: PropTypes.func,
  onDelete: PropTypes.func,
}
