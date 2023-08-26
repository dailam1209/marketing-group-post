import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Select from 'react-select';
import styles from './employeeManagement.module.css'
import BodyFrameFooter from "@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import DetailCandidateList from "../detailModal";
import EditCandidateList from "../editModal";
import { EmployeeList } from "@/pages/api/api-hr/quan_ly_nhan_vien";
import { DepartmentList } from "@/pages/api/api-hr/listPhongBan";
import MyPagination from "@/components/hr/pagination/Pagination";
import { PostionCharData, OrganizationalStructureData } from '@/pages/api/api-hr/co_cau_to_chuc';
import { format, parseISO } from "date-fns";
import GetComId from "@/components/hr/getComID";

type SelectOptionType = { label: string, value: string }
export interface TabEmployeeManagement {

}

export default function TabEmployeeManagement({ iconAdd, iconEdit }: any) {

  const [detailModal, setDetailModal] = useState(false)
  const [editModal, setEditmodal] = useState<any>(null)
  const [EmpData, setEmpData] = useState<any>(null)
  const [departmentList, setDepartmentList] = useState<any>(null)
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
  const [isDep_id, setIsDep_id] = useState<any>("")
  const [isUserName, setIsUserName] = useState<any>("")
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [PostionCharDatas, setPosttionCharData] = useState<any>(null)
  const [OrganizationalDatas, setOrganizationalData] = useState<any>(null)
  const [isSeach, setSearch] = useState<any>(null)
  const [visible, setVisible] = useState(false);
  const [newData, setData] = useState(false);
  const [comName, setComName] = useState<any>("");
  const comid: any = GetComId()

  // -- đóng mở modal --
  const handleOpenDetailModal = () => {
    setDetailModal(!detailModal)
  }

  const handleCloseModal = () => {
    setDetailModal(false)
    setEditmodal(false)
    setVisible(false);
    setData(pre => !pre)
  }

  // -- lấy dữ liệu phòng ban --
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        formData.append('com_id', comid)
        const response = await DepartmentList(formData)
        setDepartmentList(response?.data)
      } catch (error) {
      }
    }
    fetchData()
  }, [])

  // -- lấy dữ liệu chức vụ --
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrganizationalStructureData()
        setOrganizationalData(response?.data)
      } catch (error) {
      }
    }
    fetchData()
  }, [])

  console.log(OrganizationalDatas);


  function getCompanyNameByChinhanh(com_id: any, apiData: any) {
    if (com_id === apiData?.infoCompany?.parent_com_id) {
      return apiData?.infoCompany?.companyName;
    } else {
      const childCompanies = apiData?.infoCompany?.infoChildCompany;
      const matchingChildCompany = childCompanies?.find(child => com_id === child.com_id);
      if (matchingChildCompany) {
        return matchingChildCompany?.com_name;
      } else {
        return "";
      }
    }
  }


  // -- lấy dữ liệu và phân trang --
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append('dep_id', isDep_id)
        formData.append('userName', isUserName)
        formData.append('com_id', comid)
        formData.append('pageNumber', currentPage)
        const response = await EmployeeList(formData)
        setEmpData(response?.data)
      } catch (error) {
      }
    }
    fetchData()
  }, [currentPage, isSeach, newData])

  // -- di chuyển trái phải của bảng --
  const tableContentRef = useRef<HTMLDivElement>(null);
  const currentPositionRef = useRef(0);

  const handleLeftClick = () => {
    if (tableContentRef.current) {
      const newPosition = currentPositionRef.current - 100;
      if (newPosition >= 0) {
        tableContentRef.current.scrollLeft = newPosition;
        currentPositionRef.current = newPosition;
      }
    }
  };

  const handleRightClick = () => {
    if (tableContentRef.current) {
      const newPosition = currentPositionRef.current + 100;
      if (newPosition <= tableContentRef.current.scrollWidth - tableContentRef.current.clientWidth) {
        tableContentRef.current.scrollLeft = newPosition;
        currentPositionRef.current = newPosition;
      }
    }
  };

  // -- set options cho thẻ select --

  const chonphongbanOptions = useMemo(
    () =>
      departmentList?.items?.map((department: any) => ({
        value: department.dep_id,
        label: department.dep_name,
      })),
    [departmentList?.items]
  );

  const chonnhanvienOptions = useMemo(
    () =>
      EmpData?.items?.map((emp: any) => ({
        value: emp.ep_id,
        label: emp.ep_name,
      })),
    [EmpData?.items]
  );

  const handleSearch = useCallback(() => {
    setSearch({ isDep_id, isUserName });
  }, [isDep_id, isUserName]);


  const handleSelectChangeDep = (selectedOption: SelectOptionType | null) => {
    setSelectedOption(selectedOption); // Lưu giá trị đã chọn vào state selectedOption
    if (selectedOption) {
      setIsDep_id(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
    }
  };

  const handleSelectChangeEmp = (selectedOption: SelectOptionType | null) => {
    setSelectedOption(selectedOption); // Lưu giá trị đã chọn vào state selectedOption
    if (selectedOption) {
      setIsUserName(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
    }
  };

  const options = {
    chonnhanvien: chonnhanvienOptions,
    chonphongban: chonphongbanOptions,
  };

  const handleSignaturePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log(iconAdd)
  return (
    <>
      <div className={`${styles.tab_content} `} >
        <div className={`${styles.tab_pane}`}>
          <div className={`${styles.body}`}>
            <div className={`${styles.recruitment}`}>
              {iconAdd && <a target="blank" href="/cham-cong/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi" className={`${styles.add}`} >
                <img src={`/add.png`} alt="" />Thêm mới nhân viên
              </a>}
            </div>
            <div className={`${styles.bg_search}`}>
              <div className={`${styles.search_new_t}`}>
                <div className={`${styles.div_no_pad} `}>
                  <Select
                    defaultValue={selectedOption}
                    onChange={handleSelectChangeEmp}
                    options={options.chonnhanvien}
                    placeholder="Chọn nhân viên"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: 4,
                        borderColor: "#4747477a",
                        height: "auto",
                        fontSize: state.isFocused ? 14 : 14,
                        width: '100%',
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
                      }),
                    }}
                  />
                </div>
                <div className={`${styles.div_no_pad} `}>
                  <Select
                    defaultValue={selectedOption}
                    onChange={handleSelectChangeDep}
                    options={options.chonphongban}
                    placeholder="Chọn phòng ban"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: 4,
                        borderColor: "#4747477a",
                        height: "auto",
                        fontSize: state.isFocused ? 14 : 14,
                        width: '100%',
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
                      }),
                    }}
                  />
                </div>
                <div className={`${styles.div_no_pad_search} `}>
                  <a className={`${styles.icon_search_top}`} onClick={handleSearch}>
                    <img style={{ verticalAlign: '-webkit-baseline-middle' }} src={`/t-icon-search-n.svg`} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className={`${styles.export_excel} ${styles.export_excel_emp}`} style={{ paddingRight: 20, right: 0, position: 'relative' }}>
              <a href="" className={`${styles.t_excel}`} >
                <img src={`/t-icon-excel.svg`} alt="" />
                Xuất file Excel
              </a>
            </div>
            <div className={`${styles.member_list}`}>
              <div className={`${styles.navigate_next}`} >
                <div className={`${styles.turn} ${styles.turn_left}`} onClick={handleLeftClick}>
                  <img src={`/arrow_left.png`} alt="" />
                </div>
                <div className={`${styles.turn} ${styles.turn_right}`} onClick={handleRightClick}>
                  <img src={`/arrow_right.png`} alt="" />
                </div>
              </div>
              <div className={`${styles.table_content}`} ref={tableContentRef}>
                <table className={`${styles.table} ${styles.table_list}`} >
                  <thead>
                    <tr>
                      <th>ID nhân viên</th>
                      <th>Họ và tên</th>
                      <th>Phòng ban</th>
                      <th>Giới tính</th>
                      <th>Tình trạng hôn nhân</th>
                      <th>Vị trí</th>
                      <th>Bộ phận</th>
                      <th>Chi nhánh</th>
                      <th>Thông tin liên hệ</th>
                      <th>Ngày vào công ty</th>
                      <th>Tùy chỉnh</th>
                    </tr>
                  </thead>
                  <tbody className={`${styles.filter_body}`}>
                    {EmpData?.items?.map((item: any, index: any) => {
                      const positionData = PostionCharDatas?.data?.flat()?.find(
                        (position: any) => position?.positionId === item?.position_id
                      );
                      const positionNameToShow = positionData ? positionData.positionName : item.vitri;
                      return (
                        <tr key={index}>
                          <td>{item.ep_id}</td>
                          <td>   <a href="">{item.ep_name}</a></td>
                          <td>{item.dep_name}</td>
                          <td>{item.ep_gender === 1 ? "Nam" : item.ep_gender === 2 ? "Nữ" : "Khác"}</td>
                          <td>{item.ep_married === 1 ? "Đã có gia đình" : item.ep_married === 2 ? "Độc thân" : "Khác"}</td>
                          <td>{positionNameToShow}</td>
                          <td>{item.dep_name}</td>
                          <td>{getCompanyNameByChinhanh(item.com_id, OrganizationalDatas)}</td>
                          <td>
                            <p>Địa chỉ liên hệ:{item.ep_address}</p>
                            <p>SDT: {item?.ep_phone}</p>
                            <p>Email: {item.ep_email}</p>
                          </td>
                          {item?.start_working_time &&
                            <td>{format(
                              parseISO(new Date(item?.start_working_time * 1000).toISOString()),
                              "yyyy-MM-dd"
                            )}</td>
                          }
                          <td
                            className={`${styles.r_t_top_right}`} style={{ position: 'relative' }}>
                            <img src={`	/icon-settting.png`} alt=" " />
                            <div
                              className={`${styles.settings}`} style={{ width: '100%' }}>
                              <li onClick={handleOpenDetailModal}>Chi tiết</li>
                              {detailModal && <DetailCandidateList onCancel={handleCloseModal}
                                infoList={{
                                  infoList: item,
                                  position: positionNameToShow,
                                  branch: getCompanyNameByChinhanh(item.com_id, OrganizationalDatas),

                                }} />}
                              {iconEdit && <li onClick={() => setEditmodal(item?._id)}>Chỉnh sửa</li>}
                              {editModal === item?._id && <EditCandidateList onCancel={handleCloseModal} infoList={{ infoList: item, position: positionNameToShow }} />}
                            </div>
                          </td>
                        </tr>
                      )
                    }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={`${styles.paginations}`} style={{ display: 'block' }}>
            <MyPagination
              current={currentPage}
              total={EmpData?.totalItems}
              pageSize={10}
              onChange={handleSignaturePageChange}
            />
          </div>
          <BodyFrameFooter src="https://www.youtube.com/embed/Z8qtJ75of3g"></BodyFrameFooter>
        </div>
      </div>
    </>
  )
}