import { useRef, useState } from "react";
import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import InputStructure from "../inputStructure";
import instance from "../../server/instance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserValidator, type UserFormData } from "../../validator/userValidator";
import { useNavigate } from "react-router-dom";
import UserSelect from "../select/userSelect";
import { ProgramValidator, type ProgramFormData } from "../../validator/programvalidator.tsx";

import { useAreas } from "../../context/areaContext";
import UpstreamSelect from "./UpstreamSelect";

import CheckboxList from "../checkbox/checkboxList";
import type { CheckboxListItems } from "../checkbox/checkboxList";

const GeneralInfo: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const { addArea } = useAreas();

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    watch,

    formState: { errors }

  } = useForm<ProgramFormData>({
    resolver: yupResolver(ProgramValidator),
  });

  const [boardMembers, setBoardMembers] = useState<CheckboxListItems[]>([
    { key: "u1", name: "علی رضایی", image: " ", status: false },
    { key: "u2", name: "مینا حسینی", image: " ", status: false },
    { key: "u3", name: "سحر محمدی", image: " ", status: false },
  ]);

  async function handleClick(formValues: ProgramFormData) {
    setLoading(true);
    try {
      const selectedBoard = boardMembers.filter(b => b.status).map(b => b.key);
      const payload = {
        ...formValues,
        boardMembers: selectedBoard, // backend باید این فیلد رو قبول کنه یا نام مناسب رو قرار بده
      };

      const response = await instance.post(
        `/area/create`,
        payload
      );
      addArea(response.data)
      navigate(-1)
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  }
  return (

    <div>

      <div className="flex max-md:flex-col flex-wrap gap-y-[22px]">

        <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
          <label className="text-neutral-600 text-xs mb-[16px] inline-block">عنوان برنامه</label>
          <InputStructure className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
            register={register} name={"name"} type={"text"} placeholder={"عنوان مثال"} Ref={inputsRef} index={1} errors={errors} onSubmit={handleSubmit(handleClick)} />
        </div>
        <>
          <UpstreamSelect
            name="parent"
            label="حوزه بالا دستی"
            options={[
              { label: "گروه مالی", value: "hoze1" },
              { label: "حوزه 2", value: "hoze2" },
            ]}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            placeholder="حوزه را انتخاب کنید"
          />
        </>

        <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
          <label className="text-neutral-600 text-xs mb-[16px] inline-block">مدیر برنامه</label>
          <UserSelect getValues={getValues} setValue={setValue} errors={errors} />
        </div>

        <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
          <label className="text-neutral-600 text-xs mb-[16px] inline-block">رئیس شورای راهبری</label>
          <UserSelect getValues={getValues} setValue={setValue} errors={errors} />
        </div>

        <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
          <label className="text-neutral-600 text-xs mb-[16px] inline-block">دبیر شورای راهبری</label>
          <UserSelect getValues={getValues} setValue={setValue} errors={errors} />
        </div>


        <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
          <label className="text-neutral-600 text-xs mb-[16px] inline-block">اعضای ثابت شورای راهبری</label>
          <CheckboxList Items={boardMembers} SetItems={setBoardMembers} />
        </div>

      </div>

      <div className="flex justify-content-between gap-[48px] pt-[1rem]">
        <button onClick={handleSubmit(handleClick)} disabled={loading} className="p-[12px] relative hover:opacity-70 transition bg-primary-1000 text-white text-sm rounded-[12px] border border-primary-1000 flex-1">افزودن اعضا
          {loading && (
            <div className="loader w-[30px] border-[4px] border-primary-500 absolute top-[8px] left-[10px]"></div>
          )}
        </button>
        <button onClick={() => navigate(-1)} className="p-[12px] hover:opacity-70 transition text-neutral-500 text-sm rounded-[12px] border border-neutral-500 flex-1">انصراف</button>
      </div>
    </div>


  );
}


export default GeneralInfo;
