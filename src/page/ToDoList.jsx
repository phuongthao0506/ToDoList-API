import React, { useState, useEffect } from 'react'
import './Todolist.css'
import Axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import { addTaskApi, getTaskListApi,removeTaskApi,undoTaskApi,doneTaskkApi } from '../redux/actions/ActionToDoList'

export default function ToDoList(props) {

  useEffect(() => {
    getTaskList()
  }, [])

const {taskList} = useSelector(state => state.ToDoListReducer )
const dispatch = useDispatch()


  let [state, setState] = useState({
 
    value: {
      taskName: ''
    },
    error: {
      taskName: ''
    }
  })

  // lay du lieu api  
  const getTaskList = () => {
    dispatch(getTaskListApi())
  }

  const renderTaskToDo = () => {
    return taskList.filter(task => !task.status).map((item, index) => {
      return <li key={index} >
        <span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove" type='button' onClick={() => { remove(item.taskName) }}>
            <i className="fa fa-trash-alt" />
          </button>
          <button className="complete" type='button' onClick={() => { doneTask(item.taskName) }}>
            <i className="far fa-check-circle" />

          </button>
        </div>
      </li >

    })
  }

  const renderTaskToDoDone = () => {
    return taskList.filter(task => task.status).map((item, index) => {
      return <li key={index} >
        <span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove" type='button' onClick={() => { remove(item.taskName) }}>
            <i className="fa fa-trash-alt" />
          </button>
          <button className="complete" type='button' onClick={() => { undoTask(item.taskName) }} >

            <i className="fa fa-undo-alt"></i>
          </button>
        </div>
      </li >

    })
  }

  const handleChange = (e) => {

    let { value, name } = e.target
    let newValue = { ...state.value, [name]: value }
    let newErr = { ...state.error }

    if (value.trim() === "") {

      newErr[name] = "Task name is invalid "
    } else {
      newErr[name] = ""
    }
    setState({
      ...state,
      value: newValue,
      error: newErr

    })


  }

  const addTask = (e) => {
    e.preventDefault()
    // Gửi dữ liệu lên api 


    if (state.value.taskName.trim() === '') {
      setState(
        { ...state, error: { taskName: "Task name is invalid " }}
      )
      return
    }
    dispatch(addTaskApi(state.value.taskName))
    
  
  

  }

  const remove = (taskName) => {
    dispatch(removeTaskApi(taskName))

  }

  const doneTask = (taskName) => {
    dispatch(doneTaskkApi(taskName))
  }

  const undoTask = (taskName) => {
    dispatch(undoTaskApi(taskName))
  }


  return (
    <form onSubmit={addTask}>

      <div className="card">
        <div className="card__header">
          <img src='./img/bg.png' alt='' />
        </div>
        {/* <h2>hello!</h2> */}
        <div className="card__body">
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>September 9,2020</p>
            </div>
            <div className="card__add">
              <input onChange={handleChange} id="newTask" type="text" placeholder="Enter an activity..." name="taskName" />
              <button id="addItem" onClick={addTask}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <p className="text-danger"> {state.error.taskName}</p>

            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {renderTaskToDoDone()}

              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
