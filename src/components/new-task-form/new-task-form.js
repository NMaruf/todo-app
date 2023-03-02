import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = { label: '', min: '', sec: '' }
  }

  onLabelChangeLabel = (e) => {
    this.setState({ label: e.target.value })
  }

  onLabelChangeMin = (e) => {
    this.setState({ min: e.target.value })
  }

  onLabelChangeSec = (e) => {
    this.setState({ sec: e.target.value })
  }

  onClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (this.state.label !== '') {
        const minutes = parseInt(this.state.min, 10) * 60
        const seconds = parseInt(this.state.sec, 10)
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
          this.props.onAddedItem(this.state.label, time)
        } else if (time === 0) {
          this.props.onAddedItem(this.state.label, 300)
        }

        this.setState({
          label: '',
          min: '',
          sec: '',
        })
      }
    }
  }

  render() {
    const { label, min, sec } = this.state

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form className="new-todo-form" onKeyDown={this.onClickEnter}>
        <input className="new-todo" placeholder="Task" value={label} onChange={this.onLabelChangeLabel} />
        <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={this.onLabelChangeMin} />
        <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={this.onLabelChangeSec} />
      </form>
    )
  }
}

NewTaskForm.propTypes = { onAddedItem: PropTypes.func.isRequired }
