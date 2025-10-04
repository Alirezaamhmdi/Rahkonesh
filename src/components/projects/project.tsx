import React ,{useCallback , useLayoutEffect, useContext, useEffect, useMemo, useRef , useState , Suspense } from 'react';
import { createPortal } from 'react-dom';
import Progress , {ProgressLoading} from './progress';
import  MasksContext from '../../pages/tasks/maskContext';
import '/src/assets/styles/colors.css'
import {CloseCircle, Edit2 , LampOn, Trash} from 'iconsax-reactjs'
import {select , load  } from "../../redux/main_store/reducers/projects_reducer"
import './puls.css'
import './project.css'
import observerContext from '../../context/observingContext.tsx'
import Default from "/src/assets/png/Default1.png"
import { CursorContext } from '../../context/cursor';
import { change } from '../../redux/main_store/reducers/projects_reducer';
import { useSelector , useDispatch } from 'react-redux';
import { type RootState } from '../../redux/main_store/main_store';
import MiniPicture from '../picture/minipicture'
import DropComponentList ,{Description} from '../common/dropDown/dropDown'
// const Testing = React.lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         // Resolve to a module-like object with a default export
//         resolve({
//           default : ()=> <div> hi </div> , 
//         })
//       }, 1000); // 1-second delay for demonstration
//     })
// );
const monthNames = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند'
    ];

function toPersianNum(n : number ) { 
  if (n < 100 && n >= 0 ) { 
    String(n)
  }else{ return '۱۰۰'}
}   
    export const ProjectLoading : React.FC<{checked:boolean}> = ({checked} : {checked : boolean}) => { 
   
    return (    
            <div className ={`${checked ? "bg-green-50 shadow-custom-green" : "bg-neutral-100 shadow-custom"} px-[1rem]  pb-[1rem] rounded-3xl mx-auto w-full container-pulsing shadow-custom p-[1rem] blur-[0.5px] max-w-[15.65rem]`} dir = 'rtl'> 
        <div> {/* project toggle */}
            <input type="checkbox"  className='toggle accent-green-600' disabled={true} checked={checked} />
        </div>
         <div className='!cursor-grab select-none w-full  h-[76px] inset-0 ' >
            <MiniPicture url={Default} shouldLoad={false} />
        {/* <img ref={BackImage} alt="Project" /> */}
      </div>
        <div className = {"flex justify-between items-center pt-2.5"}> {/* project title + date */}
        <div className = {'loading-bar rounded-full flex-2/5'}> 
            <div className='loading-progress h-full w-full'>
                <h5 className='invisible text-xs '>loading..</h5>
            </div>
        </div>
        <div className='invisible flex-1/5'></div>
        <div className = {'loading-progress rounded-full  flex-1/5'}> <h5 className='invisible text-xs '>loading..</h5></div>
        </div>
        <div className = 'mt-2.5 loading-progress rounded-2xl'> {/* project description */}
            <p className='line-clamp-2 invisible'>
                <br/>
                <br/>
                </p>
            </div>
            <div className="flex justify-between items-center mt-2.5  loading-progress rounded-3xl"> {/* project progress */}
                <p className='invisible'> درصد پیشرفت</p>
                <p className="text-xs font-light   primary-text p invisible"> load </p>
            </div>
            <ProgressLoading className='mt-3'  />
            <div className='flex justify-end h-5 mt-2 text-shadow-xs gap-4'> {/* project edit + delete */}
                <div className = 'h-full size-[1.25rem]  rounded-full loading-progress' /> 
                <div className = 'h-full size-[1.25rem  rounded-full loading-progress' /> 

            </div>
        </div>

    )
}

interface DraggableContainerProps {
  projectID: string;
  projectIndex : number ; 
  progressNum ?: number ; 

  className?: string 
  col ?: number
}


const DraggableContainer: React.FC<DraggableContainerProps> = ({ projectID , projectIndex , progressNum = 10 , className="" }) => {
  // State management
  const projectContent = useSelector((state : RootState) => (state.projectsContent.projects.get(projectID)))
  const [ loaded , setLoaded ] = useState(projectContent?.image_load)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [width , setWidth ] = useState(0)
  const {point , setPoint} = useContext(CursorContext)
  const [edit , setEdit] = useState<null | number>(null)
  const [delPop , setDelPop] = useState< boolean > (false)
  const dispatch = useDispatch()
  const now = useRef(new Date() )
  const containerProject = useRef<HTMLDivElement | null>(null)
  const [masked , setMasked ] = useContext(MasksContext)
//   useEffect(()=>{
//         console.log(point)
//     } , [point])
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const BackImage = useRef<HTMLImageElement>(null);
  const finished = useRef<boolean>(false);
  const observer = useContext(observerContext);
  useLayoutEffect(()=>{
    console.log("loaded in making " ,projectContent?.image_load )
    setLoaded(projectContent?.image_load)
  } , [projectContent?.ID])
  const handleObserved = useCallback(() => {
  console.log("loaded while observed for ID:", projectID);
  dispatch(load({ id: projectID }));
  
  // Check the latest value from the ref
  console.log("loaded result of loading ", projectContent?.image_load);
  
  setLoaded(true);
  console.log(projectID, " observed ");
}, [dispatch, setLoaded]); // Only depend on stable functions
useEffect(() => {
  if (!containerProject.current || !observer) return;
  
  const element = containerProject.current;
  console.log('loaded I AM OBSERVING', element);
  
  // Observe the element
  observer.observe(element);
  
  // Add event listener
  element.addEventListener('onObservedProject', handleObserved);
  console.log('loaded I AM Listened', element);

  // Cleanup function - CRUCIAL!
  return () => {
    console.log('loaded Cleaning up observer and listener');
    observer.unobserve(element);
    element.removeEventListener('onObservedProject', handleObserved);
  };
}, [observer]); // Add handleObserved to dependencies

  useEffect(()=>{
    console.log("reindexing " , projectIndex , projectID)
  }  ,[projectIndex , projectID])
  useLayoutEffect(()=> {
    if(projectIndex < 7) {
      dispatch(load({id : projectID}))
      setLoaded(true)}
    const element = containerProject.current;
    if (!element || !observer) return;
    element.dataset.onVisible = 'true';
      if (point.state == 'grabbed' && point.card == projectID){
        setIsDragging(true)
        setPoint({
          ...point , 
          card : projectID ,
          indexGrabbed : projectIndex , 
        })
      }else { 
        setIsDragging(false)
      }
      if (containerRef.current){
        const rect = containerRef.current.getBoundingClientRect();
        setWidth(rect.width)
        }

  } , [projectID , projectIndex , point.card , point.state ,containerProject ] )
  // useEffect(()=>{
  //   if(point.card == projectID && point.indexGrabbed != null)
  //     projectIndex = point.indexGrabbed
  // } , [point.indexGrabbed])
  
    useEffect(() => {
      if (point.card === projectID ) {
        document.addEventListener('mousemove', handleMouseMove as any);
        document.addEventListener('mouseup', handleMouseUp);
      } else {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      }
  
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging]);
  
  
  // // Initialize image
  // useLayoutEffect(()=>{ 
  //   if (point.card == projectID && point.state =='grabbed'){
  //     setIsDragging(true)

  //     console.log(projectID , 'interchanged', point)
     
      
  //   }
  // } , [point ])
    
  useLayoutEffect(()=>{
    if (!containerRef.current) return 
    const rect = containerRef.current.getBoundingClientRect();
    setWidth(rect.width)
  } , [])

  //   useEffect(()=>{console.log(point)} , [point])

  //   if (!rowDiv){
  //   return 
  // }
  // Mouse event handlers
  const enterMouse = () => {
        console.log(`hello ${point.indexGrabbed}` , {from: point.indexGrabbed ,  to : projectIndex} )
        setPoint({
          ...point , 
          indexGrabbed : projectIndex , 
          
        })
        if (point.indexGrabbed != null) dispatch(change({from: point.indexGrabbed,  to : projectIndex }));
        console.log("entered " , {from: point.indexGrabbed,  to : projectIndex })
      };
    
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setMasked(true)
    // console.log(point , "is down")

    // console.log('mother' , motherRow.current )
    if (containerRef.current) {
        // console.log('downs')
      const rect = containerRef.current.getBoundingClientRect();
      setWidth(rect.width)
      
      setIsDragging(true);
      setPoint({
        top : e.clientY , 
        left : e.clientX ,
        state : 'grabbed' , 
        card : projectID ,
        indexGrabbed : projectIndex , 
        offset_left : e.clientX - rect.left , 
        offset_top : e.clientY - rect.top ,
      })
    }
  };
  // const x = new Blob()
  // x.
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    // console.log(point , "is moving")

   
    setPoint({
        left: e.clientX , 
        top: e.clientY ,
        state : point.state , 
        card : projectID ,
        indexGrabbed : point.indexGrabbed , 
        offset_left : point.offset_left ,
        offset_top : point.offset_top
      }) 
    // setPosition(new_pos);
  };

  const handleMouseUp = () => {
    setMasked(false)
    // console.log(point , "is up")
    setPoint(
        {
            ...point , 
            indexGrabbed : null , 
            state : '' , 
            card : '' , 
        }
    )
    setIsDragging(false);
  };
  // useLayoutEffect (()=>{
  //   if(projectContent != undefined)
  //   dispatch(select({id : projectID ,  checked : projectContent.selected}))
  // } , [])
   
  if (projectContent == undefined) return 
  
  const deletePop = (
    <>
    {/* Overlay (fades in/out) */}
<div className={`absolute top-0 z-[99999]  left-0 w-screen h-screen flex items-center justify-center ${ !delPop ? "pointer-events-none " : "backdrop-blur-[1px]"}` } >
  <div 
    className={` rounded-3xl z-[99999] bg-white shadow-custom pt-5 w-[20.5rem] pb-[1rem] ${
      delPop ? 'opacity-100 min-h-86' : 'opacity-0 h-0 invisible'
    } w-82 transition-opacity duration-300 overflow-hidden flex flex-col items-center gap-2` }
  > 
    <div className='w-full pl-5' dir='ltr' >
      <CloseCircle size="16" color="#E8233D" variant="Bold" className="cursor-pointer" onClick={()=>{setDelPop(false)}}/>
    </div>
    <div className='bg-[#FEC9D13D] rounded-full items-center justify-center flex size-[3.75rem]'>
    <Trash  color="#E8233D" variant="Broken" className='size-[1.5rem]' />
    </div>
    <h2 className='text-xl'>
      حذف پروژه 
      </h2>
      <p dir ='rtl' className='text-[#657282] text-xs px-6 text-center py-2'>
      با حذف این پروژه تمام وظایف تعریف شده در آن پاک می شوند.  آیا تایید می کنید؟ 
      </p>
      <div className='flex flex-col items-center gap-4 w-full px-6 text-sm'>
        <button className='primary text-white w-full rounded-2xl py-3 cursor-pointer'>بله، حذف پروژه</button>
        <button className ='rounded-2xl border-2 border-neutral-300 text-neutral-400 w-full py-3 cursor-pointer ' onClick={()=>setDelPop(false)}>انصراف</button>
      </div>
    {/* Modal content */}
  </div>
</div>
<div 
  className={`fixed top-0 left-0 w-screen h-screen   ${
    delPop ? 'z-[700] opacity-20' : 'z-[-1] opacity-0'
  } transition-opacity duration-300`}
  
  onClick={() => setDelPop(false)}
/>
{/* Modal (slides/fades in) */}
    </>
  )
  const content = (
    <>
    <div className="flex justify-between  mt-[1rem]  gap-[0.125rem] ">
        <h5 className='title text-[#1E2938] select-none line-clamp-1'> {projectContent.title }</h5>
        <time className={`text-[0.6rem] whitespace-nowrap text-left  text-neutral-500 cursor-auto ${isDragging ? "select-none" : ""}`}
        >{projectContent.date.getFullYear()} {monthNames[projectContent.date.getMonth()]} {projectContent.date.getDate()}</time>
      </div>
      
      <div className='pt-2.5'>
        <p className='text-xs font-light text-[#657282] line-clamp-2 select-none'>
          {projectContent.description_brief} {projectContent ? "..." : ""}
        </p>
      </div>
      
      <div className="flex justify-between items-center  pt-2.5 select-none">
        <p className='text-[#1E2938] '>درصد پیشرفت</p>
        <p className={`text-xs font-light ${!finished.current ? 'primary-text' : 'text-green-600'}`}>
          {projectContent.progression}٪
        </p>
      </div>
      
      <Progress className='mt-[0.75rem] select-none' progress={projectContent.progression} finished={finished.current} animation={isDragging} />
      
      
    </>
  )
   
  // Container component (original element)
  const Container = (
    <div
      ref={containerRef}
      className={`${projectContent.selected ? "bg-green-50 shadow-custom-green" : "bg-neutral-100 shadow-custom"} ${className} px-[1rem] pb-[1rem] rounded-3xl gap-2.5 max-w-[15.75rem] transform-color shadow-custom  relative ${isDragging ? "select-none" : ""}`}
      dir="rtl"

     
    >
      { masked &&
      <div className='w-full h-full absolute  opacity-0  z-[9999]'  onMouseUp={handleMouseUp} onMouseEnter={()=>enterMouse()}/> 
}
      <div className='w-full cursor-pointer pt-[1rem] ' onClick={() => {
        dispatch(select({ id : projectID,checked : !projectContent.selected}))
        // handleMouseDown(e)
    }} 
        >
  {/* <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span> */}
        <input 
          checked={projectContent.selected} 
          onChange={(e) => dispatch(select({ id : projectID,checked : !projectContent.selected}))} 
          type="checkbox" 
          id={`project-toggle-${projectID}`} 
          className="toggle rounded-md accent-green-600 z-100 cursor-pointer" 
          />
        
      </div>
      <div className='!cursor-grab select-none w-full  h-[76px] my-[0.25rem] inset-0 ' onMouseDown={handleMouseDown}>
        <MiniPicture url={Default} shouldLoad={loaded} ref={BackImage}/>
        {/* <img ref={BackImage} alt="Project" /> */}
      </div>
      {content}
      <div className='flex justify-end h-5 mt-[1rem]  gap-2  '>
        <Description description='حذف'>
        <Trash 
          variant="Outline" 
          className='h-5 transition duration-300 ease-in-out text-neutral-500 hover:text-red-700 cursor-pointer ' 
          onClick={() => setDelPop(true)} 
        />
        </Description>
        <DropComponentList choosingList={['ویرایش نام' ,'ویرایش توضیحات','تغییر عکس پس‌زمینه']} choosed={edit} setChoosed={setEdit} className='min-w-30' hover='text-purple-600' focus='text-purple-700'> 
        <Edit2 
          variant="Outline" 
          className='h-5  cursor-pointer focus:bg-customGray transition duration-200 ease-in-out  ' 
        />
        </DropComponentList>
      </div>
    </div>
  );

  // Dragged clone component
  const DraggedClone = (
    <div
      className={`${projectContent.selected ? "bg-green-50 shadow-custom-green" : "bg-neutral-100 shadow-custom"} px-4 z-[9999] rounded-3xl gap-2.5  transform-color  cursor-grabbing fixed select-none opacity-80 `}
      style={{
        width : `${width}px`,
        left: `${point.left - point.offset_left}px`,
        top: `${point.top - point.offset_top}px`,
        zIndex: 1000,
        // pointerEvents: 'none', // Prevent interaction with clone
        transform: 'scale(1.02)', // Slight visual distinction
      }}
      dir="rtl"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Mirrored content - same as Container but without event handlers */}
      <div className='w-full flex justify-between  pt-[1rem]'>
        <input 
          checked={projectContent.selected} 
          type="checkbox" 
          className="toggle rounded-md accent-green-600" 
          readOnly
        />
      </div>
      
      <div className='select-none w-full my-[0.75rem]  h-[76px] inset-0 '>
         <MiniPicture url={Default} shouldLoad={true} ref={BackImage}/>
      </div>
      {content}
      <div className='flex justify-end mb-4 h-5 mt-[1rem] text-shadow-xs'>
        <Trash 
          size="32" 
          variant="Outline" 
          className='h-[1.25rem] icon_neutral cursor-pointer' 
          // onClick={() => console.log("delete")} 
        />
        <Edit2 
          size="32" 
          variant="Outline" 
          className='h-full icon_neutral cursor-pointer' 
          // onClick={() => console.log("edit")} 
        />
      </div>
      {/* Rest of the mirrored content */}
      {/* ... */}
    </div>
  ) 
  // useEffect(()=>{
  //   console.log(projectID , 'builded' ,rowNum , motherRow.current) 
  // } , [motherRow.current , ])
  // const masks = (rownum : number , index : number , col = 3 ) => {
    
  //     index -= 1;
  //     // console.log('Rendering mask for row:', rownum, 'index:', index);
  //     const enterMouse = (to: number) => {
  //       console.log(projectIndex + rowNum*col, ' from ran to : ' , to )

  //       dispatch(change({from: projectIndex + rowNum*col,  to }));
  //     };
  //     return (
  //       <div
  //         key={rownum}
  //         className="fixed right-0 left-0 z-[9999] w-full cursor-grabbing"
  //         style={{
  //           height: motherRow.current.height,
  //           top: motherRow.current.top + index * motherRow.current.height,
  //           pointerEvents: 'none', // Prevent outer div from capturing events
  //         }}
  //       >
  //         <div
  //           className=" h-full absolute z-[9999] bg-blue-50"
  //           style={{
  //             width: `${window.innerWidth - motherRow.current.right + width}px`,
  //             pointerEvents: 'auto', // Allow mouse events
  //           }}
  //           onMouseEnter={() => {
  //             console.log('Entered green div', rownum * col);
  //             enterMouse(rownum * col);
  //           }}
  //           onMouseMove={handleMouseMove}
  //         onMouseUp={handleMouseUp}
  //         />
  //         <div
  //           className="hidden lg:block h-full absolute z-[9999] bg-green-50"
  //           style={{
  //             width: `${
  //               motherRow.current.right - width - (motherRow.current.left + width)
  //             }px`,
  //             left: `${motherRow.current.left + width}px`,
  //             pointerEvents: 'auto',
  //           }}
  //           onMouseEnter={() => {
  //             console.log('Entered red div' ,rownum * 3 + 1);
  //             enterMouse(rownum * 3 + 1);
  //           }}
  //           onMouseMove={handleMouseMove}
  //         onMouseUp={handleMouseUp}
  //         />
  //         <div
  //           className="h-full  absolute z-[9999] bg-red-50"
  //           style={{
  //             width: `${motherRow.current.left + width}px`,
  //             left: `0px`,
  //             pointerEvents: 'auto',
  //           }}
  //           onMouseMove={handleMouseMove}
  //         onMouseUp={handleMouseUp}
  //           onMouseEnter={() => {
  //             console.log('Entered amber div' , rownum * col + 2);
  //             enterMouse(rownum * col + col == 3 ? 2 : 1);
  //           }}
  //         />
  //       </div>
  //     );
  //   } 
    // let rows : number[] = []
    
    const memoLoading =<ProjectLoading checked={projectContent.selected}/> 
    // const draggingContainer = useMemo(()=> Container  , [checked , BackImage.current ])
  return (
    <div ref={containerProject}>
      {isDragging ?  memoLoading: 
      <Suspense fallback={memoLoading}>
        {/* <Testing />  */}
        {Container}
      </Suspense>
      }
      {isDragging && 

      DraggedClone}
      {delPop &&
      createPortal(
        deletePop , 
        document.body


      ) }
      
{/*       
      {isDragging && 
      <div
          className="fixed inset-0 z-600"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          // onMouseLeave={handleMouseUp}
          
          style={{ cursor: 'grabbing' }}
        />} */}
      {/* Mouse move/up listeners on document for better dragging */}
      
    </div>
  );
};

export default DraggableContainer;