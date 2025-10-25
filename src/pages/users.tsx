import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import AddUser from "../assets/icons/Iconex/Light/Add user.svg?react"
import TableFrame from "../components/table/tableFrame";

const Users: React.FC = () => {
  const location = useLocation();

  return (<div className="px-[32px] py-[28px] h-full overflow-y-auto scrollbar-custom flex flex-col">
    <h1 className='text-2xl/[32px] snap-start bg-white'>کاربران</h1>
    <div className='sticky top-0 bg-white z-10 bg-white sticky top-[-28px] pb-[16px]'>
      <div className='flex max-md:gap-[24px] max-md:flex-col md:justify-between reletive items-end md:items-center mt-[20px]'>
        <div className='flex gap-[20px] max-md:justify-start max-md:w-full text-base text-primary-1000'>
          <NavLink to="list" className={({ isActive }) =>
            `py-2 px-[8px] whitespace-nowrap rounded-full cursor-pointer hover:opacity-70 transition font-medium ${isActive ? "bg-primary-100" : ""
            }`
          }>
            کاربران جاری
          </NavLink>
          <NavLink to="invite" className={({ isActive }) =>
            `py-2 px-[8px] whitespace-nowrap rounded-full cursor-pointer hover:opacity-70 transition font-medium ${isActive ? "bg-primary-100" : ""
            }`
          }>
            کاربران درانتظار تایید
          </NavLink>
        </div>


        <Link to="/add-user" state={{ background: location }} className="flex items-center text-xs md:text-base bg-secondary-1000 text-white py-[12px] px-[16px]  md:py-[16px] md:px-[32px] rounded-[12px] md:rounded-[16px] hover:opacity-70 transition" >
          <AddUser className="md:size-[1.36856rem] size-[1rem] fill-white" />
          <span className="pr-[8px]">افزودن کاربر جدید</span>
        </Link>
      </div>
    </div>
    <Outlet />

  </div>)

}
export default Users;