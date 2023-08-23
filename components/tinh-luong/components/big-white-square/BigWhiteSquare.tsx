import React from 'react';
import styles from './BigWhiteSquare.module.css'
import LeftLayout from '../left-layout/leftLayout';
import Image from 'next/image';
import { ReactNode } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { SignButton, InputBox,ChangingPassWord } from '../small-component';


type BigWhiteSquareProps ={
    children: ReactNode;
    Sign_text: string;
}
function Children1(){
    return(
        <div style={{height:'100%',width:'15%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
        </div>
    )
    
}   
function BigWhiteSquare({children,Sign_text}:BigWhiteSquareProps) {
    const [isHidden, setIsHidden] = useState(true)

    return(
        <div className={styles.main}>
        <div className={styles.shell}>
        <LeftLayout></LeftLayout>
            <div className={styles.content}>
                <div className={styles.layout}>
                    <div className={styles.Quaylai}>
                        <Image
                            src="/arrow_back.png"
                            width={16}
                            height={16}
                            alt="Picture of the author"
                            />
                            <p> Trở về</p>
                    </div>
                    
        
                        {children}
       
                    
                    
                    
                </div>
            </div>
        </div>
</div>
    )
}

export default BigWhiteSquare

