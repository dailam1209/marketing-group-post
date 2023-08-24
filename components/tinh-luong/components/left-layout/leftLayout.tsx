import styles from "./leftLayout.module.css"
import Image from "next/image"
export default function LeftLayout(){
    return(
        <div className={styles.main} >
            <Image
                  alt="/"
                  src={"/leftLayOut.png"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
        </div>
    )
}
