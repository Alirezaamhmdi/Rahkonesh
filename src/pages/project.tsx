
import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import { SearchNormal1, Headphone, Notification, DirectboxReceive, ArrowDown2, HamburgerMenu} from 'iconsax-reactjs';
import ProfilePicture from '../components/profile';
import SideBar from '../components/side_bar/sideBar'
import '/src/assets/styles/colors.css';
import './mainTable.css';
import fullContext from './mainTableContext';
import miniLogo from '/src/assets/svg/miniLogo.svg';
import teamyer_typograph from '/src/assets/svg/teamyer_mini_type_graphy.svg';
import avatar from '/src/assets/png/Avatar.png';
import office from '/src/assets/png/homeOffice.png';
import Header from '../components/header/header';
import HeaderController from '../components/header/headerController';
import callContext , {State, type callInterface} from '../context/callender-state';
import { jalaaliWeek, toJalaali } from 'jalaali-js';

interface User {
  Version: string,
  Name: string,
  ImgURL: string,
  jobs: string[],
}


const Project: React.FC = () => {
  const user = useRef<User>({
    Version: "v1",
    Name: "یاشار علیزاده بنابی",
    ImgURL: miniLogo,
    jobs: [],
  });
  
  const [fullPage, setFullPage] = useState(true);

  const location = useLocation();
  useEffect(() => console.log(location, 'location'), [location]);
  const now = useRef(new Date())
  const nowJalaali = useRef(toJalaali(now.current))
  const [cal , setCal] = useState({

    day :  nowJalaali.current.jd , 
    month : nowJalaali.current.jm , 
    year : nowJalaali.current.jy , 
    week : jalaaliWeek(nowJalaali.current.jy , nowJalaali.current.jm  ,nowJalaali.current.jd  ).saturday.jd , 
    state : State.WEEK,
  } as callInterface)

  const Imglogo = useRef(new window.Image());
  const teamyer_mini = useRef(new window.Image());
  const Avatar = useRef(new window.Image());
  const HomeOffice = useRef(new window.Image());
  const tasksRef = useRef(document.createElement('div'));
  const [openMenue, setOpenMenue] = useState(false);
  


  useEffect(() => {
    teamyer_mini.current.src = teamyer_typograph;
    Imglogo.current.src = miniLogo;
    Avatar.current.src = avatar;
    HomeOffice.current.src = office;
  }, []);

  return (
    <div className='box-border bg-[url(assets/png/task-bg.jpg)] bg-cover w-screen h-screen md:px-10 flex justify-center overflow-hidden'>
      <div className='lg:min-w-300 relative items-center flex justify-center w-full sm:w-auto lg:max-w-[1214px] lg:mx-auto  px-5 lg:py-8 transition-all duration-500 h-full mx-auto' style={{width:"100%"}} dir='rtl' ref={tasksRef}>
        <div className={`absolute  z-[9999] transition-all overflow-hidden   shadow-right-box ease-in h-full right-5 md:hidden ${openMenue ? 'w-71' : 'w-0'}`} style={{
          left: tasksRef.current.style.left + tasksRef.current.style.width
        }}>
          <SideBar user={user} shrink={openMenue} setShrink={setOpenMenue}/>
        </div>

        <div className='flex w-full h-full gap-6' dir={'rtl'}>
          <div className={`transition-all duration-300 ease-in-out md:max-w-22 lg:max-w-full   ${fullPage ? "lg:w-1/4" : "lg:w-1/12"} hidden md:block`}>
            <SideBar user={user} shrink={fullPage} setShrink={setFullPage}/>
          </div>

          <div className={`lg:mx-0 ${fullPage ? "md:w-3/4" : "md:w-11/12"} h-full flex flex-col gap-6 `}>
          <Header Imglogo={Imglogo} teamyer_mini={teamyer_typograph} shrink={openMenue} setShrink={setOpenMenue} />
           <HeaderController />
            <div className='flex-1 overflow-hidden'>
              <div className='h-full relative '>
                <fullContext.Provider value={fullPage}>
                  <callContext.Provider value = {{initiate : cal , setCallState : setCal }}>
                  <Outlet/>
                  </callContext.Provider>
                  
                </fullContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;