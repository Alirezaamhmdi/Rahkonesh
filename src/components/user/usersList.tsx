import { Link, useLocation } from "react-router-dom";
import Key from "../../assets/icons/Iconex/Light/Edit 2.svg?react"
import Pagination from "../table/pagination";
import { useEffect, useState } from "react";
import instance from "../../server/instance";
import { useUsers } from "../../context/userContext";

export const RoleType = {
    owner: "مدیر عامل",
    user: "کاربر",
}
const UsersList: React.FC = () => {
    const location = useLocation();
    const [data, setData] = useState<{ data: any[], count: number }>({ data: [], count: 0 });
    const [loading, setLoading] = useState(false);
    const query = "";
    const { users, setUsesAll } = useUsers();


    //pagin
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const page = Number(searchParams.get("page")) || 1;
    //pagin

    // API
    useEffect(() => {
        if (!loading) {
            setLoading(true);
            instance.get(`/user/all?${query}&skip=${(page - 1) * 10}&take=${10}`)
                .then(res => {
                    setData({ data: res.data.data, count: res.data.count });
                    setUsesAll({ data: res.data.data, count: res.data.count })
                    setLoading(false);
                }).catch((err) => {
                    setLoading(false); console.log(err);
                })
        }
    }, [page]);
    // API

    if (!loading) {
        return <div className="flex flex-1 flex-col">
            <div className="pb-[16px] flex-1">
                <div className="flex flex-col gap-[20px]">
                    {users.data.map((i, index) => <div key={index} className="flex max-md:flex-col md:items-center max-md:gap-[28px] gap-[40px] py-[20px] px-[16px] rounded-[24px] shadow-[0_6px_58px_0_rgba(196,203,214,0.1)] border border-neutral-200">
                        <div className="flex items-center">
                            <div className="size-[3.125rem] bg-blue-300 rounded-full">
                                {/* <Link to="/profile/73kjh83" state={{ background: location }} >link</Link> */}
                            </div>
                            <div className="pr-[16px]">
                                <p className="text-base text-neutral-800 pb-[8px] whitespace-nowrap">{i.name} {i.lastname}</p>
                                <span className="text-neutral-400 text-sm">{i.username}</span>
                            </div>
                        </div>
                        <div className="flex justify-between w-full max-md:flex-col">
                            <div className="flex md:gap-[20px] gap-[40px]">
                                <div className="text-center">
                                    <div className="text-neutral-1000 text-base pb-[8px]">{RoleType[i.roles[0].name as keyof typeof RoleType]}</div>
                                    <div className="text-neutral-500 text-xs max-md:text-[0.625rem]">نقش</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-neutral-1000 text-base pb-[8px]">{i?.personal_code || "_"}</div>
                                    <div className="text-neutral-500 text-xs max-md:text-[0.625rem]">کدپرسنلی</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-neutral-1000 text-base pb-[8px]">{i.phone || "_"}</div>
                                    <div className="text-neutral-500 text-xs max-md:text-[0.625rem]">شماره تماس</div>
                                </div>
                            </div>
                            <div className="flex items-center max-md:justify-end">
                                <Link to={'/edit-user/' + i.id} state={{ background: location }} className="p-[8px] rounded-[8px] bg-primary-1000 flex items-center hover:opacity-70 transition">
                                    <Key className="fill-white size-[16px]" /><span className="text-white text-[0.625rem] pr-[4px]">ویرایش</span>
                                </Link>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            <div className="flex justify-end ">
                <Pagination pageCount={10} count={data.count} />
            </div>
        </div>
    } else {
        return <div className="h-full flex flex-col gap-[10px]">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`skeleton-loading rounded-[16px]`} style={{ height: 100 / 6 + "%" }}></div>
            ))}

        </div>
    }

}
export default UsersList;
