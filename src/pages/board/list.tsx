import Dots from "../../assets//icons/iconixto/linear/dots-h.svg?react";
import { useState } from "react";
import Task from "./task";

const List:React.FC = () => {
    const[items,setItems]=useState([ {
        key:"string",
        name:"string",
        image:"",
        status:false,
    }])
    return <div className="bg-glass h-full rounded-2xl w-[17.89581rem] border-[1px] border-solid border-transparent-border p-[16px] mr-[41px]" dir="rtl">
        <div className="bg-fuchsia-1000 text-white rounded-xl flex px-[16px] py-[4px] items-center gap-[10px] mb-5">
          <h3 className="flex-[1_0_0] text-right font-bold text-base">درانتظار انجام</h3>
          <Dots className="size-[24px] hover:opacity-70 cursor-pointer fill-white"/>
        </div>
        <div>

            <Task />

        </div>
    </div>
}
export default List;

