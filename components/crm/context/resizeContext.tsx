"use client";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doRefresh } from "../redux/user/userSlice";

export const SidebarContext = createContext(false);

export const SidebarResize: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const token_connect = useSelector((state: any) => state.auth.account);
  const dispatch = useDispatch();

  const handlegetTokenConnect = () => {
    dispatch(doRefresh(token_connect));
  };
  useEffect(() => {
    handlegetTokenConnect();
  }, []);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen } as any}>
      {children}
    </SidebarContext.Provider>
  );
};
