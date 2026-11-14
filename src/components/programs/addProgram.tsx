import CheckboxList from "../checkbox/checkboxList";
import { useRef, useState, useEffect } from "react";
import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./generalInfo";
import Strategies from "./strategies";
import { usePrograms } from "../../context/programContext";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import { ProgramValidator, type ProgramFormData } from "../../validator/programValidator";
import type { CheckboxListItems } from "../checkbox/checkboxList";
import { useForm } from "react-hook-form";
import instance from "../../server/instance";
import Cookies from "js-cookie";

const AddProgram: React.FC = () => {
    const [navigation, setNavigation] = useState<number>(1);
    const navigate = useNavigate();
    const { addProgram } = usePrograms();
    const [loading, setLoading] = useState<boolean>(false);

    const [boardMembers, setBoardMembers] = useState<CheckboxListItems[]>([]);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<ProgramFormData>({
        resolver: yupResolver(ProgramValidator) as unknown as Resolver<ProgramFormData, any>,
    });

    useEffect(() => {
        instance.get(`/user/all?skip=0&take=50`).then((res) => {
            const users = res.data.data;
            setBoardMembers(
                users.map((u: any) => ({
                    key: u.id,
                    name: u.name + " " + u.lastname,
                    image: "",
                    status: true,
                }))
            );
        });
    }, []);

    async function handleClick(formValues: ProgramFormData) {
        setLoading(true);
        try {
            const token = Cookies.get("auth.rahkonesh");
            if (token) {
                instance.defaults.headers.Authorization = `Bearer ${token}`;
            }

            const strategiesPayload = (formValues.strategies ?? []).map((s) => ({
                title: s?.title ?? "",
            }));

            const areaId = Number(formValues.area_id);
            if (Number.isNaN(areaId)) {
                setError("area_id" as any, {
                    type: "manual",
                    message: "شناسه حوزه باید عددی باشد",
                });
                setLoading(false);
                return;
            }

            const payload = {
                name: formValues.name,
                manager_id: formValues.manager_id,
                area_id: areaId,
                head_steering_council_id: formValues.head_steering_council_id ?? null,
                secretary_steering_council_id: formValues.secretary_steering_council_id ?? null,
                strategies: strategiesPayload,
            };

            const response = await instance.post(`/programs`, payload);
            addProgram(response.data);
            navigate(-1);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed z-20 top-0 left-0 w-full h-full bg-backdrop-gray p-[20px] flex items-center"
            dir="rtl"
            onMouseDown={() => navigate(-1)}
        >
            <div
                onMouseDown={(e) => e.stopPropagation()}
                className="bg-white overflow-y-auto h-max max-h-full w-[47rem] m-auto rounded-[16px] shadow border py-[20px] px-[12px]"
            >
                <div className="flex sticky bg-white top-0 items-center justify-between mb-[12px] z-10 px-[8px]">
                    <h2 className="text-xl">ایجاد برنامه</h2>
                    <Close
                        onClick={() => navigate(-1)}
                        className="fill-[#363538] size-[1.5rem] cursor-pointer hover:fill-primary-1000"
                    />
                </div>

                <div className="flex items-center gap-[12px] text-base">
                    <div
                        onClick={() => setNavigation(1)}
                        className={`${navigation === 1 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"
                            } border-b-[2px] w-full text-center p-[8px] cursor-pointer`}
                    >
                        اطلاعات کلی
                    </div>

                    <div
                        onClick={() => setNavigation(2)}
                        className={`${navigation === 2 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"
                            } border-b-[2px] w-full text-center p-[8px] cursor-pointer`}
                    >
                        راهبردهای مصوب
                    </div>
                </div>

                {{
                    1: (
                        <GeneralInfo
                            register={register}
                            handleSubmit={handleSubmit}
                            setError={setError}
                            watch={watch}
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                            boardMembers={boardMembers}
                            setBoardMembers={setBoardMembers}
                            loading={loading}
                            handleClick={handleClick}
                        />
                    ),

                    2: (
                        <Strategies
                            register={register}
                            handleSubmit={handleSubmit}
                            watch={watch}
                            setValue={setValue}
                            errors={errors}
                            loading={loading}
                            handleClick={handleClick}
                        />
                    ),
                }[navigation]}

                <div className="flex gap-[48px] pt-[1rem]">
                    <button
                        onClick={handleSubmit(handleClick)}
                        disabled={loading}
                        className="p-[12px] bg-primary-1000 text-white text-sm rounded-[12px] flex-1"
                    >
                        افزودن برنامه
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="p-[12px] text-neutral-500 text-sm rounded-[12px] border flex-1"
                    >
                        انصراف
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProgram;
