import React, { useRef, useState, useEffect, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/side_bar/sideBar";
import "/src/assets/styles/colors.css";
import "./mainTable.css";
import fullContext from "./mainTableContext";
import miniLogo from "/src/assets/svg/miniLogo.svg";
import teamyer_mini from "/src/assets/svg/teamyer_mini_type_graphy.svg";

import Header from "../components/header/header";


interface User {
  Version: string;
  Name: string;
  ImgURL: string;
  jobs: string[];
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
  // const FootBar = lazy(()=>import('../components/foot_bar/foot_bar.tsx'))
  const Imglogo = useRef(document.createElement("img"));
  const tasksRef = useRef(document.createElement("div"));
  const [openMenue, setOpenMenue] = useState(false);
  const sidbarRef = useRef(document.createElement("div"));
  const contentContainerRef = useRef(document.createElement("div"));
  const motherRef = useRef(document.createElement("div"));
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpenMenue(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={motherRef} className="bg-neutral-100 relative w-screen h-screen py-[20px] lg:py-[25px] px-4 flex transitoin-all justify-center overflow-y-scroll snap-y snap-mandatory gap-6"
      dir="rtl">
      <div ref={divRef} className={`z-20 fixed w-max transition-all rounded-2xl  shadow-right-box duration-[300ms] h-full ${openMenue ? 'right-0' : '-right-[17.5rem]'} `}>
        <SideBar fixed={true} user={user} shrink={true} setShrink={setOpenMenue} />
      </div>

      <div
        ref={sidbarRef}
        className={`transition-all z-80 duration-300 ease-in-out flex-none  lg:h-full sticky top-0 h-full  ${fullPage ? "min-w-[278px]" : "min-w-[5.5rem]"
          } hidden md:block`}
      >
        <SideBar fixed={false} user={user} shrink={fullPage} setShrink={setFullPage} />
      </div>
      <div
        className={`lg:mx-auto z-[10] grow gap-6 flex-1 transition-all w-0 h-full flex flex-col relative `}
        ref={contentContainerRef}
      >
        <Header
          Imglogo={Imglogo}
          teamyer_mini={teamyer_mini}
          shrink={openMenue}
          setShrink={setOpenMenue}
        />
        <div className="rounded-2xl bg-white py-3 shadow-right-box flex-1 overflow-hidden z-[999]">
          <div
            className="bg-white overflow-auto h-full relative snap-y snap"
          >
            <fullContext.Provider value={fullPage}>
              <Outlet />
            </fullContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
