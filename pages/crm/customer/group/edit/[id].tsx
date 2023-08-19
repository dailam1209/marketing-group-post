import React, { useContext, useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import { Checkbox, Select } from "antd";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import TableStaffCustomerGroupAdd from "@/components/crm/table/table-staff-group-add-customer";
import { useApi } from "@/components/crm/hooks/useApi";
import CustomerGroupSelect from "@/components/crm/select/select_data_group_customer";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { log } from "console";
import { filter } from "lodash";
import Image from "next/image";
import ModalDelEmpGroup from "@/components/crm/modals/modal_del_group";

interface CustomJwtPayload extends jwt.JwtPayload {
  idQLC: string; // hoặc kiểu dữ liệu thích hợp
}

const GroupCustomerAdd: React.FC = () => {
  const [valAllDepartment, setValAllDepartment] = useState(false);
  const [valAllEmp, setValAllEmp] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const valueOptionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const { isOpen } = useContext<any>(SidebarContext);
  const [erroeMdal, setErrModal] = useState(false);
  const [selectedValueDepartments, setSelectedValueDepartments] = useState<any>(
    []
  );
  const [dataRowSelect, setDataRowSelect] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [valEmp, setValEmp] = useState<any>([]);
  const [dataTableEmp, setDataTableEmp] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [clickOptionEmp, setClickOptionEmp] = useState(false);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [valueGroupCustomer, setValueGroupCustomer] = useState({
    gr_id: id,
    gr_name: "999",
    gr_description: "777",
    group_parent: "",
    dep_id: null,
    emp_id: null,
  });

  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/group/list_group_khach_hang",
    process.env.ACCESS_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
    "POST"
  );

  const {
    data: dataDepartment,
    fetchData: fetchDataDepartment,
    updateData: updateDataDepartment,
  } = useApi(
    "http://210.245.108.202:3000/api/qlc/department/list",
    process.env.ACCESS_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
    "POST",
    { com_id: 1664 }
  );

  const { updateData: updateDataEdit } = useApi(
    "http://210.245.108.202:3007/api/crm/group/update_GroupKH",
    process.env.ACCESS_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
    "POST",
    valueGroupCustomer
  );

  const {
    data: dataEmp,
    fetchData: fetchDataEmp,
    updateData: updateDataEmp,
  } = useApi(
    "http://210.245.108.202:3000/api/qlc/managerUser/list",
    process.env.ACCESS_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
    "POST",
    { dep_id: selectedValueDepartments?.join(",") || "", com_id: 1664 }
  );

  const dataPassFromId = data?.data?.showGr?.filter(
    (item: any) => item?.gr_id === Number(id)
  )?.[0];

  useEffect(() => {
    fetchData();
    fetchDataDepartment();
  }, []);

  useEffect(() => {
    setValueGroupCustomer(dataPassFromId);
  }, []);

  useEffect(() => {
    setHeaderTitle("Nhóm khách hàng / Chỉnh sửa");
    setShowBackButton(false);
    setCurrentPath("/crm/customer/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  function handleChange(val: any): void {
    console.log(val);
    setSelectedValueDepartments(val);
  }

  function handleChangeEmps(val: any): void {
    const valueExists = dataTableEmp?.some((item) => item === val);

    if (!valueExists) {
      if (dataTableEmp) {
        setDataTableEmp((prevData) => [...prevData, val]);
      } else {
        setDataTableEmp(val);
      }
    } else {
      console.log("Giá trị đã tồn tại trong mảng dataTableEmp");
      setErrModal(true);
    }

    setValEmp(val);
  }
  //
  useEffect(() => {
    if (selectedValueDepartments?.length > 0) {
      // selectedValueDepartments?.forEach((depId: any) => {
      fetchDataEmp(
        "http://210.245.108.202:3000/api/qlc/managerUser/list",
        process.env.ACCESS_TOKEN ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
        "POST",
        { com_id: 1664 }
      );
      setValueGroupCustomer((prev) => {
        return {
          ...prev,
          dep_id: selectedValueDepartments?.join(","),
        };
      });
      // });
    }
    // ?.filter((emp) => selectedValueDepartments?.includes(emp.dep_id))
    const employeeOption = dataEmp?.data?.data
      ?.filter((emp) => selectedValueDepartments?.includes(emp.dep_id))
      ?.map((employee) => {
        return {
          label: employee.userName,
          value: employee._id,
        };
      });
    setEmployeeOptions(employeeOption);
  }, [selectedValueDepartments]);

  const dataSelectGroupParent = data?.data?.showGr;
  const dataDepartments = dataDepartment?.data?.data;
  const options = dataDepartments?.map((item) => {
    return {
      label: item?.dep_name,
      value: item?.dep_id,
    };
  });

  useEffect(() => {
    setValueGroupCustomer((prev) => {
      return {
        ...prev,
        emp_id: selectedValueDepartments?.join(","),
      };
    });
  }, [dataTableEmp]);

  const handleDelMultiRow = () => {
    const newData = dataTableEmp?.filter((el) => !dataRowSelect?.includes(el));
    setDataTableEmp(newData);
  };

  useEffect(() => {
    setSelectedValueDepartments(
      dataPassFromId?.dep_id
        ?.split(",")
        .map((item) => parseInt(item.trim(), 10))
    );

    setDataTableEmp(
      dataPassFromId?.emp_id
        ?.split(",")
        .map((item) => parseInt(item.trim(), 10))
    );

    // setValAllDepartment(dataPassFromId?.dep_id ? false: true)
    // setValAllEmp(dataPassFromId?.emp_id ? false :true)
  }, []);

  useEffect(() => {
    fetchDataEmp(
      "http://210.245.108.202:3000/api/qlc/managerUser/list",
      process.env.ACCESS_TOKEN ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
      "POST",
      { com_id: 1664 }
    );

    setTimeout(() => {
      const employeeOption = dataEmp?.data?.data
        ?.filter((emp) =>
          dataPassFromId?.dep_id
            ?.split(",")
            .map((item) => parseInt(item.trim(), 10))
            ?.includes(emp.dep_id)
        )
        ?.map((employee) => {
          return {
            label: employee.userName,
            value: employee._id,
          };
        });
      console.log("dataaaaa: ", dataEmp);
      setEmployeeOptions(employeeOption);
    }, 0);
  }, [clickOptionEmp]);
  // console.log(dataTableEmp);
  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Chỉnh sửa nhóm khách hàng</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <div className={styles["main__body_item"]}></div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <InputText
                    required
                    value={
                      valueGroupCustomer?.gr_name || dataPassFromId?.gr_name
                    }
                    setFormData={setValueGroupCustomer}
                    label={"Tên nhóm khách hàng"}
                    placeholder=" Nhập tên nhóm khách hàng"
                    keyValue="gr_name"
                  />
                  <div style={{ width: "50%" }}>
                    <label>Nhóm khách hàng cha </label>
                    <div ref={valueOptionRef}>
                      <CustomerGroupSelect
                        value="Chọn nhóm khách hàng cha"
                        placeholder="Chọn"
                        data={dataSelectGroupParent}
                        setValueGroupCustomer={setValueGroupCustomer}
                      />
                    </div>
                  </div>
                </div>

                {/* Text Editor */}
                <div style={{ marginBottom: -20 }}>Mô tả</div>
                <TextEditor
                  editorContent={
                    valueGroupCustomer?.gr_description ||
                    dataPassFromId?.gr_description
                  }
                  setEditorValue={(val: any) => {
                    setValueGroupCustomer((pre: any) => {
                      return {
                        ...pre,
                        groupDescription: val,
                      };
                    });
                  }}
                />
                <div>Danh sách chia sẻ</div>
                <div
                  className="flex_between"
                  style={{
                    gap: "30px",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                  }}
                >
                  <div style={{ width: "47%" }}>
                    <div
                      className="flex_between"
                      // style={{ marginBottom: "3.5px" }}
                    >
                      <label>Phòng ban</label>
                      <Checkbox
                        defaultChecked={dataPassFromId?.dep_id === null}
                        checked={valAllDepartment}
                        onChange={() => {
                          setValAllDepartment(!valAllDepartment);
                          if (valAllDepartment) {
                            setValueGroupCustomer((prev) => {
                              return {
                                ...prev,
                                dep_id: null,
                              };
                            });
                          }
                        }}
                      >
                        Tất cả
                      </Checkbox>
                    </div>
                    {!valAllDepartment && (
                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                          height: "40px !important",
                        }}
                        placeholder="Chọn phòng ban"
                        defaultValue={dataPassFromId?.dep_id
                          ?.split(",")
                          .map((item) => parseInt(item.trim(), 10))}
                        value={
                          selectedValueDepartments ||
                          dataPassFromId?.dep_id
                            ?.split(",")
                            .map((item) => parseInt(item.trim(), 10))
                        }
                        onChange={handleChange}
                        options={options}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      width: "30%",
                      overflowX: "hidden",
                      overflowY: "visible",
                    }}
                  >
                    <div style={{ height: "27px" }} className="flex_between">
                      <label>Nhân viên</label>
                      <Checkbox
                        defaultChecked={dataPassFromId?.emp_id === null}
                        onChange={() => {
                          setValAllEmp(!valAllEmp);
                        }}
                      >
                        Tất cả
                      </Checkbox>
                    </div>
                    {!valAllDepartment && (
                      <Select
                        style={{
                          width: "100%",
                          height: "40px !important",
                        }}
                        disabled={valAllEmp}
                        // disabled={selectedValueDepartments?.length === 0}
                        placeholder="Chọn nhân viên"
                        // defaultValue={dataDepartments?.dep_id}
                        value={valEmp}
                        onChange={handleChangeEmps}
                        options={employeeOptions}
                        onClick={() => setClickOptionEmp(true)}
                      />
                    )}
                  </div>

                  {selectedRow >= 2 && (
                    <div>
                      <button
                        style={{
                          color: "#FF3333",
                          display: "flex",
                          alignItems: "center",
                          margin: "auto",
                          width: "138px",
                          background: "#FFFF",
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                          borderRadius: "3px",
                          height: "32px",
                          justifyContent: "center",
                          gap: "3px",
                        }}
                        onClick={() => {
                          setIsOpenModalDel(true);
                          // handleDelRow(item);
                        }}
                      >
                        <Image
                          alt="img"
                          width={26}
                          height={26}
                          src={
                            "https://crm.timviec365.vn/assets/img/customer/del_red.svg"
                          }
                        />
                        Gỡ bỏ
                      </button>
                    </div>
                  )}
                </div>

                {(!valAllDepartment && !valAllEmp) &&
                (dataPassFromId?.dep_id !== null &&
                  dataPassFromId?.emp_id !== null) ? (
                  <TableStaffCustomerGroupAdd
                    dataEmp={dataEmp?.data?.data}
                    valueSelected={
                      dataTableEmp ||
                      dataPassFromId?.emp_id
                        ?.split(",")
                        .map((item) => parseInt(item.trim(), 10))
                    }
                    setData={setDataTableEmp}
                    setSelectedRow={setSelectedRow}
                    setDataRowSelect={setDataRowSelect}
                  />
                ) : null}
              </div>
              <PotentialFooterAddFiles
                link="/crm/customer/group/list"
                titleCancel="Xác nhận hủy cập nhật nhóm khách hàng "
                title="Cập nhật nhóm khách hàng thành công!"
                contentCancel={
                  "Bạn có đồng ý hủy? \n Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
                }
                handleSave={async () => {
                  console.log("qtwyugihjjj", {
                    ...valueGroupCustomer,
                    name: valueGroupCustomer.gr_name,
                    description: valueGroupCustomer.gr_description,
                    gr_id: id,
                  });
                  await updateDataEdit(
                    "http://210.245.108.202:3007/api/crm/group/update_GroupKH",
                    process.env.ACCESS_TOKEN ||
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
                    "POST",
                    {
                      ...valueGroupCustomer,
                      name: valueGroupCustomer.gr_name,
                      description: valueGroupCustomer.gr_description,
                      gr_id: id,
                      emp_id: valAllEmp ? null : dataTableEmp?.join(","),
                      dep_id: valAllDepartment
                        ? null
                        : selectedValueDepartments?.join(","),
                    }
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalDelEmpGroup
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?"}
        title={"Xác nhận gỡ bỏ chia sẻ"}
        link={"#"}
        handleOk={() => {
          handleDelMultiRow();
        }}
      />
    </div>
  );
};

export default GroupCustomerAdd;
