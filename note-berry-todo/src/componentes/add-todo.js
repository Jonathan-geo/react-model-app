import React from 'react'
import PropTypes from 'prop-types'
import * as createReactClass from 'create-react-class'
import './add-todo.css';

const AddTodo = createReactClass({
  propTypes: {
    onAdd: PropTypes.func,
  },
  getInitialState() {
    return {todoInput: ''}
  },
  render() {
    return (
      <form onSubmit={this._onAddSubmit} className="form-list">
        <input className="task-text-input"
          type="text"
          value={this.state.todoInput}
          onChange={this._onTodoInputChange}
        />
        <button className="button-add">
          Adicionar Tarefa
        </button>
      </form>
    )
  },
  _onAddSubmit(event) {
    event.preventDefault()
    if (this.state.todoInput) {
      this.props.onAdd(this.state.todoInput)
      this.setState({todoInput: ''})
    }
  },
  _onTodoInputChange(event) {
    this.setState({todoInput: event.target.value})
  },
})

export default AddTodo;