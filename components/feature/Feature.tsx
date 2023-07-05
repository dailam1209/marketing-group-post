// import React, {useState} from 'react';
// import styles from  './Feature.module.css'
// import { FiSearch } from 'react-icons/fi';
// import Home from "@/pages";
// import About from "@/pages/about";
// import {AppProps} from "next/app";

// export interface FeatureProp {

// }

// export default function Feature({ children }: any){
//     return (
//         <div className={`${styles.Feature}`}>
//             <div className={`${styles.profile} ${styles.container}`}>
//                 <div className={`${styles.itemOfContainer}`}>
//                     <img className={`${styles.img}`} src={'avatar.png'}></img>
//                     <text className={`${styles.name}`}>Đỗ Nam Trung</text>
//                     <img className={`${styles.iconEmotion}`} src={'icon_emotion.png'}></img>
//                     <text className={`${styles.nickname}`}>Trung Cute</text>
//                     {/*<button className={styles.dotButton} style={{marginLeft: "140px"}}>*/}
//                     {/*    ...*/}
//                     {/*</button>*/}
//                 </div>
//                 <div className={`${styles.itemOfContainer}`}>
//                     <input className={`${styles.inputSearch}`} type={'text'}/>
//                     <FiSearch className={`${styles.iconGlass}`}/>
//                 </div>
//             </div>
//             { children }
//         </div>
//     )
// }