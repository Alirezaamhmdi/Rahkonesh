import { useState } from "react";
import CheckboxList from "../checkbox/checkboxList";


const TaskFilter:React.FC=()=>{
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
    const [status,setStatus]=useState([
    {key:"string",
    name:"در انتظار انجام ",
    image:"",
    status:false},

    {key:"strinwg",
    name:"در حال  انجام",
    image:"",
    status:false},

    {key:"strinqg",
    name:"انجام شده ",
    image:"",
    status:false}
    ])
    const [priority,setPriority]=useState([
    {key:"string",
    name:<div className="relative"><span className="bg-error-900 size-[0.5rem] rounded-full inline-block top-0"></span><span className="pr-[4px] text-xs text-error-900 font-light">اولویت: بالا</span></div>,
    image:"",
    status:false},

    {key:"strinwg",
    name:<div className="relative"><span className="bg-warning-400 size-[0.5rem] rounded-full inline-block top-0"></span><span className="pr-[4px] text-xs text-warning-900 font-light">اولویت: متوسط</span></div>,
    image:"",
    status:false},

    {key:"strinqg",
    name:<div className="relative"><span className="bg-blue-900 size-[0.5rem] rounded-full inline-block top-0"></span><span className="pr-[4px] text-xs text-blue-900 font-light">اولویت: کم</span></div>,
    image:"",
    status:false}
    ])
    return (
           <div>
             <div>
                <h3 className="text-neutral-800 text-base mb-[12px]">بر اساس اعضای تیم</h3>
                <CheckboxList Items={users} SetItems={setUsers} />
                <span className="block h-[1px] w-full my-[20px] bg-neutral-200"></span>
            </div>
             <div>
                <h3 className="text-neutral-800 text-base mb-[12px]">برچسب ها</h3>
                <p className="text-neutral-400 py-[8px] text-xs">برچسبی برای این پروژه تعریف نشده است. </p>
            </div>
            <div>
                <h3 className="text-neutral-800 text-base mb-[12px]">وضعیت</h3>
                <CheckboxList Items={status} SetItems={setStatus} />
                <span className="block h-[1px] w-full my-[20px] bg-neutral-200"></span>
            </div>
             <div>
                <h3 className="text-neutral-800 text-base mb-[12px]">اولویت انجام کار </h3>
                <CheckboxList Items={priority} SetItems={setPriority} />
            </div>
           </div>
    )
}
export default TaskFilter;