import AuthLayout from "../layout/authLayout";
import Cookies from "js-cookie";
import instance from "../server/instance";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidator, { type LoginFormData } from "../validator/loginValidator";
import InputStructure from "../components/inputStructure";
import axios from "axios";

const Login = () => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
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
      Cookies.set("auth.rahkonesh", response.data.accessToken, {
        expires: 30,
      });
      window.location.replace(`/panel/users/list`);
    } catch (err: any) {
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
          {/* <input
            placeholder="برای مثال alireza"
            type="text"
            {...register("username")}
            ref={(el) => {
              register("username").ref(el);
              inputsRef.current[1] = el!;
            }}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
            className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
          {errors.username && (
            <p id="username-error" className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          )} */}
          <InputStructure className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
            register={register} name={"username"} type={"text"} placeholder={"برای مثال alireza"} Ref={inputsRef} index={1} errors={errors} onSubmit={handleSubmit(handelClick)} />
        </div>
        <div className="pb-[28px] flex flex-col justify-center w-full">
          <label className="pb-[12px] flex items-center pr-2 text-neutral-400">
            رمز عبور
          </label>
          {/* <input
            placeholder="********"
            type="password"
            {...register("password")}
            ref={(el) => {
              register("password").ref(el);
              inputsRef.current[2] = el!;
            }}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )} */}
          <InputStructure className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
            register={register} name={"password"} type={"password"} placeholder={"********"} Ref={inputsRef} index={2} errors={errors} onSubmit={handleSubmit(handelClick)} />
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
