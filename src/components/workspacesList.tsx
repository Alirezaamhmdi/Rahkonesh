import { Link, useLocation } from "react-router-dom";
import Key from "../assets/icons/iconixto/linear/key.svg?react"
import Pagination from "./table/pagination";
import Dots from "../assets/icons/iconixto/linear/dots-h.svg?react"
import Check from "../assets/icons/check.svg?react"
import Calendar from "../assets/icons/Iconex/Light/Calendar.svg?react"
import Add from "../assets/icons/Iconex/Light/Add user.svg?react"
import Trash from "../assets/icons/Iconex/Light/Trash can.svg?react"
import Edit from "../assets/icons/Iconex/Light/Edit 2.svg?react"

import './checkbox/checkboxList.css';
import { ProfileImage } from "./calendar/img_sequence";

const WorkspacesList: React.FC = () => {
    const location = useLocation();

    //  const changeStatus = (key:string) => () => {
    //         let newItems=[...Items];

    //         let selected =newItems.find((i)=>i.key==key);
    //         if (selected) {
    //             selected.status = !selected.status;
    //         }
    //         SetItems(newItems);
    //     }

    if (true) {
        return <div className="flex flex-1 flex-col">
            <div className="pb-[16px] flex-1">
                <div className="flex flex-col gap-[32px]">
                    {[1, 2, 3].map((i, index) => <div key={index} className="bg-card-surface p-[20px] rounded-[20px]">
                        <div className="pb-[10px] flex items-center justify-between border-b border-b-[#E4E6E8] mb-[10px]">
                            <div className="relative pr-[24px]">
                                <div className="check-container">
                                    <input className='absolute transition opacity-0 size-0' type="checkbox" checked={true} onChange={() => { }}></input>
                                    <span className="checkmark  cursor-pointer size-4 rounded-[4px] border-[1px] border-solid border-gray-300 absolute top-0 bottom-0 m-auto right-0 flex items-center  justify-center">
                                        <Check className='w-3 hidden' />
                                    </span>
                                </div>
                                <p className="text-gray-2 text-base">فضای کاری تیم محصول </p>
                            </div>
                            <button><Dots className="fill-neutral-600 size-[24px]" /></button>
                        </div>
                        <div>
                            <div>
                                <div className="flex items-center justify-between mb-[8px]">
                                    <p>اطلاعات فضای کاری</p>
                                    <button className="p-[8px] rounded-[10px] bg-primary-1000 hover:opacity-70 text-white text-[0.625rem] transition">
                                        ایجاد پروژه‌ی جدید
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="size-[16px] fill-neutral-500" />
                                    <span className="text-[0.625rem] text-neutral-500 pr-[4px]">ایجاد شده در 22 اردیبهشت 1404</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-[30px]">
                                <div className="flex md:gap-[40px] gap-y-[20px] gap-x-[16px] max-md:flex-wrap">
                                    <div className="text-right max-md:flex-[0_0_45%] md:text-center">
                                        <div className="text-neutral-600 text-[0.625rem] mb-[8px] md:b-[24px] font-light">ایجاد کننده:</div>
                                        <div className="flex items-center justify-start md:justify-between">
                                            <div className="rounded-full bg-red-500 size-6"></div>
                                            <p className="text-xs  text-blue-800 pr-[4px]">Haniye ja</p>
                                        </div>
                                    </div>
                                    <div className="text-right max-md:flex-[0_0_45%] md:text-center">
                                        <div className="text-neutral-600 text-right text-[0.625rem] mb-[8px] md:b-[24px] font-light">تعداد کارها:</div>
                                        <div className="text-neutral-1000 text-xs text-left">
                                            <ProfileImage users={["", "", "", "", "", "", "", "", "", "", "", ""]} max={7} border_color="" />
                                        </div>
                                    </div>
                                    <div className="text-right max-md:flex-[0_0_45%] md:text-center">
                                        <div className="text-neutral-600 text-[0.625rem] mb-[8px] md:b-[24px] font-light">تعداد کارها:</div>
                                        <div className="text-neutral-1000 text-xs text-left">
                                            20
                                        </div>
                                    </div>

                                    <div className="text-right max-md:flex-[0_0_45%] md:text-center">
                                        <div className="text-neutral-600 text-[0.625rem] mb-[8px] md:b-[24px] font-light">تعداد پروژه ها:</div>
                                        <div className="text-neutral-1000 text-xs text-left">
                                            20
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[12px]">
                                    <Link to="/invite-member/yud6873" state={{ background: location }} ><Add className="fill-neutral-600 size-[20px]" /></Link>
                                    <button><Trash className="fill-neutral-600 size-[20px]" /></button>
                                    <button><Edit className="fill-neutral-600 size-[20px]" /></button>
                                </div>
                            </div>

                        </div>
                    </div>)}
                </div>
            </div>
            <div className="flex justify-end ">
                <Pagination pageCount={10} count={40} />
            </div>
        </div>
    } else {
        return <div className="h-full flex flex-col gap-[10px]">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`skeleton-loading rounded-[16px]`} style={{ height: 100 / 6 + "%" }}></div>
            ))}

        </div>
    }

}
export default WorkspacesList;
