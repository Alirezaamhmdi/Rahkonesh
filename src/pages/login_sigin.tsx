import { useEffect , createContext , useRef } from 'react'
import type {Dispatch , SetStateAction} from 'react'
import {useState , useContext } from 'react' 
import {InputLogin} from '../components/common/inputs/input'
import Button , {ButtonGoogle} from '../components/common/button/button'
import './login_sigin.css'
// import '../assets/font/font_root.css'
import {Outlet , useNavigate , Link} from 'react-router-dom'
//importing the svg file and png
import iconImg from '../assets/png/people.png'
import TeamyerIcon from  '../assets/svg/teamyer_type_graphy.svg'
import backIcon from '../assets/svg/vectorBack.svg'
import editPhoneIcon from '../assets/png/icon_edit.png'
import '../assets/styles/styles.css' 
import '../assets/font/Estedad-Medium.ttf'

const loginContext = createContext<
    {
        error : string , 
        setError : Dispatch<SetStateAction<string>> , 
        phone : string , 
        setPhone : Dispatch<SetStateAction<string>>  , 
        phoneValid : boolean  , 
        setPhoneValid : Dispatch<SetStateAction<boolean>> , 
        
    } | null
>(null)
export const PhoneStateLogin = () => {
    const  {error , setError , phone , setPhone ,phoneValid ,setPhoneValid} = useContext(loginContext) as {
        error : string , 
        setError : Dispatch<SetStateAction<string>> , 
        phone : string , 
        setPhone : Dispatch<SetStateAction<string>>  ,
        phoneValid : boolean , 
        setPhoneValid :  Dispatch<SetStateAction<boolean>> , 
    }
    const navigate = useNavigate() 
    
    const onLoginSigin = () => {
        // const phoneValidation = /^\d{11}$/;
        let next_level = true
        // const valid = phone.match(phoneValidation) ? true : false;
        // if (valid) {
        //     setPhoneValid(true)
        // }
        setPhoneValid(false)
        next_level = true
        // console.log("clicking")
        // console.log("listening")
        if (next_level){
            // console.log("next level" , phoneValid)
            // console.log("pass_code entering")
            navigate("/login/pass_code") ;
        }else { 
            // console.log("this level")
            // console.log("listening + navv")
            navigate("/login")
        }
    } 
    // useEffect(()=>{console.log(phoneValid)} ,[phoneValid])
    return (
        <div className="col-span-1 flex flex-col sm:justify-center justify-start items-end gap-6 heading-h5 min-w-fit px-8 sm:py-0 py-15">
            <div className="flex flex-col items-end w-full gap-4 pb-8">
                    <h6 className="text-xl font-bold text-like-black" dir="rtl">ورود یا ثبت نام</h6>
                    <p className="text-neutral-400 w-full text-right " dir="rtl">
                      <span className='inline-block '> برای ورود یا ثبت نام در پنل   </span>
                      تیم  یر  
                        لطفا شماره موبایل خود را وارد کنید  
                    </p>
                </div>
                <div className="flex flex-col justify-center items-end w-full gap-2">
                <label className="flex items-center gap-2 pr-2 text-neutral-400">شماره موبایل</label>
                <InputLogin setState={setPhone} state={phone} ref="شماره خود را وارد کنید" disabled={false} className={"w-full neutral-8 sm:border-white border-1 border-neutral-200" } phone={true} setError={setError}/>
                <label className={`flex items-center text-sm pr-2 text-rose-300 ${error ? "visible" : "invisible"}`}>{error || "none"}</label>
                </div>
                <Button label={"دریافت کد تأیید"} onClick={onLoginSigin} disabled={phoneValid} className='w-full py-4 '  />
                <ButtonGoogle label={ "ورود با حساب گوگل" } onClick={() => {}} disabled={false} className='w-full py-4 rounded-2xl' />
        </div>)
    
}

const CountdownTimer = ( {children ,  record , reset , className  , onClick} : { children : string ,  record : number , reset : number,className : string, onClick:()=>void}) => {

  const [timeLeft, setTimeLeft] = useState(record * 60); // 4 minutes in seconds
  const [isActive, setIsActive] = useState(false);
 
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(record * 60);
    };
    useEffect(()=>{
      resetTimer() 
    } , [])
  useEffect(() => {
      resetTimer() 
  } , [reset])
  useEffect(() => {
    let interval = null;
    
    if (!isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if ( timeLeft <= 0 ) {
      if (interval) clearInterval(interval );
      setIsActive(true)
      
    }
    
    return () => {if (interval) clearInterval(interval);} ; 
  }, [isActive , timeLeft]);

  

  const formatTime = (seconds : number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}':${secs.toString().padStart(2, '0')}"`;
  };

  return (

      <button className ={`${className} + ${(isActive) ? "primary cursor-pointer" : "fuchsia-4 cursor-wait" }`} onClick={(isActive) ? onClick : ()=>{}} dir = 'ltr'>
        
          { (!isActive) ? formatTime(timeLeft) : ""} 
        {(isActive) ? children : "" }

      </button>

  );
};

export const PassCode = ({ length = 5 }: { length?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const allDigits = useRef<NodeListOf<HTMLInputElement> | null>(null)
  const [err , settingErr ] = useState("")
  const [loaded , setLoad] = useState(true )
  const code = useRef<number[]>([-1 , -1 , -1 ,  -1 , -1 , -1 ])
  const  {  phone   } = useContext(loginContext) as {
        error : string , 
        setError : Dispatch<SetStateAction<string>> , 
        phone : string , 
        setPhone : Dispatch<SetStateAction<string>>  ,
        phoneValid : boolean , 
        setPhoneValid :  Dispatch<SetStateAction<boolean>> , 
    }
  useEffect(()=> {
    const back_icon = new window.Image();
    back_icon.src = backIcon;
    const edit = new window.Image();
    edit.src = editPhoneIcon;

  } , [])
  useEffect(() => {
    // console.log("beggin")
    if (!containerRef.current) return;

    allDigits.current = containerRef.current.querySelectorAll<HTMLInputElement>('.passcode-digit');
    const digits = allDigits.current
    // Auto-focus first input on mount
    if (digits.length > 0) {
      digits[0].focus();
    }

    const handleInput = function(this: HTMLInputElement) {
      const regexp = /[\d]/
      if (this.value.match(regexp) == null && this.value != "") {
        settingErr("کد فقط شامل عدد می‌باشد")
        this.value = ""
        return 
      }
      if (this.value.length === 1) {
        const nextIndex = parseInt(this.dataset.index || '0') + 1;
        if (nextIndex < digits.length) {
          digits[nextIndex].focus();
        }
      }
      if (code.current.at(parseInt(this.dataset.index ||  "0")) != undefined ){
        code.current[parseInt(this.dataset.index ||  "0")] = parseInt(this.value || "-1")
      }
      settingErr("")

    };

    const handleKeyDown = function(this: HTMLInputElement, e: KeyboardEvent) {
        if (err) {
        settingErr("")
      }
      if (e.key === 'Backspace' && this.value.length === 0) {
        const prevIndex = parseInt(this.dataset.index || '0') - 1;
        if (prevIndex >= 0) {
          digits[prevIndex].focus();
        }
      }
    };

    // Add event listeners
    digits.forEach(digit => {
      digit.addEventListener('input', handleInput);
      digit.addEventListener('keydown', handleKeyDown);
    });

    // Cleanup
    return () => {
      digits.forEach(digit => {
        digit.removeEventListener('input', handleInput);
        digit.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, [length]); // Re-run if length changes
  const onClick = ()=>{
    setLoad(!loaded)
    const index = code.current.indexOf(-1) 
    if (index != -1 ) {
        if (allDigits.current) {
            allDigits.current[index].focus() 
        }
        settingErr("لطفا کد را کامل وارد کنید")
    }

    console.log(code.current , index)

  }
  const mapPersian: Map<string, string> = new Map([
  ['0', '۰'],
  ['1', '۱'],
  ['2', '۲'],
  ['3', '۳'],
  ['4', '۴'],
  ['5', '۵'],
  ['6', '۶'],
  ['7', '۷'],
  ['8', '۸'],
  ['9', '۹'],
]);
  return (<>
    <div className = 'sm:px-7 px-4 pt-4 '>
    <div className = "flex-col  ">
    <Link  to=".." className = {" flex justify-end"}><img src={backIcon}/></Link>
    <div dir='rtl' className = {"flex gap-1 items-center sm:pt-30 pt-10"}>
    <h6  className="font-bold text-2xl neutral-8">{phone.split('').map((x : string) => {
      return mapPersian.get(x)
    }).join('')}</h6>
    <Link to=".." > <img src={editPhoneIcon } /></Link>

    </div>
    <p dir='rtl' className="text-md neutral-4">کد ۶ رقمی پیامک شده را وارد کنید.  </p>
    <div className="py-8">
    <div ref={containerRef} className="flex justify-between ">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          data-index={index}
          className={`passcode-digit md:mx-1 sm:mx-0.5 mx-2 h-16 text-center text-2xl neutral-8 bg-white border ${err !== "" ? "border-rose-300" : "border-gray-300"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full neutral-7`}
        />
      ))}
    </div>
    <div className='w-full' dir ='rtl'>
      <label dir='rtl' className = {`text-rose-300 ${err ? "visible" : "invisible"}`}> {err || "none"}</label>
      </div>
    </div>
    <div dir ="rtl" className = 'flex justify-evenly'>
      <button className = 'primary w-full ml-4 py-3 rounded-2xl text-white cursor-pointer' onClick={onClick}>
       تایید و ادامه
      </button>
      <CountdownTimer record = {.1} reset={3}  className = {` w-full ml-4 py-3 rounded-2xl text-white`} onClick={()=>{}}>
         ارسال دوباره کد
      </CountdownTimer>
     
    </div>
    </div>
    </div>
    </>
  );
};
export default function LoginSignIn() {
    const [phoneValid , setPhoneValid] = useState<boolean>(false); // State to toggle between login and sign-in forms
    const [phone , setPhone] = useState<string>(""); // State to manage phone input
    const [error , setError] = useState<string>(""); // State to manage error messages

    const initContext  = {
        error : error , 
        setError : setError , 
        phone : phone , 
        setPhone : setPhone , 
        phoneValid : phoneValid , 
        setPhoneValid : setPhoneValid , 
    }
    
    useEffect(() => {
        const img = new window.Image();
        img.src = iconImg;
        const svgTeamyer = new window.Image() ; 
        svgTeamyer.src = TeamyerIcon

    }, []);
    return (
        <div className = "w-screen h-screen  sm:py-20 py-0 persian-medium-font">
        <div className='grid sm:grid-cols-12 grid-rows-1 grid-cols-3  sm:h-fit heigh-100'> 
        <div className="sm:col-span-10 sm:col-start-2 row-span-1 col-span-3 log-card min-h-full sm:bg-neutral-100 bg-white  sm:p-4 sm:rounded-3xl ">
        <header className='primary-5 flex justify-center h-fit py-3 m-0 sm:hidden '>
                <img src={TeamyerIcon} alt="svg icon" className='h-5' /> 
        </header>
        <div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 sm:gap-4 h-full min-w-fit min-h-full">
            <div className='col-span-1 w-full h-full  primary-linear-1000 rounded-3xl min-w-fit hidden sm:inline px-5' >
                <div className="row-span-1 col-span-1 grid grid-cols-1  min-h-full">
                    <div className=" items-center gap-2  mx-auto flex sm:flex-col justify-center  animate-bounce mt-7 "> 
                        <img src={TeamyerIcon} alt="svg icon"  className='md:w-70 sm:w-50'/> 
                        <h1 className="display-block text-white heading-h5 text-2xl text-center ">... سرزمین تیم شما</h1>
                    </div> 
                <img src={iconImg}  alt="login_sign up image"   className="aspect-3/2 " />
            </div>
            </div>
                
               <loginContext.Provider value = {initContext}>
                <Outlet/>
               </loginContext.Provider>
            

        </div></div></div>
        </div>
    )

}


