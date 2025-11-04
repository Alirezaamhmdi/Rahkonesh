import { Link, useLocation } from "react-router-dom";
import Folder2 from "../assets/icons/Iconex/Light/Folder.svg?react";
import { useEffect, useState } from "react";
import TableFrame from "../components/table/tableFrame";
import Left from "../assets/icons/fi_align-left.svg?react";
import Users from "../assets/icons/Iconex/Light/Layers2.svg?react";
import Calendar from "../assets/icons//Iconex/Light/User.svg?react";
import Shora from "../assets/icons//Iconex/Light/Shora.svg?react";
import instance from "../server/instance";
import Key from "../assets/icons/Iconex/Light/Edit 4.svg?react"
import Close from "../assets/icons/vuesax/linear/close-circle2.svg?react"
import { usePrograms } from "../context/programContext";
import UsersListNAme from "../components/usersListName";

const Programs: React.FC = () => {
  const { programs, setProgramsAll, removeProgram } = usePrograms();
  const location = useLocation();
  const [scrollAction, setScrollAction] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const query = "";

  const header = [
    { name: "عنوان", target: "name", icon: <Left className="fill-white size-[20px]" />, width: "w-[30%]" },
    { name: "حوزه بالا دستی", target: "area", icon: <Users className="fill-white size-[20px]" />, width: "w-[20%]" },
    { name: "مدیر برنامه", target: "manager", icon: <Calendar className="fill-white size-[20px]" />, width: "w-[20%]" },
    { name: "شورای راهبری", target: "directors", icon: <Shora className="fill-white size-[20px]" />, width: "w-[20%]" },
    { name: "", target: "action", icon: "", width: "w-[10%]" }
  ];

  const classes = {
    header: "rounded-[16px] flex bg-neutral-800 overflow-hidden font-medium mb-[12px] px-[22px]",
    headerItems: "py-[22px] text-base",
    body: "lg:border lg:bg-white lg:border-neutral-100 lg:rounded-[16px] overflow-x-scroll h-full",
    Rows: "lg-py-[8px] px-[20px] lg:border-b lg:border-neutral-100 gap-[12px] py-[16px] max-lg:bg-white max-lg:ml-[4px] max-lg:rounded-[16px] max-lg:mb-[20px]",
    RowsItems: "py-[20px] flex items-center max-lg:py-[12px]",
    Pagination: "flex justify-end",
  };

  const [data, setData] = useState<{ data: any[], count: number }>({ data: [], count: 0 });
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = Number(searchParams.get("page")) || 1;

  const formatTime = (date: Date) => new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: "short" }).format(new Date(date));

  // Delete a program by id
  const handleDelete = (id: number) => () => {
    instance.delete(`/program/delete/${id}`)
      .then(() => removeProgram(id.toString()))
      .catch(err => console.log("delete program error:", err));
  };

  // Fetch programs list (server endpoint: /program/all)
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      instance.get(`/program/all?${query}&skip=${(page - 1) * 10}&take=${10}`)
        .then(res => {
          // expecting response shape: { data: [...], count: N }
          setProgramsAll({ data: res.data.data, count: res.data.count, time: new Date() });
          setLoading(false);
        }).catch(err => { setLoading(false); console.log(err); });
    }
  }, [page]);

  // Map programs -> table rows
  useEffect(() => {
    const transformed: any[] = [];
    programs.data?.forEach((i: any) => {
      transformed.push({
        name: i.name,
        manager: <div className="flex items-center">
          <div className="rounded-full bg-red-500 size-6"></div>
          <p className="text-xs text-neutral-600 pr-[4px]">{i?.manager?.lastname} {i?.manager?.name}</p>
        </div>,
        directors: <div><UsersListNAme Users={i.directors ?? []} /></div>,
        area: <p>{i.area?.name ?? "-"}</p>,
        action: <div className="flex items-center w-full justify-end">
          <Link to={'/edit-program/' + i.id} state={{ background: location }} className=" flex items-center hover:opacity-70 transition">
            <Key className="fill-neutral-700 size-[20px]" />
          </Link>
          <button onClick={handleDelete(i.id)} className=" mr-[8px] flex items-center hover:opacity-70 transition">
            <Close className="fill-neutral-700 size-[20px]" />
          </button>
        </div>
      });
    });
    setData({ data: transformed, count: programs.count });
  }, [programs.time]);

  return (
    <div className="px-[32px] py-[28px] h-full overflow-y-auto scrollbar-custom flex flex-col">
      <h1 className='text-2xl/[32px] snap-start bg-white'>برنامه ها</h1>
      <div className='sticky top-0 bg-white z-10 sticky top-[-28px] pb-[16px]'>
        <div className='flex max-md:gap-[24px] max-md:flex-col md:justify-between reletive items-end md:items-center mt-[20px]'>
          <div className="relative pr-[24px]"></div>
          <Link to="/add-program" className="flex items-center text-xs md:text-base bg-secondary-1000 text-white py-[12px] px-[16px] md:py-[16px] md:px-[32px] rounded-[12px] md:rounded-[16px] hover:opacity-70 transition" state={{ background: location }}>
            <Folder2 className="md:size-[1.36856rem] size-[1rem] fill-white" />
            <span className="pr-[8px]">ایجاد برنامه</span>
          </Link>
        </div>
      </div>

      <TableFrame mobileHeader={['name']} content={data.data} header={header} isPagination={true} loadingCount={5} pageCount={10} allCount={data.count} classNames={classes} scrollAction={scrollAction} setScrollAction={setScrollAction} />
    </div>
  );
};

export default Programs;
