import { createSlice , type PayloadAction } from "@reduxjs/toolkit";
import {type Users} from './users.ts'
// interface firstLayer {
//     ID : string , 
//     workSpace : string , 
//     name : string , 
//     tags : string[] , 
//     Date : Date 
// }

export interface tasksGroup {  // A Group of tasks that give you 
    ID : string  ,
    name :  string ,
    color : string ,  
    tasksID : string[] 
}

export interface task1st { 
    ID : string , 
    workSpace : string , 
    GroupID : string ,   
    name : string , 
    tags : string[] , 
    subTasksID : string[] ,// they or forigne key of the other task 
    Start  : Date , 
    Deadline : Date , 
    members : Users[] ,
}
export const  groupsWorkspaceSlice = createSlice({ //برای جا به جا کردن تسک های داخل گروه ها 
    name : 'workspace_tasksGroups' , 
    initialState : new Map<string , tasksGroup>() , 
    reducers : {
        // add_group :  (state : Map<string , string[]> , actions : PayloadAction<tasksGroup>)=> {
        //     const Group = state.get(actions.payload.ID)
        //     if (!Group) { 
        //         state.set(actions.payload.ID , actions.payload)
        //     }else { 
        //         state.set(actions.payload.ID , {...Group , name : actions.payload.name , color : actions.payload.color })
        //     }
        // } , 
        // change_group_order  :( state : Map<string , string[]> , actions : PayloadAction<{workspaceID : string , target_index : number , GroupID : string}> ) {
        // }
    }
}) 


export const  tasksGroupSlice = createSlice({ //برای جا به جا کردن تسک های داخل گروه ها 
    name : 'groups_map' , 
    initialState : new Map<string , tasksGroup>() , 
    reducers : {
        add_group :  (state : Map<string , tasksGroup> , actions : PayloadAction<tasksGroup>)=> {
            const Group = state.get(actions.payload.ID)
            if (!Group) { 
                state.set(actions.payload.ID , actions.payload)
            }else { 
                state.set(actions.payload.ID , {...Group , name : actions.payload.name , color : actions.payload.color })
            }
        } , 
        dellGroup : (state : Map<string , tasksGroup> , action : PayloadAction<string>) => {
            state.delete(action.payload)
        },
        addTask : (state : Map<string , tasksGroup> , actions : PayloadAction<{GroupID : string , TaskID : string  }>) => {
            const group = state.get(actions.payload.GroupID ) 
            if (group && !group.tasksID.includes(actions.payload.TaskID)) group.tasksID.push(actions.payload.TaskID)
        },
        dellTask : (state : Map<string , tasksGroup> , actions : PayloadAction<{GroupID : string , TaskID : string  }>) => {
            const group = state.get(actions.payload.GroupID ) 
            if (group ) group.tasksID.filter((value) => {if(value != actions.payload.TaskID) return value !== actions.payload.TaskID} )
        },
        change : (state : Map<string , tasksGroup> , actions : PayloadAction<{id : string , Color ?: string , name ?: string , offset ?: number }>) => {
            const Group = state.get(actions.payload.id) ; 
            if (Group) { 
                state.set(actions.payload.id , {...Group , color : (actions.payload.Color) ? actions.payload.Color : Group.color , name : actions.payload.name ? actions.payload.name : Group.name   })
            }
        },
        changeTaskOrder : (state : Map<string , tasksGroup> , actions : PayloadAction<{GroupID : string , TaskID : string , target_index : number   }>) =>{
            const Group = state.get(actions.payload.GroupID) ; 
            if (Group) { 
                const task_index = Group.tasksID.indexOf(actions.payload.TaskID)
                const maxIndex = Math.max(task_index , actions.payload.target_index)
                const minIndex = task_index + actions.payload.target_index -maxIndex
                if (task_index > -1 ) {
                    Group.tasksID = [...Group.tasksID.slice(0 , minIndex ) ,...Group.tasksID.slice(minIndex + 1 , maxIndex) , Group.tasksID[minIndex] ,...Group.tasksID.slice(maxIndex , )]
                }
            }

        }


    }
})
export const task1stSlice = createSlice({ // ID -> task 
    name : "tasksMap" , 
    initialState :new  Map<string ,  task1st >()  , 
    reducers : {
        add : (state : Map<string ,  task1st > , action :  PayloadAction<{id : string , task : task1st }> ) =>{
            state.set(action.payload.id , action.payload.task )
        } , 
        del : (state : Map<string ,  task1st > , action : PayloadAction<{id : string}> ) => {
            state.delete(action.payload.id)
        }
    }
})
export const Date2Task = createSlice({
    name : "Date2Task"  , 
    initialState : new Map< Date , string[]>() , 
    reducers : {
        add : (state : Map< Date , string[]> , action : PayloadAction<task1st>) =>{
            const start = new Date()
            start.setFullYear(action.payload.Start.getFullYear())
            start.setMonth(action.payload.Start.getMonth())
            start.setDate(action.payload.Start.getDate())
            start.setHours(action.payload.Start.getHours())
            const startPoin = state.get( start )
            if (startPoin) {
                state.set(start , [...startPoin , action.payload.ID])
            }
            state.set( start , [action.payload.ID] )
        } , 
        changeDate : (state : Map< Date , string[]> , action : PayloadAction<task1st>) => {
            const start = new Date()
            start.setFullYear(action.payload.Start.getFullYear())
            start.setMonth(action.payload.Start.getMonth())
            start.setDate(action.payload.Start.getDate())
            start.setHours(action.payload.Start.getHours())
            {const StartPoin = state.get(start)
            if (StartPoin) { 
                if (StartPoin.length == 1 && StartPoin[0] == action.payload.ID){
                    state.delete(start)
                }else {
                    state.set(start , StartPoin.filter(
                        (val) => {
                            if (val == action.payload.ID ) return val
                        }
                    )
                )
                }}
            
            }
            {
            const startPoin = state.get(start)
            if (startPoin) {
                state.set(start , [...startPoin , action.payload.ID])
            }
            state.set(start , [action.payload.ID] )
        }
        }, 
        del : (state : Map< Date , string[]> , action : PayloadAction<task1st>) => {
            const start = new Date()
            start.setFullYear(action.payload.Start.getFullYear())
            start.setMonth(action.payload.Start.getMonth())
            start.setDate(action.payload.Start.getDate())
            start.setHours(action.payload.Start.getHours())
            const StartPoint = state.get(action.payload.Start) // id of object 
            if (StartPoint) { 
                if (StartPoint.length == 1 && StartPoint[0] == action.payload.ID) {
                    state.delete( start )
                }else { 
                    state.set( start , StartPoint.filter((value ) => {if (value != action.payload.ID) return value}))
                }
            }


        }
    }
})



// interface task2st { 

// }