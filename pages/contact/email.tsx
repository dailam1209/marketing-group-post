import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { getToken } from "../api/api-hr/token";
import jwt_decode from "jwt-decode";
import EmailEmployee from "@/components/contact/email/EmailEmployee";
import EmailCompany from "@/components/contact/email/EmailCompany";
function ListEmail() {
  const mainRef = useRef(null);
  const [userType, setUserType] = useState(3);
  const [idQLC, setIdQLC] = useState(3);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle("Danh sách số điện thoại");
    setShowBackButton(false);
    setCurrentPath("");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    const fetchDataType = async () => {
      const currentCookie = getToken("token_base365");
      if (currentCookie) {
        const decodedToken: any = jwt_decode(currentCookie);
        setUserType(decodedToken?.data?.type);
        setIdQLC(decodedToken?.data?.idQLC);
      } else {
        const interval = setInterval(async () => {
          clearInterval(interval);
          fetchDataType();
        }, 500);
      }
    };
    fetchDataType();
  }, []);
  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        {idQLC === 10013446 && userType === 1 ? (
          <EmailCompany />
        ) : (
          <EmailEmployee />
        )}
      </div>
    </div>
  );
}

export default ListEmail;
