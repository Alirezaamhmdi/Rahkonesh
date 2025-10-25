import type { TableHeaderType } from "./tableHeader";


const TableRow:React.FC<{items:any, mobileHeader:string[], header:TableHeaderType[], rowClass:string, rowItemClass:string}> = ({items,mobileHeader,header,rowClass,rowItemClass}) => {

    return (<div>
        <div className={`flex bg-white ${rowClass}`}>
            {header?.map((item,i)=><div key={i} className={`flex items-ceneter justify-start ${item.width} ${rowItemClass}`}>
                {items[item.target]}
            </div>)}
        </div>
    </div>)
}
export default TableRow;
