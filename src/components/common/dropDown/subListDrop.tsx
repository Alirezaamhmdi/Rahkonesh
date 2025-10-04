import { ArrowCircleDown } from 'iconsax-reactjs';
import React, { type Dispatch, type SetStateAction, useState } from 'react';
// import router from '../../../router/Router';

const SubListDrop: React.FC<{
  title: string;
  sub_list: string[];
  sub_list_state: number;
  set_sub_list_state: Dispatch<SetStateAction<number>>;
}> = ({ title, sub_list, sub_list_state, set_sub_list_state }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full text-sm z-[99999]" title={`Submenu: ${title}`}>
      <button
        className="transition-all flex justify-between w-full cursor-pointer items-center text-xs"
        dir="ltr"
        onClick={() => setOpen(!open)}
        title={`Toggle ${title} submenu`}
      >
        <ArrowCircleDown className={`h-3 transition duration-400 ${open ? 'rotate-180' : 'rotate-0'}`} />
        {title}
      </button>
      <ul
        className={`w-full transition-all overflow-hidden ${!open ? 'min-h-10' : 'h-0'}`}
        title={`${title} submenu items`}
      >
        {sub_list.map((value, index) => (
          <li
            className="text-xs w-full px-2 text-neutral-500 hover:text-neutral-900 cursor-pointer"
            key={index}
            onClick={() => {
              if (index !== sub_list_state) set_sub_list_state(index);
            }}
            title={`Select ${value}`}
          >
            {value}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubListDrop;