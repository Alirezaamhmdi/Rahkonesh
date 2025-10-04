import React , {useEffect, useRef, useState, type MouseEventHandler} from 'react' 
import {  type Dispatch, type SetStateAction , type ReactNode } from 'react';
import './drop.css'
import {ArrowCircleDown, ArrowDown2, ArrowLeft2, Calendar, TickSquare} from 'iconsax-reactjs'
import { createPortal } from 'react-dom';
import { toJalaali, jalaaliMonthLength, jalaaliToDateObject , jalaaliWeek} from 'jalaali-js';

import SubListDrop from './subListDrop';
interface input_dropdown<T> {
    type : string , 
    state : T , 
    useState :  React.Dispatch<React.SetStateAction<T>>
}
interface subList_dropdown<T> {
    name : string , 
    list : T[] , 
    state : T , 
    useState : React.Dispatch<React.SetStateAction<T>>
}

interface DropDown_input { 
    choosing_list ?: string[] , 
    choosing_list_state ?: {
        state : number , 
        setState : React.Dispatch<React.SetStateAction<number>>
    } , 
    inputs_dropdown ?: input_dropdown<string>[] ,
    subList_dropdown ?: subList_dropdown<string>[] , 




}
// const DropDouwn_Choosing : React.FC<DropDown_input> = ( {choosing_list  ,choosing_list_state ,inputs_dropdown  , subList_dropdown})=> {
//     const lastChoosingList :React.RefObject<React.JSX.Element[]> = useRef([])
//     useEffect(() => {
//     if (choosing_list){
//          lastChoosingList.current = choosing_list.map(( value , index ) => {
//             return <button key = {`${value}-${index}`}  className={`${(choosing_list_state?choosing_list_state.state : 0) == index ? "text-black" : 'text-neutral-500'} flex gap-3`} onClick={()=>choosing_list_state?.setState(index)}>
//                 {value}
//                 {(choosing_list_state?choosing_list_state.state ) && <TickSquare size="16" color="#37d67a" variant="Bold"/>}
//                 </button>
//          })    
//     }
//     if (subList_dropdown){
//         lastChoosingList.current.push(...subList_dropdown.map(
//             (value , index)=>{
//                 return <div dir ='rtl' key={index}>
//                     <button className='sm text-black bg-white'>

//                     </button>
//                     <div>

//                     </div>
//                 </div>
//             })
//         )
        

//     }  
// }
//  , [] )
//     return (
//         {
//             ...lastChoosingList.current
//         }
        
//     )
// }   
export const  Description = ({children , description} : { children : ReactNode,description:string}) => {

    return (<div className='relative group/item flex flex-col items-center  '>
        <div>
            {children}
        </div>
        <div className='flex items-center flex-col  opacity-0 group-hover/item:opacity-100 absolute z-[601] transition duration-500 top-full '>
            <div className='w-2 h-1 rounded-t-full bg-[#FBF4FF] hidden group-hover/item:block'>
            
            </div>
        <div className='rounded-xl  px-0.5 py-1 bg-[#FBF4FF] hidden group-hover/item:block w-10 text-center'>
            {description}
           
        </div>
        </div>
    </div>)

}
export default function DropComponentList({choosingList = [] , choosed , setChoosed  , children , className ="" , nothing ='text-neutral-500' , focus ='text-pink-700' , hover = 'text-pink-500' , needSet = false} : {choosingList ?: string[] , choosed : number|null , setChoosed : Dispatch<SetStateAction<number|null>> , children : ReactNode,className?:string , nothing ?:string , hover ?: string , focus ?:string , needSet ?: boolean}  ){
    const [state , setState] = useState(false)
 
    // console.log(choosingList , 'choosing list')
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container

    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setState(false); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    return (
        
    <div ref={dropdownRef} className={`reletive flex flex-col items-center z-[601] ${nothing}  hover:${hover}`} dir='rtl'>  <button 
        onClick={() => setState(!state)} 
        className={`${state && focus}`}
      >
        {children}
      </button>
      
      {/* Dropdown (Absolute + Overlay) */}
      <div 
        className={` text-xs shadow-dropdown
            bg-white px-[1rem]
          absolute top-full
          -mt-2
          w-fit rounded-2xl
          transition-all duration-300 ease-in-out 
          overflow-hidden 
          ${state ? 'max-h-60' : 'max-h-0 '}
          ${className}
        `}
      >
        <div className='flex flex-col gap-y-[.625rem] py-[.5rem]  items-start w-full z-[601]' dir='rtl'>
        {choosingList.map((value , index) => {
            return needSet ? (<div className='flex justify-between items-center gap-1 w-full'>
            <button key = {index} onClick={()=> (index != choosed) ?setChoosed(index) : setChoosed(null)} className={`${(index===choosed) ? 'text-black ' : 'text-neutral-400'} text-[.625rem] py-1 cursor-pointer hover:text-neutral-600`}>{value} </button>
            <TickSquare className={`h-3.5 ${index != choosed && 'opacity-0'} transition`}  color="#37d67a" variant="Bold"/>
            </div> ) : <button key = {index} onClick={()=> (index != choosed) ?setChoosed(index) : setChoosed(null)} className={`text-neutral-400 cursor-pointer hover:text-neutral-600`}>{value} </button>
        })}
        </div>

      </div>
            </div>
    );}
    
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
const DateTable = ({from , setFrom , setTo , to } : {from : [number , number , number] , setFrom : Dispatch<SetStateAction<[number , number , number]>> , setTo : Dispatch<SetStateAction<[number , number , number]>>  , to : [number , number , number]}) => {
  const {jy : currentYear} = toJalaali(new Date)
// Persian month names
  const [currentDate, setCurrentDate] = useState(new Date());
  const { jy: year, jm: month , jd : jd} = toJalaali(currentDate);
  const [first , setFirst ] = useState<boolean>(true) //if first == true mean we have to signe the determinated date into the from and otherwise we have to asign it to the to 
  const [monthOpen , setMonthOpen] = useState(false)
  const [yearOpen , setYearOpen] = useState(false)
    const containerRef = useRef(null);
  const currentYearRef = useRef(null);
  // Get month info
  let monthLength = jalaaliMonthLength(year, month);
  let firstDay =  5 -(jalaaliWeek(year , month ,1).friday.jd -1) // Day of week (0-6)
  const emptyCells: number =firstDay < 6 ? firstDay + 1 : 0 ; 
   useEffect(()=>{
    if (from.every((x) => x===0 ) || to.every((x) => x===0 ) ){
      setFrom([year , month , jd])
      setTo([year , month , jd])
    }
  } , [])
  useEffect(() => {
    if (yearOpen && currentYearRef.current && containerRef.current) {
      // Calculate scroll position to center the current year
      const containerHeight = containerRef.current.clientHeight;
      const yearPosition = currentYearRef.current.offsetTop;
      const yearHeight = currentYearRef.current.clientHeight;
      // console.log('year open ' , containerHeight , yearPosition , yearHeight)
      containerRef.current.scrollTop = Math.round(yearPosition - yearHeight*140)
    }
  }, [yearOpen]);
  useEffect(()=>{
      firstDay = 6 -(jalaaliWeek(year , month ,1).friday.jd -1) 
      console.log(firstDay)
      monthLength = jalaaliMonthLength(year, month);
      // firstDay = toJalaali(jalaaliToDateObject(year, month, 1))
  } , [month , year ,firstDay])
  // Generate days array
  const days : (number | null)[]= [];
  
  // Add empty cells for days before the 1st
  for (let i = 0; i < emptyCells; i++) {
    days.push(null);
  }

  // Add actual days of the month
  for (let day = 1; day <= monthLength; day++) {
    days.push(day);
  }

  // Navigation functions
  const prevMonth = () => {
    const newMonth = month === 1 ? 12 : month - 1;
    const newYear = month === 1 ? year - 1 : year;
    setCurrentDate(jalaaliToDateObject(newYear, newMonth, 1));
  };

  const nextMonth = () => {
    const newMonth = month === 12 ? 1 : month + 1;
    const newYear = month === 12 ? year + 1 : year;
    setCurrentDate(jalaaliToDateObject(newYear, newMonth, 1));
  };

  // Persian weekday names
  const weekdays = ['شنبه', 'یک‌شنبه', 'دو‌شنبه', 'سه‌شنبه', 'چهار‌شنبه', 'پنج‌شنبه', 'جمعه'];
  const [chossed , setChoosedDate] = useState<[number , number , number ]  > ([year , month , jd])
  useEffect(()=>{
    if (first) {
      setFrom(chossed)
    }else { 
      setTo(chossed)
    }
    setFirst(!first)
  } 
  , [chossed ])
  const betweenMonth = (year : number , month : number , day : number )=> {
    if (to[1] != from[1]){
      return (
        (month == to[1] && day< to[2]) ||
        (month == from[1] && day > from[2] ) ||
        (month > from[1] && month < to[1])
      )
    }
    return false
  }
  return (
    <div className=" flex flex-col " dir='rtl'>
      <div className=" flex items-center justify-between text-sm mb-2">
        <div className='reletive max-h-50 flex items-center justify-center w-full'>
        <button className='w-full flex  items-center justify-center cursor-pointer ' onClick={()=>{setMonthOpen(!monthOpen)}}>
          {monthNames[month - 1]}
          <ArrowDown2 className={"h-4 transition-all duration-300 "+(monthOpen ? 'rotate-0' : 'rotate-180')}/>
                 </button>

          {monthOpen && <div className={`w-22 ${monthOpen ? 'h-50 opacity-100 outline-1' : 'h-50 opacity-0  outline-0 '} transition-opacity duration-300 overflow-y-auto outline  bg-white outline-gray-200  rounded-xl absolute mr-5 mt-63 `}>
            <div className='py-2 flex flex-col gap-4 '>
            {
              monthNames.map((value , index) => {
                return <button key={index} className={`snap-start cursor-pointer ${index + 1 == month ? 'primary-text' : ''}`} onClick={()=>{setCurrentDate(jalaaliToDateObject(year, index + 1, 1));setMonthOpen(false)}}>
                  {value}
                </button>
              })
            }
            </div>
          </div>}
          </div>
          
        <div className='reletive max-h-50 flex items-center justify-center w-full'>
        <button className='w-full flex  items-center justify-center cursor-pointer ' onClick={()=>{setYearOpen(!yearOpen)}}>
          {year}
          <ArrowDown2 className={"h-4 transition-all duration-300 "+(yearOpen ? 'rotate-0' : 'rotate-180')}/>
                 </button>

          {yearOpen && <div className={`w-22 ${yearOpen ? ' opacity-100 outline-1' : ' outline-0  border-0 '} transition-opacity duration-300   bg-white outline-gray-200  rounded-xl absolute mr-5 mt-63 `}>
            <div className='py-2 flex flex-col gap-4 overflow-y-auto max-h-50 snap-y'
            ref={containerRef}>
            {
              Array.from({length : 200} , (_, i ) => i - 20).map((value , index) => {
                return <button key={index} className={`snap-start cursor-pointer ${currentYear - value == year ? 'primary-text snap-start' : ''}`}
                ref={year === currentYear ? currentYearRef : null}

                onClick={()=>{setCurrentDate(jalaaliToDateObject(currentYear - value ,month, 1));setMonthOpen(false)}}>
                  {  currentYear - value }
                </button>
              })
            }
            </div>
          </div>}
          </div>
      </div>
      <hr className='border-0.5 my-3 border-[#F4E3FD]'/>

      <div dir = 'rtl' className='flex gap-2 items-center mb-4 px-6' >
        <div className={`text-[10px] py-2  text-center w-full outline-1 outline rounded-xl shodow-little transition ${ first ? "outline-purple-900" : "outline-gray-300"}`} onClick={()=>{setFirst(true)}}>{from[2]}  {monthNames[from[1] - 1]} {from[0]}</div>
        <small className='text-gray-400'>
          تا
        </small>
        <div className={`text-[10px] py-2 text-center w-full outline-1 outline rounded-xl shodow-little transition ${ !first ? "outline-purple-900" : "outline-gray-300"}`} onClick={()=>{setFirst(false)}}>{to[2]}  {monthNames[to[1] - 1]} {to[0]}</div>
      
      </div>
      <div className='w-full px-6'>
      <table className="mx-auto w-full ">
        <thead >
          <tr className=''>
            {weekdays.map((day, index) => (
              <th className='text-[0.5rem] ml-1 py-2 ' key={index}>{day} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
            <tr key={weekIndex} className='text-[0.75rem] text-bold '>
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day = days[weekIndex * 7 + dayIndex];
                return (
                  <td 
                    key={dayIndex} 
                    className= ' cursor-pointer  align-middle p-0' 
                      // + (day != null) ? ' active-day '  : ' empty-day '
                      // +
                      // compareDate(chossed?chossed : [0,0,0] , [day?day : 0 , month , year])? 'bg-red' : 'bg-blue'
                    

                    onClick={() => {setChoosedDate([   year ,month, day?day : 0 ])} }
                  >
                    <div className={`  mx-auto transition-all hover:scale-125  ${ !compareDate(first ? from : to  , [   year ,month , day?day:0]) ? !compareDate(!first ? from : to  , [   year , month , day?day:0 ]) ? 'hover:bg-purple-200' :  'bg-purple-200': "bg-purple-300"} rounded-full flex items-center justify-center w-6 h-6 ${
                      (year >= from[0] && year <= to[0] && month >= from[1] && month <= to[1] && day ? day > from[2] && day < to[2] : false) || (to[0]==from[0] && to[0] ===year &&betweenMonth(year , month , day?day:0  ) )&& day
                       ? 'bg-purple-100' : ''}`}>
                {day || ''}
              </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function compareDate (currentDate : [number , number , number] , choosed : [number , number , number]) {
  return currentDate.map((val , index) => val == choosed[index]).every((x:boolean)=>x==true)
}
const DATE: React.FC = () => {
  const [date, setDate] = useState(Intl.DateTimeFormat('fa-IR').format(new Date()));
  const [set, setSet] = useState(false); // Just to not show the date at first
  const [isOpen, OpenIt] = useState(false);
  const [from, setFrom] = useState<[number, number, number]>([0, 0, 0]);
  const [to, setTo] = useState<[number, number, number]>([0, 0, 0]);
  
  // Dragging state management
  const [dragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 136, y: 100 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Boundary checks to keep window within viewport
    const boundedX = Math.max(0, Math.min(window.innerWidth - 272, newX));
    const boundedY = Math.max(0, Math.min(window.innerHeight - 388, newY));
    
    setPosition({
      x: boundedX,
      y: boundedY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (dragging) {
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
  }, [dragging, dragStart]);

  const Portal = createPortal(
    // <div 
    //   className={`fixed inset-0 z-[8000] ${isOpen ? 'block' : 'hidden'}`}
    //   onMouseMove={handleMouseMove}
    //   onMouseUp={handleMouseUp}
    // >
      <div 
        className={`bg-white absolute shadow-custom ease-out rounded-3xl pb-6 h-97 w-68 overflow-hidden top-0 left-0 z-[99999] ${ dragging ? 'cursor-grabbing' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: dragging ? 'grabbing' : 'default'
        }}
      >
        {/* Drag handle area */}
        <div 
          className={`h-6 w-full ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
        ></div>
        
        <DateTable from={from} setFrom={setFrom} to={to} setTo={setTo} />
        <hr className='border-0.5 my-3 border-[#F4E3FD]' onMouseDown={handleMouseDown}/>

        <div className='flex gap-3 text-xs px-6 py-2'>
          <button className='w-full primary rounded-xl py-2 cursor-pointer text-white hover:opacity-85 transition-opacity'>
            تأیید تاریخ
          </button>
          <button 
            className='w-full border-2 primary-text cursor-pointer border-[#9429c5] hover:border-[#9429c56b] transition-opacity duration-500 rounded-xl' 
            onClick={() => OpenIt(false)}
          >
            انصراف
          </button>
        </div>
      {/* </div> */}
    </div>,
    document.body
  );
  return <><div className='relative rounded-sm w-full flex bg-white text-neutral-400 items-center gap-1 text-[0.60rem] h-6 border-1 border-purple-600 cursor-text z-[9999]' onClick={()=>{OpenIt(!isOpen) ; console.log('clicked on the calender')} }>
      <Calendar className='h-2' />  
      <p className='line-clamp-1'>
      {!set ? " انتخاب تاریخ" : date}
      </p>
      <ArrowLeft2 className='h-2'  />
       </div> 
      {isOpen && Portal}
      
      </>
     
}
export function DropWithotherComponent({ subList , subListState   , Date , children } : {subList : Map<string , string[] > ,subListState :Map<string , [number , Dispatch<SetStateAction<number>>] > , Date : boolean  ,   children : React.ReactNode}){
  const element = useRef(document.createElement('div'))
  const [open ,setOpen] = useState(false)
  // if (Date){

  // }
  const subListElements = Array.from(subList.keys()).map((value , index) => {
    const subListComponents = []
    if (subListState.get(value) && subList.get(value)) {
      subListComponents.push(  <SubListDrop title={value}  sub_list={subList.get(value)} sub_list_state={subListState.get(value)[0]} set_sub_list_state={subListState.get(value)[1]} />)
    }
    return subListComponents
  })  
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container
  const droplink = useRef<HTMLDivElement>(null); // Ref for dropdown container

    useEffect(() => {
    if( !open ) return 
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false); // Close dropdown
        // console.log('out')
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  useEffect(()=>{
    // console.log('out ' , open)
  } , [open])
  return (<div ref={dropdownRef}>
    <div className='cursor-pointer' onClick={() => setOpen(!open)} >{children}</div>

    <div className={`transition-all duration-500 absolute  z-[9999] `} >
    <div className={` bg-white rounded-2xl  transition-all duration-500 ease-in-out shadow-custom  overflow-hidden ${open ? 'max-h-[500px]' : 'max-h-0'}`}>
      <div className=' p-2 flex flex-col gap-2.5 ' >
        
    {...subListElements}
    
    { (Date)&& <DATE/> }
      </div>
    </div>
    </div>
  
  </div>)
}