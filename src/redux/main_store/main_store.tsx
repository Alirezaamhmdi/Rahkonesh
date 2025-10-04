import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './reducers/login_reducer';
import projectsIdList ,{projectsContent }from './reducers/projects_reducer'
import usersList from './reducers/users';
import { task1stSlice , Date2Task , tasksGroupSlice} from './reducers/tasks';
const Store = configureStore ({ 
    reducer : {
        authentication : authenticationReducer ,
        projectsListReducer : projectsIdList , 
        projectsContent : projectsContent  ,
        usersList : usersList , 
        task1stSlice : task1stSlice.reducer , 
        date2Task : Date2Task.reducer , 
        tasksGroupSlice : tasksGroupSlice.reducer , 
        
    } , 

})
// This is the main store for the application, it is used to manage the state of the application
export type RootState = ReturnType<typeof Store.getState> ; 
export type AppDispatch = typeof Store.dispatch 

export default Store ; 

