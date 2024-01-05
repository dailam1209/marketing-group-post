import React from 'react';
import Image from 'next/image';
import styles from './group.module.css';

export interface UserProps {
    linkUser: string,
    nameUser: string,
    isMobile: boolean
}

const GroupZaloUserTable: React.FC<UserProps> = ({linkUser, nameUser, isMobile}) => {
  return (
    <div>
        <div className={!isMobile ? styles.image_table : styles.image_table_mobile} >
            <div className={styles.image_user_group}>
                <Image src={linkUser} width={26} height={26} alt="image-user-table-group"/>
            </div>
            <span>{nameUser}</span>
        </div>
    </div>
  )
}

export default GroupZaloUserTable;