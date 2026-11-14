// import WorkspacesList from "../components/workspacesList";
// import Check from "../assets/icons/check.svg?react"
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Calendar from "../assets/icons//Iconex/Light/Calendar.svg?react";
import Left from "../assets/icons/fi_align-left.svg?react";
import Key from "../assets/icons/Iconex/Light/Edit 2.svg?react";
import Folder2 from "../assets/icons/Iconex/Light/Folder.svg?react";
import Users from "../assets/icons/Iconex/Light/User.svg?react";
import Close from "../assets/icons/vuesax/linear/close-circle.svg?react";
import '../components/checkbox/checkboxList.css';
import TableFrame from "../components/table/tableFrame";
import { useAreas } from "../context/areaContext";
import instance from "../server/instance";

const Areas: React.FC = () => {
  const { area, setAreasAll, removeArea } = useAreas();

  const location = useLocation();
  const [scrollAction, setScrollAction] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const query = "";

  const header = [
    {
      name: "نام حوزه",
      target: "name",
      icon: <Left className="fill-white max-lg:stroke-neutral-800 size-[20px] max-lg:size-[16px]" />,
      width: "w-[30%]"
    },
    {
      name: "مدیر حوزه",
      target: "manager",
      icon: <Users className="fill-white size-[20px]" />,
      width: "w-[25%]"
    },
    {
      name: "تاریخ ایجاد",
      target: "createdAt",
      icon: <Calendar className="fill-white size-[20px]" />,
      width: "w-[30%]"
    },
    {
      name: "",
      target: "action",
      icon: "",
      width: "w-[15%]"
    }
  ];
  const classes = {
    header: "rounded-[16px] flex bg-neutral-800 overflow-hidden font-medium mb-[12px] px-[22px]",
    headerItems: "py-[22px] text-base",
    body: "lg:border lg:bg-white lg:border-neutral-100 lg:rounded-[16px] overflow-x-scroll h-full",
    Rows: "lg-py-[8px] px-[20px] lg:border-b lg:border-neutral-100 gap-[12px] py-[16px] max-lg:bg-white max-lg:ml-[4px] max-lg:rounded-[16px] max-lg:mb-[20px]",
    RowsItems: "py-[20px] flex items-center max-lg:py-[12px]",
    Pagination: "flex justify-end",
  }
  const [data, setData] = useState<{ data: any[], count: number }>({ data: [], count: 0 });

  //pagin
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = Number(searchParams.get("page")) || 1;
  //pagin
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: "short" }).format(new Date(date))
  }
  // API
  const handleDelete = (id: number) => () => {

    instance.delete(`/area/delete/${id}`)
      .then(res => {
        removeArea(id.toString())
      }).catch((err) => {
        console.log("ee : ", err);
      })
  }
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      instance.get(`/area/all?${query}&skip=${(page - 1) * 10}&take=${10}`)
        .then(res => {

          // setData({ data: transformed, count: res.data.count });
          setAreasAll({ data: res.data.data, count: res.data.count, time: new Date() })
          setLoading(false);
        }).catch((err) => {
          setLoading(false); console.log(err);
        })
    }
  }, [page]);
  // API

  useEffect(() => {
    let transformed: any = [];
    area.data?.map((i: any) => {
      transformed.push({
        name: i.name,
        manager: <div className="flex items-center">
          <div className="rounded-full bg-red-500 size-6"></div>
          <p className="text-xs text-neutral-600 pr-[4px]">{i?.manager?.lastname} {i?.manager?.name}</p>
        </div>,
        createdAt: <p>{formatTime(i.createdAt)}</p>,
        action: <div className="flex items-center">
          <Link to={'/edit-area/' + i.id} state={{ background: location }} className="p-[8px] rounded-[8px] bg-primary-1000 flex items-center hover:opacity-70 transition">
            <Key className="fill-white size-[16px]" /><span className="text-white text-[0.625rem] pr-[4px]">ویرایش</span>
          </Link>
          <button onClick={handleDelete(i.id)} className="p-[8px] rounded-[8px] mr-[4px] bg-error-1000 flex items-center hover:opacity-70 transition">
            <Close className="fill-white size-[16px]" /><span className="text-white text-[0.625rem] pr-[4px]">حذف</span>
          </button>
        </div>
      })
    });
    setData({ data: transformed, count: area.count })
  }, [area.time])

  return (<div className="px-[32px] py-[28px] h-full overflow-y-auto scrollbar-custom flex flex-col">
    <h1 className='text-2xl/[32px] snap-start bg-white'> حوزه ها </h1>
    <div className='sticky top-0 bg-white z-10 bg-white sticky top-[-28px] pb-[16px]'>
      <div className='flex max-md:gap-[24px] max-md:flex-col md:justify-between reletive items-end md:items-center mt-[20px]'>
        <div className="relative pr-[24px]"></div>
        <Link to="/add-area" className="flex items-center text-xs md:text-base bg-secondary-1000 text-white py-[12px] px-[16px]  md:py-[16px] md:px-[32px] rounded-[12px] md:rounded-[16px] hover:opacity-70 transition" state={{ background: location }}>
          <Folder2 className="md:size-[1.36856rem] size-[1rem] fill-white" />
          <span className="pr-[8px]">ایجاد حوزه</span>
        </Link>
      </div>
    </div>
    <TableFrame mobileHeader={['name']} content={data.data} header={header} isPagination={true} loadingCount={5} pageCount={10} allCount={data.count} classNames={classes} scrollAction={scrollAction} setScrollAction={setScrollAction} />


  </div>)

}
export default Areas;