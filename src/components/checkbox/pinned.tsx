import React from 'react'
import {Ranking} from 'iconsax-reactjs'
const pinnedCheckBox = ({state , setState } : {state : boolean , setState : React.Dispatch<React.SetStateAction<boolean>> }) => { 
    
    return <button className='relative   cursor-pointer hover:opacity-50' onClick={()=>{setState(!state)}} >
            <Ranking size="16" color="#37d67a" variant={state ? "Bold" : "TwoTone"}/>
    </button>
}

export default React.memo(pinnedCheckBox)