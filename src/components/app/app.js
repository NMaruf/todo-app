import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      todoData: [],
      filter: 'All',
    }
    this.maxId = 100
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        const newArr = todoData.map((el) => {
          if (el.taskTimer === 0) {
            return el
          }
          if (!el.pause) {
            // eslint-disable-next-line no-param-reassign
            el.taskTimer -= 1
          }
          return el
        })
        return { todoData: newArr }
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  filterItems = () => {
    const { todoData, filter } = this.state

    const completed = 'Completed'
    const active = 'Active'

    if (filter === completed) {
      return [...todoData].filter((el) => el.done === true)
    }
    if (filter === active) {
      return [...todoData].filter((el) => el.done === false)
    }
    return [...todoData]
  }

  changeFilter = (data) => {
    this.setState({ filter: data })
  }

  addItem = (text, timer = 10) => {
    const newItem = this.createTodoItem(text, timer)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]

      return { todoData: newArr }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return { todoData: newArray }
    })
  }

  editItem = (ident, text) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((element) => {
        // eslint-disable-next-line no-param-reassign
        if (element.id === ident) element.label = text
        return element
      }),
    }))
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({ todoData: this.toggleProperty(todoData, id, 'done') }))
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const data = [...todoData].filter((el) => !el.done)

      return { todoData: data }
    })
  }

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newObj = [{ ...todoData[idx], pause: true }]
      const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)]
      return { todoData: newData }
    })
  }

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newObj = [{ ...todoData[idx], pause: false }]
      const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)]
      return { todoData: newData }
    })
  }

  // eslint-disable-next-line class-methods-use-this
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  createTodoItem(label, taskTimer) {
    return {
      label,
      done: false,
      time: new Date(),
      taskTimer,
      pause: true,
      id: this.maxId++,
    }
  }

  render() {
    const { todoData, filter } = this.state

    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddedItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={this.filterItems()}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            /* eslint-disable-next-line react/jsx-no-bind */
            onEditItem={this.editItem.bind(this)}
            onStartTimer={this.startTimer}
            onStopTimer={this.stopTimer}
          />
          <Footer
            todo={todoCount}
            onClearCompleted={this.clearCompleted}
            onChangeFilter={this.changeFilter}
            filter={filter}
          />
        </section>
      </section>
    )
  }
}
