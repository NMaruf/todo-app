import React, { Component } from 'react'

export default class Timer extends Component {
  render() {
    const { taskTimer, onStartTimer, onStopTimer } = this.props

    const minutes = Math.floor(taskTimer / 60)
      .toString()
      .padStart(2, '0')

    const seconds = Math.floor(taskTimer % 60)
      .toString()
      .padStart(2, '0')

    return (
      <span className="description">
        <button type="button" className="icon icon-play" onClick={onStartTimer} />
        <button type="button" className="icon icon-pause" onClick={onStopTimer} />
        {minutes} : {seconds}
      </span>
    )
  }
}
