import ImageComponent from "@/components/VanThu/image/Image";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Input_file.module.css"

export default function Input_file({input_name,handleInputChange}:any){
    return(
      <div className={styles.input_file_section}>
        <div className={styles.input_file_subsection}>
          <input name={input_name} onChange={handleInputChange} type="file" multiple/>
        </div>
      </div>
    );
}
export function Input_file_2({input_name,handleInputChange}:any){
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
    const handleFileChange = (event : ChangeEvent<HTMLInputElement>) => {
      if (event.target.files){
        const files : File[] = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      }
    };
    useEffect(()=>{
      handleInputChange({name: input_name, files: selectedFiles})
    },[handleInputChange, input_name, selectedFiles])
    
    const handleDelete = (index: number) => {
      setSelectedFiles((prevFiles) => prevFiles.filter((file, i) => i!== index));
    }
  
    return (
      <div className={styles.input_file_2_form}>
        <div>
          <ul className={styles.frameimg}>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                <div className={styles.file_list}>
                  <div className={styles.file_name}>
                    {file.name}
                  </div>
                  <div className={styles.deletefile_btn_container}>
                    <button className={styles.deletefile_btn} onClick={()=>handleDelete(index)} >x</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <label htmlFor="file2" className={styles.add_img}>
              Chọn file đính kèm
            </label>
            <input
              id="file2"
              type="file"
              className={styles.display_none}
              onChange={handleFileChange}
              multiple
            />
          </div>
        </div>
      </div>
    );
}
export function Input_file_3({placeholder,handleChange,name}:{placeholder:string,handleChange?:any,name?:string}){
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
  };
  useEffect(() =>{
    if(handleChange){
      handleChange({name: name, value: selectedFiles})
    }
  },[handleChange, name, selectedFiles])
  const handleDeleteFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  }
  return (
    <>
      <div className={styles.input_3}>
        <span className={styles.input_3_label}>{placeholder}</span>
        <input onChange={handleFileChange} id="send_file" type="file" className={styles.display_none} autoComplete="false" />
        <label htmlFor="send_file" className={styles.btn_upload}>
          <Image width={14} height={14}  src="/icon/dinh_kem_icon.png" alt={""} />
        </label>
      </div>
      <ul className={styles.file_list_3}>
        {selectedFiles.map((file, index) => (
          <div className={styles.file_upl} key={index}>
            <li>{file.name}</li>
            <div onClick={() => handleDeleteFile(index)} className={styles.file_remove_3}>
              <Image width={16} height={16} src="/icon/remove_file_red.png" alt={""} />
            </div>
          </div>
        ))}
      </ul>
    </>
  )
}
