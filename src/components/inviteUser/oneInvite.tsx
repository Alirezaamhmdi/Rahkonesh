import { useState } from "react";
import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import type { CheckboxListItems } from "../checkbox/checkboxList";
import CheckboxList from "../checkbox/checkboxList";
import Select, { type SelectOptions } from "../select/select";

const OneInvite: React.FC<{ OpenId: number | null, SetOpenId: React.Dispatch<React.SetStateAction<number | null>> }> = ({ OpenId, SetOpenId }) => {
  const [navigation, setNavigation] = useState<number>(1);
  const options: SelectOptions[] = [
    { label: "مدیر", value: "admin", className: "py-[4px] px-[8px] text-xs text-primary-1000 bg-primary-100 rounded-[8px] leading-5", actionClass: "text-primary-1000 bg-primary-100", actionSVG: "stroke-primary-1000" },
    { label: "دستیار", value: "assistant", className: "py-[4px] px-[8px] text-xs text-warning-900 bg-warning-100 rounded-[8px] leading-5", actionClass: "text-warning-900 bg-warning-100", actionSVG: "stroke-warning-900" },
    { label: "مشارکت کننده", value: "contributor", className: "py-[4px] px-[8px] text-xs text-error-1000 bg-error-100 rounded-[8px] leading-5", actionClass: "text-error-1000 bg-error-100 ", actionSVG: "stroke-error-1000" },
    { label: "ناظر", value: "viewer", className: "py-[4px] px-[8px] text-xs text-success-700 bg-success-100 rounded-[8px] leading-5", actionClass: "text-success-700 bg-success-100", actionSVG: "stroke-success-700" },
  ];
  const [data, setData] = useState([
    {
      key: "string",
      name: "حمید محمدی ",
      image: "",
      phone: "",
    },
    {
      key: "string",
      name: "حمید محمدی ",
      image: "",
      phone: "",
    },
  ]);

  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full bg-backdrop-gray p-[20px] flex items-center" onMouseDown={() => { SetOpenId(null) }}>
      <div className="bg-white h-max max-h-full w-[36rem] m-auto rounded-[16px] shadow-[0_2px_4px_0_rgba(172,169,169,0.21)] border-[1px] border-primary-200 p-[20px]">

        <div dir="rtl" className="h-full overflow-y-scroll scrollbar-custom scroll-smooth">
          <div className="flex items-center justify-between mb-[12px] sticky top-0 bg-white z-10 mb-[12px] p-[8px]">
            <h2 className="text-xl">کاربران دعوت شده</h2>
            <Close className="fill-[#363538] size-[1.5rem] cursor-pointer hover:fill-primary-1000" />
          </div>

          <div className="flex items-center gap-[12px] pt-[12px] text-base border-b-2 border-neutral-100 mb-[12px]">
            <div onClick={() => { setNavigation(1) }} className={`${navigation == 1 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>تمام کاربران دعوت شده</h4>
            </div>
            <div onClick={() => { setNavigation(2) }} className={`${navigation == 2 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>در انتظار تایید</h4>
            </div>
            <div onClick={() => { setNavigation(3) }} className={`${navigation == 3 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>اضافه شده</h4>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] mb-[12px]">

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="size-[3.125rem] bg-blue-300 rounded-full"></div>
                <div className="pr-[16px]">
                  <p className="text-base text-neutral-800">Haniye ja</p>
                  <span className="text-neutral-400 text-sm">santos1999@gmail.com</span>
                </div>
              </div>
              <Select Options={options} Selected="assistant" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="size-[3.125rem] bg-blue-300 rounded-full"></div>
                <div className="pr-[16px]">
                  <p className="text-base text-neutral-800">Haniye ja</p>
                  <span className="text-neutral-400 text-sm">santos1999@gmail.com</span>
                </div>
              </div>
              <Select Options={options} Selected="assistant" />
            </div>

          </div>


          <div className="flex justify-content-between gap-[16px] pt-[16px]">
            <button className="p-[12px] hover:opacity-70 transition bg-primary-1000 text-white text-sm rounded-[12px] border border-primary-1000 flex-1">ذخیره تغییرات</button>
            <button className="p-[12px] hover:opacity-70 transition text-neutral-500 text-sm rounded-[12px] border border-neutral-500 flex-1">انصراف</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default OneInvite;