import { createSlice , type PayloadAction } from "@reduxjs/toolkit";
import { Edit, Sort } from "iconsax-reactjs";
import { useSelector, useDispatch } from "react-redux";
import { enableMapSet, Immer ,  } from 'immer'
import  type { RootState } from "../main_store";
import Store from "../main_store" ; 


enableMapSet()

interface projects_oredered_ID{
    ids : string[],
    shows : string[] , 
    editable : boolean , 
    sort : string , 
    filter : string , 
}

interface project {
    ID : string ,
    selected : boolean,
    title : string , //Title
    date : Date ,  //data
    description_brief : string , // description
    more_description : boolean  , 
    url_image : string , //image url 
    image_type : string ,
    image_load : boolean , 
    work_space_id : string
    progression : number 
}

interface projects { 
    projects : Map<string , project> , // ID and the project interface 
}
const ids: string[] = []
for ( let i = 0 ; i < 8 ; i++ ) { 
    ids.push(`proj-00${i}`)
} ; 

const initialState : projects_oredered_ID =  {
    ids : ids , 
    shows : ids , 
    editable : true , 
    sort : 'null' , 
    filter : 'null' , 
}


//for projects
const projectsSlice = createSlice({
    name : 'projects_map' , 
    initialState : {
        projects :new Map<string, project>([
    [
        "proj-001",
        {
            ID: "proj-001",
            selected: true,
            title: "E-commerce Website Redesign",
            date: new Date("2024-01-15"),
            description_brief: "Complete redesign of online shopping platform with modern UI/UX",
            more_description: true,
            url_image: "https://example.com/images/ecommerce-redesign.jpg",
            image_type: "jpg",
            image_load : false  , 
            work_space_id: "ws-001",
            progression: 85
        }
    ],
    [
        "proj-002",
        {
            ID: "proj-002",
            selected: false,
            title: "Mobile Banking App",
            date: new Date("2024-02-10"),
            description_brief: "Development of secure mobile banking application with biometric authentication",
            more_description: false,
            url_image: "https://example.com/images/banking-app.png",
            image_type: "png",
            image_load : false  , 
            work_space_id: "ws-002",
            progression: 100
        }
    ],
    [
        "proj-003",
        {
            ID: "proj-003",
            selected: true,
            title: "Inventory Management System",
            date: new Date("2024-03-05"),
            description_brief: "Cloud-based inventory tracking and management solution",
            more_description: true,
            url_image: "https://example.com/images/inventory-system.webp",
            image_type: "webp",
            image_load : false  , 
            work_space_id: "ws-001",
            progression: 45
        }
    ],
    [
        "proj-004",
        {
            ID: "proj-004",
            selected: false,
            title: "Fitness Tracking Dashboard",
            date: new Date("2024-01-28"),
            description_brief: "Interactive dashboard for health and fitness data visualization",
            more_description: true,
            url_image: "https://example.com/images/fitness-dashboard.svg",
            image_type: "svg",
            image_load : false  , 
            work_space_id: "ws-003",
            progression: 75
        }
    ],
    [
        "proj-005",
        {
            ID: "proj-005",
            selected: true,
            title: "Customer Support Portal",
            date: new Date("2024-02-20"),
            description_brief: "Integrated customer support system with ticketing and live chat",
            more_description: false,
            url_image: "https://example.com/images/support-portal.jpg",
            image_type: "jpg",
            image_load : false  , 
            work_space_id: "ws-002",
            progression: 30
        }
    ],
    [
        "proj-006",
        {
            ID: "proj-006",
            selected: false,
            title: "Real Estate Listing Platform",
            date: new Date("2024-03-12"),
            description_brief: "Modern platform for property listings with virtual tours",
            more_description: true,
            url_image: "https://example.com/images/real-estate.png",
            image_type: "png",
            image_load : false  , 
            work_space_id: "ws-003",
            progression: 60
        }
    ],
    [
        "proj-007",
        {
            ID: "proj-007",
            selected: true,
            title: "Educational Learning Platform",
            date: new Date("2024-01-08"),
            description_brief: "Interactive online learning environment with course management",
            more_description: true,
            url_image: "https://example.com/images/learning-platform.webp",
            image_type: "webp",
            image_load : false  , 
            work_space_id: "ws-001",
            progression: 90
        }
    ]
    ])
    } , 
    reducers : {
        select : (state : projects , action : PayloadAction<{id : string , checked : boolean }>) => {
            const project = state.projects.get( action.payload.id    )
            if (project)
            state.projects.set(action.payload.id , {...project , selected : action.payload.checked})
        } ,
        load  : (state : projects , action :PayloadAction<{id : string} >) => {  // the action is the id 
            console.log("loaded the image ")
            const project = state.projects.get(action.payload.id)
            if (project) {
                project.image_load =  true 
            }

        }  , 
        selectAll : (state : projects , action:PayloadAction<{checked : boolean} > )=> {
            console.log("select alls")
            const newProjects = new Map(state.projects)
            newProjects.forEach((value, key) => {
            newProjects.set(key, { ...value, selected: action.payload.checked })
                })
  
  // Replace the entire Map
            state.projects = newProjects

        }
        


    }
})
// console.log(ids , 'all of the')
const projectsIdList = createSlice({
    name: 'projects_ids_list',
    initialState,
    reducers: {
        change: (state: projects_oredered_ID, action: PayloadAction<{from: number, to: number}>) => {
            const {  from} = action.payload;
            let {  to} = action.payload;
            console.log(`from ${from } to ${to}`)
            to = to < 0 ? from >= 0 ? from : 0 : to >= state.ids.length ? from < state.ids.length ? from : state.ids.length - 1 : to 
            if ( from < state.ids.length && to < state.ids.length && from >= 0 && state.editable){
            const item = state.ids[from];
            console.log("from : " , from , " to : " , to )
            if (to > from ) 
                state.ids = [...state.ids.slice(0 , from  ) , ...state.ids.slice(from+1 , to+1 )  , item , ...state.ids.slice(to+1 , ) ]
            else 
                state.ids = [...state.ids.slice(0 , to  ) ,item, ...state.ids.slice(to  , from )   ,  ...state.ids.slice(from+1 , ) ]

            state.shows = state.ids
            ;}else { 
                console.log('now quaified')
            } ;


        },
        // filter (state : projects_oredered_ID , action : PayloadAction<{by: string , args : string[]}>) {
        //     const byWorkSpace = (elementWS : string , targetWS : string) => { 
        //         return elementWS === targetWS
        //     }
        //     let dynFn = (x : string , y: string ) => x===y 
        //     const {by} = action.payload
        //     switch (by) {
        //         case '':
        //         case 'null':
        //             if (state.sort === 'null' ){
        //                 state.editable = true 
        //                 state.shows = state.ids
        //                 return 
        //             }else { 
        //                 state.editable = false
        //                 state.shows = state.ids
        //             }
        //             break 
        //         case 'workSpace' :
        //             dynFn = byWorkSpace
        //             break
        //     }
        //     const StoreState = Store.getState()
        //     const tempShowID = state.ids.filter((value) => dynFn(StoreState.projectsContent.projects.get(value)?.work_space_id || '' , action.payload.args[0] || '' ) )
        //     state.shows = tempShowID
        //     Store.dispatch(sort({kind : state.sort , mappedData : StoreState.projectsContent.projects}))
        //     // const filterID = state.ids.filter((value) => { if ()})
        // } , 
        remove: (state: projects_oredered_ID, action: PayloadAction<{num: number}>) => {
            const {num} = action.payload;
            state.ids.splice(num, 1);
        },
        push: (state: projects_oredered_ID, action: PayloadAction<{id: string}>) => {
            const {id} = action.payload;
            state.ids.unshift(id); // Same as [id, ...state.ids] but more performant
            if (state.sort != 'null'){
                switch (state.sort ) {
                    case 'lessToMore' : 
                        state.shows.sort()
                        break
                    case 'moreToLess' : 
                        state.shows.sort().reverse()
                        break
                }
            }
        },
        sort : (state : projects_oredered_ID , action :  PayloadAction<{kind: string , mappedData : Map<string , project> }>) => {

            if (action.payload.kind !== 'null'){
                state.editable = false
                state.sort = 'null'
                switch (action.payload.kind) {
                    case 'lessToMore' : 
                        state.sort = 'lessToMore'
                        state.shows = state.shows.sort((a , b ) => {if ( action.payload.mappedData.get(a) && action.payload.mappedData.get(b)) {
                            return  action.payload.mappedData.get(a).date < action.payload.mappedData.get(b).date ? -1 : 1 
                        }else 
                         return 0 
                    }) 
                        break
                    case 'moreToLess' : 
                        state.sort ='moreToLess'
                        state.shows = state.shows.sort((a , b ) => {if ( action.payload.mappedData.get(a) && action.payload.mappedData.get(b)) {
                            return  action.payload.mappedData.get(a).date > action.payload.mappedData.get(b).date ? -1 : 1 
                        }else 
                         return 0 
                    })
                        break
                    case 'alpha' : 
                        state.sort = 'alpha'
                        state.shows =  state.shows.sort((a , b ) => {if ( action.payload.mappedData.get(a) && action.payload.mappedData.get(b)) {
                            return  action.payload.mappedData.get(a)?.title > action.payload.mappedData.get(b).title ? 1 : -1 
                        }else 
                         return 0 
                    })
                        break
                }
            return 
            }
            state.sort = 'null'
            
            state.editable = true
            state.shows =  state.ids


        }
    }
});
export default projectsIdList.reducer
export const projectsContent = projectsSlice.reducer
export const {change, remove, push , sort} = projectsIdList.actions;
export const {select,load,  selectAll } = projectsSlice.actions