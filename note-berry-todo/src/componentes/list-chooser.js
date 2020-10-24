import React from 'react'
import {PropTypes as pt} from 'prop-types' // eslint-disable-line no-unused-vars
import './list-chooser.css';

export default ListChooser

function ListChooser({lists, selectedListIndex, onAddList, onChange,}){
  return (
    <div>
      <form onSubmit={onAddSubmit} className="form-list">

          <select className="select-style"
            onChange={onSelectedListChange}
            value={selectedListIndex}
          >

            {lists.map((l, i) => <option className="option-style" value={i} key={l.id}>{l.name}</option>)}

          </select>
          <button type="submit" className="select-button">Criar um nova lista</button>

      </form>
    </div>
  )

  function onAddSubmit(event) {
    event.preventDefault()
    const name = window.prompt('Name your new list')
    if (!name) {
      return
    }
    onAddList(name)
  }

  function onSelectedListChange(event) {
    onChange(event.target.value)
  }
}

ListChooser.propTypes = {
  lists: pt.array.isRequired,
  selectedListIndex: pt.string.isRequired,
  onAddList: pt.func.isRequired,
  onChange: pt.func.isRequired,
}

