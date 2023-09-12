import Cookies from "js-cookie";
import router from "next/router";

export const checkAndRedirectToHomeIfNotLoggedIn = () => {
    const acc_token = Cookies.get("token_base365");
    const rf_token = Cookies.get("rf_token");
    const role = Cookies.get("role");
  
    if (!acc_token || !rf_token || !role) {
     if(router.pathname !== "/" && !router.pathname.includes("dang-nhap-cong-ty")&&
     !router.pathname.includes("dang-nhap-ca-nhan")&&
     !router.pathname.includes("dang-nhap-nhan-vien")&&
     !router.pathname.includes("dang-ky-cong-ty")&&
     !router.pathname.includes("dang-ky-ca-nhan")&&
     !router.pathname.includes("dang-ky-nhan-vien")){
      router.push("/");
     }
      return false; 
    }
    
    return true; 

  };

  
  export const checkHomeIfLoggedIn = () => {
    const acc_token = Cookies.get("token_base365");
    const rf_token = Cookies.get("rf_token");
    const role = Cookies.get("role");
  
    if (acc_token || rf_token || role) {
      router.push("/crm/home");
      return true; 
    }
    
    return false; 

  };


  