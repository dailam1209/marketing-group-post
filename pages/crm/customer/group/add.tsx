import React, { useContext, useEffect, useRef, useState } from "react";
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
import CustomerGroupSelect from "@/components/crm/select/select_data_group_customer";
import { useApi } from "@/components/crm/hooks/useApi";
import ModalDelEmpGroup from "@/components/crm/modals/modal_del_group";
import Image from "next/image";

const GroupCustomerAdd: React.FC = () => {
  const [valAllDepartment, setValAllDepartment] = useState(false);
  const [valAllEmp, setValAllEmp] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const valueOptionRef = useRef<HTMLDivElement>(null);
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
  const [valueGroupCustomer, setValueGroupCustomer] = useState({
    groupName: "",
    groupDescription: "",
    groupParents: "",
    dep_id: null,
    emp_id: null,
  });
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  console.log(valueGroupCustomer);

  const urlCreate = "http://210.245.108.202:3007/api/crm/group/create_GroupKH";
  const {
    data: dataAddGroup,
    fetchData: fetchDataAddGroup,
    updateData: updateDataAddGroup,
  } = useApi(
    urlCreate,
    process.env.ACCESS_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyIsImFsaWFzIjoiY29uZy10eS10ZXN0LTEiLCJwaG9uZSI6IjA5NjUyMzQ2NjUiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOm51bGwsInR5cGUiOjEsInBhc3N3b3JkIjoiMDk4NTI1MWYzZDEzMDc2YmVlYzY5YWNhNzc4ZWEzMWYiLCJjaXR5IjoyLCJkaXN0cmljdCI6MjgyLCJhZGRyZXNzIjoia20gMTAgLSBUcuG6p24gUGjDuiAtIEjDoCDEkMO0bmcsIEhOIiwib3RwIjoiODA1MjM5IiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjoxLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInVwZGF0ZWRBdCI6MSwibGFzdEFjdGl2ZWRBdCI6bnVsbCwidGltZV9sb2dpbiI6MTY5MTQ2NDAxOSwicm9sZSI6MCwibGF0aXR1ZGUiOiIyMC45ODkwMzEzIiwibG9uZ3RpdHVkZSI6IjEwNS44MzEyNTg4IiwiaWRRTEMiOjE3NjMsImlkVGltVmllYzM2NSI6MjAyNTg1LCJpZFJhb05oYW5oMzY1IjowLCJjaGF0MzY1X3NlY3JldCI6IjJaMW5zNmtjVDUiLCJjaGF0MzY1X2lkIjowLCJzY2FuX2Jhc2UzNjUiOjAsImNoZWNrX2NoYXQiOjAsInNoYXJlUGVybWlzc2lvbklkIjpbXSwiaW5Gb3JQZXJzb24iOm51bGwsImluRm9yQ29tcGFueSI6eyJzY2FuIjowLCJ1c2Nfa2QiOjQxLCJ1c2Nfa2RfZmlyc3QiOjAsImRlc2NyaXB0aW9uIjoiZOG7i2NoIHbhu6UiLCJjb21fc2l6ZSI6MiwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik5ndXllbiBWYW4gQ3VvbmciLCJ1c2NfbmFtZV9hZGQiOiIxIFRy4bqnbiBOZ3V5w6puIMSQw6FuLCBLaHUgxJHDtCB0aOG7iyDEkOG7i25oIEPDtG5nLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWkiLCJ1c2NfbmFtZV9waG9uZSI6IjA5NjUzMjQ2NzQiLCJ1c2NfbmFtZV9lbWFpbCI6InRoaWVucXVhbkBnbWFpbC5jb20iLCJ1c2NfdXBkYXRlX25ldyI6MTY5MDg4MTg4MCwidXNjX2Nhbm9uaWNhbCI6IiIsInVzY19tZDUiOiIiLCJ1c2NfcmVkaXJlY3QiOiIiLCJ1c2NfdHlwZSI6MCwidXNjX3NpemUiOjIsInVzY193ZWJzaXRlIjoidGltdmllYzM2NS52biIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjEsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4yMzEiLCJ1c2NfbG9jIjoxLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6InZpZGVvX2Nwbjg0NDE4NjE2NzM0MzMyNTkubXA0LHZpZGVvX2Nwbjg0NDE4NjE2NzM1Mjc0MDMubXA0LHZpZGVvX2Nwbl8wXzE2OTAzNjQyNDgubXA0IiwidXNjX3ZpZGVvX3R5cGUiOjIsInVzY192aWRlb19hY3RpdmUiOjAsInVzY19ibG9ja19hY2NvdW50IjowLCJ1c2Nfc3RvcF9ub3RpIjowLCJvdHBfdGltZV9leGlzdCI6MTY5MDk2NzMzMywidXNlX3Rlc3QiOjAsInVzY19iYWRnZSI6MSwidXNjX3N0YXIiOjEsInVzY192aXAiOjMsInVzY19tYW5hZ2VyIjoiIiwidXNjX2xpY2Vuc2UiOiIiLCJ1c2NfYWN0aXZlX2xpY2Vuc2UiOjAsInVzY19tYXAiOiI8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9lbWJlZD9wYj0hMW0xOCExbTEyITFtMyExZDU5NTg3Ljk0NTgzMTExOTgxITJkMTA1LjgwMTk0Mzk1NjIxMzgyITNkMjEuMDIyODE2MTM1NzMzMTM3ITJtMyExZjAhMmYwITNmMCEzbTIhMWkxMDI0ITJpNzY4ITRmMTMuMSEzbTMhMW0yITFzMHgzMTM1YWI5YmQ5ODYxY2ExJTNBMHhlNzg4N2Y3YjcyY2ExN2E5ITJ6U01PZ0lFN2h1NWxwTENCSWI4T2diaUJMYWVHNnYyMHNJRWpEb0NCTzRidVphU3dnVm1uaHU0ZDBJRTVoYlEhNWUwITNtMiExc3ZpITJzITR2MTYwMTM0NTI1NDk1MyE1bTIhMXN2aSEyc1wiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiMzAwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MDtcIiBhbGxvd2Z1bGxzY3JlZW49XCJcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgdGFiaW5kZXg9XCIwXCI-PC9pZnJhbWU-IiwidXNjX2RnYyI6IlszLDAsMSwxLFwibGlrdWp5dHJcIl0iLCJ1c2NfZGd0diI6Ils1LDEsXCJ0ZXN0XCIsXCJ0ZXN0XCJdIiwidXNjX2RnX3RpbWUiOjE2OTA1MTQzNjMsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJk4buLY2ggduG7pSIsInVzY196YWxvIjpudWxsLCJ1c2NfY2MzNjUiOjAsInVzY19jcm0iOjAsInVzY19pbWFnZXMiOm51bGwsInVzY19hY3RpdmVfaW1nIjowLCJ1c2NfZm91bmRlZF90aW1lIjowLCJ1c2NfYnJhbmNoZXMiOltdfSwiY2RzIjp7ImNvbV9yb2xlX2lkIjowLCJjb21fcGFyZW50X2lkIjpudWxsLCJ0eXBlX3RpbWVrZWVwaW5nIjoiMSwyLDMsNCw1LDgsOSIsImlkX3dheV90aW1la2VlcGluZyI6IjEiLCJjb21fcXJfbG9nbyI6bnVsbCwiZW5hYmxlX3NjYW5fcXIiOjAsImNvbV92aXAiOjAsImNvbV9lcF92aXAiOjUsImNvbV92aXBfdGltZSI6MCwiZXBfY3JtIjowLCJlcF9zdHQiOjF9LCJfaWQiOiI2NGQxYjY1M2NlZDljMjdmNWI5NWI2YzQifSwiaW5mb3JSTjM2NSI6bnVsbCwiY29uZmlnQ2hhdCI6eyJub3RpZmljYXRpb25BY2NlcHRPZmZlciI6MSwibm90aWZpY2F0aW9uQWxsb2NhdGlvblJlY2FsbCI6MSwibm90aWZpY2F0aW9uQ2hhbmdlU2FsYXJ5IjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVJhb05oYW5oIjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVRpbVZpZWMiOjEsIm5vdGlmaWNhdGlvbkRlY2lsaW5lT2ZmZXIiOjEsIm5vdGlmaWNhdGlvbk1pc3NNZXNzYWdlIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUGluIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUmVjcnVpdCI6MSwibm90aWZpY2F0aW9uTlREUG9pbnQiOjEsIm5vdGlmaWNhdGlvblNlbmRDYW5kaWRhdGUiOjEsIm5vdGlmaWNhdGlvblRhZyI6MSwicmVtb3ZlU3VnZ2VzIjpbXSwidXNlck5hbWVOb1ZuIjoiIiwiZG91YmxlVmVyaWZ5IjowLCJhY3RpdmUiOjAsInN0YXR1cyI6IiIsImFjY2VwdE1lc3NTdHJhbmdlciI6MCwiSGlzdG9yeUFjY2VzcyI6W119LCJzY2FuIjowfSwiaWF0IjoxNjkyMjM3ODM4LCJleHAiOjE2OTIzMjQyMzh9.HmRA3hKTkVA0zLSLd8efiL0RPywO1pbnA1dInd-S0VY",
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

  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/group/list_group_khach_hang",
    process.env.ACCESS_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyIsImFsaWFzIjoiY29uZy10eS10ZXN0LTEiLCJwaG9uZSI6IjA5NjUyMzQ2NjUiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOm51bGwsInR5cGUiOjEsInBhc3N3b3JkIjoiMDk4NTI1MWYzZDEzMDc2YmVlYzY5YWNhNzc4ZWEzMWYiLCJjaXR5IjoyLCJkaXN0cmljdCI6MjgyLCJhZGRyZXNzIjoia20gMTAgLSBUcuG6p24gUGjDuiAtIEjDoCDEkMO0bmcsIEhOIiwib3RwIjoiODA1MjM5IiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjoxLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInVwZGF0ZWRBdCI6MSwibGFzdEFjdGl2ZWRBdCI6bnVsbCwidGltZV9sb2dpbiI6MTY5MTQ2NDAxOSwicm9sZSI6MCwibGF0aXR1ZGUiOiIyMC45ODkwMzEzIiwibG9uZ3RpdHVkZSI6IjEwNS44MzEyNTg4IiwiaWRRTEMiOjE3NjMsImlkVGltVmllYzM2NSI6MjAyNTg1LCJpZFJhb05oYW5oMzY1IjowLCJjaGF0MzY1X3NlY3JldCI6IjJaMW5zNmtjVDUiLCJjaGF0MzY1X2lkIjowLCJzY2FuX2Jhc2UzNjUiOjAsImNoZWNrX2NoYXQiOjAsInNoYXJlUGVybWlzc2lvbklkIjpbXSwiaW5Gb3JQZXJzb24iOm51bGwsImluRm9yQ29tcGFueSI6eyJzY2FuIjowLCJ1c2Nfa2QiOjQxLCJ1c2Nfa2RfZmlyc3QiOjAsImRlc2NyaXB0aW9uIjoiZOG7i2NoIHbhu6UiLCJjb21fc2l6ZSI6MiwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik5ndXllbiBWYW4gQ3VvbmciLCJ1c2NfbmFtZV9hZGQiOiIxIFRy4bqnbiBOZ3V5w6puIMSQw6FuLCBLaHUgxJHDtCB0aOG7iyDEkOG7i25oIEPDtG5nLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWkiLCJ1c2NfbmFtZV9waG9uZSI6IjA5NjUzMjQ2NzQiLCJ1c2NfbmFtZV9lbWFpbCI6InRoaWVucXVhbkBnbWFpbC5jb20iLCJ1c2NfdXBkYXRlX25ldyI6MTY5MDg4MTg4MCwidXNjX2Nhbm9uaWNhbCI6IiIsInVzY19tZDUiOiIiLCJ1c2NfcmVkaXJlY3QiOiIiLCJ1c2NfdHlwZSI6MCwidXNjX3NpemUiOjIsInVzY193ZWJzaXRlIjoidGltdmllYzM2NS52biIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjEsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4yMzEiLCJ1c2NfbG9jIjoxLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6InZpZGVvX2Nwbjg0NDE4NjE2NzM0MzMyNTkubXA0LHZpZGVvX2Nwbjg0NDE4NjE2NzM1Mjc0MDMubXA0LHZpZGVvX2Nwbl8wXzE2OTAzNjQyNDgubXA0IiwidXNjX3ZpZGVvX3R5cGUiOjIsInVzY192aWRlb19hY3RpdmUiOjAsInVzY19ibG9ja19hY2NvdW50IjowLCJ1c2Nfc3RvcF9ub3RpIjowLCJvdHBfdGltZV9leGlzdCI6MTY5MDk2NzMzMywidXNlX3Rlc3QiOjAsInVzY19iYWRnZSI6MSwidXNjX3N0YXIiOjEsInVzY192aXAiOjMsInVzY19tYW5hZ2VyIjoiIiwidXNjX2xpY2Vuc2UiOiIiLCJ1c2NfYWN0aXZlX2xpY2Vuc2UiOjAsInVzY19tYXAiOiI8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9lbWJlZD9wYj0hMW0xOCExbTEyITFtMyExZDU5NTg3Ljk0NTgzMTExOTgxITJkMTA1LjgwMTk0Mzk1NjIxMzgyITNkMjEuMDIyODE2MTM1NzMzMTM3ITJtMyExZjAhMmYwITNmMCEzbTIhMWkxMDI0ITJpNzY4ITRmMTMuMSEzbTMhMW0yITFzMHgzMTM1YWI5YmQ5ODYxY2ExJTNBMHhlNzg4N2Y3YjcyY2ExN2E5ITJ6U01PZ0lFN2h1NWxwTENCSWI4T2diaUJMYWVHNnYyMHNJRWpEb0NCTzRidVphU3dnVm1uaHU0ZDBJRTVoYlEhNWUwITNtMiExc3ZpITJzITR2MTYwMTM0NTI1NDk1MyE1bTIhMXN2aSEyc1wiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiMzAwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MDtcIiBhbGxvd2Z1bGxzY3JlZW49XCJcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgdGFiaW5kZXg9XCIwXCI-PC9pZnJhbWU-IiwidXNjX2RnYyI6IlszLDAsMSwxLFwibGlrdWp5dHJcIl0iLCJ1c2NfZGd0diI6Ils1LDEsXCJ0ZXN0XCIsXCJ0ZXN0XCJdIiwidXNjX2RnX3RpbWUiOjE2OTA1MTQzNjMsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJk4buLY2ggduG7pSIsInVzY196YWxvIjpudWxsLCJ1c2NfY2MzNjUiOjAsInVzY19jcm0iOjAsInVzY19pbWFnZXMiOm51bGwsInVzY19hY3RpdmVfaW1nIjowLCJ1c2NfZm91bmRlZF90aW1lIjowLCJ1c2NfYnJhbmNoZXMiOltdfSwiY2RzIjp7ImNvbV9yb2xlX2lkIjowLCJjb21fcGFyZW50X2lkIjpudWxsLCJ0eXBlX3RpbWVrZWVwaW5nIjoiMSwyLDMsNCw1LDgsOSIsImlkX3dheV90aW1la2VlcGluZyI6IjEiLCJjb21fcXJfbG9nbyI6bnVsbCwiZW5hYmxlX3NjYW5fcXIiOjAsImNvbV92aXAiOjAsImNvbV9lcF92aXAiOjUsImNvbV92aXBfdGltZSI6MCwiZXBfY3JtIjowLCJlcF9zdHQiOjF9LCJfaWQiOiI2NGQxYjY1M2NlZDljMjdmNWI5NWI2YzQifSwiaW5mb3JSTjM2NSI6bnVsbCwiY29uZmlnQ2hhdCI6eyJub3RpZmljYXRpb25BY2NlcHRPZmZlciI6MSwibm90aWZpY2F0aW9uQWxsb2NhdGlvblJlY2FsbCI6MSwibm90aWZpY2F0aW9uQ2hhbmdlU2FsYXJ5IjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVJhb05oYW5oIjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVRpbVZpZWMiOjEsIm5vdGlmaWNhdGlvbkRlY2lsaW5lT2ZmZXIiOjEsIm5vdGlmaWNhdGlvbk1pc3NNZXNzYWdlIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUGluIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUmVjcnVpdCI6MSwibm90aWZpY2F0aW9uTlREUG9pbnQiOjEsIm5vdGlmaWNhdGlvblNlbmRDYW5kaWRhdGUiOjEsIm5vdGlmaWNhdGlvblRhZyI6MSwicmVtb3ZlU3VnZ2VzIjpbXSwidXNlck5hbWVOb1ZuIjoiIiwiZG91YmxlVmVyaWZ5IjowLCJhY3RpdmUiOjAsInN0YXR1cyI6IiIsImFjY2VwdE1lc3NTdHJhbmdlciI6MCwiSGlzdG9yeUFjY2VzcyI6W119LCJzY2FuIjowfSwiaWF0IjoxNjkyMjM3ODM4LCJleHAiOjE2OTIzMjQyMzh9.HmRA3hKTkVA0zLSLd8efiL0RPywO1pbnA1dInd-S0VY",
    "POST"
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

  useEffect(() => {
    fetchData();
    fetchDataDepartment();
  }, []);

  useEffect(() => {
    setHeaderTitle("Nhóm khách hàng / Thêm mới");
    setShowBackButton(false);
    setCurrentPath("/customer/list");
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
      setDataTableEmp((prevData) => [...prevData, val]);
    } else {
      console.log("Giá trị đã tồn tại trong mảng dataTableEmp");
      setErrModal(true);
    }

    setValEmp(val);
  }

  const dataSelectGroupParent = data?.data?.showGr;
  console.log(valueGroupCustomer);

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
          dep_id: selectedValueDepartments.join(","),
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
        emp_id: selectedValueDepartments.join(","),
      };
    });
  }, [dataTableEmp]);

  const handleDelMultiRow = () => {
    const newData = dataTableEmp?.filter((el) => !dataRowSelect.includes(el));
    setDataTableEmp(newData);
  };

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Thêm mới nhóm khách hàng</div>
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
                    value={valueGroupCustomer.groupName}
                    setFormData={setValueGroupCustomer}
                    label={"Tên nhóm khách hàng"}
                    placeholder=" Nhập tên nhóm khách hàng"
                    keyValue="groupName"
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
                  editorContent={valueGroupCustomer.groupDescription}
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
                        checked={valAllDepartment}
                        onChange={() => {
                          setValAllDepartment(!valAllDepartment);
                          setValueGroupCustomer((prev) => {
                            return {
                              ...prev,
                              dep_id: null,
                            };
                          });
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
                        defaultValue={dataDepartments?.dep_id}
                        value={selectedValueDepartments}
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
                      <Checkbox onChange={() => {}}>Tất cả</Checkbox>
                    </div>
                    <Select
                      // mode="multiple"
                      // allowClear
                      style={{
                        width: "100%",
                        height: "40px !important",
                      }}
                      // disabled={selectedValueDepartments?.length === 0}
                      placeholder="Chọn nhân viên"
                      // defaultValue={dataDepartments?.dep_id}
                      value={valEmp}
                      onChange={handleChangeEmps}
                      options={
                        selectedValueDepartments?.length === 0
                          ? []
                          : employeeOptions
                      }
                    />
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

                {!valAllDepartment && !valAllEmp && (
                  <TableStaffCustomerGroupAdd
                    dataEmp={dataEmp?.data?.data}
                    valueSelected={dataTableEmp}
                    setData={setDataTableEmp}
                    setSelectedRow={setSelectedRow}
                    setDataRowSelect={setDataRowSelect}
                  />
                )}
              </div>
              <PotentialFooterAddFiles
                link="/crm/customer/group/list"
                titleCancel="Xác nhận hủy thêm mới nhóm khách hàng "
                title="Thêm nhóm khách hàng thành công!"
                contentCancel={
                  "Bạn có đồng ý hủy? \n Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
                }
                handleSave={async () => {
                  await updateDataAddGroup(
                    urlCreate,
                    process.env.ACCESS_TOKEN ||
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
                    "POST",
                    {
                      ...valueGroupCustomer,
                      emp_id: dataTableEmp?.join(","),
                      dep_id: selectedValueDepartments?.join(","),
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
