import AuthLayout from "../layout/authLayout";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signupValidator, { type SignupFormData } from "../validator/signupValidator";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupValidator) as Resolver<SignupFormData, any>,
    defaultValues: {
      name: "",
      lastName: "",
      username: "",
      password: "",
    },
  });

  async function handelClick(formValues: SignupFormData) {
    setLoading(true);

    const sendData = {
      name: formValues.name,
      lastname: formValues.lastName,
      username: formValues.username,
      password: formValues.password,
    };

    try {
      const response = await axios.post(
        `http://185.221.237.102:1400/auth/register`,
        sendData
      );
      toast.success("درخواست شما با موفقیت ارسال شد.")
      // console.log(response.data);
      // Cookies.set("auth.rahkonesh", response.data.accessToken, {
      //   expires: 30,
      // });
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message;

      if (message) {
        if (message.toLowerCase().includes("username") || message.includes("کاربری")) {
          setError("username", { type: "server", message });
        } else if (message.toLowerCase().includes("name") || message.includes("نام ")) {
          setError("name", { type: "server", message });
        } else if (message.toLowerCase().includes("lastname") || message.toLowerCase().includes("lastname") || message.includes("خانوادگی")) {
          setError("lastName" as keyof SignupFormData, { type: "server", message } as any);
        } else if (message.toLowerCase().includes("password") || message.includes("رمز")) {
          setError("password", { type: "server", message });
        } else {
          setError("username", { type: "server", message });
        }
      } else {
        setError("username", { type: "server", message: "خطا در برقراری ارتباط با سرور" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div dir="rtl">
        <div className="pb-[27px]">
          <h1 className="pb-[8px] text-right text-2xl">ثبت نام</h1>
          <p className="text-right text-base text-neutral-500">
            برای ثبت نام لطفا اطلاعات زیر را وارد کنید
          </p>
        </div>
        <div className="pb-[28px] flex flex-col justify-center w-full">
          <label className="pb-[12px] flex items-center pr-2 text-neutral-400">
            نام
          </label>
          <input
            placeholder="برای مثال علیرضا"
            type="text"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="text-right px-[20px] text-base h-[52px] w-full border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="pb-[28px] flex flex-col justify-center w-full">
          <label className="pb-[12px] flex items-center pr-2 text-neutral-400">
            نام خانوادگی
          </label>
          <input
            placeholder="برای مثال محمدی"
            type="text"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
          {errors.lastName && (
            <p id="lastName-error" className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="pb-[28px] flex flex-col justify-center w-full">
          <label className="pb-[12px] flex items-center pr-2 text-neutral-400">
            نام کاربری
          </label>
          <input
            placeholder="برای مثال alireza"
            type="text"
            {...register("username")}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
            className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
          {errors.username && (
            <p id="username-error" className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="pb-[28px] flex flex-col justify-center w-full">
          <label className="pb-[12px] flex items-center pr-2 text-neutral-400">
            رمز عبور
          </label>
          <input
            placeholder="********"
            type="password"
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <button
            onClick={handleSubmit(handelClick)}
            className="h-[48px] relative w-full bg-primary-1000  hover:bg-primary-300 transition text-white border border-neutral-300 rounded-[16px]"
          >
            ثبت نام
            {loading && (
              <div className="loader w-[30px] border-[4px] border-primary-700 absolute top-[8px] left-[10px]"></div>
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
