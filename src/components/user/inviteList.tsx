import Pagination from "../table/pagination";
import Copy from "../../assets/icons/vuesax/linear/copy.svg?react";
import Close from "../../assets/icons/Iconex/Light/Check.svg?react";
import OneInvite from "../inviteUser/oneInvite";
import { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../server/instance";
import { useUsers } from "../../context/userContext";
import { useAreas } from "../../context/areaContext";

const InviteList: React.FC = () => {
    const { removeUser, setUsesAll, users } = useUsers();

    const [data, setData] = useState<{ data: any[], count: number }>({ data: [], count: 0 });
    const [loading, setLoading] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState<string>("");
    const query = "confirmed=false";

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
                    setUsesAll({ data: res.data.data, count: res.data.count });
                    setLoading(false);
                }).catch((err) => {
                    setLoading(false); console.log(err);
                })
        }
    }, [page]);
    // API
    // confirm
    const ConfirmUser = (id: string, version: number) => () => {


        setLoadingConfirm(id);
        instance.put(`/user/confirm/${id}`, { version: version })
            .then(res => {
                setLoadingConfirm("");
                removeUser(id.toString())

            }).catch((err) => {
                setLoadingConfirm("");
            })
    }
    // confirm

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: "short" }).format(new Date(date))
    }

    if (!loading) {
        return <div className="flex flex-1 flex-col">
            <div className="pb-[16px] flex-1">
                <div className="flex flex-col gap-[16px]">
                    {users.data.map((i, index) => <div key={index} className="flex max-md:flex-col items-center  justify-between justify-between py-[20px] px-[16px] rounded-[24px] shadow-[0_6px_58px_0_rgba(196,203,214,0.1)] border border-neutral-200">
                        <div className="text-base text-neutral-800  whitespace-nowrap">{i.name} {i.lastname}</div>
                        <div className="flex items-center max-md:flex-col justify-end gap-[32px] w-full max-md:mt-[32px]">
                            <div className="flex md:gap-[20px] gap-y-[20px] gap-x-[16px] max-md:flex-wrap">
                                <div className="text-right max-md:flex-[0_0_45%] md:text-center">
                                    <div className="text-gray-3 text-xs mb-[9px] md:mb-[24px] font-light">نقش :</div>
                                    <div className="text-neutral-800 text-xs">کاربر</div>
                                </div>
                                <div className="text-right max-md:flex-[0_0_45%] md:text-center">
                                    <div className="text-gray-3 text-xs mb-[9px] md:mb-[24px] font-light"> نام کاربری :</div>
                                    <div className="text-neutral-800 text-xs">{i.username}</div>
                                </div>
                                <div className="text-right max-md:flex-[0_0_45%] md:text-center">
                                    <div className="text-gray-3 text-xs mb-[9px] md:mb-[24px] font-light">تاریخ درخواست:</div>
                                    <div className="text-neutral-800 text-xs">{formatTime(i.createdAt)}</div>
                                </div>
                            </div>
                            <button onClick={ConfirmUser(i.id, i.version)} disabled={loading} className="p-[8px] relative rounded-[10px] bg-success-1000 flex items-center hover:opacity-70 transition">
                                {loadingConfirm == i.id && (
                                    <div className="loader w-[20px] border-[3px] border-white absolute top-[6px] left-[6px]"></div>
                                )}
                                <Close className="fill-white size-[16px]" /><span className="text-white text-[0.625rem] pr-[4px]">تایید کاربر</span>
                            </button>
                        </div>
                    </div>)}
                </div>
            </div>
            <div className="flex justify-end ">
                <Pagination pageCount={10} count={users.count} />
            </div>

        </div>
    } else {
        return <div className="h-full flex flex-col gap-[10px]">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`skeleton-loading rounded-[16px]`} style={{ height: 100 / 4 + "%" }}></div>
            ))}

        </div>
    }

}
export default InviteList;
