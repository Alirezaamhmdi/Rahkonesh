import Document  from "../../assets/icons/Iconex/Light/Document 2.svg?react";
import Trash  from "../../assets/icons/Iconex/Light/Trash can.svg?react";
import Download  from "../../assets/icons/Iconex/Light/Download 2.svg?react";
import Image  from "../../assets/icons/Iconex/Light/Image.svg?react";


const FilesList:React.FC<{ClassName:string}> = ({ClassName}) => {

    return <div className={`${ClassName}`}>
        <div className="flex items-center justify-between pb-[8px]">
            <div className="flex items-center">
                <Document className="size-5 fill-error-700" />
                <span className="text-neutral-500 mr-[8px]">revier.pdf</span>
            </div>
            <div className="flex items-center">
                <Trash className="size-4 fill-neutral-600" />
                <Download  className="size-4 fill-neutral-600 mr-[12px]"  />
            </div>
        </div>
        <div className="flex items-center justify-between pb-[8px]">
            <div className="flex items-center">
                <Image className="size-5 fill-blue-800" />
                <span className="text-neutral-500 mr-[8px]">revier.pdf</span>
            </div>
            <div className="flex items-center">
                <Trash className="size-4 fill-neutral-600" />
                <Download  className="size-4 fill-neutral-600 mr-[12px]"  />
            </div>
        </div>
    </div>
}
export default FilesList;