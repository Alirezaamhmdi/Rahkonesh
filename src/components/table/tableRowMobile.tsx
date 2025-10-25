import type { TableHeaderType } from "./tableHeader";
import Up from "../../assets/icons/Iconex/Light/Up.svg?react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TableRowMobile:React.FC<{items:any, mobileHeader:string[], header:TableHeaderType[], rowClass:string, rowItemClass:string}> = ({items,mobileHeader,header,rowClass,rowItemClass}) => {
    const body=header.filter((i)=>!mobileHeader.includes(i.target));
    const [open,setOpen]=useState<boolean>(false);

    return (<div className="">
        <div className={`${rowClass}`}>

            <div className="flex items-center w-full font-bold cursor-pointer py-[8px]" onClick={()=>{setOpen(!open)}}>
                <div className="w-1/2 flex">{header[0].icon}<p className="text-neutral-800 pr-[4px] text-xs">{header[0].name}</p></div>
                <div className="w-1/2 flex items-center justify-between">
                    <p className="text-neutral-800 py-[12px] text-xs">{items[header[0].target]}</p>
                    <div className="pr-[8px]"><Up className={`fill-[2B3F6C] size-[20px] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"} `}/></div>
                </div>
            </div>

            <AnimatePresence>
                {open&&<motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        height: "auto",
                        transition: {
                            height: { duration: 0.35, ease: "easeOut" },
                            opacity: { duration: 0.25 },
                            y: { duration: 0.25 },
                        },
                    }}
                    exit={{
                        opacity: 0,
                        y: -10,
                        height: 0,
                        transition: {
                            height: { duration: 0.3, ease: "easeIn" },
                            opacity: { duration: 0.2 },
                            y: { duration: 0.25 },
                        },
                    }}
                    className="overflow-hidden">
                        
                    {body?.map((item,i)=><div key={i} className="flex items-center w-full border-t py-[8px] border-neutral-100">
                        <div className="w-1/2 flex">{item.icon}<p className="text-neutral-800 pr-[4px] text-xs">{item.name}</p></div>
                        <div className="w-1/2 py-[12px]">{items[item.target]}</div>
                    </div>)}
                    
                </motion.div>}
           </AnimatePresence>
        </div>
    </div>)
}
export default TableRowMobile;
