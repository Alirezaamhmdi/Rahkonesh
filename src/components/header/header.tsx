
import {ArrowRight2, Element4, Folder2, Cloud, People, Message2, Briefcase, Activity, SearchNormal1, HamburgerMenu, DirectboxReceive, Notification, Headphone, ArrowDown2} from 'iconsax-reactjs';
import React, { useEffect, useLayoutEffect, useRef, useState, type SetStateAction} from 'react';
import { Link} from 'react-router-dom';
import ProfilePicture from '../profile';
import Massages from '../notify';

const Header:  React.FC<{Imglogo: React.RefObject<HTMLImageElement>, teamyer_mini: string, shrink: boolean, setShrink: React.Dispatch<SetStateAction<boolean>>}> = (({Imglogo, teamyer_mini, setShrink}) => {
    
    const [openNotify, setOpenNotify] = useState(false);
    const notif = useRef(document.createElement('div'));
    
    const handlMouseDown = (e: MouseEvent) => {
      if (notif.current && !notif.current.contains(e.target as Node)) {
        setOpenNotify(false);
      }
    };
    useEffect(()=>{
      document.addEventListener('mousedown', handlMouseDown);
      return () => document.removeEventListener('mousedown', handlMouseDown);
    },[])
  
    useLayoutEffect(()=>{
        const image = document.createElement('img')
        image.src = Imglogo.current.src
    } , [])
    return (
            <div className='rounded-2xl lg:h-[4.5rem] bg-white shadow-right-box px-[2rem] flex-shrink-0'>
              <div className='h-[4.5rem] flex w-full justify-between lg:justify-none items-center transition-all'>
                <div className='hidden outline-1 focus:outline-none focus:ring focus:ring-violet-300 h-10 my-auto bg-neutral-100 rounded-full py-3 px-2 min-w-50 max-w-50 lg:min-w-60 lg:max-w-67 lg:flex items-center'>
                  <button className='rounded-full  w-7 flex items-center justify-center bg-[#FBF4FF] sd cursor-pointer'>
                    <SearchNormal1 size="16" color="#555555"/>
                  </button>
                  <input type='text' className='p-1 w-full  outline-none bg-neutral-100 px-[1rem] transition-all text-xs focus:border-pink-600 rounded-3xl' placeholder='جستجو بر اساس نام پروژه،وظایف و...'>
                  </input>
                </div>
                <span className='w-full hidden lg:block'></span>
                <div className='flex gap-2 items-center'>
                  <HamburgerMenu color="#555555" className='size-5 cursor-pointer md:hidden' onClick={() => setShrink(true)}/>
                  <div className='flex lg:hidden primary hover:opacity-40 w-[8.125rem] h-[2.25rem] text-center justify-center items-center rounded-xl text-white transition gap-[0.5rem]  cursor-pointer'>
                    <DirectboxReceive color="#fff" className='size-4'/>
                    <p className=' text-xs text-start'>دانلود اپلیکیشن</p>
                  </div>
                </div>
                <div className='h-full flex items-center gap-5 relative' dir='rtl'>
                  <div className='hidden primary hover:opacity-40 w-[8.125rem] text-center h-[2.25rem] justify-center lg:flex items-center  rounded-xl text-white transition gap-2 cursor-pointer'>
                    <DirectboxReceive  color="#fff" className='size-[1rem]'/>
                    <p className=' text-xs text-start'>دانلود اپلیکیشن</p>
                  </div>
                  <div className='relative'>
                    <Notification size="22" color="#555555" variant="Bold" className="cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out" onClick={() => { if (!openNotify) setOpenNotify(!openNotify) }}/>
                  </div>
                  <Headphone size="22" color="#555555" variant="Bold" className="cursor-pointer hover:opacity-50 transition"/>
                  <div className='flex items-center gap-1'>
                    <ProfilePicture size={32} className="cursor-pointer"/>
                    <ArrowDown2 size="12" color="#000" className="cursor-pointer"/>
                  </div>
                  <Massages open={openNotify} ref={notif}/>
                </div>
              </div>
              <div className='lg:hidden my-auto bg-neutral-100 rounded-full py-3 px-2 min-w-50 w-full mb-4 h-10 lg:min-w-60 lg:max-w-67 flex items-center'>
                <button className='rounded-full w-7 flex items-center justify-center bg-[#FBF4FF] p-0.5 cursor-pointer'>
                  <SearchNormal1 size="16" color="#555555"/>
                </button>
                <input type='text' className='p-1 w-full bg-neutral-100 text-xs focus:border-pink-600 rounded-3xl transition-all' placeholder='جستجو بر اساس نام پروژه،وظایف و...'>
                </input>
                <img src={teamyer_mini} className='md:opacity-0 w-[3.5rem] md:max-w-0 overflow-hidden opacity-1 transition-opacity duration-300 h-3 mx-1'/>
              </div>
            </div>
  );
});
export default Header