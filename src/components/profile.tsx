import { useEffect , useRef , memo} from "react"
import Profile from '/src/assets/png/profile.png'

const ProfilePicture = ({size = 32 , className = "" } : {size ?: number , className:string}) => {
    const preloadImg = useRef(new window.Image())
    useEffect(()=>{
        preloadImg.current.src = Profile
    } , [])
    return (
        <div className={`mask-clip-border overflow-hidden rounded-full flex items-center justify-center ${className}`} style={{
            width : `${size}px`,
            height: '32px'
        }}>
            <img ref={preloadImg} className="w-full " />

        </div>
    )
}

export default memo(ProfilePicture)