import { useRef } from "react"
import {ArrowLeft, ArrowLeft2} from 'iconsax-reactjs'

interface l1ReadyTemplate {
    Title : string , 
    description : string , 
    url : string
}

export const Card =({content} :{content : l1ReadyTemplate})=>{

    return (
        <div className="min-h-63 max-w-62 min-w-62 bg-neutral-100 mx-3 rounded-3xl overflow-hidden px-4 py-4 flex flex-col shadow-custom">
    <img className="w-54 h-22 rounded-3xl" src={`/src/assets/png/${content.url ? content.url : 'dailyTasks.png'}`} /> 
    <div className="mt-3">
        <h2 className="text-base text-[#1E2938]">{content.Title}</h2>
    </div>
    <div className="mt-2"> {/* description */}
        <small className="text-xs text-[#657282] line-clamp-3">{content.description}</small>
    </div>
    {/* This div will push the button to the bottom */}
    <div className="mt-auto pt-2" dir="ltr">
        <button className="flex primary-text text-xs items-center cursor-pointer hover:opacity-70 transition">
            <ArrowLeft2 className="h-3" />
            استفاده از قالب 
        </button>
    </div>
</div>
    )
}
const CardSlide  = ({className} : {className : string})=>{
    const cards_order = useRef([])
    return (
        <div className={"w-full overflow-scroll py-2 scroll-auto flex snap-center items-center justify-center "+className }>
        <Card content={{Title:"قالب تسک‌های روزانه  " ,
        description:"تسک های روزانه، روند انجام پروژه  شامل به بخش های ورزش، کار، آموزش و.... تقسیم می شوند. ",
        url : 'dailyTasks.png'}}></Card>
        <Card content={{Title : 'قالب اجایل ' , description : 'پروژه به بخش‌های کوچیک (اسپرینت‌ها) تقسیم می‌شه و تیم‌ها در بازه‌های کوتاه (مثلاً دو هفته‌ای) نسخه‌ای قابل ارائه می‌سازن' , url : 'agaile.png'}}></Card>
        <Card content={{Title:"قالب کانبان" ,
        description:`در روش کانبان، روند انجام پروژه  شامل ستون‌هایی مثل "در انتظار"، "در حال انجام" و "انجام‌شده" است.`,
        url : 'canban.png'}}></Card>
    </div>)
}

export default CardSlide 