import type React from "react";

interface TagsListST{
    name:string,
    background:string,
}

const TagsList:React.FC<{Tags:TagsListST[]}>=({Tags})=>{
    return(
        <div className="flex gap-3 items-end flex-wrap">
            {Tags?.slice(0,3)?.map((item,i)=><div key={i} className={`rounded-full ${item.background} text-white w-max flex items-center text-xs px-[8px] py-[4px]`}>{item.name}</div>)}
            {Tags?.length>3&&<div className="px-[8px] py-[4px] bg-neutral-800 rounded-full text-white text-xs">{(Tags?.length)-3}+</div>}
        </div>
    )
}
export default TagsList;