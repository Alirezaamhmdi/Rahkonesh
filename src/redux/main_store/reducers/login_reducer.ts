import { createSlice  } from '@reduxjs/toolkit';

interface authenticationState { 
    State : boolean , 
    phone : string , 
    token : string , 
    step : number , 
    loading : boolean , 
    err : Error | null , 
}
const initialState: authenticationState = { 
    State : false , 
    phone : '' , 
    token : '' , 
    step : 0 , 
    loading : false , 
    err : null ,
}
const authenticationSlice = createSlice({
    name : 'authentication' , 
    initialState ,
    reducers : {
        onLoading : (state : authenticationState) => { 
            state.loading = true ; 
        } , 
        offLoading : (state : authenticationState) => {
            state.loading = false ; 
        } , 
        // setPhone : (state : )

    },
}) ;
export const {onLoading , offLoading} = authenticationSlice.actions ;
export default authenticationSlice.reducer;