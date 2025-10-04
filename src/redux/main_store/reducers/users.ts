import { createSlice , type PayloadAction } from "@reduxjs/toolkit";

export interface Users {
    ID : string , 
    fullName : string , 
    url : string , 
}


const usersList = createSlice({
    name : 'userList' , 
    initialState : new Map<string , Users >() , 
    reducers : {
        add : (state : Map<string , Users>  , actions : PayloadAction<Users>) => {
            state.set(actions.payload.ID , actions.payload)
        } , 
    }
})
export default usersList.reducer
export const {add } = usersList.actions