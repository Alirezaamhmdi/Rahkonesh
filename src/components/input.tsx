import { memo, useEffect, type SetStateAction } from "react"

export interface CloseItem{
    status: boolean;
    target: EventTarget|null; 
}
const Input = ({Type,ClassName="",Close,setClose}:{Type:string,ClassName?:string,Close:CloseItem,setClose:React.Dispatch<SetStateAction<CloseItem>>}) => {

    const handleOutsideClick = (e:MouseEvent) => {
        const target = e.target as HTMLElement;
         if (
            !target.closest(".inline-input-box") &&
            target !== Close.target
        ) {
            setClose({ status: false, target: null });
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>| React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
        setClose({ status: false, target: null });
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [Close])

    return (
        <div className="w-full h-full">
            {Type=="textarea"?<textarea className={`inline-input-box w-full px-[20px] border border-primary-600 h-full rounded-[12px] resize-none py-[4px] ${ClassName}`} autoFocus onKeyDown={handleKeyDown}  placeholder="سلام" ></textarea>:
            <input className={`inline-input-box w-full px-[20px] border border-primary-600 h-[2.5rem] rounded-[12px] ${ClassName}`} autoFocus onKeyDown={handleKeyDown} type={Type} placeholder="سلام" ></input>
            }
        </div>
    )
}

export default memo(Input)