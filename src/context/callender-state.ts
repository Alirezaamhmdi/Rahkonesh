import {createContext, type Dispatch, type SetStateAction} from 'react' 

export const State = {
  MONTH: 'month',
  DAY: 'day',
  
  WEEK: 'week'
} as const;
export interface callInterface { 
    day : number , 
    month : number , 
    year : number , 
    week : number , 
    state : string
}
const NOW = new Date()
const  initiate : callInterface  = {
    day :  NOW.getDay(), 
    month : NOW.getMonth() ,
    year : NOW.getFullYear() , 
    week :Math.floor( NOW.getDay() / 4)+1 , 
    state : State.MONTH

} 
const callContext = createContext({
    initiate : initiate , 
    setCallState : ()=>{}

} as {
    initiate : callInterface , 
    setCallState : Dispatch<SetStateAction<callInterface>>
})
export default callContext


