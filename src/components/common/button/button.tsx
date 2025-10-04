import  Google from '../../../assets/svg/google_logo.svg'
import '../../../styles.css'
import './button.css'
export default function Button({ label, onClick, disabled = false , className }: { label: string , onClick: () => void , disabled?: boolean , className ?: string }) {
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className={`primary-1000 text-white pd-4 rounded-2xl cursor-pointer ${className}` }
        >
        {label}
        </button>
    );
}
export function ButtonGoogle({ label, onClick, disabled = false , className }: { label: string , onClick: () => void , disabled?: boolean  , className ?: string }) {
    
    return <button 
        onClick={onClick} 
        disabled={disabled}
        className={`bg-neutral-200 text-black ${ !disabled ? "cursor-pointer" : "cursor-not-allowed"} ${className} `}>
            {label}
            <img src={Google} alt="google logo" className="h-full inline px-3" />
        </button>
}
