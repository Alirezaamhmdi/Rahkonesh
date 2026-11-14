import './checkboxList.css'

import Check from "../../assets/icons/check.svg?react"
import type { ReactElement, ReactHTMLElement } from 'react';

export interface CheckboxListItems {
    key: string;
    name: string | any;
    image: string;
    status: boolean;
}
const CheckboxList = ({ Items, SetItems }: { Items: CheckboxListItems[], SetItems: React.Dispatch<React.SetStateAction<CheckboxListItems[]>> }) => {

    const changeStatus = (key: string) => () => {
        let newItems = [...Items];

        let selected = newItems.find((i) => i.key == key);
        if (selected) {
            selected.status = !selected.status;
        }
        SetItems(newItems);
    }

    return (
        <div className='check-container relative block max-h-[6.5rem] overflow-y-auto'>

            {Items.map((i, index) => <label key={index} className="check-container flex flex-row items-center cursor-pointer font-b relative  pr-4 flex mb-[16px]">
                <div className='flex flex-row items-center'>
                    {i.image && <div className='bg-red-500 rounded-full size-[1.75rem] mr-[4px]'></div>}
                    <p className='text-xs text-neutral-600 pr-[4px]' >{i.name}</p>
                </div>
                <input className='absolute opacity-0 size-0' type="checkbox" checked={i.status} onChange={changeStatus(i.key)}></input>
                <span className="checkmark size-4 rounded-[4px] border-[1px] border-solid border-gray-300 absolute top-0 bottom-0 m-auto right-0 flex items-center  justify-center">
                    <Check className='w-3 hidden' />
                </span>

            </label>)}
        </div>

    )
}
export default CheckboxList;