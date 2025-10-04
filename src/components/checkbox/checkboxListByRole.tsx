import './checkboxList.css'

import Check from "../../assets/icons/check.svg?react"
import type { ReactElement, ReactHTMLElement } from 'react';
import Select from '../select/select';

export interface CheckboxListItems{
    key:string;
    name:string|any;
    image:string;
    status:boolean;
 }
const CheckboxListByRole = ({Items,SetItems}:{Items : CheckboxListItems[] , SetItems : React.Dispatch<React.SetStateAction<CheckboxListItems[]>>}) => {
const options = [
  { label: "مدیر", value: "admin", className: "py-[4px] px-[8px] text-xs text-primary-1000 bg-primary-100 rounded-[8px] leading-5", actionClass:"text-primary-1000 bg-primary-100", actionSVG:"stroke-primary-1000" },
  { label: "دستیار", value: "assistant", className: "py-[4px] px-[8px] text-xs text-warning-900 bg-warning-100 rounded-[8px] leading-5" ,actionClass:"text-warning-900 bg-warning-100", actionSVG:"stroke-warning-900" },
  { label: "مشارکت کننده", value: "contributor", className: "py-[4px] px-[8px] text-xs text-error-1000 bg-error-100 rounded-[8px] leading-5", actionClass:"text-error-1000 bg-error-100 ", actionSVG:"stroke-error-1000" },
  { label: "ناظر", value: "viewer", className: "py-[4px] px-[8px] text-xs text-success-700 bg-success-100 rounded-[8px] leading-5", actionClass:"text-success-700 bg-success-100", actionSVG:"stroke-success-700" },
];
    const changeStatus = (key:string) => () => {
        let newItems=[...Items];
        
        let selected =newItems.find((i)=>i.key==key);
        if (selected) {
            selected.status = !selected.status;
        }
        SetItems(newItems);
    }

    return (
        <div className='check-container relative block'>
            {Items.map((i,index)=><div className='flex items-center justify-between mb-[16px]'>
                <label key={index} className="check-container flex flex-row items-center cursor-pointer font-b relative  pr-4 flex ">
                    <div className='flex flex-row items-center'>
                        {i.image&&<div className='bg-red-500 rounded-full size-[1.75rem] mr-[4px]'></div>}
                        <p className='text-xs text-neutral-600 pr-[4px]' >{i.name}</p>
                    </div>
                    <input className='absolute opacity-0 size-0' type="checkbox" checked={i.status} onChange={changeStatus(i.key)}></input>
                    <span className="checkmark size-4 rounded-[4px] border-[1px] border-solid border-gray-300 absolute top-0 bottom-0 m-auto right-0 flex items-center  justify-center">
                        <Check className='w-3 hidden' />
                    </span>
                </label>
                <Select Options={options} Selected="assistant" />
            </div>
        )}
        </div>

    )
}
export default CheckboxListByRole;