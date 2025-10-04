import React, {useRef, useState, useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import { SearchNormal1, Headphone, Notification, DirectboxReceive, ArrowDown2, HamburgerMenu} from 'iconsax-reactjs';
import ProfilePicture from '../components/profile';
import SideBar from '../components/side_bar/sideBar'
import '/src/assets/styles/colors.css';
import './mainTable.css';
import Massages from '../components/notify';
import fullContext from './mainTableContext';
import miniLogo from '/src/assets/svg/miniLogo.svg';
import teamyer_typograph from '/src/assets/svg/teamyer_mini_type_graphy.svg';
import avatar from '/src/assets/png/Avatar.png';
import office from '/src/assets/png/homeOffice.png';
import Header from '../components/header/header';

interface User {
  Version: string,
  Name: string,
  ImgURL: string,
  jobs: string[],
}


const Projects: React.FC = () => {
  const user = useRef<User>({
    Version: "v1",
    Name: "یاشار علیزاده بنابی",
    ImgURL: miniLogo,
    jobs: [],
  });

  const [fullPage, setFullPage] = useState(true);
  const location = useLocation();
  useEffect(() => console.log(location, 'location'), [location]);

  const Imglogo = useRef( document.createElement('img' ));
  const tasksRef = useRef(document.createElement('div'));
  const [openMenue, setOpenMenue] = useState(false);



  // useEffect(() => {
  //   if (Imglogo.current){
  //   teamyer_mini.current.src = teamyer_typograph;
  //   Imglogo.current.src = miniLogo;
  //   Avatar.current.src = avatar;
    // HomeOffice.current.src = office ;}
  // }, []);

  return (
    <div className='box-border w-screen h-screen md:px-10 flex justify-center overflow-hidden'>
      <div className='lg:min-w-300 relative items-center flex justify-center w-full sm:w-auto lg:max-w-[1214px] lg:mx-auto  px-5 lg:py-8 transition-all duration-500 h-full mx-auto' style={{width:"100%"}} dir='rtl' ref={tasksRef}>
        <div className={`absolute  z-[9999] transition-all overflow-hidden   shadow-right-box ease-in h-full right-5 md:hidden ${openMenue ? 'w-71' : 'w-0'}`} style={{
          left: tasksRef.current.style.left + tasksRef.current.style.width
        }}>
          <SideBar  user={user} shrink={openMenue} setShrink={setOpenMenue}/>
        </div>

        <div className='flex w-full h-full gap-6' dir={'rtl'}>
          <div className={`transition-all duration-300 ease-in-out md:max-w-22 lg:max-w-full   ${fullPage ? "lg:w-1/4" : "lg:w-1/12"} hidden md:block`}>
          <SideBar  user={user} shrink={fullPage} setShrink={setFullPage}/>
          </div>

          <div className={`lg:mx-0 ${fullPage ? "md:w-3/4" : "md:w-11/12"} h-full flex flex-col gap-6 `}>
          <Header Imglogo={Imglogo} teamyer_mini={teamyer_typograph} shrink={openMenue} setShrink={setOpenMenue} />
           
            <div className='rounded-2xl bg-white py-3 shadow-right-box flex-1 overflow-hidden'>
              <div className='rounded-2xl bg-white overflow-auto h-full relative
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-0
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300'>
                <fullContext.Provider value={fullPage}>
                  <Outlet/>
                </fullContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;