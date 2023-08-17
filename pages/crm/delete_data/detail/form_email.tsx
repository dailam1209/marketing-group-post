import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css"
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { ColumFormEmail } from "@/components/crm/delete_data/colums_field/form_email";
import { dataPotential } from "@/components/crm/delete_data/colums_field/data"
import Table_Form_Email from "@/components/crm/table_delete/table-form_email-delete";
export default function Form_Email_List_Delete() {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
        useHeader();

    useEffect(() => {
        setHeaderTitle("Dữ liệu đã xoá / Mẫu email");
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

            <Table_Form_Email
                ColumFormEmail={ColumFormEmail}
                dataPotential={dataPotential}
                name="Mẫu email"
            />
        </div>
    );
}
