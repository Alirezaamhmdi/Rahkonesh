import type React from "react";

interface usersListST {
    name: string,
}

const UsersListNAme: React.FC<{ Users: usersListST[] }> = ({ Users }) => {
    return (
        <div className="flex gap-[10px] items-start flex-col">
            {Users?.slice(0, 2)?.map((item, i) => <div key={i} className="flex items-center justify-between"><div className="rounded-full bg-red-500 size-5"></div><p className="text-xs text-neutral-600 pr-[8px]">{item.name}</p></div>)}
            {Users?.length > 2 && <div className="px-[8px] py-[4px] bg-neutral-800 rounded-full text-white text-xs">+{(Users?.length) - 2}  عضو دیگر</div>}
        </div>
    )
}
export default UsersListNAme;