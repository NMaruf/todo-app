import React, { Component } from "react";

import NewTaskForm from '../new-task-form';
// import Task from '../task';
import TaskList from "../task-list";
import Footer from "../footer";

import './app.css'

export default class App extends Component {

    state = {
        todoData : [
            {label: 'Completed task', time: '17 seconds', id: 1},
            {label: 'Editing task', time: '5 minutes', id: 2},
            {label: 'Active task', time: '5 minutes', id: 3}
        ]
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id)

            const newArray = [
                ...todoData.slice(0, idx), ...todoData.slice(idx + 1)
            ]

            return {
                todoData: newArray
            }
        })
    }

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm/>
                </header>
                <section className="main">
                    <TaskList
                        todos={ this.state.todoData }
                        onDeleted={ this.deleteItem }/>
                    <Footer/>
                </section>
            </section>
        )
    }
}