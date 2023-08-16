import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css"
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { TableRowSelection } from "antd/es/table/interface";
import { ColumSchedule } from "@/components/crm/delete_data/colums_field/schedule";
import { dataPotential } from "@/components/crm/delete_data/colums_field/data"
import Table_Schedule from "@/components/crm/table_delete/table-schedule-delete";
export default function Schedule_List_Delete() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
    
  useEffect(() => {
    setHeaderTitle("Dữ liệu đã xoá / Lịch hẹn");
    setShowBackButton(true);
    setCurrentPath("/crm/delete_data/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <div ref={mainRef} className={styleHome.main}>
  
    <Table_Schedule
        ColumSchedule={ColumSchedule}
        dataPotential={dataPotential}
        name="Lịch hẹn"
      /> 
    </div>
  );
}
