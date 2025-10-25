import css from "../picture/minipicture.css";

export interface TableHeaderType{
        name:string;
        target:string;
        icon:any;
        width:string;
}

const TableHeader:React.FC<{header:TableHeaderType[],mobileHeader:string[];headerClass:string;headerItemClass:string;}> = ({header,mobileHeader,headerClass,headerItemClass}) => {

    return (<div>
        <div className={`${headerClass}`}>
            {header?.map((item,i)=><div key={i} className={`flex items-ceneter justify-start ${item.width} ${headerItemClass}`}>
                {item.icon}
                <p className="text-white px-[10px]">{item.name}</p>
            </div>)}
        </div>
    </div>)
}
export default TableHeader;
