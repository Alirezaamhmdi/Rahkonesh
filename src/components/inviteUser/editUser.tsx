import { useEffect, useId, useRef, useState } from "react";
import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import InputStructure from "../inputStructure";
import instance from "../../server/instance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserValidator, type UserFormData } from "../../validator/userValidator";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../context/userContext";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { editUser } = useUsers();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<UserFormData>({
    resolver: yupResolver(UserValidator),
  });
  // API
  useEffect(() => {
    instance.get(`/user/findone/${id}`)
      .then(res => {
        reset({ ...res.data, password: "12345678" });
      }).catch((err) => { })
  }, []);
  // API
  async function handelClick(formValues: UserFormData) {
    if (Object.keys(dirtyFields).length <= 0) {
      navigate(-1)
      return false
    };
    setLoading(true);
    try {
      const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
        const typedKey = key as keyof UserFormData;
        acc[typedKey] = formValues[typedKey];
        return acc;
      }, {} as Partial<UserFormData>);

      const version: any = formValues;

      const response = await instance.put(
        `/user/update/${id}`,
        { ...changedData, version: version.version }
      );
      editUser(id || "", { ...changedData, version: version.version })
      navigate(-1)
    } catch (err: any) {
      console.log(err);

      const message = err?.response?.data?.message || err?.message;
      if (message) {
        if (message.toLowerCase().includes("username")) {
          setError("username", { type: "server", message });
        } else if (message.toLowerCase().includes("password")) {
          setError("password", { type: "server", message: "رمز عبور نادرست است" });
        } else {
          setError("username", { type: "server", message: "نام کاربری نادرست است" });
        }
      } else {
        setError("password", { type: "server", message });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full bg-backdrop-gray p-[20px] flex items-center" dir="rtl" onMouseDown={() => navigate(-1)} >
      <div onMouseDown={(e: React.MouseEvent) => { e.stopPropagation() }} className="bg-white overflow-y-auto scrollbar-custom scroll-smooth h-max max-h-full w-[47rem] m-auto rounded-[16px] shadow-[0_2px_4px_0_rgba(172,169,169,0.21)] border-[1px] border-primary-200 py-[20px] px-[12px]">

        <div dir="rtl" className="h-full ">
          <div className="flex sticky bg-white top-0 items-center justify-between mb-[12px] sticky top-0 bg-white z-10 mb-[12px] px-[8px]">
            <h2 className="text-xl">ویرایش کاربر </h2>
            <Close onClick={() => navigate(-1)} className="fill-[#363538] size-[1.5rem] cursor-pointer hover:fill-primary-1000" />
          </div>

          <div className="flex max-md:flex-col flex-wrap gap-y-[24px]">

            <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
              <label className="text-neutral-600 text-xs mb-[16px] inline-block">نام</label>
              <InputStructure className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                register={register} name={"name"} type={"text"} placeholder={"علیرضا"} Ref={inputsRef} index={1} errors={errors} onSubmit={handleSubmit(handelClick)} />
            </div>
            <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
              <label className="text-neutral-600 text-xs mb-[16px] inline-block">نام خانوادگی</label>
              <InputStructure className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                register={register} name={"lastname"} type={"text"} placeholder={"بهمنی"} Ref={inputsRef} index={2} errors={errors} onSubmit={handleSubmit(handelClick)} />
            </div>
            <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
              <label className="text-neutral-600 text-xs mb-[16px] inline-block">نام کاربری</label>
              <InputStructure className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                register={register} name={"username"} type={"text"} placeholder={"bahmaniAL"} Ref={inputsRef} index={3} errors={errors} onSubmit={handleSubmit(handelClick)} />
            </div>
            <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
              <label className="text-neutral-600 text-xs mb-[16px] inline-block">رمزعبور</label>
              <InputStructure className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                register={register} name={"password"} type={"password"} placeholder={"********"} Ref={inputsRef} index={4} errors={errors} onSubmit={handleSubmit(handelClick)} />
            </div>
            <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
              <label className="text-neutral-600 text-xs mb-[16px] inline-block">ایمیل</label>
              <InputStructure className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                register={register} name={"email"} type={"email"} placeholder={"bahmani@gmail.com"} Ref={inputsRef} index={5} errors={errors} onSubmit={handleSubmit(handelClick)} />
            </div>
            <div className="pt-[20px] w-1/2 max-md:w-full px-[8px]">
              <label className="text-neutral-600 text-xs mb-[16px] inline-block">شماره تماس</label>
              <InputStructure className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                register={register} name={"phone"} type={"text"} placeholder={"۰۹۱۰۲۵۷۰۶۰۴"} Ref={inputsRef} index={6} errors={errors} onSubmit={handleSubmit(handelClick)} />
            </div>
            <div className="pt-[20px] w-full px-[8px]">
              <label className="text-neutral-600 text-xs mb-[16px] inline-block">کد پرسنلی</label>
              <InputStructure className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                register={register} name={"personal_code"} type={"text"} placeholder={"228873476"} Ref={inputsRef} index={7} errors={errors} onSubmit={handleSubmit(handelClick)} />
            </div>


          </div>
          <div className="flex justify-content-between gap-[16px] pt-[16px] px-[8px]">
            <button onClick={handleSubmit(handelClick)} disabled={loading} className="p-[12px] relative hover:opacity-70 transition bg-primary-1000 text-white text-sm rounded-[12px] border border-primary-1000 flex-1">ذخیره تغییرات
              {loading && (
                <div className="loader w-[30px] border-[4px] border-primary-500 absolute top-[8px] left-[10px]"></div>
              )}
            </button>
            <button onClick={() => navigate(-1)} className="p-[12px] hover:opacity-70 transition text-neutral-500 text-sm rounded-[12px] border border-neutral-500 flex-1">انصراف</button>
          </div>
        </div>

      </div>
    </div>
  );
}
export default EditUser;

