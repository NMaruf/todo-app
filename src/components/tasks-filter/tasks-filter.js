import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends Component {
  render() {
    const { onChangeFilter, filter } = this.props
    const all = 'All'
    const completed = 'Completed'
    const active = 'Active'
    const selected = 'selected'

    return (
      <ul className="filters">
        <li>
          <button type="button" className={filter === all ? selected : null} onClick={() => onChangeFilter(all)}>
            All
          </button>
        </li>
        <li>
          <button type="button" className={filter === active ? selected : null} onClick={() => onChangeFilter(active)}>
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === completed ? selected : null}
            onClick={() => onChangeFilter(completed)}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.defaultProps = { filter: 'All' }

TasksFilter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}
