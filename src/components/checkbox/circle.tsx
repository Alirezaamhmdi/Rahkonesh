import React from 'react'
import {TickCircle} from 'iconsax-reactjs'
const circleCheckBox = ({state , setState } : {state : boolean , setState : React.Dispatch<React.SetStateAction<boolean>> }) => { 
    return <button className='relative  rounded-full outline outline-1 outline-neutral-300 cursor-pointer' onClick={()=>{setState(!state)}} >
            <TickCircle color="#37d67a" variant="Bold" className={`hover:opacity-50 size-3 ${!state ? "invisible"  : " "}`} />
    </button>
}

export default React.memo(circleCheckBox)