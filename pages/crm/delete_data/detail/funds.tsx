import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css"
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { ColumFunds } from "@/components/crm/delete_data/colums_field/funds";
import { dataPotential } from "@/components/crm/delete_data/colums_field/data"
import Table_Funds from "@/components/crm/table_delete/table-funds-delete";
export default function GCustomer_List_Delete() {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
        useHeader();

    useEffect(() => {
        setHeaderTitle("Dữ liệu đã xoá / Sổ quỹ");
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

            <Table_Funds
                ColumFunds={ColumFunds}
                dataPotential={dataPotential}
                name="Sổ quỹ"
            />
        </div>
    );
}
