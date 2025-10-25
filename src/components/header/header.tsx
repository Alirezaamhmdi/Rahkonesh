
import Notification from '../../assets/icons/Iconex/Light/Bell.svg?react'
import Download from '../../assets/icons/Iconex/Light/Download 2.svg?react'
import Search from '../../assets/icons/Iconex/Light/Search.svg?react'
import Headphone from '../../assets/icons/support-icon.svg?react'
import Up from '../../assets/icons/Iconex/Light/Up.svg?react'
import Burger from '../../assets/icons/Iconex/Light/Burger.svg?react'
import React, { useEffect, useLayoutEffect, useRef, useState, type SetStateAction } from 'react';
import ProfilePicture from '../profile';
import teamyer_mini from "/src/assets/svg/teamyer_mini_type_graphy.svg";

const Header: React.FC<{ Imglogo: React.RefObject<HTMLImageElement>, teamyer_mini: string, shrink: boolean, setShrink: React.Dispatch<SetStateAction<boolean>> }> = (({ Imglogo, teamyer_mini, setShrink }) => {

  const [openNotify, setOpenNotify] = useState(false);
  const notif = useRef(document.createElement('div'));

  const handlMouseDown = (e: MouseEvent) => {
    if (notif.current && !notif.current.contains(e.target as Node)) {
      setOpenNotify(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handlMouseDown);
    return () => document.removeEventListener('mousedown', handlMouseDown);
  }, [])

  useLayoutEffect(() => {
    const image = document.createElement('img')
    image.src = Imglogo.current.src
  }, [])
  return (
    <div className='snap-start flex items-center scroll-my-[2rem] sticky md:relative z-10 top-0 rounded-2xl py-[16px] bg-white shadow-right-box lg:px-[32px] md:px-[1.25rem] px-[0.75rem]  flex-shrink-0'>
      <div className='flex w-full justify-between max-lg:flex-col-reverse max-lg:gap-[20px] items-center transition-all'>
        <div className='outline-1 h-10 bg-neutral-100 rounded-full flex items-center px-[12px] py-[6px] gap-[12px] max-lg:w-full'>
          <button className='rounded-full p-[8px] bg-primary-100 cursor-pointer'>
            <Search className='fill-neutral-800 size-[16px]' />
          </button>
          <input type='text' className='outline-none w-[12rem] bg-neutral-100 transition-all text-xs text-neutral-400' placeholder='جستجو بر اساس نام پروژه،وظایف و...'>
          </input>
          <img src={teamyer_mini} className="w-[3.5rem] mr-auto inline-block lg:hidden" />
        </div>
        {/* <div className='flex gap-2 items-center'>
          <HamburgerMenu color="#555555" className='size-5 cursor-pointer md:hidden' onClick={() => setShrink(true)} />
        </div> */}

        <div className='flex items-center max-lg:w-full max-lg:justify-between'>
          <div className='flex items-center'>
            <button className='hidden max-md:inline-block ml-[12px] hover:opacity-70 transition' onClick={() => setShrink(true)}>
              <Burger className='size-[24px] fill-neutral-1000' />
            </button>

          </div>

          <div className='h-full flex items-center gap-[20px] relative' dir='rtl'>

            <Headphone className="cursor-pointer fill-neutral-1000 cursor-pointer size-[24px] hover:opacity-70 transition" />
            <Notification className="cursor-pointer fill-neutral-1000 size-[24px] hover:opacity-70 transition-opacity duration-300 " onClick={() => { if (!openNotify) setOpenNotify(!openNotify) }} />
            <div className='flex items-center gap-1'>
              <ProfilePicture size={32} className="cursor-pointer" />
              <Up className='stroke-neutral-1000 p-[3px] stroke-svg size-[16px] rotate-180' />
            </div>
          </div>
        </div>


      </div>
      {/* <div className='lg:hidden my-auto bg-neutral-100 rounded-full py-[6px] px-[12px] min-w-50 w-full mb-4 h-10 lg:min-w-60 flex items-center'>
        <button className='rounded-full w-7 flex items-center justify-center bg-[#FBF4FF] p-0.5 cursor-pointer'>
          <SearchNormal1 size="16" color="#555555" />
        </button>
        <input type='text' className='p-1 bg-neutral-100 text-xs focus:border-pink-600 rounded-3xl transition-all' placeholder='جستجو بر اساس نام پروژه،وظایف و...'>
        </input>
        <img src={teamyer_mini} className='md:opacity-0 w-[3.5rem] md:max-w-0 overflow-hidden opacity-1 transition-opacity duration-300 h-3 mx-1' />
      </div> */}
    </div>
  );
});
export default Header