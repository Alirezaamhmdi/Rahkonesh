import React, { useEffect, useLayoutEffect, useState } from "react";
import { type RootState} from "../../redux/main_store/main_store";
import { useSelector } from "react-redux";

const taskRep = { 
    all : "all" ,
    agg : "aggregated"

} as const
export const AllTaskBox : React.FC<{  tasks : string[] }> = ({ tasks })=>{
    const colors : string[]  = [] 
    const allTasks = useSelector((state : RootState)=>{return state.task1stSlice})
    const allGroups = useSelector((state : RootState ) => {return state.tasksGroupSlice})
    useLayoutEffect(()=>{
    for (const task of tasks) { 
        if(colors.length >= 3) break
        const task_ = allTasks.get(task)
        if (task_ ) { 
            if (!colors.includes(task_.GroupID)){
                colors.push( allGroups.get(task_.GroupID) != undefined ? allGroups.get(task_.GroupID).color : "success")
            }
        }
    }
    
} , [])
if (colors.length < 3 ) {
    colors.push('success-600' , 'error-600' , 'rose-600')}
    return <div className="w-[104px] h-[35px] relative text-[12px]">
    
    <div className={"w-[5rem] h-[35px] z-[300] absolute left-0 text-center content-center rounded-xl absolute text-white bg-blue-600"} dir="rtl">
    </div>

    <div className={"w-[5rem] h-[35px] z-[301] absolute left-2 text-center content-center rounded-xl absolute text-white  bg-fuchsia-600"} dir="rtl">
        
            </div>   
    <div className={"w-[5rem] h-[35px] z-[302] text-center left-4 hover:left-5 transition-all absolute content-center rounded-xl  absolute text-white cursor-pointer bg-success-600 whitespace-nowrap" } dir="rtl">
            +
            {tasks.length}
            <span className="invisible">.</span>
            کار‌دیگر
            {/* {colors} */}

    </div>

    </div>
}
export const AggTaskBox : React.FC<{  tasks : string[] }> = ({ tasks })=>{
    const colors : string[]  = [] 
    const allTasks = useSelector((state : RootState)=>{return state.task1stSlice})
    const allGroups = useSelector((state : RootState ) => {return state.tasksGroupSlice})
    useLayoutEffect(()=>{
    for (const task of tasks) { 
        if(colors.length >= 3) break
        const task_ = allTasks.get(task)
        if (task_ ) { 
            if (!colors.includes(task_.GroupID)){
                colors.push( allGroups.get(task_.GroupID) != undefined ? allGroups.get(task_.GroupID).color : "success")
            }
        }
    }
    
} , [])
if (colors.length < 3 ) {
    colors.push('success-600' , 'error-600' , 'rose-600')}
    return <div className="w-[104px] h-[35px] relative text-[12px]">
    
    <div className={"w-[5rem] h-[35px] z-[300] absolute left-0 text-center content-center rounded-xl absolute text-white bg-blue-600"} dir="rtl">
    </div>

    <div className={"w-[5rem] h-[35px] z-[301] absolute left-2 text-center content-center rounded-xl absolute text-white  bg-fuchsia-600"} dir="rtl">
        
            </div>   
    <div className={"w-[5rem] h-[35px] z-[302] text-center left-4 hover:left-5 transition-all absolute content-center rounded-xl  absolute text-white cursor-pointer bg-success-600 whitespace-nowrap" } dir="rtl">
            +
            {tasks.length}
            <span className="invisible">.</span>
            کار‌دیگر
            {/* {colors} */}

    </div>

    </div>
}
const AllTasks : React.FC<{ tasks : string[]}> = ({tasks})=>{
    const allTasks = useSelector((state : RootState)=>{return state.task1stSlice})
    const allGroups = useSelector((state : RootState ) => {return state.tasksGroupSlice})
    
}
const TaskBox : React.FC<{date : Date}> = ({date })=>{
    const tasks = useSelector((state : RootState)=>{return state.date2Task})
    const [taskRepState , setTaskRepState] = useState<string>(taskRep.all)
    useEffect(()=> { 
        if (tasks.get(date) != undefined) {
        if (tasks.get(date).length > 3 && taskRepState != taskRep.agg){
            setTaskRepState(taskRep.agg)
        }else if (tasks.get(date).length <= 3 && taskRepState != taskRep.all) { 
            setTaskRepState(taskRep.all)
        }}
    } , [tasks])

    



}
export default TaskBox
