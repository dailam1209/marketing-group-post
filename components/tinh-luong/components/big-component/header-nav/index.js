import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import checkCookie from "../../../function/checkCookie"

import styles from './index.module.css'
import cookieCutter from "cookie-cutter";
import Cookies from "js-cookie";
import axios from "axios"
import {domain} from "../../../components/api/BaseApi"
export function Thongbao(props){
    function handleLogout() {
        // Clear all cookies by iterating through them
        const cookies = cookieCutter.getAll();
        cookies.forEach(cookie => cookieCutter.set(cookie.name, '', { expires: new Date(0) }));
      
        // You might also want to perform any other logout-related actions here
      }

    
  
    return(
            
        <div className={styles.frame_ifr_nfct}>
            <div className={styles.nfct_one }>
                <div className={styles.nfct_avt}>
                    <img src="/tinhluong/add.png"></img>
                </div>
                <a>
                    <div className={styles.nfct_dtct}>
                        <p className={styles.tb_gui}>
                            <span>CÔNG TY CỔ PHẦN THANH TOÁN HƯNG HÀ </span>
                        </p>
                        <p className={styles.tb_nd}>
                            <span>{props.content_title}</span>
                        </p>
                        <p className={styles.tb_time}>{props.notification_time}</p>
                    </div>
                </a>
                <div className={styles.nfc_dele }>
                    <img src="/tinhluong/delete.png"></img>
                </div>

            </div>
            
        </div>
                
            
    )
}
export default function HeadNav({title,idQLC=null}){
    
  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role")
    
    
    const[isEdit,setIsEdit]=useState(false)
    const [isPopup,setIsPopup]=useState(false)
    const [userInfo, setUserInfo] = useState({});
  useEffect(()=>{
    axios.post(`${domain}/api/tinhluong/nhanvien/qly_ho_so_ca_nhan`,{
      ep_id: ep_id,
      cp: cp,
      token: token
  }).then((response)=>{
    console.log("UserInfo ở header",response.data.data?.info_dep_com?.user)
    setUserInfo(response.data.data);
  }).catch((err)=>{console.log("error ở header",err)})
  },[])
    function handleLogout() {
        // Clear all cookies by iterating through them
        const cookies = Object.keys(Cookies.get());

  cookies.forEach(cookieName => {
    Cookies.remove(cookieName);
  });
  console.log("Đã chạy vào hàm handleLogout")
  router.push('/dang-nhap-nhan-vien.html');
        // You might also want to perform any other logout-related actions here
      }
    return(
        <div className={styles.header_hps}>
            <div className={styles.hps_hdl}>
                <p>
                    <a>Home</a>
                    <a>/ {title}</a>
                </p>
            </div>
            <div className={styles.hps_hdr}>
                <div className={styles.hsp_hdr_nav}>
                    <ul>
                        <li>
                            <a>Trang chủ</a>
                        </li>
                        <li>
                            <a>Hướng dẫn</a>
                        </li>
                        <li>
                            <a>Tin tức</a>
                        </li>
                        
                    </ul>
                    <div className={styles.hdr_ifm_ntf}>
                        <img src="/tinhluong/bell.png" onClick={() => setIsEdit(!isEdit)}/>
                        <span className={styles.count_tb}>0</span>
                    </div>
                    <div className={styles.ifr_nfct} style={{display:`${isEdit? "block" : "none"}`}}>
                        <Thongbao content_title="Mức lương của bạn đã được thay đổi" notification_time="18:44 06/07/2023"></Thongbao>
                        
                        
                        <p className={styles.nfct_rea}>
                            <span className={styles.del_all_tb}>Xóa tất cả thông báo</span>
                        </p>
                    </div>
                    
                    <div className={styles.hdr_ifm_avt}>
                        <img src={userInfo?.info_dep_com?.user && userInfo?.info_dep_com?.user?.avatarUser ? userInfo?.info_dep_com?.user?.avatarUser : "/avatar.jpg"}/>
                    </div>
                    <div className={styles.hdr_ifm_fm} onClick={()=>setIsPopup(!isPopup)}>
                        <p>{role==1 ? userInfo.info_dep_com?.company.userName : userInfo.info_dep_com?.user.userName}</p>
                    </div>
                    <div className={styles.more_uh} style={{display:isPopup?"block":"none"}}>
                        <p className={styles.more_uh_p}> 
                            <img src="/tinhluong/tttk.png "/>
                            <a>Thông tin tài khoản</a>
                        </p>
                        <p className={styles.more_uh_p}> 
                            <img src="/tinhluong/ct_4.png "/>
                            <a>Báo lỗi</a>
                        </p>
                        <p className={styles.more_uh_p}> 
                            <img src="/tinhluong/ct_6.png "/>
                            <a>Đánh giá</a>
                        </p>
                        <p className={styles.more_uh_p} onClick={handleLogout}> 
                            <img src="/tinhluong/logout.png "/>
                            <a>Đăng xuất</a>
                        </p>
                    </div>
                </div>
            </div>
    </div>
    )
}