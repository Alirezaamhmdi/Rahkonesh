import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import { useRef, useState, useEffect } from "react";
import InputStructure from "../inputStructure";
import instance from "../../server/instance";
import { useForm } from "react-hook-form";
import type { FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProgramValidator, type ProgramFormData } from "../../validator/programValidator.tsx";

import UpstreamSelect from "./UpstreamSelect";

import CheckboxList from "../checkbox/checkboxList";
import type { CheckboxListItems } from "../checkbox/checkboxList";
import { useNavigate } from "react-router-dom";



import { usePrograms } from "../../context/programContext";
import UserSelect from "../select/userSelect.tsx";

interface typeGenelaInfo {
  register: UseFormRegister<any>,
  // handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>,
  handleSubmit: UseFormHandleSubmit<any>,
  setError: UseFormSetError<any>,
  watch: UseFormWatch<any>,
  setValue: UseFormSetValue<any>,
  getValues: UseFormGetValues<any>,
  errors: FieldErrors<any>,
  boardMembers: CheckboxListItems[],
  setBoardMembers: React.Dispatch<React.SetStateAction<CheckboxListItems[]>>,
  loading: boolean,
  handleClick: (formValues: ProgramFormData) => Promise<void>
}
const GeneralInfo: React.FC<typeGenelaInfo> = ({ register, setValue, getValues, watch, errors, boardMembers, setBoardMembers, loading, handleSubmit, handleClick }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (boardMembers?.length) {
      const allChecked = boardMembers.map(item => ({ ...item, status: true }));
      setBoardMembers(allChecked);
    }
  }, []);



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
            name="area_id"
            label="حوزه بالا دستی"
            options={[
              { label: "گروه مالی", value: "hoze1" },
              { label: "حوزه 2", value: "hoze2" },
            ]}
            register={register}
            setValue={setValue}
            getValues={getValues}
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


    </div>


  );
}


export default GeneralInfo;
