import { useState } from "react";
import styles from "./Input_switch.module.css"

export default function SwitchInput({ label, id, input_name,input_value, handleChange }:
  {label:string, id:string, input_name?:string, input_value?:any, handleChange?:any}) {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleInputChange = (name:any,value:any) => {
      setIsChecked(!isChecked);
      if(!isChecked) {
        handleChange({name:name,value:value});
      }
      else{
        handleChange({name:name,value:''});
      }
    };
  
    return (
      <div className={styles.switchContainer}>
        <label className={styles.switchLabel} htmlFor={id}>
          {label}
        </label>
        <div className={styles.switchWrapper}>
          <label className={styles.switch}>
            <input
              className={styles.switch_input}
              id={id}
              type="checkbox"
              checked={isChecked}
              onClick={()=>handleInputChange(input_name, input_value)}
              name={input_name}
              value={input_value}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    );
}