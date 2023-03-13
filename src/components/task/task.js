import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../timer'
import './task.css'

const cn = require('classnames')

function Task({ label, time, done, onDeleted, onToggleDone, id, onStartTimer, onStopTimer, taskTimer, onEditItem }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onEditItem(id, value)
    setValue('')
    setEditing(false)
  }

  const onEdit = () => {
    setValue(label)
    setEditing((e) => !e)
  }

  const classNames = cn({
    completed: done,
    editing,
  })

  return (
    <li className={classNames} id={id}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
        <label htmlFor={id}>
          <span className="title">{`${label}`}</span>
          <Timer onStartTimer={() => onStartTimer(id)} onStopTimer={() => onStopTimer(id)} taskTimer={taskTimer} />
          <span className="description">
            created
            {formatDistanceToNow(time, { includeSeconds: true, addSuffix: true })}
          </span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEdit} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input onChange={(event) => setValue(event.target.value)} type="text" className="edit" value={value} />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  // eslint-disable-next-line react/require-default-props
  label: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}

export default Task
