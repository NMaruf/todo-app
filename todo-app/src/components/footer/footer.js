import React, { Component } from "react";
import TasksFilter from "../tasks-filter";

import './footer.css'

export default class Footer extends Component {

    render() {
        const { todo, onClearCompleted, onChangeFilter, filter } = this.props

        return(
            <footer className="footer">
                <span className="todo-count">{ todo } items left</span>
                <TasksFilter
                    onChangeFilter={ onChangeFilter }
                    filter={ filter }
                />
                <button className="clear-completed"
                        onClick={ onClearCompleted }>
                    Clear completed
                </button>
            </footer>
        )
    }
}

