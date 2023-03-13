import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

import './footer.css'

function Footer({ onClearCompleted, onChangeFilter, filter, todo }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todo} items left</span>
      <TasksFilter onChangeFilter={onChangeFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  filter: 'All',
  todo: '',
}

Footer.propTypes = {
  todo: PropTypes.number,
  onClearCompleted: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}

export default Footer
