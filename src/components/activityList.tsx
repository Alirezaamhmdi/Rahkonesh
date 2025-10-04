
const ActivityList:React.FC=()=>{
    const Data=[
        {},
        {},
        {},
    ]
    return(
        <div>
            <h3 className="text-neutral-800 text-base mb-[12px]">فعالیت های اخیر</h3>
            <div>
                {
                    Data.map((item,i)=>
                    <>
                        {i!=0&&<span className="block h-[1px] w-full my-[20px] bg-neutral-200"></span>}
                    
                        <div key={i}>
                            <div className="mb-[12px] flex items-center justify-end">
                                <div className="flex items-center">
                                    <p className="text-blue-900 text-xs pl-[4px]">Amin kamalai</p>
                                    <div className="size-[1.75rem] rounded-full bg-red-500"></div>
                                </div>
                                <span className="mx-[12px] text-[0.625rem] text-neutral-600">22:20</span>
                                <time className="text-[0.625rem] text-neutral-600">10  مرداد 1404</time>

                            </div>
                            <div>
                                <p className="text-neutral-600 text-xs">در بخش کارها نظر جدیدی ثبت کرد. </p>
                            </div>

                        </div>
                    </>)
                }
            </div>

        </div>
    )
}
export default ActivityList;