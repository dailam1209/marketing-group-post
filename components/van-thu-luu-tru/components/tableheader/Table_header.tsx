import styles from "./Table_header.module.css";

const Table_header = ({titles,className,containerClassName}:any) =>{
    return(
        <ul className={containerClassName ? styles[containerClassName] : styles.table_header_container}>
            {titles.map((t:any) => {
                return (
                    <li className={styles[className]} key={t.label}>{t.label}</li>
                )
            })}
        </ul>
    )
}
export default Table_header;