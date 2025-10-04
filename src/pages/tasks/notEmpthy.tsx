
import CardSlide from '../../components/readyTemplateCard/readyTemplateCard'
import handPoint from '../../assets/png/Hands.png'
import { ArrowDown2 } from 'iconsax-reactjs'
import { useRef } from 'react'
const EmpthyTask = () => {
    const currentContainer = useRef(null)
    return <div className='flex flex-col justify-center items-center p-6 snap-end' ref={currentContainer}>
        <img src={handPoint} className='w-52.5 my-2.5'/>
        <p className='text-base text-[#657282] my-2.5'> هیچ پروژه ای در هیچ فضای  کاری ای ایجاد نشده .</p>
        <div className='w-full flex flex-col items-center justify-center cursor-pointer' 
        onClick={() => {
                    if (currentContainer.current) {
                        currentContainer.current.scrollIntoView({ 
                            behavior: 'smooth' // Smooth scrolling
                        });
                    }
                }}>
        <h2 className='text-xl primary-text my-2.5'> شروع با قالب‌های آماده</h2>
        <ArrowDown2 
                className='w-12 my-2.5 animate-bounce '
                
            /></div>
            
            {/* The element to scroll to (CardSlide) */}
            <div ref={currentContainer}>
                <CardSlide className='my-2.5'/>
            </div>
    </div>
}
export default EmpthyTask