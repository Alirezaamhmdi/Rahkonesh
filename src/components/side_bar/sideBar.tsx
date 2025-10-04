
import {ArrowRight2, Element4, Folder2, Cloud, People, Message2, Briefcase, Activity} from 'iconsax-reactjs';
import React, { useContext, useEffect, useLayoutEffect, useRef, type SetStateAction} from 'react';
import { Link} from 'react-router-dom';
import logo_context from '../../context/page-logo.tsx';
// import Minipicture from '../../components/picture/minipicture'
interface User {
  Version: string,
  Name: string,
  ImgURL: string,
  jobs: string[],
}

const SideBar: React.FC<{ user: React.RefObject<User>, shrink: boolean, setShrink: React.Dispatch<SetStateAction<boolean>>}> = (({ user, shrink, setShrink}) => {
    const {Imglogo ,teamyer_mini ,Avatar , HomeOffice} = useContext(logo_context)
    // const logo = useRef<HTMLImageElement | null > (null )
    useEffect(()=>{
        console.log(  Imglogo , "logo loaded ")
        
    } , [Imglogo])
    return (
    <div className='bg-white rounded-2xl pt-5 pb-3 w-full transition-all  min-w-22 transforming-grid shadow-right-box h-full flex flex-col 	'>
      <Link to={".."}>
        <div className={`${shrink ? "lg:pr-6 pr-6 md:pr-0 md:gap-0 gap-2 lg:gap-2" : "px-0 gap-0 flex justify-center"} bg-white  w-full mb-5 flex`}>
          <img  src={Imglogo} className={`size-[32px]  ${!shrink ? "mx-0 lg:mx-0 md:mx-auto" : "lg:mx-0 mx-0 md:mx-auto"}`}/>


          <img src={teamyer_mini} className={!shrink ? 'md:hidden' : 'block lg:block md:hidden w-[7.5rem]'}/>
        </div>
      </Link>

      
      <hr className='border-t-2 border-neutral-100'/>
      <div className={`flex  relative items-center w-full ${!shrink ? "gap-3 pl-3 pr-6 md:gap-0 md:pl-0 md:pr-0" : "md:gap-0 md:pl-0 md:pr-0 lg:gap-3 lg:pl-3  lg:pr-6 gap-3 pl-3 pr-6 "} mt-3`}>
        <ArrowRight2 size="10" color="#081021" variant="Bold" className={`cursor-pointer  md:hidden lg:block cursor-pointer absolute transition-all right-1 md:-right-[0.375rem] bg-white outline outline-[0.375rem] outline-white size-[0.75rem]  rounded-full  duration-500 ${!shrink ? 'rotate-180  ' : ''}`} onClick={() => setShrink(!shrink)}/>
        <img src={Avatar} className={` ${!shrink ? "size-[2.25rem] mx-auto shrink-1" : "size-[2.25rem] md:size-[2.25rem] mx-0 md:mx-auto lg:size-[2.25rem]   lg:mx-0"}  transition-all duration-800`}/>
        <div dir='rtl' className={`text-sm pl-1 ${!shrink ? "hidden" : "md:hidden block lg:block"}`}>
          <span className='text-neutral-400 text-xl block'>
            خوش آمدید 👋
          </span>
          {user.current.Name}
        </div>
      </div>
      <ol className='w-full px-6 mt-1 hover-primary-inner-text mb-2 flex-1 flex-col flex gap-[0.25rem]'>
        <li className={`flex gap-2 text-sm items-center w-full hover-inner hover:bg-purple-100 transition rounded-full h-[2.75rem]     ${!shrink ? 'px-0 py-0 size-[2.75rem] ' : 'px-3 md:px-0 lg:px-3 py-3' } ${location.pathname.split('/')[2] == 'counter' ? "bg-purple-100" : "hover:bg-purple-100"}   cursor-pointer`}>
          <Element4 size="16" variant="TwoTone" className={!shrink ? 'mx-auto' : 'mx-0 md:mx-auto lg:mx-0'}/>
          <span className={`${!shrink ? "hidden" : "md:hidden block lg:block"}`}>
            پیشخوان
          </span>
        </li>
        <li className={`flex gap-2 text-sm items-center w-full hover-inner hover:bg-purple-100 transition rounded-full h-[2.75rem]    ${!shrink ? 'px-0 py-0 size-[2.75rem] ' : 'px-3 md:px-0 lg:px-3 py-3' }   cursor-pointer ${location.pathname.split('/')[2] == 'workspace' ? "bg-purple-100" : "hover:bg-purple-100"}`}>
          <Folder2 size="16" variant="TwoTone" className={!shrink ? 'mx-auto' : 'mx-0 md:mx-auto lg:mx-0'}/>
          <span className={`${!shrink ? "hidden" : "md:hidden block lg:block"}`}>
            فضای کاری
          </span>
        </li>
        <li className={` flex gap-2 text-sm items-center w-full hover-inner hover:bg-purple-100 transition rounded-full h-[2.75rem]  ${!shrink ? 'px-0 py-0 size-[2.75rem] ' : 'px-3 md:px-0 lg:px-3 py-3' }   ${location.pathname.split('/')[2] == 'projects' || location.pathname.split('/')[1] == 'project' ? "bg-purple-100" : "hover:bg-purple-100"} `}>
          <Briefcase size="16" variant="TwoTone" className={!shrink ? 'mx-auto ' : 'mx-0 md:mx-auto lg:mx-0'}/>
          <span className={`${!shrink ? "hidden" : "md:hidden block lg:block"}`}>
            پروژه‌ها
          </span>
        </li>
        <li className={`flex gap-2 text-sm items-center w-full hover-inner hover:bg-purple-100 transition rounded-full  ${location.pathname.split('/')[2] == 'users' ? "bg-purple-100" : "hover:bg-purple-100"}   ${!shrink ? 'px-0 py-0 size-[2.75rem] ' : 'px-3 md:px-0 lg:px-3 py-3' }   cursor-pointer`}>
          <People size="16" variant="TwoTone" className={!shrink ? 'mx-auto' : 'mx-0 md:mx-auto lg:mx-0'}/>
          <span className={`${!shrink ? "hidden" : "md:hidden block lg:block"}`}>
            کاربران
          </span>
        </li>
      </ol>
      <hr className='border-t-2 border-neutral-100 my-auto mb-auto'/>
      <ol className='w-full px-6 mt-1 hover-primary-inner-text mb-2 flex-1 flex-col flex gap-[0.25rem]'>
        <li className={`flex gap-2 text-sm items-center w-full hover-inner hover:bg-purple-100 transition rounded-full   h-[2.75rem]     ${!shrink ? 'px-0 py-0 size-[2.75rem] ' : 'px-3 md:px-0 lg:px-3 py-3' }    cursor-pointer`}>
          <Activity size="16" variant="TwoTone"  className={!shrink ? 'mx-auto' : 'mx-0 md:mx-auto lg:mx-0'} />
          <span className={`${!shrink ? "hidden" : "md:hidden block lg:block"}`}>
            گزارشات
          </span>
        </li>
        <li className={`flex gap-2 text-sm items-center w-full hover-inner hover:bg-purple-100 transition rounded-full h-[2.75rem]  ${!shrink ? 'px-0 py-0 size-[2.75rem] ' : 'px-3 md:px-0 lg:px-3 py-3' }   cursor-pointer`}>
          <Message2 size="16" variant="TwoTone" className={!shrink ? 'mx-auto' : 'mx-0 md:mx-auto lg:mx-0'}/>
          <span className={`${!shrink ? "hidden" : "md:hidden block lg:block"}`}>
            تیکت ها
          </span>
        </li>
        <li className={`flex gap-2 text-sm items-center w-full hover-inner hover:bg-purple-100 transition rounded-full h-[2.75rem]     ${!shrink ? 'px-0 py-0 size-[2.75rem] ' : 'px-3 md:px-0 lg:px-3 py-3' }   cursor-pointer`}>
          <Cloud size="16" variant="TwoTone" className={!shrink ? 'mx-auto' : 'mx-0 md:mx-auto lg:mx-0'}/>
          <span className={`${!shrink ? "hidden" : "md:hidden block lg:block"}`}>
            اشتراک ها
          </span>
        </li>
      </ol>
      <div className={!shrink ? "hidden" : 'w-full px-6 text-xs mt-5 md:hidden block lg:block'}>
        <img src={HomeOffice} className='mx-auto'/>
        <button className='bg-[#B656E4] hover:opacity-60 transition cursor-pointer text-white rounded-full w-full h-[2.75rem]  text-sm'>
          ارتقا سطح
        </button>
      </div>
      <div className={"transition-all duration-300 "+!shrink? " h-full ": ' md:h-full h-0 '}> 
        </div> 
    </div>
  );
});
export default SideBar