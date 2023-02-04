import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends Component {
  render() {
    const { onChangeFilter, filter } = this.props

    return (
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'All' ? 'selected' : null} onClick={() => onChangeFilter('All')}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Active' ? 'selected' : null}
            onClick={() => onChangeFilter('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Completed' ? 'selected' : null}
            onClick={() => onChangeFilter('Completed')}
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
