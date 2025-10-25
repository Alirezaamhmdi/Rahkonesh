import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Go from "../../assets/icons/icn/general/arrow/go.svg?react";


const Pagination: React.FC<{ count: number, pageCount: number }> = ({ count, pageCount }) => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const page = Number(searchParams.get("page")) || 1;

    const totalPages = Math.ceil(count / pageCount);

    const startIndex = (page - 1) * pageCount + 1;
    const endIndex = Math.min(page * pageCount, count);

    const handlePageChange = (newPage: number) => {
        searchParams.set("page", newPage.toString());
        navigate(`?${searchParams.toString()}`);
    };

    return (<div className="flex items-center justify-around text-base bg-neutral-1000 rounded-[14px] w-[11.1875rem] text-white h-[3rem]">
        <div className="flex items-center">
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                <Go className={`${page === totalPages ? "fill-neutral-400" : "fill-white"} size-[24px] cursor-pointer`} />
            </button>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                <Go className={`${page === 1 ? "fill-neutral-400" : "fill-white"} size-[24px] mr-[4px] rotate-180`} />
            </button>
        </div>
        <div>
            {startIndex}–{endIndex} از {count}
        </div>
    </div>)
}
export default Pagination;
