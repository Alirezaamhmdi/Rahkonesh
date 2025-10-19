import {createBrowserRouter , Link} from 'react-router-dom'
import Projects from '../pages/mainTable.tsx'
import MultiTasks , {NotEmptyTasks} from '../pages/tasks/tasks'
// import CreateProject from '../pages/popUp/createProject/createProject'
// import Root from '../pages/root'
import LoginSignIn , {PhoneStateLogin , PassCode} from '../pages/login_sigin.tsx'
import EmpthyTask from '../pages/tasks/notEmpthy.tsx'
import Project from '../pages/project.tsx'
import Board from '../pages/board/board.tsx'
import EditTask from '../components/edit/editTask.tsx'
import AppLayout from '../layout/appLayout.tsx'
import Signup from '../pages/signup.tsx'
import CallenderWeekDay from '../inner_tasks/callender.tsx'
// import Drop from '../components/common/dropDown/test.tsx'
// import { Children } from 'react'
const router = createBrowserRouter([
//     {
//         path : "/" , 
//         children:[
//             {
//                  path : "/" , 
//         element : <AppLayout /> ,
//         children:[
            
//                 {
//         path : "/mainTable" , 
//         element : <Projects />,
//         children : [
//             {
//                 path : 'projects' , 
//                 element : < MultiTasks />,
//                 children : [
//                     {
//                         index : true , 
//                         element : < NotEmptyTasks /> ,

//                     },{
//                         path : 'empthy' , 
//                         element : <EmpthyTask />
//                     }
//                 ]
                
//             },
//         ]
//     },
//     {
//         path : "/project/:id" , 
//         element : <Project />,
//         children : [
//             {
//                 path : 'board' , 
//                 element : < Board />,
//                 children : [
//                     {
//                         index : true , 
//                         element : < NotEmptyTasks /> ,

//                     },{
//                         path : 'empthy' , 
//                         element : <EmpthyTask />
//                     }
//                 ]
                
//             },
//             {
//                 path : 'gant' , 
//                 element : < Board />,
//                 children : [
//                     {
//                         index : true , 
//                         element : < NotEmptyTasks /> ,

//                     },{
//                         path : 'empthy' , 
//                         element : <EmpthyTask />
//                     }
//                 ]
                
//             },
//             {
//                 path : 'calendar' , 
//                 element : < CallenderWeekDay />,
//                 children : [
//                     {
//                         index : true , 
//                         element : < CallenderWeekDay /> ,

//                     }
//                 ]
                
//             },
//         ]
//     },
    
//     {
//         path : "/login" , 
//         element : <LoginSignIn />, 
//         children : [
//             { 
//                 index : true ,  
//                 element : <PhoneStateLogin /> , 
//             } , 
//             {
//                 path : "/login/pass_code", 
//                 element : <PassCode /> , 
//             }
//         ]
//     },

//         ],
//             },
//             {
//             path: "/c/:taskId",
//             element: <EditTask />
//             },
            
//         ]
//     },
//     // {
//     //     path : "/" , 
//     //     element : <AppLayout /> ,
//     //     children:[
//     //         {
//     //         path: "/c/:taskId",
//     //         element: <EditTask />
//     //         },
//     //             {
//     //     path : "/mainTable" , 
//     //     element : <Projects />,
//     //     children : [
//     //         {
//     //             path : 'projects' , 
//     //             element : < MultiTasks />,
//     //             children : [
//     //                 {
//     //                     index : true , 
//     //                     element : < NotEmptyTasks /> ,

//     //                 },{
//     //                     path : 'empthy' , 
//     //                     element : <EmpthyTask />
//     //                 }
//     //             ]
                
//     //         },
//     //     ]
//     // },
//     // {
//     //     path : "/project/:id" , 
//     //     element : <Project />,
//     //     children : [
//     //         {
//     //             path : 'board' , 
//     //             element : < Board />,
//     //             children : [
//     //                 {
//     //                     index : true , 
//     //                     element : < NotEmptyTasks /> ,

//     //                 },{
//     //                     path : 'empthy' , 
//     //                     element : <EmpthyTask />
//     //                 }
//     //             ]
                
//     //         },
//     //         {
//     //             path : 'gant' , 
//     //             element : < Board />,
//     //             children : [
//     //                 {
//     //                     index : true , 
//     //                     element : < NotEmptyTasks /> ,

//     //                 },{
//     //                     path : 'empthy' , 
//     //                     element : <EmpthyTask />
//     //                 }
//     //             ]
                
//     //         },
//     //     ]
//     // },
    
//     // {
//     //     path : "/login" , 
//     //     element : <LoginSignIn />, 
//     //     children : [
//     //         { 
//     //             index : true ,  
//     //             element : <PhoneStateLogin /> , 
//     //         } , 
//     //         {
//     //             path : "/login/pass_code", 
//     //             element : <PassCode /> , 
//     //         }
//     //     ]
//     // },

//     //     ],
//     // } , 

])

export default router