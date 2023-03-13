import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

function NewTaskForm({ onAddedItem }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (label !== '') {
        const minutes = parseInt(min, 10) * 60
        const seconds = parseInt(sec, 10)
        let time

        if (Number.isNaN(minutes) && Number.isNaN(seconds)) {
          time = 0
        } else if (Number.isNaN(minutes) && !Number.isNaN(seconds)) {
          time = seconds
        } else if (Number.isNaN(seconds) && !Number.isNaN(minutes)) {
          time = minutes
        } else {
          time = minutes + seconds
        }

        if (time > 0) {
          onAddedItem(label, time)
        } else if (time === 0) {
          onAddedItem(label, 300)
        }

        setLabel('')
        setMin('')
        setSec('')
      }
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form className="new-todo-form" onKeyDown={onClickEnter}>
      <input className="new-todo" placeholder="Task" value={label} onChange={(e) => setLabel(e.target.value)} />
      <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={(e) => setMin(e.target.value)} />
      <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={(e) => setSec(e.target.value)} />
    </form>
  )
}

NewTaskForm.propTypes = { onAddedItem: PropTypes.func.isRequired }

export default NewTaskForm
