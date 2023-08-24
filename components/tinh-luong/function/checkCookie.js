import cookieCutter from 'cookie-cutter'
import { useRouter } from "next/router";
const listPageDangNhap = ["/dang-nhap-nhan-vien","dang-nhap-cong-ty"]
const checkCookie = ()=>{
    let data = JSON.parse(localStorage.getItem('inforuserlogin'));
    let idQLC = Number(cookieCutter.get('userID'))
    let exp = Number(cookieCutter.get('exp'));
    let now = new Date().getTime()/1000;
    const router = useRouter();
    const page = router.pathname;
    const checkPage = listPageDangNhap.find((e)=> e == page);
    if(!checkPage){

        if(idQLC){
            console.log("Đang ở trong đăng nhập")
            if(exp < now){
                if(data.data.type == 1){
                    router.push("/dang-nhap-cong-ty.html");
                }
                else{
                    router.push("/dang-nhap-nhan-vien.html")
                }
            }
        }
        else{
            console.log("Đang không ở trong đăng nhập")
            router.push('/dang-nhap-nhan-vien');
        }

    }
}

export default checkCookie