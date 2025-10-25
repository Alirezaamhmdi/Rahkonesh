import { flip, size, offset, shift, useClick, useDismiss, useFloating, useInteractions, type Placement } from "@floating-ui/react";
import Edit from "../../assets/icons/Iconex/Light/Edit 1.svg?react";
import { useEffect, useState } from "react";
import instance from "../../server/instance";

const UserSelect: React.FC<{ getValues: any, setValue: any, errors: any }> = ({ getValues, setValue, errors }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<{ data: any[], count: number }>({ data: [], count: 0 });
    const [loading, setLoading] = useState(false);
    // popup

    const { refs, floatingStyles, context } = useFloating({
        placement: "bottom",
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
    const query = "";
    // API
    useEffect(() => {
        if (!loading) {
            setLoading(true);
            instance.get(`/user/all?${query}&skip=${0}&take=${20}`)
                .then(res => {
                    setData({ data: res.data.data, count: res.data.count });
                    setLoading(false);
                }).catch((err: any) => {
                    setLoading(false); console.log(err);
                })
        }
    }, []);
    // API
    return (
        <div className="relative">
            <div className="flex justify-between h-[2.75rem]">
                {getValues("managerDisplay")?.name ? <div className="flex items-center">
                    <div className="rounded-full bg-red-500 size-6"></div>
                    <p className="text-xs text-neutral-600 pr-[4px]">{getValues("managerDisplay")?.name}</p>
                </div> : <span className="h-max">___</span>}
                <button ref={refs.setReference} {...getReferenceProps()} onClick={() => setOpen(!open)}>
                    <Edit className="fill-neutral-600 hover:opacity-70 transition size-[20px]" />
                </button>
            </div>
            {errors["manager"] && (
                <p className="mt-1 text-sm text-red-600">
                    {errors["manager"]?.message?.toString()}
                </p>
            )}
            {open && (
                <div ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="p-[12px] bg-white overflow-y-auto scrollbar-custom scroll-smooth z-10 rounded-[16px] border border-neutral-200 w-full">
                    <div className="flex flex-col gap-[4px]">
                        {data.data.map((i, index) => <div key={index}
                            onClick={() => { setValue("manager", i.id, { shouldDirty: true }); setValue("managerDisplay", { id: i.id, name: i.name + " " + i.lastname }); setOpen(false) }}
                            className="flex items-center cursor-pointer transition text-neutral-600  hover:text-primary-1000 hover:bg-primary-100 py-[10px] px-[8px] rounded-[8px]">
                            <div className="rounded-full bg-red-500 size-6"></div>
                            <p className="text-xs pr-[4px]">{i.name} {i.lastname}</p>
                        </div>)}
                    </div>
                </div>
            )}
        </div>
    );
}
export default UserSelect;