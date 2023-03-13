import React from 'react'

function Timer({ taskTimer, onStartTimer, onStopTimer }) {
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

export default Timer
