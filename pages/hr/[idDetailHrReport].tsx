import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "../hr/bao-cao-nhan-su/detailHrReport.module.css"
import Select from 'react-select';
import { useRouter } from "next/router";
import { parseISO, format } from "date-fns";
import MyPagination from "@/components/hr/pagination/Pagination";
import Image from "next/image";
import { DetailReport } from "../api/api-hr/bao-cao-nhan-su/HrReportService";
import { DepartmentList } from "@/pages/api/api-hr/listPhongBan";
import { PostionCharData, EmpStatusDetail, OrganizationalStructureData } from '@/pages/api/api-hr/co_cau_to_chuc';
import GetComId from "@/components/hr/getComID";


type SelectOptionType = { label: string, value: any }

const Selects = ({ selectedOption, onChange, setState, option, placeholder }: any) => (
  <Select
    defaultValue={selectedOption}
    onChange={(option) => onChange(option, setState)}
    options={option}
    placeholder={placeholder}
    styles={{
      control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? "#4c5bd4" : "#4c5bd4",
        border: "none",
        backgroundColor: "#4c5bd4",
        height: "auto",
        fontSize: state.isFocused ? 14 : 14,
        width: "100%",
        fontWeight: state.isFocused ? 600 : 600,
        minHeight: 20
      }),
      valueContainer: (baseStyles) => ({
        ...baseStyles,
        height: 33.6,
      }),
      indicatorsContainer: (baseStyles) => ({
        ...baseStyles,
        height: 33.6,
        color: "white",
      }),
      placeholder: (baseStyles) => ({
        ...baseStyles,
        color: "while"
      }),
      indicatorSeparator: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#4c5bd4"
      }),
      menu: (baseStyles) => ({
        ...baseStyles,
        color: "black",
        zIndex: 10000
      })
    }}
  />
)

export default function DetailHrReport({ children }: any) {

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
  const [isReportList, setReportList] = useState<any>(null)
  const [isOrganisationalList, setOrganisationalList] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [isGender, setGender] = useState<any>("");
  const [isType, setType] = useState<any>("");
  const [departmentList, setDepartmentList] = useState<any>(null)
  const [PostionCharDatas, setPosttionCharData] = useState<any>(null)
  const [OrganisationalDatas, setOrganisationalData] = useState<any>(null)
  const [isDep_id, setDep_id] = useState<any>("")
  const [isPosition_id, setPosition_id] = useState<any>("")
  const [isGroup_id, setGroup_id] = useState<any>("")
  const [isTeam_id, setTeam_id] = useState<any>("")
  const [isMaried, setMaried] = useState<any>("")
  const [isBirthday, setBirthday] = useState<any>("")
  const [isTitle, setTitle] = useState<any>("")

  const router = useRouter();
  const link: any = router.asPath.split('/').pop();
  const index: number = link.indexOf('?');
  const link_cut: any = index !== -1 ? link.slice(0, index) + '.html' : link + '.html';
  const comid: any = GetComId()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrganizationalStructureData()
        setOrganisationalData(response?.data)
      } catch (error) {

      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (link.includes('bieu-do-danh-sach-nhan-vien')) {
      setTitle("Biểu đồ danh sách nhân viên")
    }
    if (link.includes('bieu-do-danh-sach-nhan-vien-bo-nhiem')) {
      setTitle("Danh sách nhân viên bổ nhiệm quy hoạch")
    }
    if (link.includes('bieu-do-danh-sach-nhan-vien-chuyen-cong-tac')) {
      setTitle("Danh sách nhân viên luân chuyển công tác")
    }
    if (link.includes('bieu-do-danh-sach-nhan-vien-nghi-viec')) {
      setTitle("Danh sách nhân viên nghỉ việc / giảm biên chế")
    }
    if (link.includes('bieu-do-danh-sach-nhan-vien-tang-giam-luong')) {
      setTitle("Danh sách nhân viên tăng giảm lương")
    }
    if (link.includes('bieu-do-danh-sach-nhan-vien-theo-do-tuoi')) {
      setTitle("Danh sách nhân viên theo thâm niên công tác")
    }
    if (link.includes('bieu-do-danh-sach-nhan-vien-theo-do-tuoi')) {
      setTitle("Danh sách nhân viên theo độ tuổi")
    }
    if (link.includes('bieu-do-danh-sach-nhan-vien-theo-chuc-vu.html')) {
      setTitle("Danh sách nhân viên theo chức vụ")
    }
    if (link.includes('gender=')) {
      const isGenders = link.split("=").pop();
      setGender(isGenders)
      if (link.includes('bieu-do-danh-sach-nhan-vien?gender=1')) {
        setTitle("Biểu đồ danh sách nhân viên Nam")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien?gender=2')) {
        setTitle("Biểu đồ danh sách nhân viên Nữ")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-bo-nhiem?gender=1')) {
        setTitle("Danh sách nhân viên nam bổ nhiệm quy hoạch")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-bo-nhiem?gender=2')) {
        setTitle("Danh sách nhân viên nữ bổ nhiệm quy hoạch")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-chuyen-cong-tac?gender=1')) {
        setTitle("Danh sách nhân viên nam chuyển công tác")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-chuyen-cong-tac?gender=1')) {
        setTitle("Danh sách nhân viên nữ chuyển công tác")
      }
    } else if (link.includes('type')) {
      const isTypes = link.split("=").pop();
      setType(isTypes)
      if (link.includes('bieu-do-danh-sach-nhan-vien-nghi-viec?type=1')) {
        setTitle("Danh sách nhân viên nghỉ việc")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-nghi-viec?type=2')) {
        setTitle("Danh sách nhân viên giảm biên chế")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-tang-giam-luong?type=1') || link.includes('bieu-do-danh-sach-nhan-vien-tang-giam-luong?type=2')) {
        setTitle("Danh sách nhân viên tăng / giảm lương")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-trang-hon-nhan?type=1')) {
        setTitle("Danh sách nhân viên đã lập gia đình")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-trang-hon-nhan?type=2')) {
        setTitle("Danh sách nhân viên độc thân")
      }

      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=1')) {
        setTitle("Danh sách nhân viên theo thâm niên công tác dưới 3 tháng")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=2')) {
        setTitle("Danh sách nhân viên theo thâm niên công tác từ 3 tháng đến 1 năm")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=3')) {
        setTitle("Danh sách nhân viên theo thâm niên công tác từ 1 năm đến 3 năm")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=4')) {
        setTitle("Danh sách nhân viên theo thâm niên công tác từ 3 năm đến 5 năm")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=5')) {
        setTitle("Danh sách nhân viên theo thâm niên công tác trên 5 năm")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-do-tuoi?type=1')) {
        setTitle("Danh sách nhân viên theo độ tuổi dưới 30 tuổi")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-do-tuoi?type=2')) {
        setTitle("Danh sách nhân viên theo độ tuổi từ 30 đến 44 tuổi")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-do-tuoi?type=3')) {
        setTitle("Danh sách nhân viên theo độ tuổi từ 45 đến 59 tuổi")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-do-tuoi?type=4')) {
        setTitle("Danh sách nhân viên theo độ tuổi trên 60 tuổi")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-chuc-vu?type=1')) {
        setTitle("Danh sách nhân viên thực tập")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-chuc-vu?type=2')) {
        setTitle("Danh sách nhân viên Partime")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-chuc-vu?type=3')) {
        setTitle("Danh sách nhân viên thử việc")
      }
      if (link.includes('bieu-do-danh-sach-nhan-vien-theo-chuc-vu?type=4')) {
        setTitle("Danh sách nhân viên chính thức")
      }


    }
  }, [link])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("depId", isDep_id);
        formData.append("positionId", isPosition_id);
        formData.append("groupId", isGroup_id);
        formData.append("teamId", isTeam_id);
        formData.append("birthday", isBirthday);
        formData.append("married", isMaried);
        formData.append("page", currentPage);
        formData.append("teamId", isTeam_id);
        formData.append("groupId", isGroup_id);
        if (link.includes("type=") || link.includes("gender=")) {
          if (link_cut !== "[idDetailHrReport].html") {
            formData.append("link", link_cut);
            if (link.includes("gender=") && link_cut && isGender !== "") {
              formData.append("gender", isGender);
              const response = await DetailReport(formData);
              setReportList(response?.data);

            }
            if (link.includes("type=") && link_cut && isType !== "") {
              formData.append("type", isType);
              const response = await DetailReport(formData);
              setReportList(response?.data);

            }
          }
        } else {
          if (link_cut !== "[idDetailHrReport].html") {
            ;
            formData.append("link", link_cut);
            const response = await DetailReport(formData);
            setReportList(response?.data);

          }
        }

      } catch (error) {
        throw error
      }
    }
    fetchData()

  }, [link_cut, isGender, isType, link, isDep_id, isPosition_id, isGroup_id, isTeam_id, isBirthday, isMaried, currentPage])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        formData.append('com_id', comid)
        const response = await DepartmentList(formData)
        setDepartmentList(response?.data)
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        if (link?.includes("danh-sach-nhan-vien-cua-tong-cong-ty")
          || link?.includes("danh-sach-nhan-vien-cham-cong-tong-cong-ty")
          || link?.includes("danh-sach-nhan-vien-chua-cham-cong-tong-cong-ty")
        ) {
          if (link?.includes("danh-sach-nhan-vien-cua-tong-cong-ty")) {
            setTitle("Danh sách nhân viên của công ty")
          }
          if (link?.includes("danh-sach-nhan-vien-cham-cong-tong-cong-ty")) {
            setTitle("Danh sách nhân viên chấm công của công ty")
          }
          if (link?.includes("danh-sach-nhan-vien-chua-cham-cong-tong-cong-ty")) {
            setTitle("Danh sách nhân viên chưa chấm công của công ty")
          }
          const regex = /c(\d+)-t(\d+)/;
          const match = link.match(regex);
          formData.append('type_timekeep', match[2])
          formData.append('comId', match[1])
          formData.append("position_id", isPosition_id)
          formData.append("gender", isGender)
          formData.append("married", isMaried)
          formData.append("birthday", isMaried)
          formData.append("team", isMaried)
          const response = await EmpStatusDetail(formData);
          if (response) {
            setOrganisationalList(response?.data)
          }
        }
        if (link?.includes("danh-sach-nhan-vien-theo-phong-ban")
          || link?.includes("danh-sach-nhan-vien-cham-cong-phong-ban")
          || link?.includes("danh-sach-nhan-vien-chua-cham-cong-phong-ban")
        ) {
          if (link?.includes("danh-sach-nhan-vien-theo-phong-ban")) {
            setTitle("Danh sách nhân viên theo phòng ban")
          }
          if (link?.includes("danh-sach-nhan-vien-cham-cong-phong-ban")) {
            setTitle("Danh sách nhân viên chấm công theo phòng ban")
          }
          if (link?.includes("danh-sach-nhan-vien-chua-cham-cong-phong-ban")) {
            setTitle("Danh sách nhân viên chưa chấm công theo phòng ban")
          }
          const regex = /c(\d+)-t(\d+)-d(\d+)/;
          const match = link.match(regex);
          const lastCharacter = link.slice(-1)
          formData.append('type_timekeep', match[2])
          formData.append('dep_id', match[3])
          formData.append('comId', match[1])
          formData.append("position_id", isPosition_id)
          formData.append("gender", isGender)
          formData.append("married", isMaried)
          formData.append("birthday", isMaried)
          formData.append("team", isMaried)
          const response = await EmpStatusDetail(formData);
          if (response) {
            setOrganisationalList(response?.data)
          }
        }
        if (link?.includes("danh-sach-nhan-vien-theo-to")
          || link?.includes("danh-sach-nhan-vien-cham-cong-theo-to")
          || link?.includes("danh-sach-nhan-vien-chua-cham-cong-theo-to")
        ) {
          if (link?.includes("danh-sach-nhan-vien-theo-to")) {
            setTitle("Danh sách nhân viên theo tổ")
          }
          if (link?.includes("danh-sach-nhan-vien-cham-cong-theo-to")) {
            setTitle("Danh sách nhân viên chấm công theo tổ")
          }
          if (link?.includes("danh-sach-nhan-vien-chua-cham-cong-theo-to")) {
            setTitle("Danh sách nhân viên chưa chấm công theo tổ")
          }
          const regex = /c(\d+)-t(\d+)-d(\d+)-n(\d+)/;
          const match = link.match(regex);
          formData.append('type_timekeep', match[2])
          formData.append('dep_id', match[3])
          formData.append('comId', match[1])
          formData.append('team_id', match[4])
          formData.append("position_id", isPosition_id)
          formData.append("gender", isGender)
          formData.append("married", isMaried)
          formData.append("birthday", isMaried)
          formData.append("team", isMaried)
          const response = await EmpStatusDetail(formData);
          if (response) {
            setOrganisationalList(response?.data)
          }
        }
        if (link?.includes("danh-sach-nhan-vien-theo-nhom")
          || link?.includes("danh-sach-nhan-vien-cham-cong-theo-nhom")
          || link?.includes("danh-sach-nhan-vien-chua-cham-cong-theo-nhom")
        ) {
          if (link?.includes("danh-sach-nhan-vien-theo-nhom")) {
            setTitle("Danh sách nhân viên theo nhóm")
          }
          if (link?.includes("danh-sach-nhan-vien-cham-cong-theo-nhom")) {
            setTitle("Danh sách nhân viên chấm công theo nhóm")
          }
          if (link?.includes("danh-sach-nhan-vien-chua-cham-cong-theo-nhom")) {
            setTitle("Danh sách nhân viên chưa chấm công theo nhóm")
          }
          const regex = /c(\d+)-t(\d+)-d(\d+)-n(\d+)-g(\d+)/;
          const matches = link.match(regex);
          formData.append('type_timekeep', matches[2])
          formData.append('dep_id', matches[3])
          formData.append('comId', matches[1])
          formData.append('team_id', matches[4])
          formData.append('group_id', matches[5])
          formData.append("position_id", isPosition_id)
          formData.append("gender", isGender)
          formData.append("married", isMaried)
          formData.append("birthday", isMaried)
          formData.append("team", isMaried)
          const response = await EmpStatusDetail(formData);
          if (response) {
            setOrganisationalList(response?.data)
          }
        }

      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostionCharData()
        setPosttionCharData(response?.data)
      } catch (error) {

      }
    }
    fetchData()
  }, [])

  const handleSelectChange = (
    selectedOption: SelectOptionType | null,
    setState: any
  ) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      setState(selectedOption.value);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    router.back()
  }

  function getAllTeamInfo() {
    const teamInfoArray: any = [];

    if (OrganisationalDatas?.infoCompany) {
      for (const infoDep of OrganisationalDatas.infoCompany.infoDep) {
        for (const infoTeam of infoDep.infoTeam) {
          teamInfoArray.push({
            gr_id: infoTeam.gr_id,
            gr_name: infoTeam.gr_name
          });
        }
      }
    }

    return teamInfoArray;
  }

  const allTeamInfo = getAllTeamInfo();

  function getAllGroupInfo() {
    const groupInfoArray: any = [];

    if (OrganisationalDatas?.infoCompany) {
      for (const infoDep of OrganisationalDatas.infoCompany.infoDep) {
        for (const infoTeam of infoDep.infoTeam) {
          for (const infoGroup of infoTeam.infoGroup) {
            groupInfoArray.push({
              gr_id: infoGroup.gr_id,
              gr_name: infoGroup.gr_name
            });
          }
        }
      }
    }

    return groupInfoArray;
  }

  const allGroupInfo = getAllGroupInfo();

  const chontoOptions = useMemo(
    () =>
      allTeamInfo && allTeamInfo?.map((team: any) => ({
        value: team.gr_id,
        label: team.gr_name,
      })),
    [allTeamInfo]
  );

  const chonnhomOptions = useMemo(
    () =>
      allGroupInfo && allGroupInfo?.map((group: any) => ({
        value: group.gr_id,
        label: group.gr_name,
      })),
    [allGroupInfo]
  );


  const chonphongbanOptions = useMemo(
    () =>
      departmentList?.data?.map((department: any) => ({
        value: department.dep_id,
        label: department.dep_name,
      })),
    [departmentList?.data]
  );
  const chonchucvuOptions = useMemo(
    () =>
      PostionCharDatas &&
      PostionCharDatas?.data?.flat()?.map((pos: any) => ({
        value: pos.positionId,
        label: pos.positionName
      })),
    [PostionCharDatas]
  );
  const currentYear: number = new Date().getFullYear();
  const startYear: number = 1970;
  const chonnamsinh: SelectOptionType[] = [];

  for (let year: number = startYear; year <= currentYear; year++) {
    chonnamsinh.push({ value: year, label: year.toString() });
  }

  const options = {
    chonphongban: chonphongbanOptions,
    chonchucvu: chonchucvuOptions,
    chonnhom: chonnhomOptions,
    chonto: chontoOptions,
    chongioitinh: [
      { value: 1, label: "Nam" },
      { value: 2, label: "Nữ" },
      { value: 3, label: "Giới tính khác" },
    ],
    chonnamsinh: chonnamsinh,
    tinhtranghonnhan: [
      { value: 1, label: "Đã có gia đình" },
      { value: 2, label: "Độc thân" },
    ],
    kinhnghiemlamviec: [
      { value: "0", label: 'Chưa có kinh nghiệm' },
      { value: "1", label: '0 - 1 năm kinh nghiệm' },
      { value: "2", label: '1 - 2 năm kinh nghiệm' },
      { value: "3", label: '2 - 5 năm kinh nghiệm' },
      { value: "4", label: '5 - 10 năm kinh nghiệm' },
      { value: "5", label: 'Hơn 10 năm kinh nghiệm' },
    ],
  };

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.body}`}>
          <div className={`${styles.d_back}`}>
            <div className={`${styles.d_info}`}>
              <a style={{ cursor: "pointer" }} onClick={handleBack} className={`${styles.d_img_back}`}>
                <Image style={{ verticalAlign: 'middle' }} src="/arrow-left.svg" width={17} height={15} alt="" />
              </a>
              <p className={`${styles.d_text_info}`}>
                <a onClick={handleBack} style={{ fontWeight: 600, color: '#337ab7', cursor: 'pointer' }} >Báo cáo nhân sự </a>/ {isTitle}
              </p>
            </div>
          </div>
          <div className={`${styles.member_list}`}>
            <div className={`${styles.table_content}`}>
              <table className={`${styles.table} ${styles.table_list}`}>
                <thead>
                  <tr style={{ height: 70 }}>
                    <th>STT</th>
                    <th>Id</th>
                    <th>Họ và tên</th>
                    <th><Selects
                      selectedOption={selectedOption}
                      onChange={handleSelectChange}
                      setState={setDep_id}
                      option={options.chonphongban}
                      placeholder="Chọn phòng ban"
                    /></th>
                    <th><Selects
                      selectedOption={selectedOption}
                      onChange={handleSelectChange}
                      setState={setPosition_id}
                      option={options.chonchucvu}
                      placeholder="Chọn chức vụ"
                    /></th>
                    <th><Selects
                      selectedOption={selectedOption}
                      onChange={handleSelectChange}
                      setState={setGroup_id}
                      option={options.chonnhom}
                      placeholder="Nhóm"
                    /></th>
                    <th><Selects
                      selectedOption={selectedOption}
                      onChange={handleSelectChange}
                      setState={setTeam_id}
                      option={options.chonto}
                      placeholder="Tổ"
                    /></th>
                    <th>Giới tính</th>
                    <th><Selects
                      selectedOption={selectedOption}
                      onChange={handleSelectChange}
                      setState={setBirthday}
                      option={options.chonnamsinh}
                      placeholder="Chọn năm sinh"
                    /></th>
                    <th><Selects
                      selectedOption={selectedOption}
                      onChange={handleSelectChange}
                      setState={setMaried}
                      option={options.tinhtranghonnhan}
                      placeholder="Tình trạng hôn nhân"
                    /></th>
                    <th>Thông tin liên hệ</th>
                    <th>Ngày bắt đầu làm việc</th>
                    <th>Kinh nghiệm làm việc</th>
                  </tr>
                </thead>
                <tbody className={`${styles.filter_body}`}>
                  {isReportList?.data && isReportList?.data?.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.idQLC} </td>
                      <td>{item?.userName}</td>
                      <td>{item?.dep}</td>
                      <td>{item?.chucvu}</td>
                      <td>Chưa cập nhật</td>
                      <td>Chưa cập nhật</td>
                      <td>{item?.gender === 1 ? "Nam" : "Nữ"}</td>
                      {item?.birthday ? <td> {format(
                        parseISO(new Date(item?.birthday * 1000).toISOString()),
                        "yyyy-MM-dd"
                      )}</td> : <td>Chưa cập nhật</td>}
                      <td>{item?.married === 1
                        ? "Đã có gia đình"
                        : item?.married === 2
                          ? "Độc thân"
                          : "Chưa cập nhật"}
                      </td>
                      <td>
                        <p>Email:{item?.emailContact}</p>
                        <p>SDT: {item?.phone}</p>
                        <p>Địa chỉ: {item.phone}</p>
                      </td>
                      {item?.start_working_time ? <td>{format(
                        parseISO(new Date(item?.start_working_time * 1000).toISOString()),
                        "yyyy-MM-dd"
                      )}</td> : <td>Chưa cập nhật</td>}
                      <td>{item?.chucvu}</td>
                    </tr>
                  ))}
                  {isOrganisationalList?.listEmployee && isOrganisationalList?.listEmployee?.map((item: any, index: any) => {
                    const positionData = PostionCharDatas?.data?.find(
                      (position: any) => position?.positionId === item?.position_id
                    );
                    const positionNameToShow = positionData ? positionData.positionName : item.vitri;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.idQLC} </td>
                        <td>{item?.userName}</td>
                        <td>{item?.Department}</td>
                        <td>{positionNameToShow}</td>
                        <td>Chưa cập nhật</td>
                        <td>Chưa cập nhật</td>
                        <td>{item?.gender === 1 ? "Nam" : "Nữ"}</td>
                        {item?.birthday ? <td> {format(
                          parseISO(new Date(item?.birthday * 1000).toISOString()),
                          "yyyy-MM-dd"
                        )}</td> : <td>Chưa cập nhật</td>}
                        <td>{item?.married === 1
                          ? "Đã có gia đình"
                          : item?.married === 2
                            ? "Độc thân"
                            : "Chưa cập nhật"}
                        </td>
                        <td>
                          <p>Email:{item?.email}</p>
                          <p>SDT: {item?.phoneTK}</p>
                          <p>Địa chỉ: {item.address}</p>
                        </td>
                        {item?.start_working_time ? <td>{format(
                          parseISO(new Date(item?.start_working_time * 1000).toISOString()),
                          "yyyy-MM-dd"
                        )}</td> : <td>Chưa cập nhật</td>}
                        <td>{item?.experience === 0 ? "Chưa có kinhh nghiệm" :
                          item?.experience === 1 ? "0 - 1 năm kinh nghiệm" :
                            item?.experience === 2 ? "1 - 2 năm kinh nghiệm" :
                              item?.experience === 3 ? "2 - 5 năm kinh nghiệm" :
                                item?.experience === 4 ? "5 - 10 năm kinh nghiệm" :
                                  "trên 10 năm kinh nghiệm"
                        }</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={`${styles.pagination}`} >
          <MyPagination
            current={currentPage}
            total={isReportList?.totalCount}
            pageSize={10}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}