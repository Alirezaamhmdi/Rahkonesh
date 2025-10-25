import { useState } from "react";
import CheckboxList from "../checkbox/checkboxList";
import RadioLittle from "../radio/radioLittle";
import CheckboxListByRole from "../checkbox/checkboxListByRole";

const WorkspaceInvite: React.FC = () => {
    const [users, setUsers] = useState([
        {
            key: "string",
            name: "فضای کاری طراحی ",
            image: "d",
            status: true
        },
        {
            key: "strindg",
            name: "فضای کاری برنامه نویسی ",
            image: "d",
            status: false
        },
    ]);
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
            <h5 className="text-neutral-800 text-base mb-[4px]">اعضای کنونی:</h5>
            <CheckboxListByRole Items={users} SetItems={setUsers} />
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
            <button className="p-[12px] hover:opacity-70 transition bg-primary-1000 text-white text-sm rounded-[12px] border border-primary-1000 flex-1">افزودن اعضا </button>
            <button className="p-[12px] hover:opacity-70 transition text-neutral-500 text-sm rounded-[12px] border border-neutral-500 flex-1">انصراف</button>
        </div>
    </div>)
}
export default WorkspaceInvite;