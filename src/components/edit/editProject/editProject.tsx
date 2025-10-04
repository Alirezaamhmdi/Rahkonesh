import { useState } from "react";
import CheckboxList from "../../checkbox/checkboxList";
import Input, { type CloseItem } from "../../input";
import Edit  from "../../../assets/icons/Iconex/Light/Edit 1.svg?react";
import Folder  from "../../../assets/icons/Iconex/Light/Folder.svg?react";
import FilesList from "../../filesList/filesList";



const EditProject:React.FC=()=>{
    const [closeTitle,setCloseTitle]=useState<CloseItem>({ status: false, target: null });
    const [closeDescription,setCloseDescription]=useState<CloseItem>({ status: false, target: null });

    return (
        <div>
            <div className="p-[8px] border border-primary-200 rounded-[12px]">
                <h3 className="text-neutral-800 text-base mb-[12px]">عنوان پروژه</h3>
                <div className="flex items-center justify-between relative mb-[12px]">
                  {closeTitle.status&&<div className="absolute w-full right-0"><Input Type="text" ClassName="text-xs" Close={closeTitle} setClose={setCloseTitle} /></div>}
                  <p className="text-neutral-800 text-xs">طراحی  رابط کاربری </p>
                  <Edit onClick={(e)=>{setCloseTitle({status:true,target:e.target})}} className="fill-neutral-600 size-4 cursor-pointer hover:fill-primary-1000" />
                </div>

                <h3 className="text-neutral-800 text-base mb-[12px]">توضیحات</h3>
                <div className="relative mb-[12px]">
                  {closeDescription.status&&<div className="absolute w-full right-0 h-full"><Input Type="textarea" ClassName="text-xs" Close={closeDescription} setClose={setCloseDescription} /></div>}
                  <p className="text-neutral-600 text-xs font-light pb-[4px] leading-[20px]">برای این صفحه باید آنبوردینگ درست بشه، گزارشات نمایش داده بشه، ناتیفیکیشن ها دارن طراحی میشن که باید اونا رو هم درست</p>
                  <div dir="ltr">
                    <Edit onClick={(e)=>{setCloseDescription({status:true,target:e.target})}} className="fill-neutral-600 size-4 cursor-pointer hover:fill-primary-1000" />
                  </div>
                </div>

                <h3 className="text-neutral-800 text-base mb-[12px]">ایجاد کننده‌ی پروژه</h3>
                <div className="flex justify-between items-start">
                    <div className="flex items-center ">
                        <div className="size-[1.75rem] bg-red-300 rounded-full"></div>
                        <p className="text-neutral-600 text-xs pr-[8px]">Hadiyousefi995</p>
                    </div>
                    <div className="text-end flex items-start">
                        <time className="text-neutral-600 text-[0.625rem]">02 آبان 1403</time>
                    </div>
                </div>
            </div>
            <span className="block h-[1px] w-full my-[20px] bg-neutral-200"></span>
            <div>
                <h3 className="text-neutral-800 text-base mb-[16px]">تصویر پس زمینه</h3>
                <div className="rounded-[24px] flex items-center justify-center w-full h-[91px] relative overflow-hidden bg-[linear-gradient(0deg,rgba(0,0,0,0.26)_0%,rgba(0,0,0,0.26)_100%),url(assets/png/task-bg.jpg)] bg-[length:cover] bg-[position:50%] bg-no-repeat bg-[color:#F2F3F4,#F2F3F4)]">
                    <button className="p-[8px] bg-primary-1000 text-white text-[0.625rem] rounded-[10px]">تغییر عکس پس‌زمینه</button>
                </div>
            </div>
            <span className="block h-[1px] w-full my-[20px] bg-neutral-200"></span>
            <div>
                <div className="flex items-center mb-[16px] justify-between">
                    <h3 className="text-neutral-800 text-base">فایل ها</h3>
                    <button className="p-[8px] border border-primary-1000 bg-white text-primary-1000 text-[0.625rem] rounded-[10px]">
                        <Folder className="fill-primary-1000 size-[14px] inline-block" />
                        <span className="pr-[4px]">ایجاد پوشه</span>
                    </button>
                </div>
                <FilesList ClassName="text-xs" />
            </div>
            <span className="block h-[1px] w-full my-[20px] bg-neutral-200"></span>
             <div>
                <h3 className="text-neutral-800 text-base mb-[20px]">تعداد کارهای این پروژه: </h3>
                <div>
                    <div className="relative mb-[12px]">
                        <span className="bg-fuchsia-1000 size-[0.5rem] rounded-full inline-block top-0"></span>
                        <span className="pr-[4px] text-xs text-fuchsia-1000 font-light">در انتظار انجام:</span>
                        <span className="pr-[4px] text-xs text-neutral-600 font-light">24 کار</span>
                    </div>
                    <div className="relative mb-[12px]">
                        <span className="bg-blue-900 size-[0.5rem] rounded-full inline-block top-0"></span>
                        <span className="pr-[4px] text-xs text-blue-900 font-light">در انتظار انجام:</span>
                        <span className="pr-[4px] text-xs text-neutral-600 font-light">24 کار</span>
                    </div>
                    <div className="relative">
                        <span className="bg-success-1000 size-[0.5rem] rounded-full inline-block top-0"></span>
                        <span className="pr-[4px] text-xs text-success-1000 font-light">در انتظار انجام:</span>
                        <span className="pr-[4px] text-xs text-neutral-600 font-light">24 کار</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditProject;