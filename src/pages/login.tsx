import AuthLayout from "../layout/authLayout";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidator, { type LoginFormData } from "../validator/loginValidator";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginValidator),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handelClick(formValues: LoginFormData) {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://185.221.237.102:1400/auth/login`,
        {
          username: formValues.username,
          password: formValues.password,
        }
      );

      console.log(response.data);
      Cookies.set("auth.rahkonesh", response.data.accessToken, {
        expires: 30,
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message;
      if (message) {
        if (message.toLowerCase().includes("username") || message.includes("کاربری")) {
          setError("username", { type: "server", message });
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
        <div className="pt-[90px] pb-[27px]">
          <h1 className="pb-[8px] text-right text-2xl">ورود</h1>
          <p className="text-right text-base text-neutral-500">
            برای ورود لطفا اطلاعات زیر را وارد کنید
          </p>
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
            className="h-[48px] relative w-full bg-primary-1000 hover:bg-primary-300 transition text-white border border-neutral-300 rounded-[16px]"
          >
            ورود
            {loading && (
              <div className="loader w-[30px] border-[4px] border-primary-700 absolute top-[8px] left-[10px]"></div>
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
