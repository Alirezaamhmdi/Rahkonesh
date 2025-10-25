import { flip, size, offset, shift, useClick, useDismiss, useFloating, useInteractions, type Placement } from "@floating-ui/react";
import type React from "react";
import { useEffect, useState } from "react";
import Filter from "../../assets//icons/Iconex/Light/Filter-1.svg?react";
import Edit from "../../assets//icons/Iconex/Light/Edit 2.svg?react";
import Users from "../../assets//icons/Iconex/Light/Users.svg?react";
import History from "../../assets//icons/iconixto/linear/history.svg?react"

interface MyComponentProps {
    children?: React.ReactNode;
    text: string;
    type: string;
    placement: Placement;
}

const ControllerItem: React.FC<MyComponentProps> = ({ children, placement, type, text }) => {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let timer: number;
        timer = setTimeout(() => setShow(open), 50);


        return () => clearTimeout(timer);
    }, [open]);

    // popup

    const { refs, floatingStyles, context } = useFloating({
        placement: placement,
        middleware: [offset(12), flip(), shift({ padding: 10 }),
        size({
            apply({ availableHeight, elements }) {
                Object.assign(elements.floating.style, {
                    maxHeight: `${availableHeight}px`,
                });
            },
        }),
        ],
        open: open,
        onOpenChange: setOpen,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
    ]);

    // popup


    return (
        <>
            <div ref={refs.setReference} {...getReferenceProps()} onClick={() => setOpen(!open)} className={`px-[12px] py-[8px] h-[48px] mx-[12px] Shadow-white-surface transition-all duration-300 transition-discrete ${open ? "w-max bg-neutral-1000" : "w-max bg-white hover:opacity-70"} inline-flex items-center justify-center rounded-full cursor-pointer`}>
                <span className="w-[24px]">
                    {
                        {
                            "filter": <Filter className={`size-[20px] m-auto ${open ? "fill-white" : "fill-neutral-1000"}`} />,
                            "project": <Edit className={`size-[20px] m-auto ${open ? "fill-white" : "fill-neutral-1000"}`} />,
                            "team": <Users className={`size-[24px] m-auto ${open ? "fill-white" : "fill-neutral-1000"}`} />,
                            "activity": <History className={`size-[24px] m-auto ${open ? "fill-white" : "fill-neutral-1000"}`} />,
                        }[type]
                    }

                </span>
                {show && <span
                    className='px-[6px] text-white'>
                    {text}
                </span>}
            </div>
            {open && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="z-10 w-[22.125rem] rounded-[16px] border border-primary-200 py-[28px] px-[20px] bg-white overflow-y-auto scrollbar-custom scroll-smooth [&::-webkit-scrollbar]:w-[0.75rem]"
                >
                    {children}
                </div>
            )}
        </>
    )
}
export default ControllerItem