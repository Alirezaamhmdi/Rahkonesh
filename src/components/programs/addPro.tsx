import { useRef, useState } from "react";
import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./generalInfo";
import Strategies from "./strategies";

const AddPro: React.FC = () => {
    const [navigation, setNavigation] = useState<number>(1);
    const navigate = useNavigate();

    return (
        <div
            className="fixed z-20 top-0 left-0 w-full h-full bg-backdrop-gray p-[20px] flex items-center"
            dir="rtl"
            onMouseDown={() => navigate(-1)}
        >
            <div
                onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
                className="bg-white overflow-y-auto scrollbar-custom scroll-smooth h-max max-h-full w-[47rem] m-auto rounded-[16px] shadow-[0_2px_4px_0_rgba(172,169,169,0.21)] border-[1px] border-primary-200 py-[20px] px-[12px]"
            >
                <div dir="rtl" className="h-full ">
                    <div className="flex sticky bg-white top-0 items-center justify-between mb-[12px] sticky top-0 bg-white z-10 mb-[12px] px-[8px]">
                        <h2 className="text-xl">ایجاد برنامه</h2>
                        <Close
                            onClick={() => navigate(-1)}
                            className="fill-[#363538] size-[1.5rem] cursor-pointer hover:fill-primary-1000"
                        />
                    </div>

                    <div className="flex items-center gap-[12px] text-base">
                        <div
                            onClick={() => {
                                setNavigation(1);
                            }}
                            className={`${navigation == 1 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"
                                } border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}
                        >
                            <h4>اطلاعات کلی</h4>
                        </div>

                        <div
                            onClick={() => {
                                setNavigation(2);
                            }}
                            className={`${navigation == 2 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"
                                } border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}
                        >
                            <h4>راهبرد های مصوب</h4>
                        </div>
                    </div>

                    {{
                        1: <GeneralInfo />,
                        2: <Strategies />,
                    }[navigation]}
                </div>
            </div>
        </div>
    );
};
export default AddPro;
