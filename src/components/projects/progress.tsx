import React, { useEffect ,useRef} from 'react';
import './puls.css' ; 
import './loading_gocome.css'

//this component uses tailwind css predefined classes
//it is used to show progress in a bar format

const Progress : React.FC<{ className?: string, progress?: number, colorClass?: string  , height ?: string , finished ?: boolean , animation ?: boolean }> = ({ className = '' , progress = 20 , colorClass= '' , height = "h-2" , finished = false , animation = true} : { className?: string, progress?: number , colorClass?: string , height ?: string , finished ?: boolean , animation ?: boolean} ) => 
    {
        const progressRef = useRef<HTMLDivElement>(document.createElement('div'))

        useEffect(()=> {
            setTimeout(
                () => {
                    // console.log(`"the progress ${progress}"`)
                    progressRef.current.style.width = `${Math.min(Math.max(progress, 0), 100)}%`
                    progressRef.current.className += ' pulsing'
                } , 
                 100 , 
            )
            
        } , [progress])
        if (!colorClass) {
            colorClass = (finished) ? 'bg-green-600' : 'primary'
        }
    return (
        <div dir='rtl' className={`w-full ${height} bg-neutral-200 rounded-full overflow-hidden  ${className}`}>
            <div
                ref={progressRef}
                className={`h-full ${animation && "transition-all duration-800 ease-in-out "}  rounded-full ${colorClass} `}
                style={{ width: `0` }}
            ></div>
        </div> 
    )
}
export const ProgressLoading : React.FC<{color ?: string , className ?: string , height? : string} > = ({color = 'bg-neutral-200' , className = "" , height = 'h-2' }:{color? : string , className? : string , height ?:string}) => {
    return (
        <div dir='rtl' className={`w-full ${height} loading-bar rounded-full 
         ${className}`}>
            <div className='loading-progress h-2 w-full'></div>
        </div> 
    )
}
export default Progress
