import AuthLayout from "../layout/authLayout";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const Login = () => {
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
            placeholder="برای مثال alirezam"
            type="text"
            className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
        </div>
        <div className="pb-[28px] flex flex-col justify-center w-full">
          <label className="pb-[12px] flex items-center pr-2 text-neutral-400">
            رمز عبور
          </label>
          <input
            placeholder="********"
            type="text"
            className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
        </div>
        <div>
          <button className="h-[48px] w-full bg-primary-1000 hover:bg-primary-300 text-white border border-neutral-300 rounded-[16px]">
            ورود
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
