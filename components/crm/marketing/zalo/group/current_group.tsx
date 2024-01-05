import React from 'react';
import style from './group.module.css';


export interface numberProp {
    numberCurrentDetailForGroup: number
}

const CurrentGroup: React.FC<numberProp> = ({numberCurrentDetailForGroup}) => {
  const listDetail = ["Tài khoản Zalo", "Kịch bản tin", "Lịch đăng bài", "Shop"];
   numberCurrentDetailForGroup = 0
  return (
    <section>
        <ul className={style.list_current}>
            {
                listDetail.map((item, i) => (
                    <li className={`${style.list_current__li} ${i !== numberCurrentDetailForGroup ?  `list_current__li-no-active` : `list_current__li-active`}`}>{item}</li>
                ))
            }
        </ul>
        <div></div>
    </section>
  )
}

export default CurrentGroup;