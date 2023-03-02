import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, onEditItem, onStartTimer, onStopTimer } = this.props

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item

      return (
        <Task
          {...itemProps}
          key={id}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onEditItem={onEditItem}
          id={id}
          onStartTimer={() => onStartTimer(id)}
          onStopTimer={() => onStopTimer(id)}
        />
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}

TaskList.defaultProps = { todos: {} }

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}
