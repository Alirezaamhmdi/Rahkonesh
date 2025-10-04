import React, { useEffect, useReducer, useRef, useState , type Dispatch , type SetStateAction} from 'react';
import { ArrowDown2, CloseCircle, Folder2, Image, InfoCircle } from 'iconsax-reactjs';
import {createPortal} from 'react-dom'
import MiniPicture from '../../../components/picture/minipicture';
import './createProject.css';
import firstpicture from '../../../assets/png/back1.png';
import secondpicture from '../../../assets/png/back2.png';
import thirdpicture from '../../../assets/png/back3.png';
import forthpicture from '../../../assets/png/back4.png';
import fifthpicture from '../../../assets/png/back5.png';
import defaultpicture from '../../../assets/png/default.jpg'

interface Project {
    title: string,
    description: string,
    workSpaceID: string,
    backgroundType: number, // 0: default, 1: suggested images, 2: upload image, 3: color bg
    colorBG?: string,
    uploadImageURL?: string,
    uploadImageLocal?: string,
    suggestedImages?: string,
}
const colors = [
  '#5F4B8B',
  '#A47864',
  '#FFBE98',
  '#BB2649',
  '#FF6F61',
  '#F5DF4D',
  '#0F4C81',
  '#88B04B'
];

const ImageUpload = ({file , setFile} : {file : undefined|File , setFile : Dispatch<SetStateAction<File | undefined>>}) => {
    const [imgRef, setImgRef] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const imgElementRef = useRef<HTMLImageElement>(null);
    const dragRef = useRef<HTMLDivElement>(null);

    const handleFileChange = (selectedFile: File) => {
        if (!selectedFile) return;

        setFile(selectedFile);
        
        const reader = new FileReader();
        
        reader.onloadstart = () => {
            // console.log('File upload started');
        };

        reader.onload = (event) => {
            const result = event.target?.result as string;
            setImgRef(result);
            if (imgElementRef.current) {
                imgElementRef.current.src = result;
            }
        };

        reader.onloadend = () => {
            // console.log('File upload completed');
        };

        reader.onerror = () => {
            console.error('Error reading file');
        };

        reader.readAsDataURL(selectedFile);
        // console.log('Selected file:', selectedFile.name);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFileChange(selectedFile);
        }
    };

    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragRef.current) {
            dragRef.current.style.opacity = '0.5'; // Visual feedback
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragRef.current) {
            dragRef.current.style.opacity = '1'; // Reset visual feedback
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragRef.current) {
            dragRef.current.style.opacity = '1'; // Reset visual feedback
        }
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            handleFileChange(droppedFile);
        } else {
            console.error('Please drop a valid image file');
        }
    };

    return (
        <div className="w-full">
            <input 
                type="file" 
                accept="image/*"
                ref={inputRef}
                className="hidden" // Always hidden, as we're using span for button
                onChange={handleInputChange}
            />
            <div 
                id="drag"
                ref={dragRef}
                className={`flex flex-col justify-center items-center cursor-pointer border-dashed border-gray-300 hover:opacity-75 transition-all duration-300 p-1 box-border border-4 rounded-2xl h-[183px] w-full ${imgRef ? 'hidden' : 'block'}`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            > 
                <Image className="text-[#E337AF] opacity-65 mt-3" variant="TwoTone" />
                <small className="text-xs text-neutral-400 my-5">
                    تصویر را بکشید و داخل کادر بیاورید و یا روی دکمه‌ی آپلود کلیک کنید.
                </small>
                <span 
                    className="w-[6rem] h-[2.75rem] rounded-xl bg-[#E337AF] text-white text-xs cursor-pointer hover:opacity-75 transition-opacity duration-300  py-[0.75rem] flex justify-center items-center"
                    onClick={handleImageClick}
                >
                    انتخاب عکس
                </span>
            </div>
            <img 
                ref={imgElementRef}
                src={imgRef || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
                className={`cursor-pointer border-dashed border-gray-300 hover:border-gray-200 hover:opacity-85 transition-all duration-300 p-1 box-border border-4 rounded-2xl h-[183px] w-[544px] ${imgRef ? 'block' : 'hidden'}`}
                onClick={handleImageClick}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                alt="Uploaded preview"
            />
        </div>
    );
};

const ColorPicker = ({ send , currentColor}: { send: (color: string|null) => void  , currentColor : string|undefined}) => {
  return (
    <div className="flex gap-8 ">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-8 h-8 rounded-full shadow-md hover:drop-shadow-black hover:border-2 transition-all  border-sky-300 duration-300 cursor-pointer ${currentColor && currentColor==color ? "border-double border-4 drop-shadow-sky-500" : "  drop-shadow-green-950"}`}
          style={{ backgroundColor: color }}
          title={color}
          onClick={() => send(currentColor == color ? null : color) }
        />
      ))}
    </div>
  );
};
const BGChoosing = (
    {handleBackgroundTypeChange , handleImageSelect , setProject , project} :
     {handleBackgroundTypeChange : (type : number) => void ,
        handleImageSelect : (imageId : string)=>void , 
        setProject : Dispatch<SetStateAction<Project>> , 
        project : Project
     })=>{
        useEffect(()=>{
            console.log(project.colorBG)
        } , [project.colorBG])
    const [file , setFile] = useState<File | undefined>(undefined)
    const [imgRef , setImgRef] = useState<string>("")
    const REF = useRef<HTMLImageElement | null>(null)
    return (
        <div className='  inset-0 flex flex-col justify-between'>
        <div className="my-3 flex justify-between w-full select-none">
                
        <label className='cursor-pointer '>
                    <input 
                        type="radio" 
                        name="backgroundType"
                        className='accent-purple-600 cursor-pointer'
                        checked={project.backgroundType === 0}
                        onChange={() => handleBackgroundTypeChange(0)}
                    />
                    پیشفرض
                </label>
                
                <label className='cursor-pointer '>
                    <input 
                        type="radio" 
                        name="backgroundType"
                        className='accent-purple-600 cursor-pointer'
                        checked={project.backgroundType === 1}
                        onChange={() => handleBackgroundTypeChange(1)}
                    />
                    تصاویر پیشنهادی
                </label>
                
                <label className='cursor-pointer '>
                    <input 
                        type="radio" 
                        name="backgroundType"
                        className='accent-purple-600 cursor-pointer'
                        checked={project.backgroundType === 2}
                        onChange={() => handleBackgroundTypeChange(2)}
                    />
                    آپلود عکس
                </label>
                
                <label className='cursor-pointer '>
                    <input 
                        type="radio" 
                        name="backgroundType"
                        className='accent-purple-600 cursor-pointer'
                        checked={project.backgroundType === 3}
                        onChange={() => handleBackgroundTypeChange(3)}
                    />
                    رنگی
                </label>
            </div>
            <div className={'min-h-[4rem] w-full  transition'}>
                {project.backgroundType === 0 && 
                <div
                className={`flex flex-col justify-center items-center cursor-pointer border-dashed border-gray-300 hover:opacity-75 transition-all duration-300 p-1 box-border border-4 rounded-2xl h-[183px] w-full ${imgRef ? 'hidden' : 'block'}`}> 
                    <MiniPicture
                    classname='h-full ' 
                    url={defaultpicture} /> 
                </div>

                }
            {project.backgroundType === 1 &&
                    <div className='grid grid-cols-6 min-h-[4.125rem] gap-6 w-full my-3 box-content'>
                        <MiniPicture  
                            url={firstpicture} 
                            shouldLoad={project.backgroundType === 1 }
                            onClick={() => handleImageSelect('back1')}
                            classname={`cursor-pointer transition-all box-border border-sky-300 duration-300 ${project.suggestedImages == 'back1'? "border-double border-4" : " " }`}
                        />
                        <MiniPicture 
                            url={secondpicture} 
                            shouldLoad={project.backgroundType === 1 }
                            onClick={() => handleImageSelect('back2')}
                            classname={`cursor-pointer transition-all box-border border-sky-300 duration-300 ${project.suggestedImages == 'back2'? "border-double border-4" : " " }`}

                        />
                        <MiniPicture 
                            url={thirdpicture}
                             shouldLoad={project.backgroundType === 1 } 
                            onClick={() => handleImageSelect('back3')}
                            classname={`cursor-pointer transition-all box-border border-sky-300 duration-300 ${project.suggestedImages == 'back3'? "border-double border-4" : " " }`}

                        />
                        <MiniPicture 
                            url={forthpicture} 
                             shouldLoad={project.backgroundType === 1 }
                            onClick={() => handleImageSelect('back4')}
                            classname={`cursor-pointer transition-all box-border border-sky-300 duration-300 ${project.suggestedImages == 'back4'? "border-double border-4" : " " }`}

                        />
                        <MiniPicture 
                            url={fifthpicture} 
                             shouldLoad={project.backgroundType === 1 }
                            onClick={() => handleImageSelect('back5')}
                            classname={`cursor-pointer transition-all box-border border-sky-300 duration-300 ${project.suggestedImages == 'back5'? "border-double border-4" : " " }`}

                        />
                        <div 
                            className='h-full w-full bg-[#FBF4FF] rounded-xl cursor-pointer content-center text-center text-xs text-[#9429C5]'
                            onClick={() => handleImageSelect('color')}
                        > همه‌ی <br/>تصاویر</div>
                    </div>

                }
            
            
            {project.backgroundType === 3 && (
                <div className="my-3 flex justify-center gap-8 ">
                    <ColorPicker send={(x)=>{setProject({
                        ...project , 
                        colorBG : x
                    })}} currentColor={project.colorBG}/>
                    {/* <input 
                        type="color" 
                        className='h-8 w-8 cursor-pointer rounded-full boreder-0'
                        value={project.colorBG || '#ffffff'}
                        onChange={(e) => setProject(prev => ({
                            ...prev,
                            colorBG: e.target.value
                        }))}
                    /> */}
                </div>
            )}
            
            {project.backgroundType === 2 && (
                <ImageUpload file={file} setFile={setFile} />
            )}
         </div>
</div>
    )
}
const CreateProject = ( {canclation , className = ""} : {canclation : Dispatch<SetStateAction<boolean>> , className ?: string } ) => {
    const [project, setProject] = useState<Project>({
        title: '',
        description: '',
        workSpaceID: 'workspaceID',
        backgroundType: 0
    });
    const [WSOpen , setWSOpen ] = useState(false)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // console.log(`${value}`)
        if (value.length >= 100 && name== "title" ) return
        if(value.length >= 700 && name=='description') return 
        setProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBackgroundTypeChange = (type: number) => {
        setProject(prev => ({
            ...prev,
            backgroundType: type
        }));
    };

    const handleImageSelect = (imageId: string) => {
        setProject(prev => ({
            ...prev,
            suggestedImages: imageId,
            backgroundType: 1 // Ensure we're in suggested images mode
        }));
    };

    return (
        <div className={'absolute  top-0 z-[9999]  w-screen h-screen overflow-scroll  backdrop-blur-[.125rem] ' + className}
        >

            
        <div className="popout-shadow rounded-3xl relative  mx-auto flex flex-col gap-[0.75rem] my-[2rem] w-[38rem] px-[2rem] bg-white transition-all" dir='rtl'>
            <div className='w-full pt-[1rem] absolute left-[1rem]' dir='ltr' >
                  <CloseCircle size="16" color="#E8233D" variant="Bold" className="cursor-pointer hover:opacity-55 transition-opacity" onClick={()=>{canclation(false)}}/>
                </div>
            <div className='py-[21.55px] mt-1 mb-3'>
                <h2 className='text-xl'>ایجاد پروژه</h2>
            </div>
            
            <div className="flex flex-col gap-[1rem]">
                <h6 className='pb-4 text-base'>عنوان پروژه</h6>
                <div className="relative">
                <input 
                    type='text' 
                    name='title'
                    value={project.title}
                    onChange={handleInputChange}
                    className = 'w-full rounded-2xl outline-1 outline outline-offset-1  outline-neutral-300 focus:outline-[#9429C5] transition-all  py-2 px-[1.125rem] text-xs h-[3.5rem] '
                    placeholder='عنوان پروژه را وارد کنید'
                />
                    <text className='absolute left-0 bottom-0 ml-3 text-[0.5rem] mb-1.5'>{project.title.length}/100</text>
                </div>
            </div>
            
            <div className="my-3">
                <span className='flex items-center pb-4'>

                <h6> توضیحات پروژه</h6>
                <InfoCircle className='h-4 text-neutral-400 resize-y' />
                </span>
                <div className="relative">

                <textarea className="resize-y  w-full  py-[1rem]  px-[1.25rem] text-xs rounded-2xl outline-1 outline outline-offset-1  outline-neutral-300 focus:outline-[#9429C5] transition-all  min-h-[12rem]"
                    name='description'
                    value={project.description}
                    onChange={handleInputChange}
                    placeholder='جزئیات پروژه و توضیحات تکمیلی را وارد کنید'> </textarea>
                    <small className={`absolute left-0 bottom-0 ml-3  mb-3 text-[0.5rem] ${project.description.length >= 700 ? "text-rose-500" : " "}`}>{project.description.length}/700</small>
                </div>
            </div>
            
            <div className="">
                <h6> انتخاب فضای پروژه</h6>
                <div className='relative' >
                    <div className={`w-full h-[3.125rem] outline outline-1 outline-neutral-300 focus:outline-rose-300  text-neutral-300  transition-all duration-300 ease-in-out relative cursor-pointer justify-between rounded-2xl content-center p-[1rem] flex items-center`} onClick={()=>{setWSOpen(!WSOpen)}}>
                        <div className='flex items-center text-base '>

                        <Folder2 className='h-full pl-[0.5rem]'/>
                        فضای کاری را انتخاب کنید
                        </div>
                        <ArrowDown2 className={`${WSOpen ? 'rotate-0' : 'rotate-180'} transition-all duration-300 ease-in`}/>
                    </div>
                    <div className={`transition-all overflow-scroll top-0 ${WSOpen ? 'max-h-0' : 'h-100'} `}>
                    <div className={`  rounded-2xl border-1 p-[0.75rem] border border-2 outline-neutral-300 bg-white w-full mt-3 flex flex-col gap-3 ` } >
                        <button className='w-full cursor-pointer white_to_primary-100 transition-colors duration-100 ease-in-out h-11 rounded-lg content-start flex items-center gap-2 px-2 py-4' >
                            <Folder2 className='h-4 '/>

                            teamyer-v2.0
                        </button>
                        <button className='w-full cursor-pointer white_to_primary-100 transition-colors duration-100 ease-in-out h-11 rounded-lg content-start flex items-center gap-2 px-2 py-4'>
                            <Folder2 className='h-4 '/>

                            teamyer-v2.0
                        </button>
                        <button className='w-full cursor-pointer white_to_primary-100 transition-colors duration-100 ease-in-out h-11 rounded-lg content-start flex items-center gap-2 px-2 py-4'>
                            <Folder2 className='h-4 '/>

                            teamyer-v2.0
                        </button>
                        <button className='w-full cursor-pointer white_to_primary-100 transition-colors duration-100 ease-in-out h-11 rounded-lg content-start flex items-center gap-2 px-2 py-4'>
                            <Folder2 className='h-4 '/>

                            teamyer-v2.0
                        </button>
                        <button className='w-full cursor-pointer white_to_primary-100 transition-colors duration-100 ease-in-out h-11 rounded-lg content-start flex items-center gap-2 px-2 py-4'>
                            <Folder2 className='h-4 '/>

                            teamyer-v2.0
                        </button>
                        <button className='w-full cursor-pointer white_to_primary-100 transition-colors duration-100 ease-in-out h-11 rounded-lg content-start flex items-center gap-2 px-2 py-4'>
                            <Folder2 className='h-4 '/>

                            teamyer-v2.0
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            
            <div className="my-3">
                <h6> تصویر پس زمینه</h6>
            </div>
            
            <div className="inset-0">
                <BGChoosing handleBackgroundTypeChange={handleBackgroundTypeChange} handleImageSelect={handleImageSelect} setProject={setProject} project={project}/>
            </div>
            <hr className='mb-5.5 border-[#F4E3FD] border-2 rounded-full' />
            <div className= 'flex gap-8 mb-3'>
                <button className = "rounded-xl text-base py-4 cursor-pointer text-white primary w-full hover:opacity-75 transition-opacity duration-300 ease-in-out" onClick={()=>{canclation(false)}}>
                    انصراف
                </button>
                <button className = "rounded-xl py-4 text-base text-white primary w-full hover:opacity-75 transition-opacity duration-300 ease-in-out">
                    ایجار پروژه جدید 

                </button>
            </div>
        </div></div>
    );
};

export default CreateProject;