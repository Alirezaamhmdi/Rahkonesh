import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Close  from "../../assets/icons/iconixto/linear/close.svg?react";
import Edit  from "../../assets/icons/Iconex/Light/Edit 1.svg?react";
import Calendar  from "../../assets/icons/Iconex/Light/Calendar.svg?react";
import Logout  from "../../assets/icons/Iconex/Light/Logout.svg?react";
import Plus  from "../../assets/icons/Iconex/Light/Plus.svg?react"
import Microphone  from "../../assets/icons/Iconex/Light/Microphone.svg?react"
import MassageAdd  from "../../assets/icons/iconixto/linear/message-add.svg?react"
import FilesList from "../filesList/filesList";
import RadioLittle from "../radio/radioLittle";
import Input, { type CloseItem } from "../input";
import CheckboxList from "../checkbox/checkboxList";


const EditTask:React.FC = () => {
  const [closeTitle,setCloseTitle]=useState<CloseItem>({ status: false, target: null });
  const [closeTag,setCloseTag]=useState<CloseItem>({ status: false, target: null });
  const [closeDescription,setCloseDescription]=useState<CloseItem>({ status: false, target: null });

  const navigate = useNavigate();
  const location = useLocation();
  const[items,setItems]=useState([ {
        key:"string",
        name:"string",
        image:"",
        status:false,
    }])
  const statusRadio=[
    {name:"در انتظار انجام",
    key:"wait",
    className:"text-base text-neutral-600",
  },
     {name:"درحال انجام",
    key:"doing",
    className:"text-base text-neutral-600",
  },
     {name:"انجام شده",
    key:"done",
    className:"text-base text-neutral-600",
  },
  ]
  const priorityRadio=[
    {name:"اولویت: کم ",
    key:"wait",
    className:"text-base text-blue-900",
  },
     {name:"اولویت: متوسط ",
    key:"doing",
    className:"text-base text-warning-900",
  },
     {name:"اولویت: بالا  ",
    key:"done",
    className:"text-base text-error-900",
  },
  ]
   useEffect(()=>{
       console.log('background',location.state);
       
   },[])
      return (
        <div className="fixed top-0 left-0 w-full h-full bg-backdrop-gray p-[20px]">
          <div className="bg-white h-full w-[47rem] m-auto rounded-[16px] shadow-[0_2px_4px_0_rgba(172,169,169,0.21)] border-[1px] border-primary-200 py-[28px] px-[24px]">

            <div dir="rtl" className="h-full overflow-y-scroll scrollbar-custom scroll-smooth pl-[12px]">
              <div className="flex items-center justify-between mb-[12px] sticky top-0 bg-white z-10">
                <h2 className="text-2xl">ویرایش کار</h2>
                <Close className="fill-[#363538] size-[1.5rem] cursor-pointer hover:fill-primary-1000" />
              </div>

              <div className="pb-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">عنوان کار</h3>
                <div className="flex items-center justify-between relative">
                  {closeTitle.status&&<div className="absolute w-full right-0"><Input Type="text" ClassName="text-base" Close={closeTitle} setClose={setCloseTitle} /></div>}
                  <p className="text-neutral-800 text-base">کار جدید</p>
                  <Edit onClick={(e)=>{setCloseTitle({status:true,target:e.target})}} className="fill-neutral-600 size-5 cursor-pointer hover:fill-primary-1000" />
                </div>
              </div>

              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">توضیحات</h3>
                <div className="relative">
                  {closeDescription.status&&<div className="absolute w-full right-0 h-full"><Input Type="textarea" ClassName="text-base" Close={closeDescription} setClose={setCloseDescription} /></div>}
                  <p className="text-neutral-600 text-base font-light pb-[4px]">برای این صفحه باید آنبوردینگ درست بشه، گزارشات نمایش داده بشه، ناتیفیکیشن ها دارن طراحی میشن که باید اونا رو هم درست</p>
                  <div dir="ltr">
                    <Edit onClick={(e)=>{setCloseDescription({status:true,target:e.target})}} className="fill-neutral-600 size-5 cursor-pointer hover:fill-primary-1000" />
                  </div>
                </div>
              </div>


              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">زمان سررسید کار</h3>
                <div className="flex items-center justify-start text-neutral-700">
                  <Calendar className="fill-neutral-700 size-4 ml-[4px] text-base" />
                  انتخاب تاریخ
                </div>
              </div>

              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">فایل ها</h3>
                <FilesList ClassName="text-base mb-[8px]" />
                <div className="flex items-center justify-start text-neutral-700 font text-base font-medium">
                  <Logout className="fill-neutral-700 size-4 ml-[4px] text-base -rotate-90" />
                  آپلود فایل
                </div>
              </div>

              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">وضعیت</h3>
                <div className="flex items-center justify-start text-neutral-700 font text-base font-medium">
                  <RadioLittle ClassName="flex flex-row items-center justify-between w-full" RadioSize={5} List={statusRadio} defaultKey="done" />
                </div>
              </div>

              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">اولویت انجام کار</h3>
                <div className="flex items-center justify-start text-neutral-700 font text-base font-medium">
                  <RadioLittle ClassName="flex flex-row items-center justify-between w-full" RadioSize={5} List={priorityRadio} defaultKey="done" />
                </div>
              </div>

              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">کارهای زیر مجموعه  </h3>
                <CheckboxList Items={items} SetItems={setItems} />
                <div className="flex items-center justify-start text-neutral-700 font text-base font-medium">
                  <Plus className="fill-neutral-700 size-4 ml-[4px] text-base" />
                  افزودن کار زیر مجموعه
                </div>
              </div>

              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="text-xl text-neutral-800 font-medium pb-[8px]">پیام صوتی </h3>
                <p className="text-neutral-600 text-base mb-[16px]">فقط امکان افزودن  یک فایل صوتی  به این کار وجود دارد. </p>
                <div className="flex items-center justify-start text-neutral-700 font text-base font-medium">
                  <Microphone className="fill-neutral-700 size-4 ml-[4px] text-base" />
                  ضبط فایل صوتی
                </div>
              </div>


              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">چک لیست </h3>
                <div className="flex items-end flex-row justify-between ">
                  <CheckboxList Items={items} SetItems={setItems} />
                  <div className="flex items-center justify-start text-fuchsia-1000 font text-xs font-medium mb-[16px]">
                    <Plus className="fill-fuchsia-1000 size-4 ml-[4px] text-base" />
                    افزودن آیتم 
                  </div>
                </div>
                <div className="flex items-center justify-start text-neutral-700 font text-base font-medium">
                  <Plus className="fill-neutral-700 size-4 ml-[4px] text-base" />
                  افزودن چک لیست برای این کار 
                </div>
              </div>

              <div className="py-[20px] border-b-[1px] border-color-neutral-200">
                <h3 className="text-xl text-neutral-800 font-medium pb-[8px]">برچسب‌ها</h3>
                <p className="text-neutral-600 text-base mb-[16px]">با برچسب‌ها می‌توانید کارها را آسان تر پیدا کنید و یا حتی کارها را با بر اساس برچسب فیلتر کنید. </p>
                <div onClick={(e)=>{setCloseTag({status:true,target:e.target})}} className={`${closeTag.status?"text-primary-1000":"text-neutral-700"} mb-[16px] flex items-center justify-start font text-base font-medium`}>
                  <Plus className={`${closeTag.status?"fill-primary-1000":"fill-neutral-700 "} fill-neutral-700 size-4 ml-[4px] text-base`} />
                  افزودن برچسب برای این کار 
                </div>
                {closeTag.status&&<div className="inline-input-box">
                  <Input Type="text" ClassName="text-base mb-[16px]" Close={closeTag} setClose={setCloseTag} />
                  <div dir="ltr">
                    <div className="bg-success-700 inline-block size-[3rem] rounded-full pointer border-[2px] border-success-700 mx-[12px] cursor-pointer hover:opacity-70"></div>
                    <div className="bg-fuchsia-900 inline-block size-[3rem] rounded-full pointer border-[2px] border-neutral-700 mx-[12px] cursor-pointer hover:opacity-70"></div>
                  </div>
                  </div>}
                  <div className="flex gap-[16px]">
                    <div className="rounded-full bg-fuchsia-1000 text-white w-max flex items-center text-xs p-[8px]">
                      طراحی
                <Close className="fill-white size-[0.75rem] cursor-pointer hover:fill-black mr-[4px]" />

                    </div>
                     <div className="rounded-full bg-fuchsia-1000 text-white w-max flex items-center text-xs p-[8px]">
                      طراحی
                <Close className="fill-white size-[0.75rem] cursor-pointer hover:fill-black mr-[4px]" />

                    </div>
                  </div>
              </div>

              <div className="py-[20px]">
                <h3 className="mb-[16px] text-xl text-neutral-800 font-medium">نظرات برای این کار</h3>
                <div className="flex items-center justify-start text-neutral-700 font text-base font-medium">
                  <MassageAdd className="fill-neutral-700 size-4 ml-[4px] text-base" />
                  افزودن نظر جدید 
                </div>
              </div>

              <div className="pt-[16px] flex justify-content-between gap-[48px]">
                <button className="p-[12px] bg-primary-1000 text-white text-base rounded-[12px] border border-primary-1000 flex-1">ذخیره تغییرات</button>
                <button className="p-[12px] text-neutral-500 text-base rounded-[12px] border border-neutral-500 flex-1">انصراف</button>
              </div>

            </div>

          </div>
        </div>
  );
}
export default EditTask;

