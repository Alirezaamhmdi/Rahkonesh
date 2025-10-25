import Cloud from "../../assets/icons/subscription plan.svg?react";
import Activity from "../../assets/icons/Iconex/Light/Chart 1.svg?react";
import Message2 from "../../assets/icons/Iconex/Light/Message square.svg?react";
import Element4 from "../../assets/icons/Iconex/Light/Category.svg?react";
import Briefcase from "../../assets/icons/Iconex/Light/Case.svg?react";
import Folder2 from "../../assets/icons/Iconex/Light/Folder.svg?react";
import People from "../../assets/icons/Iconex/Light/Users.svg?react";
import Chevron from "../../assets/icons/Icon/Solid/chevron-left.svg?react";

import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type SetStateAction,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_context from "../../context/page-logo.tsx";
import { motion, AnimatePresence } from "framer-motion";
// import Minipicture from '../../components/picture/minipicture'
interface User {
  Version: string;
  Name: string;
  ImgURL: string;
  jobs: string[];
}
const SideBar: React.FC<{
  fixed: boolean,
  user: React.RefObject<User>;
  shrink: boolean;
  setShrink: React.Dispatch<SetStateAction<boolean>>;
}> = ({ fixed, user, shrink, setShrink }) => {
  const { Imglogo, teamyer_mini, Avatar, HomeOffice } =
    useContext(logo_context);
  const nav = useNavigate();
  const handleClick = () => {
    fixed ? setShrink(false) : null;
  }
  // const logo = useRef<HTMLImageElement | null > (null )
  return (
    <motion.div
      animate={{
        width: shrink ? "17.375rem" : "5.5rem",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="bg-white overflow-y-auto scrollbar-custom z-5 text-neutral-600 rounded-2xl select-none pt-5 pb-3 w-full max-w-[278px]  min-w-22 transforming-all shadow-right-box h-full flex flex-col"
    >
      <div className="min-h-full flex flex-col">
        {!fixed && <div
          className="bg-white -right-3 p-[4px] z-[2] rounded-full flex justify-center items-center absolute mt-[0.25rem] border border-border cursor-pointer flex bg-white "
          onClick={() => setShrink(!shrink)}
        >
          <Chevron
            className={`fill-neutral-1000  mx-auto  size-[16px] duration-200 ${!shrink ? "rotate-180" : ""
              }`}
          />
        </div>}

        <div className="max-h-full w-full ">
          <div className="bg-white sticky z-1 top-0">
            <Link to={".."}>
              <div
                className={`${shrink ? "pr-6  gap-2 lg:gap-2" : "px-0 gap-0 flex justify-center"
                  } bg-white  w-full flex overflow-x-hidden`}
              >
                <img
                  src={Imglogo}
                  className={`size-[32px] flex-none ${!shrink ? "mx-0 " : "mx-0 "}`}
                />
                <AnimatePresence>
                  {shrink && (
                    <motion.div
                      key="fade-only"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.5, ease: "easeOut" },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0, ease: "easeIn" },
                      }}
                      className="overflow-hidden"
                    >
                      <img src={teamyer_mini} className="w-[7.5rem]" />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </Link>

            <hr className="border-t-2 border-neutral-100 mt-[30px]" />
            <div
              className={`cusor-pointer flex my-auto  h-[3rem] relative items-center w-full mb-[20px] ${!shrink
                ? "gap-3 px-0"
                : " lg:gap-3 lg:pl-3  lg:pr-6 gap-3 pl-3 pr-6 "
                } mt-3`}
            >
              <Chevron
                className={`fill-neutral-1000 size-[20px] rotate-180 ${!shrink ? "hidden" : "block"
                  }`}
              />
              <img
                src={Avatar}
                className={`${!shrink
                  ? "size-[2.25rem] mx-auto shrink-1"
                  : "size-[2.5rem] mx-0 "
                  }  transition-all duration-800 rounded-full`}
              />
              <div
                dir="rtl"
                className={`overflow-hidden pl-1 ${!shrink ? "hidden" : "block"
                  }`}
              >
                <span className="text-neutral-500 text-base block w-full  whitespace-nowrap line-clamp-1 text-bold">
                  خوش آمدید 👋
                </span>
                <span className="text-xs whitespace-nowrap  text-neutral-1000">{user.current.Name}</span>
              </div>
            </div>
          </div>
          <ol className={`w-full text-neutral-600 text-base mt-1 hover-primary-inner-text mb-2 flex-1 flex-col flex gap-[0.25rem] ${shrink ? "px-6" : "px-[22px]"}`}>
            <li
              className={`flex gap-3 text-sm items-center w-full hover:bg-primary-100 transition rounded-full h-[2.75rem] ${!shrink
                ? "px-0 py-0 size-[2.75rem]"
                : "px-3 md:pr-[12px] py-3"
                } ${location.pathname.split("/")[2] == "counter"
                  ? "bg-primary-100 text-primary-1000"
                  : "hover:bg-primary-100"
                }   cursor-pointer`}
            >
              <Element4
                className={`size-[20px] fill-neutral-600 ${!shrink ? "mx-auto" : "mx-0 "
                  }`}
              />
              <span
                className={`${!shrink ? "hidden" : "block   whitespace-nowrap"}`}
              >
                پیشخوان
              </span>
            </li>
            <li>
              <Link
                to="/panel/area" onClick={handleClick}
                className={`flex gap-3 text-sm items-center w-full  hover:bg-primary-100 transition rounded-full h-[2.75rem]    ${!shrink
                  ? "px-0 py-0 size-[2.75rem] "
                  : "px-3 md:pr-[12px] py-3"
                  }   cursor-pointer ${location.pathname.split("/")[2] == "area"
                    ? "bg-primary-100 text-primary-1000"
                    : "hover:bg-primary-100"
                  }`}
              >
                <Folder2
                  className={`size-[20px] ${location.pathname.split("/")[2] == "area" ? "fill-primary-1000" : "fill-neutral-600"} ${!shrink ? "mx-auto" : "mx-0 "
                    }`}
                />
                <span
                  className={`${!shrink ? "hidden" : " block  whitespace-nowrap"
                    }`}
                >
                  حوزه ها
                </span>
              </Link>
            </li>
            <li
              className={`cursor-pointer flex gap-3 text-sm items-center w-full  hover:bg-primary-100 transition rounded-full h-[2.75rem]  ${!shrink
                ? "px-0 py-0 size-[2.75rem] "
                : "px-3 md:pr-[12px] py-3"
                }   ${location.pathname.split("/")[2] == "projects" ||
                  location.pathname.split("/")[1] == "project"
                  ? "bg-primary-100 text-primary-1000"
                  : "hover:bg-primary-100"
                } `}
              onClick={() => {
                nav("/panel/");
                handleClick;
              }}
            >
              <Briefcase
                className={`size-[20px] ${location.pathname.split("/")[2] == "projects" ||
                  location.pathname.split("/")[1] == "project" ? "fill-primary-1000" : "fill-neutral-600"} ${!shrink ? "mx-auto" : "mx-0"
                  }`}
              />
              <span
                className={`${!shrink ? "hidden" : " block   whitespace-nowrap"}`}
              >
                پروژه‌ها
              </span>
            </li>
            <li>
              <Link
                to="/panel/users/list" onClick={handleClick}
                className={`flex gap-3 text-sm items-center w-full  hover:bg-primary-100 transition rounded-full h-[2.75rem]    ${!shrink
                  ? "px-0 py-0 size-[2.75rem] "
                  : "px-3 md:pr-[12px] py-3"
                  }   cursor-pointer ${location.pathname.split("/")[2] == "users"
                    ? "bg-primary-100 text-primary-1000"
                    : "hover:bg-primary-100"
                  }`}
              >
                <People
                  className={`size-[20px] ${location.pathname.split("/")[2] == "users" ? "fill-primary-1000" : "fill-neutral-600"} ${!shrink ? "mx-auto" : "mx-0 "
                    }`}
                />
                <span
                  className={`${!shrink ? "hidden" : " block  whitespace-nowrap"
                    }`}
                >
                  کاربران
                </span>
              </Link>
            </li>
          </ol>
          <hr className="border-t-2 border-border my-[24px]" />
          <ol className={`"w-full mt-1 hover-primary-inner-text mb-2 flex-1 flex-col flex gap-[0.25rem]" ${shrink ? "px-6" : "px-[22px]"}`}>
            <li>
              <Link
                to="/panel/subscription" onClick={handleClick}
                className={`flex gap-3 text-sm items-center w-full  hover:bg-primary-100 transition rounded-full h-[2.75rem]    ${!shrink
                  ? "px-0 py-0 size-[2.75rem] "
                  : "px-3 md:pr-[12px] py-3"
                  }   cursor-pointer ${location.pathname.split("/")[2] == "subscription"
                    ? "bg-primary-100 text-primary-1000"
                    : "hover:bg-primary-100"
                  }`}
              >
                <Activity
                  className={`size-[20px] ${location.pathname.split("/")[2] == "subscription" ? "fill-primary-1000" : "fill-neutral-600"} ${!shrink ? "mx-auto" : "mx-0 "
                    }`}
                />
                <span
                  className={`${!shrink ? "hidden" : " block  whitespace-nowrap"
                    }`}
                >
                  گزارشات
                </span>
              </Link>
            </li>

          </ol>
        </div>

      </div>
    </motion.div>
  );
};
export default SideBar;
