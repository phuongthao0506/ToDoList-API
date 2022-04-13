import { GET_TASK_LIST } from "../constant/ToDoListConstant"

const initialState = {
    taskList: []
}

const ToDoListReducer= (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_LIST :

            return { ...state,taskList: action.taskList}

        default:
            return state
    }
}
export default ToDoListReducer
