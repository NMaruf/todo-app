import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task.css'

const cn = require('classnames')

export default class Task extends Component {
  constructor() {
    super()
    this.state = {
      editing: false,
      value: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { onEditItem, id } = this.props
    onEditItem(id, this.state.value)
    this.setState({ value: '' })
    this.setState({ editing: false })
  }

  render() {
    const { label, time, done, onDeleted, onToggleDone, id } = this.props

    const classNames = cn({
      completed: done,
      editing: this.state.editing,
    })

    return (
      <li className={classNames} id={id}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
          <label htmlFor={id}>
            <span className="description"> {label} </span>
            <span className="created">
              created
              {formatDistanceToNow(time, { includeSeconds: true, addSuffix: true })}
            </span>
          </label>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="icon icon-edit"
            onClick={() => this.setState(({ editing }) => ({ editing: !editing, value: label }))}
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {this.state.editing && (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              onChange={(event) => this.setState({ value: event.target.value })}
              type="text"
              className="edit"
              value={this.state.value}
            />
          </form>
        )}
      </li>
    )
  }
}

Task.propTypes = {
  // eslint-disable-next-line react/require-default-props
  label: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}
