import { useState } from "react";
import CheckboxList from "../checkbox/checkboxList";
import Input, { type CloseItem } from "../input";
import Send  from "../../assets/icons/Iconex/Light/Send.svg?react";
import FilesList from "../filesList/filesList";
import RadioLittle from "../radio/radioLittle";
import CheckboxListByRole from "../checkbox/checkboxListByRole";



const MemberManagment:React.FC=()=>{
    const [users,setUsers]=useState([
        {key:"string",
        name:"علی محمدی",
        image:"string",
        status:false},

        {key:"strinwg",
        name:"علی محمدی",
        image:"string",
        status:false},

        {key:"strinqg",
        name:"علی محمدی",
        image:"string",
        status:false},

        {key:"strinrg",
        name:"علی محمدی",
        image:"string",
        status:false},
    ]);
    const [nowUsers,setNowUsers]=useState([
        {key:"string",
        name:"علی محمدی",
        image:"string",
        status:false},
        {key:"strindg",
        name:"علی محمدی",
        image:"string",
        status:false},
    ]);
      const roleRadio=[
        {name:<>مدیر<span className="text-[0.625rem] pr-[4px] font-light">(فقط مدیر می تواند یک مدیر دیگر اضافه کند)</span></>,
        key:"admin",
        className:"text-xs text-neutral-600",},
         {name:<>دستیار<span className="text-[0.625rem] pr-[4px] font-light">(فقط مدیر می تواند یک مدیر دیگر اضافه کند)</span></>,
        key:"assistant",
        className:"text-xs text-neutral-600",},
         {name:<>مشارکت کننده<span className="text-[0.625rem] pr-[4px] font-light">(فقط مدیر می تواند یک مدیر دیگر اضافه کند)</span></>,
        key:"contributor",
        className:"text-xs text-neutral-600",},
         {name:<>ناظر<span className="text-[0.625rem] pr-[4px] font-light">(فقط مدیر می تواند یک مدیر دیگر اضافه کند)</span></>,
        key:"viewer",
        className:"text-xs text-neutral-600",},
    ];
    

    return(
        <div>
            <h3 className="text-neutral-800 text-base mb-[16px]">ایجاد کننده‌ی پروژه</h3>
            <div className="flex justify-between items-start mb-[20px]">
                <div className="flex items-center ">
                    <div className="size-[1.75rem] bg-red-300 rounded-full"></div>
                    <p className="text-neutral-600 text-xs pr-[8px]">Hadiyousefi995</p>
                </div>
                <div className="text-end flex items-start">
                    <time className="text-neutral-600 text-[0.625rem]">02 آبان 1403</time>
                </div>
            </div>

            <h3 className="text-neutral-800 text-base mb-[16px]">اعضای کنونی: </h3>
            <CheckboxListByRole Items={nowUsers} SetItems={setNowUsers} />
            <span className="block h-[1px] w-full mt-[12px] mb-[20px] bg-neutral-200"></span>

            <h3 className="text-neutral-800 text-base mb-[16px]">افزودن اعضا از فضاهای کاری</h3>
            <CheckboxList Items={users} SetItems={setUsers} />
            <span className="block h-[1px] w-full mt-[12px] mb-[20px] bg-neutral-200"></span>

            <h3 className="text-neutral-800 text-base mb-[4px]">افزودن اعضا با ارسال لینک دعوت</h3>
            <div>
                <p className="text-neutral-600 leading-[16px] text-[0.625rem]">با ارسال لینک دعوت یک پیام به ایمیل شخص دعوت کننده از طرف تیم یر ارسال می شود و در صورت تایید، به پروژه افزوده می شود. </p>
                <input className="inline-input-box w-full px-[20px] border border-primary-600 h-[2.5rem] rounded-[12px] text-bace my-[12px] text-end" placeholder="email / phone"></input>
                <div>
                    <h5 className="text-xs text-neutral-800 mb-[12px]">نقش عضو جدید: </h5>
                    <RadioLittle ClassName="" RowClassName="mb-[12px]" RadioSize={4} defaultKey="admin" List={roleRadio} />

                     <div className="text-end">
                        <button className="p-[8px] bg-primary-1000 text-white text-[0.625rem] rounded-[10px]">
                            <Send className="fill-white size-[14px] inline-block" />
                            <span className="pr-[4px]">ارسال لینک دعوت</span>
                        </button>
                     </div>
                </div>
            </div>
            
        </div>
    )

}
export default MemberManagment;