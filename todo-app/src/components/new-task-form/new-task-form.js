import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = { label: '' }
  }

  onLabelChange = (e) => {
    this.setState({ label: e.target.value })
  }

  onSubmit = (e) => {
    const { label } = this.state
    const { onAddedItem } = this.props
    e.preventDefault()
    onAddedItem(label)
    this.setState({ label: '' })
  }

  render() {
    const { label } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" value={label} onChange={this.onLabelChange} />
      </form>
    )
  }
}

NewTaskForm.propTypes = { onAddedItem: PropTypes.func.isRequired }
