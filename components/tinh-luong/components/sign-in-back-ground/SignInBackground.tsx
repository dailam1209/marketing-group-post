import React from 'react';
import styles from "./SignInBackground.module.css"
import LeftLayout from '../left-layout/leftLayout';
import Image from 'next/image';
import { ReactNode } from 'react';
type SignInBackGroundProps ={
    children: ReactNode;
    Sign_text: string;
}
function SignInBackGround({children,Sign_text}:SignInBackGroundProps) {
    return(
        <div className={styles.main}>
            <div className={styles.shell}>
                <LeftLayout></LeftLayout>
                <div className={styles.content}>  
                    <div className={styles.layout}>
                        <div className={styles.box}>
                            <div className={styles.Signin_text}>{Sign_text}</div>
                            <div className={styles.Signin_subtext}>Để tiếp tục quá trình, hãy chọn loại tài khoản bạn đang sử dụng.</div>
                            <ul className={styles.choosing_role}>
                                <a className={styles.choosing_role_nhan_vien}>
                                    <div className={styles.choosing_role_box}>
                                        <div className={styles.choosing_role_box_1}>
                                        <Image
                                            src="/Nhan_Vien.png"
                                            width={52}
                                            height={52}
                                            alt="Picture of the author"
                                            />
                                        </div>
                                        <div className={styles.choosing_role_box_2}>
                                            <div className={styles.a}>Nhân Viên</div>
                                            <div className={styles.b}>Tài khoản nhân viên hay các cá nhân trong hệ thống </div>
                                        </div>
                                        <div className={styles.choosing_role_box_3}>
                                        <Image
                                            src="/Arrow_Right_Circle.png"
                                            width={24}
                                            height={24}
                                            alt="Picture of the author"
                                            /> 
                                        </div>
                                    </div>
                                </a>
                                <a className={styles.choosing_role_quan_ly}>
                                <div className={styles.choosing_role_box}>
                                    <div className={styles.choosing_role_box_1}>
                                    <Image
                                        src="/Quan_Ly.png"
                                        width={52}
                                        height={52}
                                        alt="Picture of the author"
                                        />
                                    </div>
                                    <div className={styles.choosing_role_box_2}>
                                        <div className={styles.a}>Quản lý</div>
                                        <div className={styles.b}>Tài khoản sở hữu hoặc tài khoản nhân sự. </div>
                                    </div>
                                    <div className={styles.choosing_role_box_3}>
                                    <Image
                                        src="/Arrow_Right_Circle.png"
                                        width={24}
                                        height={24}
                                        alt="Picture of the author"
                                        />
                                    </div>
                                </div>
                                </a>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInBackGround

