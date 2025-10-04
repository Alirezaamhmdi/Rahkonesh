import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ControllerItem from "./controllerItem";
import TaskFilter from "../filter/taskFilter";
import EditProject from "../edit/editProject/editProject";
import MemberManagment from "../member/memberManagment";
import ActivityList from "../activityList";

const HeaderController:React.FC = () => {
    const [searchParams] = useSearchParams();
    const currentType = searchParams.get("type")||"null";
    const [currentView,setCurrentView] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    function createLink(typeValue:string) {
        const params = new URLSearchParams(searchParams);
        if (typeValue) {
        params.set("type", typeValue);
        } else {
        params.delete("type");
        }
        return `?${params.toString()}`;
    }
    const createViewLink = (type:string) => {
        const search = location.search;
        const pathSegments = location.pathname.split('/').filter(Boolean);
        pathSegments[pathSegments.length - 1] = type;
        return `/${pathSegments.join('/')}${search}`;
    };

    const tabs = [
        { label: "کارهای فعال", type: "active" },
        { label: "کارهای انجام شده", type: "done" },
        { label: "کارهای آرشیو شده", type: "archive" },
    ];
    const views = [
        { label: "میز کار", type: "board" },
        { label: "گانت", type: "gant" },
        { label: "تقویم", type: "calendar" },
        { label: "جدول", type: "table" },
    ];
    useEffect(() => {

    const validTypes = ["active", "done", "archive"];
        if (!validTypes.includes(currentType)) {
        const params = new URLSearchParams(searchParams);
        params.set("type", "active");
        navigate(`?${params.toString()}`, { replace: true });
        }
        const pathSegments = location.pathname.split('/').filter(Boolean);
        setCurrentView(pathSegments[pathSegments.length - 1]);
    }, [currentType, navigate,location, searchParams]);
  
    return <div>

        <div className="text-center py-[16px] px-[8px] mb-[20px] ">
            {tabs.map(({ label, type }) => {
            const isActive = currentType === type || (type === null && !currentType);
            return (
            <Link
                key={label}
                to={createLink(type)}
                className={`inline-block rounded-full px-[12px] py-[8px] mx-[12px] ${
                isActive
                    ? "text-white primary"
                    : "neutral-600"
                }`}
            >
                {label}
            </Link>
            );
        })}
        </div>

        <div className="flex flex-row aitems-center justify-between">
            <div>
                <ControllerItem placement="bottom-start" type="filter" text="فیلتر کارها" >
                    <TaskFilter />
                </ControllerItem>
                <ControllerItem placement="bottom-start" type="project" text="ویرایش پروژه"  >
                    <EditProject />
                </ControllerItem>
                <ControllerItem placement="bottom" type="team" text="مدیریت اعضای تیم"  >
                    <MemberManagment />
                </ControllerItem>
                <ControllerItem placement="bottom" type="activity" text="فعالیت ها"  >
                    <ActivityList />
                </ControllerItem>

            </div>
            <div className="text-center bg-neutral-100 rounded-full py-[16px] px-[8px] w-max Shadow-white-surface">
                {views.map(({ label, type }) => {
                    const isActive = currentView === type || (type === null && !currentView);
                    return (
                    <Link
                        key={label}
                        to={createViewLink(type)}
                        className={`inline-block px-[12px] py-[8px] rounded-full mx-[12px] ${
                        isActive
                            ? "bg-neutral-1000 text-white"
                            : "neutral-500"
                        }`}
                    >
                        {label}
                    </Link>
                    );
                })}
            </div>
        </div>

    </div>
}
export default HeaderController;

