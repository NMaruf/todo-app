import React, { Component } from "react";

import NewTaskForm from '../new-task-form';
import Task from '../task';
import TaskList from "../task-list";
import Footer from "../footer";

import './app.css'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData : [
            this.createTodoItem("Completed task"),
            this.createTodoItem("Editing task"),
            this.createTodoItem("Active task")
        ],
        filter: "All"
    }

    createTodoItem(label) {
        return {
            label,
            done: false,
            time: '17 seconds',
            id: this.maxId++
        }

    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(( { todoData } ) => {
            const newArr = [
                ...todoData,
                newItem
            ]

            return {
                todoData: newArr
            }
        })
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

    toggleProperty(arr, id, propName ) {
        const idx = arr.findIndex((el) => el.id === id)

        const oldItem = arr[idx]
        const newItem = {...oldItem, [propName]: !oldItem[propName] }

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }

    onToggleDone = (id) => {
        this.setState(( {todoData} ) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    clearCompleted = () => {
        this.setState( ( {todoData} ) => {

            const data = [...todoData].filter((el) => !el.done)

            return {
                todoData: data
            }
        })
    }

    filteredItems = () => {

        const { todoData, filter } = this.state

        if ( filter === "Completed") {
            return [...todoData].filter((el) => el.done === true )
        } else if ( filter === "Active" ) {
            return [...todoData].filter((el) => el.done === false )
        } else if ( filter === "All" ) {
            return [...todoData]
        }
    }

    changeFilter = (data) => {
        this.setState(() => {
            return {
                filter: data
            }
        })
    }

    render() {
        const { todoData, filter } = this.state;

        const doneCount = todoData
            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm
                        onAddedItem={ this.addItem }/>
                </header>
                <section className="main">
                    <TaskList
                        todos={ this.filteredItems() }
                        onDeleted={ this.deleteItem }
                        onToggleDone={ this.onToggleDone }/>
                    <Footer
                        todo={ todoCount }
                        onClearCompleted={ this.clearCompleted }
                        onChangeFilter={ this.changeFilter }
                        filter={ filter }
                        />
                </section>
            </section>
        )
    }
}