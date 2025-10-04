import Trash from "../../assets//icons/Iconex/Light/Trash can.svg?react";
import Edit from "../../assets//icons/Iconex/Light/Edit 3.svg?react";
import CheckBox from "../../assets/icons/_Checkbox base.svg?react";
import Up2 from "../../assets/icons/Iconex/Light/Up.svg?react"
import Plus from "../../assets/icons/Iconex/Light/Plus.svg?react";
import Box from "../../assets/icons/Iconex/Light/Box 1.svg?react";
import CheckboxList from "../../components/checkbox/checkboxList";
import { useEffect, useState } from "react";
import CircularProgress from "../../components/circleProgress";
import { Link, useLocation } from "react-router-dom";


const Task:React.FC = () => {
    const[items,setItems]=useState([ {
        key:"string",
        name:"string",
        image:"",
        status:false,
    }])
    const location = useLocation();

    return  <div className="px-[20px] py-[18px] bg-white rounded-3xl mb-5 border-[1px] border-solid border-success-700">
                <div className="text-base text-neutral-1000 flex flex-row justify-between mb-2.5">
                    <p>طراحی بخش تسک</p>
   <Link to="/c/yud6873" state={{ background: location }}>
  Edit Task
</Link>
                    <CheckBox />
                </div>
                <div>
                    <CheckboxList Items={items} SetItems={setItems} />
                </div>
                <div className="text-neutral-600 text-xs/5 mb-4 flex flex-row items-center">
                    <Plus className="size-[20px] fill-neutral-700"/>
                    <p className="px-1 text-neutral-700 ">افزودن کار زیر مجموعه</p>
                </div>
                {/* detail task */}
                <div>
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-xs text-neutral-700">اطلاعات پروژه</p>
                        <span className="h-[1px] w-[7rem] bg-neutral-200"></span>
                        <Up2 className="w-3" />
                    </div>
                    <div className="mt-[10px]">
                        <div className="flex justify-between mb-[16px]">
                            <p className="text-xs text-neutral-1000 font-light pt-[3px]">واگذار شده به :</p>
                            <div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-neutral-600 pl-[4px]">Haniye kamandi</p>
                                    <div className="rounded-full bg-red-500 size-6"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mb-[16px] items-center">
                            <p className="text-xs text-neutral-1000 font-light">درصد پیشرفت :</p>
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="px-[4px]">
                                        <CircularProgress size={16} progress={50} />
                                    </div>
                                    <p className="text-xs text-layout-600">۷۵%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* detail task */}

                <div className="text-neutral-600 text-xs/5 mb-4">
                    <i className="size-[8px] bg-error-1000 ml-[4px] rounded-full inline-block"></i>
                    <span className="text-xs text-error-1000">اولویت : بالا</span>
                </div>
                
                <div className="flex flex-row justify-end gap-2.5">
                    <Box className="size-[20px] fill-neutral-700"/>
                    <Trash className="size-[20px] fill-neutral-700"/>
                    <Edit className="size-[20px] fill-neutral-700"/>
                </div>
            </div>
  
}
export default Task;

