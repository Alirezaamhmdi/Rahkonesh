import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import EditTask from "../components/edit/editTask";
import AppLayoute from "./appLayoute";

const AppLayout:React.FC=()=>{
const location = useLocation();
  const background = location.state && location.state.background;
  return (<div className="App">
      {/* Outlet برای مسیرهای اصلی */}
      <Outlet />

      {/* وقتی background وجود داره → modal باز میشه */}
      {background && (
        <Routes>
          <Route path="c/:id" element={<EditTask />} />
        </Routes>
      )}
    </div>)
}
export default AppLayout