import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface work_space { 
    id : string , 
    name : string , 
    projects_id : string[]
}
interface work_spaces { 
    list : Map<string , work_space>  , 
}


const WorkIDSlice = createSlice({
    name : 'WSsID' , 
    initialState : new Map<string , work_space>([]) , 
    reducers : {
        // addProject : (state : work_space , action : PayloadAction<string> ) { 
            
        // }
    }
})