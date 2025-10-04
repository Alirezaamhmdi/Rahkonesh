import { useState,useLayoutEffect, useEffect, useRef , useContext , createContext ,type Dispatch, type SetStateAction } from 'react';
import Project from '../../components/projects/project';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../redux/main_store/main_store';
import { CursorContext, CardGrabbed, type Point } from '../../context/cursor';
import { selectAll, sort } from '../../redux/main_store/reducers/projects_reducer';
import { AddSquare, ArrangeVertical, Filter, Sort } from 'iconsax-reactjs';
import fullContext  from '../mainTableContext'
import MasksContext from './maskContext'
import observerContext from '../../context/observingContext.tsx'
import './tasks.css';
import DropComponentList, { DropWithotherComponent } from '../../components/common/dropDown/dropDown';
import { Outlet } from 'react-router-dom';
import CreateProject from '../popUp/createProject/createProject';
import { createPortal } from 'react-dom';
import { jalaaliMonthLength } from 'jalaali-js';

interface RowProps {
  ids: string[];
  rowNum: number;
  col ?: number ; 
}

const Row = ({ ids, rowNum , col = 3 }: RowProps) => {
  "use memo"
  const rowDiv = useRef<HTMLDivElement>(document.createElement('div'));

  return (
    <div ref={rowDiv} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 py-2 ${rowNum !== 0 ? "snap-start" : ""}`}>
      {ids.map((value, index) => (
        <Project 
          key={value} 
          projectIndex={index} 
          projectID={value} 
          progressNum={40} 
          // rowDiv={rowDiv} 
          // rowNum={rowNum} 
          col = {col}
        />
      ))}
    </div>
  );
};

const MultiTasks: React.FC = () => {
  const [point, setPoint] = useState<Point>({
    top: 0,
    left: 0,
    state: "",
    card: '',
    offset_top: 0,
    offset_left: 0 , 
    indexGrabbed :null ,  
  } as Point);
  // const fullPage = useContext(fullContext)
  const allProject = useSelector((state : RootState)=>{return state.projectsContent.projects})
  const [sellectes, SellectAll] = useState(false);
  const [order, setOrder] = useState<number | null>(null);
  const [card, setCard] = useState({
    card: 0,
    state: ''
  });
  const [addProject, setAddProject] = useState<boolean>(false);
  const dispatch = useDispatch()
  const portalAddProject = createPortal(
    addProject ? <CreateProject canclation={setAddProject} className={`${addProject ? '' : 'hidden'}`} /> : <></>,
    document.body
  );
  

  useEffect(()=> {
    switch (order) { 
      case null : 
        dispatch(sort({kind : "null" , mappedData : allProject}))
        break
      case 0: 
        dispatch(sort({kind : "moreToLess" , mappedData : allProject}))
        break
      case 1: 
        dispatch(sort({kind : "lessToMore" , mappedData : allProject}))
        break
      case 2 : 
        dispatch(sort({kind : "alpha" , mappedData : allProject}))
        break
    }
  } ,[order])
  return (
    <CursorContext.Provider value={{ point, setPoint }}>
      <CardGrabbed.Provider value={{ card, setCard }}>
        <div className={`flex-col gap-7 bg-white transition-all duration-500 }`}>
          <h1 className='text-2xl snap-start px-[1rem]  bg-white'>پروژه ها</h1>
          <div className='sticky top-0 bg-white w-full px-7 z-[610] pb-2'>
            <div className='overflow-hidden flex reletive items-center my-6 w-full'>
              <div className='whitespace-nowrap text-sm'>فضای کاری:</div>
              <div className='flex overflow-x-scroll w-full gap-3.5 px-3 text-xs text-[#CB78F2] '>
                <button className='py-2 px-2 whitespace-nowrap rounded-full line-clamp-1 cursor-pointer'>
                  فضا ی کاربری ما
                </button>
                <button className='py-2 px-2 whitespace-nowrap rounded-full cursor-pointer'>
                  فضا
                </button>
                <button className='py-2 px-2 whitespace-nowrap rounded-full bg-purple-100 primary-text cursor-pointer'>
                  فضا
                </button>
              </div>
            </div>
            
            <div className='flex h-10 items-center justify-between text-xs'>
              <div className='right-0 flex gap-7 text-[#1E2938]'>
                <div>
                  <DropWithotherComponent 
                    Date={true} 
                    subListState={new Map([['yashar', useState(0)]])} 
                    subList={new Map<string, string[]>([['yashar', ['d', 'd']]])}
                  >
                    <div className='flex items-center gap-1.5 cursor-pointer hover:text-pink-500 transition'>
                      <Filter size="16" variant="TwoTone"/>
                      فیلتر
                    </div>
                  </DropWithotherComponent>
                </div>
                
                <DropComponentList 
                  choosingList={['از جدید به قدیم', 'از قدیم به جدید', 'حروف الفبا']} 
                  choosed={order} 
                  setChoosed={setOrder} 
                  className={'min-w-20'} 
                  nothing='text-[#1E2938]' 
                  needSet={true}
                >
                  <div className={`flex items-center gap-1.5 cursor-pointer hover:text-pink-500 transition`}>
                    <ArrangeVertical size="16"/>
                    مرتب سازی
                  </div>
                </DropComponentList>
                
                <div 
                  className={`flex items-center gap-1.5 cursor-pointer hover:text-pink-500 transition ${sellectes && 'text-pink-700'}`} 
                  onClick={() => {
                    SellectAll(!sellectes)
                    dispatch(selectAll({checked : !sellectes}))
                  }}
                >
                  {!sellectes ? "انتخاب همه پروژه ها" : "انتخاب هیچ‌کدام"}
                </div>
              </div>
              
              <div className='left-0'>
                <div className='flex items-center text-white bg-[#E337AF] hover:opacity-70 cursor-pointer transition gap-1.5 px-4 py-2 rounded-xl hover z-[98888]'
                onClick={() => {
                      // console.log("create a new project");
                      setAddProject(true);
                    }}>
                  <AddSquare size="16" />
                  <button 
                    className='cursor-pointer' 
                    
                  >
                    ایجاد پروژه
                  </button>
                </div>
                  {addProject && portalAddProject}
              </div>
            </div>
          </div>
          
          <div className='px-4 pb-4 scroll-pt-24'>
            <Outlet />
          </div>
        </div>
      </CardGrabbed.Provider>
    </CursorContext.Provider>
  );
};

export default MultiTasks;

export const NotEmptyTasks = () => {
    const [mask , setMask] = useState(false)
  const ids = useSelector((state: RootState) => state.projectsListReducer.shows);
  const fullPage = useContext(fullContext)
  const observerRoot = useRef<HTMLDivElement>(null)
  const observerRef  = useRef<IntersectionObserver | null>(new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const onVisible = (entry.target as HTMLElement).dataset.onVisible;
          if (onVisible) {
            entry.target.dispatchEvent(new CustomEvent('onObservedProject'));
            console.log('I HEAR' , entry.target);
          }
          observerRef.current?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 ,
      root : observerRoot.current
    }
  ))
  
  

// useLayoutEffect(() => {
    
//     observerRef.current = 

//     return () => observerRef.current?.disconnect();
//   }, []);
  return (
    <MasksContext.Provider value={[mask , setMask]}>
      <observerContext.Provider value ={observerRef.current}>

        <div className={` grid grid-cols-1  xs:bg-green-400  sm:grid-cols-2 ${!fullPage ? "lg:grid-cols-4" : "lg:grid-cols-3"} w-full gap-6 sm:gap-4`} ref={observerRoot}> 
      {ids.map((value , index ) =>  {
        return <Project  projectID ={value} projectIndex={index} className='sm:mx-0 mx-auto' />
      })}
    </div>
      </observerContext.Provider>
      </MasksContext.Provider>
      
  );
};

export const EmptyTasks = () => {
  return null;
};