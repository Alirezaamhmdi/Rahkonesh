import {createContext} from 'react' 
interface logo_struct {Imglogo: string , teamyer_mini: string, Avatar:string, HomeOffice:  string }
const logo_context = createContext({Imglogo: "" , teamyer_mini: "", Avatar:"", HomeOffice:  "" } as logo_struct )
export default logo_context