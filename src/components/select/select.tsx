import React, { useState } from "react";
import { useFloating, offset, flip, shift, useDismiss, useInteractions } from "@floating-ui/react";
import Up from "../../assets/icons/Iconex/Light/Up.svg?react";


interface SelectOptions{
    label:string | any,
    value:string,
    className:string,
    actionClass:string,
    actionSVG:string,

}

const Select:React.FC<{Selected:string,Options:SelectOptions[]}>=({Selected,Options})=>{
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(Options?.find((i)=>i.value==Selected));

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    open,
    onOpenChange: setOpen,
  });

  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
  ]);

  return (
    <div className="relative inline-block">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center py-[4px] px-[8px] text-xs rounded-[8px] ${selected?.actionClass}`}>
        <span className="pl-[8px] leading-5">{selected?.label}</span>
        <Up className={`size-3 ${open?"rotate-0":"rotate-180"} transition stroke-svg ${selected?.actionSVG}`}/>
      </button>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="p-[12px] rounded-[12px] border border-neutral-100 shadow-[0_16px_44px_0_rgba(0,0,0,0.07)] w-[7.5rem] bg-white flex flex-col gap-[12px] z-50">

          {Options.map((item) => (
            item.value!=selected?.value&&<div
              key={item.value}
              onMouseDown={() => {
                setSelected(item);
                setOpen(false);
              }}
              className={`${item.className} cursor-pointer hover:opacity-70`}>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Select;
