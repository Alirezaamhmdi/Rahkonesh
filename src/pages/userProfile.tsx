import { useState } from "react";
import Close from "../assets/icons/iconixto/linear/close.svg?react";
import CheckboxListByRole from "../components/checkbox/checkboxListByRole";
import CheckboxList, { type CheckboxListItems } from "../components/checkbox/checkboxList";

const UserProfile: React.FC = () => {
  const [navigation, setNavigation] = useState<number>(1);

  const [worspaces, setWorspaces] = useState([
    {
      key: "string",
      name: "فضای کاری طراحی ",
      image: "",
      status: true
    },
    {
      key: "strindg",
      name: "فضای کاری برنامه نویسی ",
      image: "",
      status: false
    },
  ]);
  const [boards, setBoards] = useState<CheckboxListItems[]>([
    {
      key: "string",
      name: "طراحی بخش موبایل ",
      image: "",
      status: true,
    },
    {
      key: "strindg",
      name: "طراحی بخش موبایل ",
      image: "",
      status: false,
    },
  ]);
  const [tasks, setTasks] = useState<CheckboxListItems[]>([
    {
      key: "string",
      name: "طراحی بخش موبایل ",
      image: "",
      status: true,
      progress: 80,
    },
    {
      key: "strindg",
      name: "طراحی بخش موبایل ",
      image: "",
      status: false,
      progress: 1,
    },
  ]);
  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full bg-backdrop-gray p-[20px] flex items-center">
      <div className="bg-white h-max max-h-full w-[27.625rem] m-auto rounded-[16px] shadow-[0_2px_4px_0_rgba(172,169,169,0.21)] border-[1px] border-primary-200 p-[20px]">

        <div dir="rtl" className="h-full overflow-y-scroll scrollbar-custom scroll-smooth">
          <div className="flex items-center justify-between mb-[12px] sticky top-0 bg-white z-10 mb-[12px] p-[8px]">
            <h2 className="text-xl">اطلاعات کاربر</h2>
            <Close className="fill-[#363538] size-[1.5rem] cursor-pointer hover:fill-primary-1000" />
          </div>
          <div className="rounded-[20px] px-[20px] py-[16px] bg-primary-100">
            <div>
              <div className="size-[7.3125rem] rounded-full bg-blue-300 m-auto"></div>
            </div>
            <div className="text-center pt-[12px]">
              <h5 className="text-base text-neutral-1000 pb-[4px]">هستی شایان </h5>
              <span className="text-sm text-neutral-500 pb-[4px] block">santos1999@gmail.com</span>
              <span className="text-sm text-neutral-500 pb-[4px] block">091265544223</span>
            </div>

          </div>
          <div className="flex items-center gap-[12px] pt-[12px] text-base border-b-2 border-neutral-100 mb-[12px]">
            <div onClick={() => { setNavigation(1) }} className={`${navigation == 1 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>فضاهای کاری</h4>
            </div>
            <div onClick={() => { setNavigation(2) }} className={`${navigation == 2 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>پروژه‌ها</h4>
            </div>
            <div onClick={() => { setNavigation(3) }} className={`${navigation == 3 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>کارها</h4>
            </div>
          </div>

          {
            {
              1: <div>
                <h6 className="text-xs text-neutral-800 mb-[16px]">فضاهای کاری:</h6>
                <CheckboxListByRole Items={worspaces} SetItems={setWorspaces} />
              </div>,
              2: <div>
                <h6 className="text-xs text-neutral-800 mb-[16px]">پروژه‌ها:</h6>
                <CheckboxList Items={boards} SetItems={setBoards} />
              </div>,
              3: <div>
                <h6 className="text-xs text-neutral-800 mb-[16px]">کارهای جاری:</h6>
                <CheckboxList Items={tasks} SetItems={setTasks} />
              </div>,
            }[navigation]
          }

          <div className="flex justify-content-between gap-[16px] pt-[16px]">
            <button className="p-[12px] hover:opacity-70 transition bg-primary-1000 text-white text-sm rounded-[12px] border border-primary-1000 flex-1">ایجاد لینک دعوت</button>
            <button className="p-[12px] hover:opacity-70 transition text-neutral-500 text-sm rounded-[12px] border border-neutral-500 flex-1">انصراف</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default UserProfile;