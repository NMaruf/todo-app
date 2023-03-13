import React, { useState, useEffect } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')
  const [maxId, setMaxId] = useState(100)

  const filterItems = () => {
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

  const changeFilter = (data) => setFilter(data)

  const createTodoItem = (label, taskTimer) => ({
    label,
    done: false,
    time: new Date(),
    taskTimer,
    pause: true,
    id: maxId,
  })

  const addItem = (text, timer) => {
    setMaxId((v) => v + 1)
    const newItem = createTodoItem(text, timer)

    setTodoData([...todoData, newItem])
  }

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    setTodoData([...todoData.slice(0, idx), ...todoData.slice(idx + 1)])
  }

  const editItem = (ident, text) => {
    const idx = todoData.findIndex((el) => el.id === ident)
    todoData[idx].label = text

    setTodoData([...todoData.slice(0, idx), todoData[idx], ...todoData.slice(idx + 1)])
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(todoData, id, 'done'))
  }

  const clearCompleted = () => {
    const data = [...todoData].filter((el) => !el.done)

    setTodoData([...data])
  }

  const stopTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const newObj = [{ ...todoData[idx], pause: true }]

    setTodoData([...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)])
  }

  const startTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const newObj = [{ ...todoData[idx], pause: false }]

    setTodoData([...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)])
  }

  useEffect(() => {
    const timeout = setInterval(() => {
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
      setTodoData([...newArr])
    }, 1000)

    return () => clearTimeout(timeout)
  }, [todoData])

  const doneCount = todoData.filter((el) => el.done).length
  const todoCount = todoData.length - doneCount

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddedItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={filterItems()}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onEditItem={editItem}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer todo={todoCount} onClearCompleted={clearCompleted} onChangeFilter={changeFilter} filter={filter} />
      </section>
    </section>
  )
}

export default App
