import { useState } from "react";
import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import SingleInvite from "./singleInvite";
import GroupInvite from "./groupInvite";
import WorkspaceInvite from "./workspaceInvite";


const InviteMember: React.FC = () => {
  const [navigation, setNavigation] = useState<number>(1);

  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full bg-backdrop-gray p-[20px] flex items-center">
      <div className="bg-white h-max max-h-full w-[47rem] m-auto rounded-[16px] shadow-[0_2px_4px_0_rgba(172,169,169,0.21)] border-[1px] border-primary-200 p-[20px]">

        <div dir="rtl" className="h-full overflow-y-scroll scrollbar-custom scroll-smooth">
          <div className="flex items-center justify-between mb-[12px] sticky top-0 bg-white z-10 mb-[12px] px-[8px]">
            <h2 className="text-xl">افزودن عضو به فضای کاری </h2>
            <Close className="fill-[#363538] size-[1.5rem] cursor-pointer hover:fill-primary-1000" />
          </div>
          <div className="flex items-center gap-[12px] text-base">
            <div onClick={() => { setNavigation(1) }} className={`${navigation == 1 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>افزودن اعضا از فضاهای کاری</h4>
            </div>
            <div onClick={() => { setNavigation(2) }} className={`${navigation == 2 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>افزودن اعضای گروهی</h4>
            </div>
            <div onClick={() => { setNavigation(2) }} className={`${navigation == 3 ? "text-primary-1000 border-primary-1000" : "text-neutral-800 border-white"} border-b-[2px] w-full text-center p-[8px] cursor-pointer hover:opacity-70 transition`}>
              <h4>افزودن اعضا تکی</h4>
            </div>
          </div>

          {
            {
              1: <WorkspaceInvite />,
              2: <GroupInvite />,
              3: <SingleInvite />,
            }[navigation]
          }
        </div>

      </div>
    </div>
  );
}
export default InviteMember;

