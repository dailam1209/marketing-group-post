import React, { useState, useEffect } from "react";
import styles from "./detailCandidate.module.css";
import { useRouter } from 'next/router';
import EditCandidateModal from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateRepo/EditCandidateModal";
import EditCandidateGetJob from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateRepo/EditCandidateModal/editGetJob";
import EditCandidateFailJob from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateRepo/EditCandidateModal/editFailJob";
import EditCandidateCancelJob from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateRepo/EditCandidateModal/editCancelJob";
import EditCandidateContactJob from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateRepo/EditCandidateModal/editContactJob";
import EditCandidateIntrview from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateRepo/EditCandidateModal/editInterview";
import { CandidateList } from "@/pages/hr/api/quan-ly-tuyen-dung/candidateList";
import { ProcessList } from "@/pages/hr/api/quan-ly-tuyen-dung/candidateList";
import { parseISO, format } from 'date-fns';
import { Rating } from 'react-simple-star-rating'
import { ContactJobDetails, FailJobDetails, CancelJobDetails, AllDetails, GetJobDetails } from "@/pages/hr/api/quan-ly-tuyen-dung/candidateList";
import { EmployeeList } from "@/pages/hr/api/listNhanVien";

import Head from "next/head";
import { getDataAuthentication } from "@/pages/hr/api/Home/HomeService";
interface Option {
  value: number;
  label: string;
}

interface Options {
  chongioitinh: Option[];
  trinhdohocvan: Option[];
  kinhnghiemlamviec: Option[];
  tinhtranghonnhan: Option[];
}

export default function DetailCandidate({ onCancel }: any) {
  const router = useRouter();
  const id: any = router.asPath.split('/').pop();
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [isCandidate, setCandidate] = useState<any>(null)
  const [isCandidateProcess, setCandidateProcess] = useState<any>(null)
  const [isCandidateAll, setCandidateAll] = useState<any>(null)
  const [isProcessName, setProcessName] = useState<any>(null);
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [EmpData, setEmpData] = useState<any>(null)
  const [newData, setNewData] = useState<any>(false)

  const EmpMatchProcess = EmpData?.data?.find((item: any) => item.idQLC ===
    isCandidateProcess?.detail_get_job?.empInterview
    || isCandidateProcess?.detail_fail_job?.empInterview
    || isCandidateProcess?.detail_cancel_job?.empInterview
    || isCandidateProcess?.detail_contact_job?.epOffer
  )

  useEffect(() => {
    const fetchData = async () => {
      if (id?.includes("p")) {
        const formData = new FormData();
        const regex = /u(\d+)p/g
        const matches: any = [];
        let match: any;
        while ((match = regex.exec(id)) !== null) {
          matches.push(match[1]);
        }
        const matchesid: any = id?.match(/p(\d+)/);
        const numberAfterP: any = Number(matchesid[1]);
        formData.append('id', matches[0])
        formData.append('idgiaidoan', numberAfterP)
        const response = await AllDetails(formData);
        if (response) {
          setCandidateAll(response.data);
        }
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data?.data?.infoRoleTD);
      };
      fetchData();
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        const response = await EmployeeList(formData)
        setEmpData(response?.data)
      } catch (error) {
      }
    }
    fetchData()
  }, [newData])

  const perIdArray = displayIcon?.map((item) => item.perId);
  const iconEdit = perIdArray?.includes(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        const response = await CandidateList(formData)
        if (response) {
          const data: any = response?.data
          if (data) {
            if (id?.includes("p")) {
              const regex = /u(\d+)p/g
              const matches: any = [];
              let match: any;
              while ((match = regex.exec(id)) !== null) {
                matches.push(match[1]);
              }
              const item = data?.data?.find((item: any) => item.id = Number(matches[0]))
              setCandidate(item)
            }
            else {
              const item = data?.data?.find((item: any) => item.id = Number(id?.slice(1, id?.length)))
              setCandidate(item)
            }
          }
        }
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [id, newData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        const response = await ProcessList(formData);
        if (response && id?.includes("p")) {
          const processData: any = response?.data
          const matches: any = id?.match(/p(\d+)/);
          const numberAfterP = matches[1];
          const processFind = processData?.data?.find((item: any) => item?.id === Number(numberAfterP))
          if (processFind) {
            setProcessName(processFind?.name)
          }
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [id, newData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id?.charAt(0) === 'g') {
          const formData = new FormData();
          const candidate_id: any = Number(id?.slice(1, id?.length))
          formData.append('canId', candidate_id)
          const response = await GetJobDetails(formData);
          if (response) {
            setCandidateProcess(response.data);
          }
        }
        if (id?.charAt(0) === 'f') {
          const formData = new FormData();
          const candidate_id: any = Number(id?.slice(1, id?.length))
          formData.append('canId', candidate_id)
          const response = await FailJobDetails(formData);
          if (response) {
            setCandidateProcess(response.data);
          }
        }
        if (id?.charAt(0) === 'c') {
          const formData = new FormData();
          const candidate_id: any = Number(id?.slice(1, id?.length))
          formData.append('canId', candidate_id)
          const response = await CancelJobDetails(formData);
          if (response) {
            setCandidateProcess(response.data);
          }
        }
        if (id?.charAt(0) === 's') {
          const formData = new FormData();
          const candidate_id: any = Number(id?.slice(1, id?.length))
          formData.append('canId', candidate_id)
          const response = await ContactJobDetails(formData);
          if (response) {
            setCandidateProcess(response.data);
          }
        }

      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [id, newData]);

  const handleBack = () => {
    router.back()
  }

  const handleOpenModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpenModalDetail(true);
    setAnimateModal(true);
  };

  const handleCloseModal = () => {
    setAnimateModal(false);
    setOpenModalDetail(false)
    setNewData(pre => !pre)
  };

  const options = {
    chongioitinh: [
      { value: 1, label: 'Nam' },
      { value: 2, label: 'Nữ' },
      { value: 0, label: 'Giới tính khác' },
    ],
    trinhdohocvan: [
      { value: 7, label: 'Đại học trở lên' },
      { value: 5, label: 'Cao đẳng trở lên' },
      { value: 1, label: 'THPT trở lên' },
      { value: 2, label: 'Trung học trở lên' },
      { value: 3, label: 'Chứng chỉ' },
      { value: 4, label: 'Trung cấp trở lên' },
      { value: 6, label: 'Cử nhân trở lên' },
      { value: 8, label: 'Thạc sỹ' },
      { value: 9, label: 'Thạc sỹ Nghệ thuật' },
      { value: 10, label: 'Thạc sỹ Thương mại' },
      { value: 11, label: 'Thạc sỹ Khoa học' },
      { value: 12, label: 'Thạc sỹ Kiến trúc' },
      { value: 13, label: 'Thạc sỹ QTKD' },
      { value: 14, label: 'Thạc sỹ Kỹ thuật ứng dụng' },
      { value: 15, label: 'Thạc sỹ Luật' },
      { value: 16, label: 'Thạc sỹ Y học' },
      { value: 17, label: 'Thạc sỹ Dược phẩm' },
      { value: 18, label: 'Tiến sỹ' },
      { value: 19, label: 'Khác' },

    ],
    kinhnghiemlamviec: [
      { value: "0", label: "Chưa có kinh nghiệm" },
      { value: "1", label: "0 - 1 năm kinh nghiệm" },
      { value: "2", label: "1 - 2 năm kinh nghiệm" },
      { value: "3", label: "2 - 5 năm kinh nghiệm" },
      { value: "4", label: "5 - 10 năm kinh nghiệm" },
      { value: "5", label: "Hơn 10 năm kinh nghiệm" },
    ],
    tinhtranghonnhan: [
      { value: 1, label: 'Độc thân' },
      { value: 2, label: 'Đã kết hôn' },
      { value: 3, label: 'Khác' },
    ],
  };

  const selectedGender: any = options.chongioitinh.find((item) => item.value === isCandidate?.gender);
  const selectedEducation: any = options.trinhdohocvan.find((item) => item.value === isCandidate?.education);
  const selectedExp: any = options.kinhnghiemlamviec.find((item) => item.value === isCandidate?.exp.toString());
  const selectedMarried: any = options.tinhtranghonnhan.find((item) => item.value === isCandidate?.isMarried);

  return (
    <>
      <Head>
        <title>
          Chi tiết hồ sơ ứng viên - Quản lý nhân sự - Timviec365.vn
        </title>
      </Head>
      <div className={`${styles.l_body}`}>
        <div className={`${styles.add_quytrinh}`}>
          <div className={`${styles.back_quytrinh}`}>
            <span onClick={handleBack}>
              <picture>
                <img
                  src={`${'/left_arrow.png'}`}
                  alt="Back"
                ></img>
              </picture>
              Danh sách ứng viên
            </span>
          </div>
        </div>
        <div className={`${styles.l_body_2}`}>
          <div className={`${styles.l_body_2_content} ${styles.l_body_2_left}`}>
            <div className={`${styles.l_body_2_left_header}`}>
              <div className={`${styles.pull_left}`}>
                <p>Chi tiết hồ sơ ứng viên {isCandidate?.name}</p>
              </div>
              <div className={`${styles.text_right}`}>
                {iconEdit && (
                  <a onClick={handleOpenModal} href="" className={`${styles.edit_hs_uv}`}>
                    <img src="/icon-edit-white.svg" />
                  </a>
                )}
              </div>
              {openModalDetail && id?.charAt(0) === 'u' && !id?.includes("p") ? <EditCandidateModal candidate={isCandidate} onCancel={handleCloseModal} /> : ''}
              {openModalDetail && id?.includes("p") ? <EditCandidateIntrview candidate={isCandidate} onCancel={handleCloseModal} processName={isProcessName} /> : ''}
              {openModalDetail && id?.charAt(0) === 'g' ? <EditCandidateGetJob candidate={isCandidate} onCancel={handleCloseModal} /> : ''}
              {openModalDetail && id?.charAt(0) === 'f' ? <EditCandidateFailJob candidate={isCandidate} onCancel={handleCloseModal} /> : ''}
              {openModalDetail && id?.charAt(0) === 'c' ? <EditCandidateCancelJob candidate={isCandidate} onCancel={handleCloseModal} /> : ''}
              {openModalDetail && id?.charAt(0) === 's' ? <EditCandidateContactJob candidate={isCandidate} onCancel={handleCloseModal} /> : ''}
            </div>
            <div className={`${styles.l_body_2_left_body}`}>
              <p className={`${styles.l_body_2_left_body_title}`}>Thông tin ứng viên</p>
              <p>Mã ứng viên: <span className={`${styles.txt_op}`}>UV{id}</span></p>
              <p>Tên ứng viên: <span className={`${styles.txt_op}`}>{isCandidate?.name}</span></p>
              <p>Email: <span className={`${styles.txt_op}`}>{isCandidate?.email}</span></p>
              <p>Số điện thoại: <span className={`${styles.txt_op}`}>{isCandidate?.phone}</span></p>
              <p>Giới tính: <span className={`${styles.txt_op}`}>{selectedGender?.label}</span></p>
              {isCandidate?.birthday && <p>Ngày sinh: <span className={`${styles.txt_op}`}>{format(parseISO(isCandidate?.birthday), 'dd-MM-yyyy')}</span></p>}
              <p>Quê quán: <span className={`${styles.txt_op}`}>{isCandidate?.hometown}</span></p>
              <p>Trình độ học vấn: <span className={`${styles.txt_op}`}>{selectedEducation?.label}</span></p>
              <p>Trường học: <span className={`${styles.txt_op}`}>{isCandidate?.school}</span></p>
              <p>Kinh nghiệm làm việc: <span className={`${styles.txt_op}`}>{selectedExp?.label}</span></p>
              <p>Tình trạng hôn nhân: <span className={`${styles.txt_op}`}>{selectedMarried?.label}</span></p>
              <p>Địa chỉ: <span className={`${styles.txt_op}`}>{isCandidate?.address}</span></p>
            </div>
            <div className={`${styles.l_body_2_left_body}`}>
              <p className={`${styles.l_body_2_left_body_title}`}>Thông tin tuyển dụng</p>
              <p>Nguồn ứng viên: <span className={`${styles.txt_op}`}>{isCandidate?.cvFrom}</span></p>
              <p>Vị trí ứng tuyển: <span className={`${styles.txt_op}`}>{isCandidate?.Title}</span></p>
              <p>Nhân viên tuyển dụng: <span className={`${styles.txt_op}`}>{isCandidate?.NvTuyenDung}</span></p>
            </div>
            <div className={`${styles.l_body_2_left_body}`}>
              <p className={`${styles.l_body_2_left_body_title}`}>Quá trình tuyển dụng</p>
              <p>Thời gian nhận hồ sơ: <span className={`${styles.txt_op}`}>07-07-2023</span></p>
              <p>Giai đoạn chuyển: <span className={`${styles.txt_op}`}>Nhận hồ sơ</span></p>
              <div>
                <p style={{ display: 'inline-block' }}>Đánh giá hồ sơ: </p>
                <Rating size={27} disableFillHover initialValue={isCandidate?.starVote} className={`${styles.star_rating}`} />
              </div>
              {isCandidate?.listSkill?.map((item: any, index: any) => {
                return (
                  <div key={index} className={`${styles.another_add_uv_1}`} style={{ marginLeft: 95, marginBottom: 15 }}>
                    <div className={`${styles.another_skill}`} style={{ marginTop: 10 }}>
                      <p style={{ display: 'inline-block', paddingRight: 20 }}>{item?.skillName}: </p>
                      <Rating size={27} disableFillHover initialValue={item?.skillVote} className={`${styles.star_rating}`} />
                    </div>
                  </div>
                )
              })}
            </div>
            {id?.includes("p") && (
              <div className={`${styles.l_body_2_left_body}`}>
                {isProcessName && <p className={`${styles.l_body_2_left_body_title}`}>Giai đoạn chuyển: {isProcessName}</p>}
                {isCandidateAll?.createdAt &&
                  <p>Thời gian chuyển giai đoạn: <span className={`${styles.txt_op}`}>{format(parseISO(isCandidateAll?.createdAt), 'dd-MM-yyyy')}</span></p>
                }

                <p>Mức lương mong muốn: <span className={`${styles.txt_op}`}>{isCandidateAll?.resiredSalary}</span></p>
                <p>Mức lương thực: <span className={`${styles.txt_op}`}>{isCandidateAll?.salary}</span></p>
                {isCandidateAll?.interviewTime &&
                  <p>Thời gian hẹn: <span className={`${styles.txt_op}`}>{format(parseISO(isCandidateAll?.interviewTime), 'dd-MM-yyyy')}</span></p>
                }

                <p>Nhân viên tham gia: <span className={`${styles.txt_op}`}>{isCandidateAll?.nhanvien}</span></p>
                <p>Ghi chú: <span className={`${styles.txt_op}`}>{isCandidateAll?.note}</span></p>
              </div>
            )}
            {id?.charAt(0) === 'g' && (
              <div className={`${styles.l_body_2_left_body}`}>
                <p className={`${styles.l_body_2_left_body_title}`}>Giai đoạn chuyển: Nhận việc</p>
                <p>Mức lương mong muốn: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_get_job?.resiredSalary}</span></p>
                <p>Mức lương thực: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_get_job?.salary}</span></p>
                {isCandidateProcess?.detail_get_job?.interviewTime &&
                  <p>Thời gian hẹn: <span className={`${styles.txt_op}`}>{format(parseISO(isCandidateProcess?.detail_get_job?.interviewTime), 'dd-MM-yyyy')}</span></p>
                }
                <p>Nhân viên tham gia: <span className={`${styles.txt_op}`}>{EmpMatchProcess?.userName}</span></p>
                <p>Ghi chú: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_get_job?.note}</span></p>
              </div>
            )}
            {id?.charAt(0) === 'f' && (
              <div className={`${styles.l_body_2_left_body}`}>
                <p className={`${styles.l_body_2_left_body_title}`}>Giai đoạn chuyển: Trượt vòng loại hồ sơ</p>
                {isCandidateProcess?.detail_fail_job?.createdAt &&
                  <p>Thời gian chuyển giai đoạn: <span className={`${styles.txt_op}`}>{format(parseISO(isCandidateProcess?.detail_fail_job?.createdAt), 'dd-MM-yyyy')}</span></p>
                }
                <p>Ghi chú: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_fail_job?.note}</span></p>
              </div>
            )}
            {id?.charAt(0) === 'c' && (
              <div className={`${styles.l_body_2_left_body}`}>
                <p className={`${styles.l_body_2_left_body_title}`}>Giai đoạn chuyển: Hủy phỏng vấn</p>
                {isCandidateProcess?.detail_cancel_job?.createdAt &&
                  <p>Thời gian chuyển giai đoạn: <span className={`${styles.txt_op}`}>{format(parseISO(isCandidateProcess?.detail_cancel_job?.createdAt), 'dd-MM-yyyy')}</span></p>
                }
                <p>Mức lương mong muốn: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_cancel_job?.resiredSalary}</span></p>
                <p>Mức lương thực: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_cancel_job?.salary}</span></p>
                <p>Ghi chú: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_cancel_job?.note}</span></p>
              </div>
            )}
            {id?.charAt(0) === 's' && (
              <>
                <div className={`${styles.l_body_2_left_body}`}>
                  {isProcessName && <p className={`${styles.l_body_2_left_body_title}`}>Giai đoạn chuyển: {isProcessName}</p>}
                  <p>Thời gian chuyển giai đoạn: <span className={`${styles.txt_op}`}>{""}</span></p>
                  <p>Mức lương mong muốn: <span className={`${styles.txt_op}`}>{""}</span></p>
                  <p>Mức lương thực: <span className={`${styles.txt_op}`}>{""}</span></p>
                  <p>Thời gian hẹn: <span className={`${styles.txt_op}`}>{""}</span></p>
                  <p>Nhân viên tham gia: <span className={`${styles.txt_op}`}>{EmpMatchProcess?.userName}</span></p>
                  <p>Ghi chú: <span className={`${styles.txt_op}`}>{""}</span></p>
                </div>
                <div className={`${styles.l_body_2_left_body}`}>
                  <p className={`${styles.l_body_2_left_body_title}`}>Giai đoạn chuyển: Ký hợp đồng</p>
                  {isCandidateProcess?.detail_contact_job?.offerTime &&
                    <p>Thời gian kí hợp đồng: <span className={`${styles.txt_op}`}>{format(parseISO(isCandidateProcess?.detail_contact_job?.offerTime), 'dd-MM-yyyy')}</span></p>
                  }
                  <p>Nhân viên tham gia: <span className={`${styles.txt_op}`}>{EmpMatchProcess?.userName}</span></p>
                  <p>Mức lương mong muốn: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_contact_job?.resiredSalary}</span></p>
                  <p>Mức lương thực: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_contact_job?.salary}</span></p>
                  <p>Ghi chú: <span className={`${styles.txt_op}`}>{isCandidateProcess?.detail_contact_job?.note}</span></p>
                </div>
              </>
            )}
          </div>
          <div className={`${styles.l_body_2_content} ${styles.l_body_2_right}`}>
            <p style={{ textAlign: 'center', color: '#4C5BD4', width: 'auto' }}>Chưa cập nhật cv ứng viên</p>
          </div>
        </div>
      </div>
    </>
  );
}