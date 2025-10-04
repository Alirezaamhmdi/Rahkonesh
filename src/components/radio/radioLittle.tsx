import { Radio } from '@base-ui-components/react/radio';
import { RadioGroup } from '@base-ui-components/react/radio-group';
export interface RadioList {
  name:string|any;
  key:string;
  className:string;
}
const RadioLittle= ({ClassName,RowClassName="",RadioSize,List,defaultKey}:{ClassName:string,RowClassName?:string,RadioSize:number,List:RadioList[],defaultKey:string})=>{
  return (
    <RadioGroup
      defaultValue={defaultKey}
      className={`${ClassName}`}
    >
      {List.map((item,index)=><label key={index} className={`${RowClassName} flex flex-1 items-center`}>
        <Radio.Root value={item.key} className={`size-[2px] flex border items-center justify-center
    box-border flex w-${RadioSize} h-${RadioSize} rounded-full outline-0 p-0 m-0 border-primary-1000
    data-[unchecked]:border data-[unchecked]:border-gray-300 data-[unchecked]:bg-transparent
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2
  `}>
          <Radio.Indicator className={`
      flex items-center justify-center
      data-[unchecked]:hidden
      before:content-[''] before:rounded-full before:w-2 before:h-2 before:bg-primary-1000
    `} />
        </Radio.Root>
        <span className={`pr-[4px] ${item.className}`}>{item.name}</span>
      </label>)}
      

    </RadioGroup>
  );
}

export default RadioLittle;
