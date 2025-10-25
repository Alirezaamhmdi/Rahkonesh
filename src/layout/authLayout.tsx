import "./login_sigin.css";
import iconImg from "../assets/png/icon.png";
import RahkoneshIcon from "../assets/svg/rahkonesh.svg";
import "../assets/styles/styles.css";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-screen h-screen lg:py-[16px] py-[0px] persian-medium-font">
      <div className="grid lg:grid-cols-12 grid-rows-1 grid-cols-3  lg:h-fit heigh-100 ">
        <div className="flex flex-col w-full self-center max-w-[100rem] m-auto 2xl:min-h-[10rem] xl:h-[56rem] lg:col-span-10 lg:col-start-2 row-span-1 col-span-3 min-h-full lg:bg-neutral-100 bg-white  lg:p-[48px] lg:rounded-3xl ">
          <header className="bg-primary-500 flex justify-center h-fit py-3 m-0 lg:hidden ">
            <img src={RahkoneshIcon} alt="svg icon" className="h-5 w-50" />
          </header>
          <div className="grid w-full max-w-none m-auto lg:grid-cols-2 grid-cols-1 grid-rows-1 lg:gap-[48px] h-full min-w-fit min-h-full pt-[32px] pb-[82px] px-[24px]">
            <div className="col-span-1 w-full h-full rounded-3xl bg-gradient-to-b from-[#AEB7FA] via-[#C1D0FD] to-[#B2ACFD] d-3xl min-w-fit hidden lg:inline px-5">
              <div className="flex justify-center items-center  min-h-full">

                <img
                  src={iconImg}
                  alt="login_sign up image"
                  className="aspect-3/2 max-w-[10 rem] m-auto"
                />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
