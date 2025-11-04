import { lazy, Suspense, useEffect, useRef, useState, type SetStateAction } from "react";
import Pagination from "./pagination";
import TableHeader, { type TableHeaderType } from "./tableHeader";
// import TableRow from "./tableRow";
// import TableRowMobile from "./tableRowMobile";
import useMediaQuery from "../../hooks/useMediaQuery";
const TableRow = lazy(() => import("./tableRow"));
const TableRowMobile = lazy(() => import("./tableRowMobile"));

interface AllClass {
    header: string;
    headerItems: string;
    body: string;
    Rows: string;
    RowsItems: string;
    Pagination: string;
}
export interface TableStructure {
    header: TableHeaderType[];
    content: object[]; // json content
    isPagination: boolean;
    pageCount: number; // how many show in every page & in scroller page this param is all data loaded
    loadingCount: number;
    mobileHeader: string[]; // in mobile view first column
    classNames?: AllClass;
    allCount: number;
    scrollAction: Date | null
    setScrollAction: React.Dispatch<SetStateAction<Date | null>>

}
const TableFrame: React.FC<TableStructure> = ({ header, content, isPagination, pageCount, loadingCount, mobileHeader, classNames = {
    header: "",
    headerItems: "",
    body: "",
    Rows: "",
    RowsItems: "",
    Pagination: "",
}, allCount, scrollAction, setScrollAction
}) => {
    const scroller = useRef<any>(null);
    const isLargeScreen = useMediaQuery("(min-width: 64rem)");
    const Scrolling = () => {
        const scrollableHeight = scroller.current.scrollHeight;
        const scrolledHeight = scroller.current.scrollTop + scroller.current.clientHeight;
        if (scrolledHeight >= scrollableHeight - 10 && pageCount <= allCount) {
            setScrollAction(new Date())
        }
    }



    return (<div className="h-full flex flex-col">
        {isLargeScreen && <TableHeader header={header} mobileHeader={mobileHeader} headerClass={classNames.header} headerItemClass={classNames.headerItems} />}
        <Suspense fallback={<div className="h-full flex flex-col gap-[10px]">
            {Array.from({ length: loadingCount }).map((_, i) => (
                <div key={i} className={`skeleton-loading rounded-[16px]`} style={{ height: 100 / loadingCount + "%" }}></div>
            ))}

        </div>}>
            <div className={classNames.body} ref={scroller} onScroll={!isPagination ? Scrolling : () => { }}>
                <div className="h-max overflow-hidden">
                    {isLargeScreen && content.map((item, i) => <TableRow key={i} items={item} mobileHeader={mobileHeader} header={header} rowClass={classNames.Rows} rowItemClass={classNames.RowsItems} />)}
                    {!isLargeScreen && content.map((item, i) => <TableRowMobile key={i} items={item} mobileHeader={mobileHeader} header={header} rowClass={classNames.Rows} rowItemClass={classNames.RowsItems} />)}
                </div>
            </div>
        </Suspense>

        {isPagination && <div className={classNames.Pagination}>
            <Pagination count={allCount} pageCount={pageCount} />
        </div>}
    </div>)
}
export default TableFrame;
