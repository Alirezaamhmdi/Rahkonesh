import AuthLayout from "../layout/authLayout";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handelClick(e: any) {
    e.preventDefault();
    setLoading(true);

    let sendData = {
      username: userName,
      password: password,
    };

    axios
      .post(`http://185.221.237.102:1400/auth/login`, sendData)
      .then((response) => {
        console.log(response.data);
        setLoading(false);

        Cookies.set("auth.rahkonesh", response.data.accessToken, {
          expires: 30,
        });
      })
      .catch((err) => {
        setLoading(false);
      });
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
            onChange={(e) => {
              setUserName(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="text-right px-[20px] text-base h-[52px] w-full neutral-8 border border-neutral-300 rounded-[16px] focus:border-primary-500"
          />
        </div>
        <div>
          <button
            onClick={handelClick}
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
