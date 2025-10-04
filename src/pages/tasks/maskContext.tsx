import {createContext , type Dispatch , type SetStateAction } from 'react' 
 const MasksContext = createContext<[boolean ,Dispatch<SetStateAction<boolean>>]>([false , ()=>{}])
export default MasksContext