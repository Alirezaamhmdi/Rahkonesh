import React  , {useEffect} from "react"

import "./input.css"
function convertPersianToEnglish(input: string): [string , string]   {
    const persianToEnglishMap: { [key: string]: string } = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9'
    };
    const output = input.split("").map((char) => persianToEnglishMap[char] || char).join("")
    if (output.length > 11) {
        return [output, "شماره تلفن باید ۱۱ رقم باشد"];
    }
    if (!output.match(/^[0-9]*$/)) {
        return [output, "شماره تلفن باید فقط شامل اعداد باشد"];
    }
    return [output  , ""] ; 
}

export function InputLogin( {setState  , state , ref , disabled  , className , phone = false , setError = () => {} , condition = () => [true , "" ]} : {setState : React.Dispatch<React.SetStateAction<string>> , state : string , ref? :string , disabled? : boolean , className? : string , phone? : boolean , setError? : React.Dispatch<React.SetStateAction<string>> , condition? : (value:string)=> [boolean , string]}) {
   let setStatein = (s: string) => setState(s) ;
   if (phone) {
        setStatein = (value: string) => {
            const newValue  = convertPersianToEnglish(value);
            const [number , errorMessage] = newValue;
            setState(number);
            if (errorMessage) {
                setError(errorMessage);
            } else {
                setError("");
            }
        };
   }
   useEffect(() => {
        if (phone ){
            const [isValid, errorMessage] = condition(state);
            if (!isValid) {
                setError(errorMessage);
            }
        }
   }, [phone, state, condition, setError]);

           return (
    <input placeholder={ref}  disabled={disabled} dir="rtl" value={state} onChange={(x : React.ChangeEvent<HTMLInputElement>) => setStatein(x.target.value)} className={`ring-neutral-700 rounded-3xl bg-white text-black px-2 py-3 ${className}`} />
    )
}