import React, { useEffect, useState } from "react";
import styles from "./bodyFrame.module.css";
import BodyFrameHeader from "./bodyFrame_header/bodyFrame_header";
import { EmployeeInfo, getDataCompany } from "@/pages/hr/api/cai-dat/generalSettings";
import jwt_decode from "jwt-decode";
import { getToken } from "@/pages/hr/api/token";
export interface BodyFrame { }

export default function Bodyframe({ children }: any) {
  const [dataHeader, setDataHeader] = useState<any>();
  const [tokenType, setTokenType] = useState<any>(null);
  const COOKIE_KEY = "token_base365";

  useEffect(() => {
    const fetchDataType = async () => {
      const currentCookie = getToken(COOKIE_KEY);
      if (currentCookie) {
        const decodedToken: any = jwt_decode(currentCookie);
        setTokenType(decodedToken?.data?.type);
      }
      else {
        const interval = setInterval(async () => {
          clearInterval(interval)
          fetchDataType()
        }, 500)
      }
    }
    fetchDataType()
  }, [])

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (tokenType) {
          if (tokenType === 1 || tokenType === '1') {
            const response = await getDataCompany();
            setDataHeader(response?.data);
          } else {
            const response = await EmployeeInfo();
            setDataHeader(response?.data);
          }
        } else {
          const interval = setInterval(async () => {
            const updatedToken = tokenType;
            if (updatedToken === 1 || updatedToken === "1") {
              clearInterval(interval);
              fetchInfo()
            }
          }, 1000);
        }
      } catch (error) {
        // Xử lý lỗi ở đây
      }
    };
    fetchInfo();
  }, [tokenType]);

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <BodyFrameHeader dataHeader={dataHeader}></BodyFrameHeader>
        {children}
      </div>
    </>
  );
}
