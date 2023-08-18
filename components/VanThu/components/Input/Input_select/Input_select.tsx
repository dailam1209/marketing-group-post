import ImageComponent from "@/components/VanThu/image/Image";
import Image from "next/image";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Required_label } from "../Label/Label";
import styles from "./Input_select.module.css"

interface adsentInfor{
  shift:string,
  start_date:string,
  end_date:string,
}
const Input_select = 
({value, options, placeholder, defautlValue, style, onChange, absentInfor, className,isMulti}:
  {value?: string;
  onChange?: (selectedOption: any) => void;
  options?: any[];
  placeholder?: any;
  defautlValue?: any;
  style?: any;
  absentInfor? : adsentInfor;
  className?: string;
  isMulti?:boolean}) =>
{
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    if (
      absentInfor &&
      absentInfor.shift &&
      absentInfor.start_date &&
      absentInfor.end_date
    ) {
      setInputValue('');
    }
  }, [absentInfor]);
  const CustomOption = ({ innerProps, label, data }:any) => (
    <div className={styles.options_container} {...innerProps}>
      {data.image && (
        <img src={data.image} alt='' width={25} height={25} style={{borderRadius: '50%', overflow: 'hidden'}} />
      )}
      <span style={{ marginLeft: '10px',fontSize: '15px'}}>{label}</span>
    </div>
  );
    return(
      <div className={className? styles[className] : styles.input_select}>
          <Select 
            options={options}
            placeholder={placeholder}
            defaultValue={defautlValue}
            styles = {style}
            onChange={onChange}
            value={inputValue}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            components={{ Option: CustomOption }}
            isMulti = {isMulti}
            menuShouldScrollIntoView={true}
          />
      </div>
    );
  }
export function Old_input_select({input_name, handleInputChange}:any){
    return(
        <div className={styles.khoixetduyet}>
            <div className={styles.khoixetduyet_2}>
            <Required_label title="Xét duyệt văn bản"/>
            <select name={input_name} onClick={handleInputChange} className={styles.xetduyet_select}>
                <option className={styles.xetduyet_option}>Xét duyệt</option>
            </select>
            <Image src={"/icon/arr_down_select.png"} alt="arrow" width={13} height={15} className={styles.xetduyet_arrow_icon} />
            </div>
        </div>
    )
}
export default Input_select