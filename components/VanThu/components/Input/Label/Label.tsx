import styles from "./Label.module.css"

export default function Label({title}:{title:string}){
    return(
      <p className={`${styles.label}`}>
        {title}
        </p>
    );
}
export function Required_label({title}:{title:string}){
    return(
    <p className={`${styles.label}`}>
        {title}
        <Required_sign />
        </p>
    );
}
export function Custom_label({title, label_class, isRequired}:{title:string, label_class: string, isRequired:boolean}){
    return(
        <p className={styles[label_class]}>
        {title}
        {isRequired && <Required_sign /> }
        </p>
    );
}
export function Required_sign(){
    return(
      <span className={styles.required_sign}>*</span>
    );
}