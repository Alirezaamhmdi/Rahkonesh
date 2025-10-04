import React , {useState , useContext , useRef, useEffect } from 'react' 
import callContext , {State} from '../context/callender-state'
import { jalaaliMonthLength, jalaaliToDateObject } from 'jalaali-js'
import ClockCircle from '../assets/icons/Iconex/Light/Time Circle.svg?react'
import { ProfileImage } from '../components/calendar/img_sequence'
import { AggTaskBox } from '../components/calendar/calendar_tasks'
// export const upCommingList : React.FC  = () => { 

// } 

const day_week = [  'شنبه' ,  'یکشنبه' ,  'دوشنبه' ,  'سه‌شنبه' ,  'چهار‌شنبه' ,  'پنج‌شنبه' ,  'جمعه']
const CallenderWeekDay : React.FC = () => {
    const {initiate ,  setCallState} = useContext(callContext)
    const [days , setDays]  = useState<number[]>([] as number[])
    useEffect(()=>{
        const loc_days : number[] = [] ; 
        for (let i = 1 ; i <= jalaaliMonthLength(initiate.year  ,initiate.month) ; i++ ){
            loc_days.push(i)
            console.log(i , "tihs is the cal")
        }
        setDays(loc_days)
    } , [initiate]
    
    )
    console.log(days , 'all cal')

    //hover:min-w-[100.7rem] transition-all hover:absolute hover:left-0 hover:bg-white

    return (
        <div className='w-fit ' dir='ltr'> 
            <div className='w-full bg-white sticky top-0 z-[99999] outline outline-b-1 outline-neutral-300'>
                <div className=' relative text-sm flex w-full sticky top-0 text-primary-1000 h-[7rem] items-center' >
                <div className='sticky w-[3rem] min-w-[3rem] top-0 left-0 h-full bg-white text-center items-center flex flex-col  text-xs justify-center z-[999999]'>
                   <ClockCircle className='size-[1rem]'/> ساعت
                </div>
                <div className='bg-primary-1000 rounded-full bottom-0 left-[3rem] w-[6.7rem] h-[6px] left-5 absolute'> </div>
                {
                    
                    days.map((day) => {
                        console.log(day , 'nana the cal')
                        const date = jalaaliToDateObject(initiate.year , initiate.month , 
                            day
                        )
                        return <div className={`flex flex-col items-center  min-w-[6.7rem] w-[6.7rem] gap-[0.625rem] py-[0.75rem] ${( date.getDay()==6) ?'text-fuchsia-1000':''}`} key={day}> 
                            <span>
                                {day}
                            </span>
                            
                             <span>
                                {day_week[date.getDay()]}
                            </span>
                        </div>
                        
                    })
                }
                </div>
            </div>
            <div className='flex z-[600]' >
                <div className=' min-w-[3rem] z-[400] w-[3rem] sticky left-0 bg-primary-100'>
                    {
                        [...Array(24).keys()].map((hour ) => {
                               return <div className='h-hours_box w-full border  outline-neutral-300 text-xs flex items-center text-center justify-center' key={hour}> {hour + 1}</div>
                           })
                    }
                </div>
                {
                    days.map((day)=>{
                         return <div className=''> {

                             [...Array(24).keys()].map((hour ) => {
                               return <div className='h-hours_box min-w-[6.7rem] w-[6.7rem] border outline-neutral-300 bg-white' key={day+'/'+hour}> 
                               {/* <AggTaskBox tasks={['ddfd' , 'sdfsdf','dfdf','sdf']}/> */}
                               <ProfileImage border_color='white' users={['22','dd' ,'sdfsdf' , 'sdfsdf', 'dfds', 'sdfsd' , 'sdfsdf']} max={4} />
                               </div>
                           })}
                         </div>
                    }
                    )
                    }
            </div>
        </div>
    )
}
export default CallenderWeekDay
