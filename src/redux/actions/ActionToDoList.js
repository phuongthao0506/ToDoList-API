import Axios from 'axios'
import { GET_TASK_LIST } from '../constant/ToDoListConstant'


export const getTaskListApi = () => {
    // tiền xử lý dữ liệu => xử lý function 
    // trả về 1 dispatch 
    return async dispatch =>{
        try{
            let {data,status,...res} = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
              })
            if(status === 200){
                dispatch({
                    type:GET_TASK_LIST,
                    taskList: data
                })
            }

             
        }catch(err) {
            console.log(err);
        }
       

    }

}

export const addTaskApi = (taskName) => {

    return dispatch =>{
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: "POST",
            data:  {taskName:taskName}
          })
      
          promise.then((result) => {
            // render lai giao dien phải gọi dispatch
            dispatch(getTaskListApi()) 
      
          })
          promise.catch((error) => {
      
           
      
          })

    }
  
}

export const removeTaskApi = (taskName) => {

    return async dispatch =>{
        try {
            let {data,status,...res} =  await Axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'DELETE'
          
              })
              if(status === 200){
                  dispatch(getTaskListApi())
              }
            
        } catch (error) {
            console.log(error);
            
        }
       
      
         

    }
  
}
export const doneTaskkApi = (taskName) => {

    return dispatch =>{
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
      
          })
      
          promise.then((result) => {
            alert(result.data);
            dispatch(getTaskListApi()) 
          })
      
          promise.catch((err) => {
            alert(err.response.data)
      
          })
    }
  
}


export const undoTaskApi = (taskName) => {

    return dispatch =>{
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
          });
      
          promise.then((result) => {
            alert(result.data);
            dispatch(getTaskListApi()) 
          })
      
          promise.catch((err) => {
            alert(err.response.data)
      
          })

    }
  
}



