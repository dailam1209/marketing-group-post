import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./candidateListDetail.module.css";
import CandidateAddModal from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateAddModal";
import StageAddModal from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/stageAddModal";
import { ProcessList } from "@/pages/api/api-hr/quan-ly-tuyen-dung/candidateList";
import StageUpdateModal from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/stageUpdateModal";
import DeleteStage from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/stageDeleteModal";
import { EmployeeList } from "@/pages/api/api-hr/listNhanVien";
import { GetListNews } from "@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment";
import Selects from "@/components/hr/select";
import DropableColumn from "./columnAble";
import StageGetJob from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/stageTransitionModal/stageGetJob";
import StageFailJob from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/stageTransitionModal/stageFailJob";
import StageCancelJob from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/stageTransitionModal/stageCancelJob";
import StageContactJob from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/stageTransitionModal/stateContactJob";
import Head from "next/head";
import GetComId from "@/components/hr/getComID";

type SelectOptionType = { label: string; value: any };
export default function CandidateListDetail({ iconAdd, iconEdit, iconDelete }: any) {
  const [openModal, setOpenModal] = useState<any>(null);
  const [isOpenModal, setModalOpen] = useState(false);
  const [isUpdateProcess, setUpdateProcess] = useState<any>(null);
  const [isDeleteProcess, setDeleteProcess] = useState<any>(null);
  const [isProcessList, setProcessList] = useState<any>(null);
  const [isNewList, setNewsList] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
  const [isEmp_id, setEmp_id] = useState<any>("");
  const [EmpData, setEmpData] = useState<any>(null);
  const [isGender, setGender] = useState<any>("");
  const [isStatus, setStatus] = useState<any>("");
  const [isRecruitmentNewsId, setRecruitmentNewsId] = useState<any>("");
  const [isSearch, setSearch] = useState<any>(null);
  const [isDragItem, setDragItem] = useState<any>(null);
  const [isDropCol, setDropCol] = useState<any>(null);
  const [isProcess_id, setProcess_id] = useState<any>(null);
  const [animateModal, setAnimateModal] = useState(true);
  const [isProcessBeforeName, setProcessBeforeName] = useState<any>("")
  const comid: any = GetComId()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        const fromDate = (
          document.getElementById("from_date") as HTMLInputElement
        )?.value;
        const todate = (document.getElementById("to_date") as HTMLInputElement)
          ?.value;
        const name = (document.getElementById("name") as HTMLInputElement)
          ?.value;
        formData.append("name", name);
        formData.append("fromDate", fromDate);
        formData.append("toDate", todate);
        formData.append("gender", isGender);
        formData.append("recruitmentNewsId", isRecruitmentNewsId);
        formData.append("userHiring", isEmp_id);
        if (formData) {
          const response = await ProcessList(formData);
          setProcessList(response?.data);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [isSearch]);

  // -- lấy dữ liệu nhân viên --
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        const response = await EmployeeList(formData);
        setEmpData(response?.data);
      } catch (error) {

      }
    };
    fetchData();
  }, []);

  // -- lấy dữ liệu tin tức --
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetListNews(1, 2000, "", "", "");
        if (response) {
          setNewsList(response.data);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (openModal === null || isUpdateProcess === null || isDeleteProcess === null) {
      setAnimateModal(true)
    }
  }, [openModal, isUpdateProcess, isDeleteProcess])

  const handleCloseModal = () => {
    setAnimateModal(false)
    setUpdateProcess(null);
    setDeleteProcess(null);
    setModalOpen(false);
    setOpenModal(null)
    setSearch(prevValue => !prevValue);
  };

  const handleSearch = useCallback(() => {
    setSearch({ isEmp_id });
  }, [isEmp_id]);

  const handleUpdateProcess = ({
    name,
    processBefore,
    processInterviewId,
  }: any) => {
    setUpdateProcess({ name, processBefore, processInterviewId });
  };

  const chonnhanvienOptions = useMemo(
    () =>
      EmpData?.items?.map((emp: any) => ({
        value: emp.ep_id,
        label: `${emp.ep_name} (${emp.dep_name ? emp.dep_name : "Chưa cập nhật"})`
      })),
    [EmpData?.items]
  );

  const chonvitrituyendungOptions = useMemo(
    () =>
      isNewList &&
      isNewList?.data?.data?.map((news: any) => ({
        value: news.id,
        label: news.title,
      })),
    [isNewList]
  );

  const options = {
    vitrituyendung: chonvitrituyendungOptions,
    chonnhanvien: chonnhanvienOptions,
    chongioitinh: [
      { value: 1, label: "Nam" },
      { value: 2, label: "Nữ" },
      { value: 3, label: "Giới tính khác" },
    ],
    chontrangthai: [
      {
        value: "Trượt vòng loại phỏng vấn",
        label: "Trượt vòng loại phỏng vấn",
      },
    ],
  };

  const handleSelectChange = (
    selectedOption: SelectOptionType | null,
    setState: any
  ) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      setState(selectedOption.value);
    }
  };

  return (
    <>
      <Head>
        <title>Danh sách ứng viên - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.tab_content}`} >
        <div className={`${styles.tab_pane}`} >
          <div className={`${styles.body}`}>
            {iconAdd && (
              <div className={`${styles.recruitment}`}>
                <button
                  className={`${styles.add}`}
                  onClick={() => setOpenModal(1)}
                >
                  <img
                    style={{ verticalAlign: "middle" }}
                    src={`/add.png`}
                    alt=""
                  />
                  Thêm ứng viên
                </button>
                <button
                  className={`${styles.add}`}
                  onClick={() => setOpenModal(2)}
                >
                  <img
                    style={{ verticalAlign: "middle" }}
                    src={`/add.png`}
                    alt=""
                  />
                  Thêm giai đoạn
                </button>
              </div>
            )}
            {openModal === 1 ? (<CandidateAddModal animation={animateModal} onCancel={handleCloseModal}></CandidateAddModal>) : ("")}
            {openModal === 2 ? (<StageAddModal animation={animateModal} onCancel={handleCloseModal}></StageAddModal>) : ("")}
            {isUpdateProcess && (<StageUpdateModal animation={animateModal} onCancel={handleCloseModal} infoList={isUpdateProcess} />)}
            {isDeleteProcess !== null ? (<DeleteStage animation={animateModal} onCancel={handleCloseModal} process_id={isDeleteProcess} />) : ''}
            {isOpenModal && isDropCol?.id !== 0 && isDropCol?.id !== 2 && isDropCol?.id !== 3 && isDropCol?.id !== 4
              && <StageGetJob data={isDragItem} process_id_from={isProcess_id} process_id={isDropCol?.id} onCancel={handleCloseModal}
              />}
            {isOpenModal && isDropCol?.id === 2
              && <StageFailJob data={isDragItem} process_id_from={isProcess_id} process_id={isDropCol?.id} onCancel={handleCloseModal}
              />}
            {isOpenModal && isDropCol?.id === 3
              && <StageCancelJob data={isDragItem} process_id_from={isProcess_id} process_id={isDropCol?.id} onCancel={handleCloseModal}
              />}
            {isOpenModal && isDropCol?.id === 4
              && <StageContactJob data={isDragItem} process_id_from={isProcess_id} process_id={isDropCol?.id} onCancel={handleCloseModal}
              />}
            <div className={`${styles.bg_search}`}>
              <div className={`${styles.search_top}`}>
                <div
                  style={{ paddingRight: 10 }}
                  className={`${styles.div_no_pad}`}
                >
                  <input
                    type="date"
                    id="from_date"
                    className={`${styles.search_date_from} ${styles.form_control}`}
                    placeholder="Từ dd/mm/yyyy"
                  />
                </div>
                <div
                  style={{ paddingRight: 10 }}
                  className={`${styles.div_no_pad}`}
                >
                  <input
                    type="date"
                    id="to_date"
                    className={`${styles.search_date_to} ${styles.form_control}`}
                    placeholder="Từ dd/mm/yyyy"
                  />
                </div>
                <div
                  style={{ paddingRight: 10 }}
                  className={`${styles.div_no_pad}`}
                >
                  <input
                    type="text"
                    id="name"
                    className={`${styles.search_can_name} ${styles.form_control}`}
                    placeholder="Nhập tên ứng viên"
                  />
                </div>
                <div className={`${styles.div_no_pad} `}>
                  <Selects
                    selectedOption={selectedOption}
                    onChange={handleSelectChange}
                    padding={15}
                    width_control={100}
                    width_menu={95}
                    height={33}
                    setState={setRecruitmentNewsId}
                    option={options.vitrituyendung}
                    placeholder={"Vị trí tuyển dụng"}
                  />
                </div>
              </div>
              <div className={`${styles.search_new_t}`}>
                <div className={`${styles.div_no_pad} `}>
                  <Selects
                    selectedOption={selectedOption}
                    onChange={handleSelectChange}
                    padding={15}
                    width_control={100}
                    width_menu={95}
                    height={33}
                    setState={setEmp_id}
                    option={options.chonnhanvien}
                    placeholder={"Chọn nhân viên"}
                  />
                </div>
                <div className={`${styles.div_no_pad} `}>
                  <Selects
                    selectedOption={selectedOption}
                    onChange={handleSelectChange}
                    padding={15}
                    width_control={100}
                    width_menu={95}
                    height={33}
                    setState={setGender}
                    option={options.chongioitinh}
                    placeholder={"Chọn giới tính"}
                  />
                </div>
                <div className={`${styles.div_no_pad} `}>
                  <Selects
                    selectedOption={selectedOption}
                    onChange={handleSelectChange}
                    padding={15}
                    width_control={100}
                    width_menu={95}
                    height={33}
                    setState={setStatus}
                    option={options.chontrangthai}
                    placeholder={"Chọn trạng thái"}
                  />
                </div>
                <div className={`${styles.div_no_pad} `}>
                  <a
                    className={`${styles.icon_search_top}`}
                    onClick={handleSearch}
                  >
                    <img src={`	/t-icon-search-n.svg`} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div
              className={`${styles.export_excel}`}
              style={{ paddingRight: 20, right: 0, float: "right" }}
            >
              <a href="" className={`${styles.t_excel}`}>
                <img src={`/t-icon-excel.svg`} alt="" />
                Xuất file Excel
              </a>
            </div>
            <div className={`${styles.member_list}`}>
              <div className={`${styles.list_hs_t}`}>
                {isProcessList?.data?.map((item: any, index: any) => {
                  return (
                    <DropableColumn
                      setModalOpen={setModalOpen}
                      key={index}
                      item={item}
                      isProcessList={isProcessList}
                      handleUpdateProcess={handleUpdateProcess}
                      setDeleteProcess={setDeleteProcess}
                      setDragItem={setDragItem}
                      setDropCol={setDropCol}
                      setProcess_id={setProcess_id}
                      iconEdit={iconEdit}
                      iconDelete={iconDelete}
                      onCancel={handleCloseModal}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}