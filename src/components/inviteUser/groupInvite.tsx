import { useState } from "react";
import CheckboxList from "../checkbox/checkboxList";
import RadioLittle from "../radio/radioLittle";

const GroupInvite: React.FC = () => {
    const [status, setStatus] = useState([
        {
            key: "string",
            name: "در انتظار انجام ",
            image: "",
            status: false
        },

        {
            key: "strinwg",
            name: "در حال  انجام",
            image: "",
            status: false
        },

        {
            key: "strinqg",
            name: "انجام شده ",
            image: "",
            status: false
        }
    ]);
    const roleRadio = [
        {
            name: <>مدیر<span className="text-[0.625rem] pr-[4px] font-light">(فقط مدیر می تواند یک مدیر دیگر اضافه کند)</span></>,
            key: "admin",
            className: "text-xs text-neutral-600",
        },
        {
            name: <>دستیار<span className="text-[0.625rem] pr-[4px] font-light">(فقط مدیر می تواند یک مدیر دیگر اضافه کند)</span></>,
            key: "assistant",
            className: "text-xs text-neutral-600",
        },
        {
            name: <>مشارکت کننده<span className="text-[0.625rem] pr-[4px] font-light">(فقط مدیر می تواند یک مدیر دیگر اضافه کند)</span></>,
            key: "contributor",
            className: "text-xs text-neutral-600",
        },
        {
            name: <>ناظر<span className="text-[0.625rem] pr-[4px] font-light">(فقط مدیر می تواند یک مدیر دیگر اضافه کند)</span></>,
            key: "viewer",
            className: "text-xs text-neutral-600",
        },
    ];

    return (<div>
        <div className="pt-[20px]">
            <h5 className="text-neutral-800 text-xs mb-[4px]">تعداد دعوت شونده ها: </h5>
            <input className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition" placeholder="عددی بین 1 تا 100 وارد کتید"></input>
        </div>
        <div className="pt-[20px]">
            <h5 className="text-neutral-800 text-xs mb-[16px]">انتخاب فضای کاری:</h5>
            <CheckboxList Items={status} SetItems={setStatus} />
        </div>
        <div className="pt-[4px]">
            <h5 className="text-neutral-800 text-xs mb-[16px]">نقش عضو جدید: </h5>
            <RadioLittle ClassName="" RowClassName="mb-[20px]" RadioSize={4} defaultKey="admin" List={roleRadio} />
        </div>
        <div className="flex justify-content-between gap-[48px]">
            <button className="p-[12px] hover:opacity-70 transition bg-primary-1000 text-white text-sm rounded-[12px] border border-primary-1000 flex-1">ایجاد لینک دعوت</button>
            <button className="p-[12px] hover:opacity-70 transition text-neutral-500 text-sm rounded-[12px] border border-neutral-500 flex-1">انصراف</button>
        </div>
    </div>)
}
export default GroupInvite;