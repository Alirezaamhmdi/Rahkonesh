import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import List from "./list";

const Board:React.FC = () => {

    return <div className="h-full overflow-x-scroll scrollbar-custom scroll-smooth" dir="ltr">
       <div className="w-max h-full flex flex-row py-3">
            <List />
            <List />
            <List />
            <List />
       </div>
    </div>
}
export default Board;

