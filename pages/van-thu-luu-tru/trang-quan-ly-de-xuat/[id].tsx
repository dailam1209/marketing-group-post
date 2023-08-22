import { useRouter } from "next/router";
import styles from "./detail_proposal.module.css";
import Link from "next/link";
import Image from "next/image";
import Comp_sidebar_detail from "@/components/van-thu-luu-tru/comp_sidebar_detail/Comp_sidebar_detail";
import Item_detail_person from "@/components/van-thu-luu-tru/comp_sidebar_detail/Item_detail_person";
import { useEffect, useState } from "react";
import { fetch_detail_propose } from "@/utils/api/dexuat/api_fecth_cty";
import { formatDate_ymd_to_dmy } from "./danh-sach-de-xuat";
import { fetch_department, fetch_employee, fetch_position, fetch_shift } from "@/utils/api/dexuat/api_fetch";
import { ModalDetailsLLV } from "@/components/van-thu-luu-tru/tao-de-xuat/detail_llv/Detail_llv";
import { getCookie } from "cookies-next";
import { post_deletedx, post_duyetdx } from "@/utils/api/dexuat/api_post";
import { Modal } from "antd";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import { Custom_label } from "@/components/van-thu-luu-tru/components/Input/Label/Label";
import { select_style } from "../trang-chu-quan-ly-cong-van/cai-dat-quan-ly-cong-van";

export const formatDate_number_raw = (date:any) => {
  const dateObj = new Date(date*1000);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return dateObj.toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');
}
export const formatDate_number = (date:any) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return dateObj.toLocaleString('en-US', options);
}
export const formatDate_string = (date:any) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return dateObj.toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');
}
export const formatDate_number_hour = (date:any) => {
  const dateObj = new Date(date*1000);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return dateObj.toLocaleString('en-US', options);
}
export const formatDate_month = (timestamp:any) => {
  const date = new Date(timestamp * 1000);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding padding
  const year = date.getFullYear();

  const formattedDate = `${month}/${year}`;

  return formattedDate
}
const DetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [detail_propose,setDetail_propose] = useState<any>();
  const [createdDate, setCreatedDate] = useState('');
  const [department, setDepartment] = useState<any>();
  const [employee, setEmployee] = useState<any>();
  const [position, setPosition] = useState<any>();
  const [shift,setShift] = useState<any>();
  const [id_user_duyet, setId_user_duyet] = useState<any>();

  const [absent,setAbsent] = useState<any>();
  const [switch_shift,setSwitch_shift] = useState<any>();
  const [advance,setAdvance] = useState<any>();
  const [asset_allocation,setAsset_allocation] = useState<any>();
  const [quit,setQuit] = useState<any>();
  const [raise,setRaise] = useState<any>();
  const [assign,setAssign] = useState<any>();
  const [working_rotation,setWorking_otaion] = useState<any>();
  const [join_project,setJoin_project] = useState<any>();
  const [overtime,setOvertime] = useState<any>();
  const [pregnant,setPregnant] = useState<any>();
  const [meeting_room,setMeeting_room] = useState<any>();
  const [transportation,setTransportation] = useState<any>();
  const [facility_fixing,setFacility_fixing] = useState<any>();
  const [payment,setPayment] = useState<any>();
  const [complaint,setComplaint] = useState<any>();
  const [plus_effort,setPlus_effort] = useState<any>();
  const [bonus_payoff,setBonus_payoff] = useState<any>();
  const [percentage,setPercentage] = useState<any>();
  const [work_schedule,setWork_schedule] = useState<any>();
  
  const shiftName = (shift_id:any) => {
    if(shift){
      if(shift_id){
        console.log(shift_id)
        return shift?.find((p:any)=> p.shift_id === shift_id)?.shift_name
      }
      return 'Nghỉ cả ngày (tất cả các ca)'
    }
  }
  useEffect(()=>{
    const fetchdata = async () => {
      const token = sessionStorage.getItem("token");
      if(id){
        const res_detail_propose = await fetch_detail_propose(id);
        setDetail_propose(res_detail_propose?.data.detailDeXuat[0])
        const res_department = await fetch_department(token);
        const res_employee = await fetch_employee(token);
        const res_shift = await fetch_shift(token);
        const res_position = await fetch_position("chucvu_dx_bn");
        setDepartment(res_department?.data.items);
        setEmployee(res_employee?.data.items);
        setPosition(res_position);
        setShift(res_shift?.data.list);
      }
    }
  fetchdata();
  },[id])
  useEffect(()=>{
    if(detail_propose){
      const dateObj = new Date(detail_propose?.thoi_gian_tao);
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      const formattedDate = dateObj.toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');
      setCreatedDate(formattedDate)
      setAbsent(detail_propose?.thong_tin_chung.nghi_phep)
      setSwitch_shift(detail_propose?.thong_tin_chung.doi_ca)
      setAdvance(detail_propose?.thong_tin_chung.tam_ung)
      setAsset_allocation(detail_propose?.thong_tin_chung.cap_phat_tai_san)
      setQuit(detail_propose?.thong_tin_chung.thoi_viec)
      setRaise(detail_propose?.thong_tin_chung.tang_luong)
      setAssign(detail_propose?.thong_tin_chung.bo_nhiem)
      setWorking_otaion(detail_propose?.thong_tin_chung.luan_chuyen_cong_tac)
      setJoin_project(detail_propose?.thong_tin_chung.tham_gia_du_an)
      setOvertime(detail_propose?.thong_tin_chung.tang_ca)
      setPregnant(detail_propose?.thong_tin_chung.nghi_thai_san)
      setMeeting_room(detail_propose?.thong_tin_chung.su_dung_phong_hop)
      setTransportation(detail_propose?.thong_tin_chung.su_dung_xe_cong)
      setFacility_fixing(detail_propose?.thong_tin_chung.sua_chua_co_so_vat_chat)
      setPayment(detail_propose?.thong_tin_chung.thanh_toan)
      setComplaint(detail_propose?.thong_tin_chung.khieu_nai)
      setPlus_effort(detail_propose?.thong_tin_chung.xac_nhan_cong)
      setBonus_payoff(detail_propose?.thong_tin_chung.thuong_phat)
      setPercentage(detail_propose?.thong_tin_chung.hoa_hong)
      setWork_schedule(detail_propose?.thong_tin_chung.lich_lam_viec)
      setId_user_duyet(detail_propose?.lanh_dao_duyet)
    }
  },[detail_propose])
  const [parsedData, setParsedData]  = useState<any>()
  useEffect(()=>{
    if(work_schedule && work_schedule.ngay_lam_viec){
      const parsedData = JSON.parse(work_schedule.ngay_lam_viec)[0]
      setParsedData(parsedData)
    }
  },[work_schedule])
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState<boolean>(false);
  const data = {
    shiftType: parsedData?.shiftType,
    apply_month: work_schedule?.thang_ap_dung*1000,
    cy_detail: parsedData?.data 
  };
  const [showUserForward,setShowUserForward] = useState(false);
  const [userForward,setUserForward] = useState();
  const employee_options = employee?.map((opts: any) => {
    return {
      value: opts.ep_id,
      label: opts.ep_name,
      name: "id_uct",
    };
  });
  const handleDuyet = async () => {
    try{
      const res = await post_duyetdx({_id: id,type: 1})
      alert(res.message? res.message : res.data.message);
      const res_detail_propose = await fetch_detail_propose(id);
      setDetail_propose(res_detail_propose?.data.detailDeXuat[0])
    }
    catch(err){
      console.log(err);
    }
  }
  const handleForward = () => {
    setShowUserForward(true);
  }
  const forwardUser = async () =>{
    if(userForward){
      try{
        const res = await post_duyetdx({_id: id,type: 4,id_uct: userForward})
        alert(res.message? res.message : res.data.message);
        const res_detail_propose = await fetch_detail_propose(id);
        setDetail_propose(res_detail_propose?.data.detailDeXuat[0])
      }catch(err){
        console.log(err);
      }
    }
  }
  const handleForceToWork = async () => {
    try{
      const res = await post_duyetdx({_id: id,type: 3})
      alert(res.message? res.message : res.data.message);
      const res_detail_propose = await fetch_detail_propose(id);
      setDetail_propose(res_detail_propose?.data.detailDeXuat[0])
    }catch(err){
      console.log(err);
    }
  }
  const handleReceive = async () => {
    try{
      const res = await post_duyetdx({_id: id,type: 6})
      alert(res?.message? res?.message : res?.data.message);
      const res_detail_propose = await fetch_detail_propose(id);
      setDetail_propose(res_detail_propose?.data.detailDeXuat[0])
    }catch(err){
      console.log(err);
    }
  }
  const handleReject = async () => {
    try{
      const res = await post_duyetdx({_id: id,type: 2})
      alert(res.message? res.message : res.data.message);
      const res_detail_propose = await fetch_detail_propose(id);
      setDetail_propose(res_detail_propose?.data.detailDeXuat[0])
    }catch(err){
      console.log(err);
    }
  }
  const handleDelete = async () => {
    try{
      const res = await post_deletedx({id: id,type: 0})
      alert(res?.data.message)
      const res_detail_propose = await fetch_detail_propose(id);
      setDetail_propose(res_detail_propose?.data.detailDeXuat[0])
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className={styles.container_detail}>
      {ModalDetailsLLV({
            open: isModalDetailsOpen,
            setOpen: setIsModalDetailsOpen,
            data: data,
            shiftType: data?.shiftType,
          })}
      <Modal
        open={showUserForward}
        onCancel={() => setShowUserForward(false)}
        closable={false}
        footer={null}
        className={`${styles.userForward}`}>
        <div className={`${styles.userForwardTitle}`}>
          <p className={styles.userForwardTitleText}>Duyệt chuyển tiếp</p>
          <div onClick={()=>setShowUserForward(false)} className={styles.userForwardCloseBtn}>
            <Image alt="" src='/icon/X-trang.png' width={15} height={15} />
          </div>
        </div>
        <div className={styles.userForwardBody}>
          <Section
            style="section"
            label={
              <Custom_label
                isRequired={true}
                label_class="font_500"
                title="Người duyệt chuyển tiếp"
              />
            }
            input={
              <Input_select
                style={select_style}
                options={employee_options}
                onChange={(e:any)=>setUserForward(e.value)}
                placeholder="Chọn người duyệt chuyển tiếp"
              />
            }
            />
          <div onClick={forwardUser} className={styles.userForwardSendSection}>
            <p className={styles.userForwardSendBtn}>Gửi</p>
          </div>
        </div>
      </Modal>
      <div className={styles.container}>
        <div className={styles.offerlist}>
          <div className={styles.offerlist_left}>
            <div className={styles.offerlist_left_top}>
              <div className={styles.left_top_a}>
                <Link href={"/van-thu-luu-tru/"}></Link>
              </div>
              <div className={styles.left_top_icon}>
                <div className={styles.left_icon}>
                  <Image
                    src={"/icon/create_propose/printer.png"}
                    width={35}
                    height={35}
                    alt="icon_print"
                  />
                </div>
              </div>
            </div>
            {detail_propose ? (
              <>
                <div className={styles.offerlist_left_content}>
                  <div className={styles.left_content_desc}>
                    <div className={styles.content_desc_title}>
                      {detail_propose?.ten_de_xuat}
                    </div>
                    <div className={styles.content_desc_infor}>
                      <h3 className={styles.infor_title}>Thông tin đề xuất</h3>
                      <p className={styles.offerlist_user}>
                        Người tạo:{" "}
                        <span className={styles.text_black}>{detail_propose?.nguoi_tao}</span>
                      </p>
                      <p className={styles.offerlist_user}>
                        Nhóm đề xuất:{" "}
                        <span className={styles.text_primary}>
                          {detail_propose?.nhom_de_xuat === 1 && <>Đơn xin nghỉ phép</>}
                          {detail_propose?.nhom_de_xuat === 2 && <>Đơn xin đổi ca</>}
                          {detail_propose?.nhom_de_xuat === 3 && <>Đơn tạm ứng</>}
                          {detail_propose?.nhom_de_xuat === 4 && <>Đơn xin cấp phát tài sản</>}
                          {detail_propose?.nhom_de_xuat === 5 && <>Đơn xin thôi việc</>}
                          {detail_propose?.nhom_de_xuat === 6 && <>Đề xuất tăng lương</>}
                          {detail_propose?.nhom_de_xuat === 7 && <>Đề xuất bổ nhiệm</>}
                          {detail_propose?.nhom_de_xuat === 8 && <>Đề xuất luân chuyển công tác</>}
                          {detail_propose?.nhom_de_xuat === 9 && <>Đề xuất tham gia dự án</>}
                          {detail_propose?.nhom_de_xuat === 10 && <>Đề xuất xin tăng ca</>}
                          {detail_propose?.nhom_de_xuat === 11 && <>Đề xuất xin nghỉ chế độ thai sản</>}
                          {detail_propose?.nhom_de_xuat === 12 && <>Đề xuất đăng ký sử dụng phòng họp</>}
                          {detail_propose?.nhom_de_xuat === 13 && <>Đề xuất đăng ký sử dụng xe công</>}
                          {detail_propose?.nhom_de_xuat === 14 && <>Đề xuất sửa chữa cơ sở vật chất</>}
                          {detail_propose?.nhom_de_xuat === 15 && <>Đề xuất thanh toán</>}
                          {detail_propose?.nhom_de_xuat === 16 && <>Đề xuất khiếu nại</>}
                          {detail_propose?.nhom_de_xuat === 17 && <>Đề xuất cộng công</>}
                          {detail_propose?.nhom_de_xuat === 19 && <>Đề xuất thưởng phạt</>}
                          {detail_propose?.nhom_de_xuat === 18 && <>Đề xuất lịch làm việc</>}
                          {detail_propose?.nhom_de_xuat === 20 && <>Đề xuất hoa hồng</>}
                        </span>
                      </p>
                      <p className={styles.offerlist_user}>
                        Thời gian tạo: <span>{createdDate}</span>
                      </p>
                      {detail_propose?.thong_tin_chung.nghi_phep.loai_np ? (
                        <p className={styles.offerlist_user}>
                          Loại đề xuất: <span>
                            {detail_propose?.thong_tin_chung.nghi_phep.loai_np === 2 && <>Đề xuất đột xuất</>}
                            {detail_propose?.thong_tin_chung.nghi_phep.loai_np === 1 && <>Đề xuất có kế hoạch</>}
                          </span>
                        </p>
                      ) : <></> }
                      <p className={styles.offerlist_user}>
                        Cập nhật: <span>{detail_propose?.cap_nhat} ngày trước</span>
                      </p>
                    </div>
                    <div className={styles.content_desc_all}>
                      <h3 className={styles.content_desc_all_title}>
                        Thông tin chung
                      </h3>
                      <p className={styles.offerlist_user}>
                        1. Họ và tên:{" "}
                        <span className={styles.text_primary}>
                          {detail_propose?.nguoi_tao}
                        </span>
                      </p>
                      {detail_propose?.nhom_de_xuat === 1 && <>
                        {absent?.nd.map((nd:any,index:any)=>
                          <>
                            <p className={styles.offerlist_user}>Lịch nghỉ{" "} {index + 1}</p>
                            <p className={styles.offerlist_user}>
                            {" "}- Ngày bắt đầu nghỉ:{" "}
                              <span>{nd?.bd_nghi.split('-').join('/')}</span>
                            </p>
                            <p className={styles.offerlist_user}>
                            {" "}- Ngày kết thúc nghỉ:{" "}
                              <span>{nd?.kt_nghi.split('-').join('/')}</span>
                            </p>
                            <p className={styles.offerlist_user}>
                            {" "}- Ca nghỉ:{" "}
                              <span>{shiftName(nd.ca_nghi)}</span>
                            </p>
                          </>
                        )}
                        <p className={styles.offerlist_user}>2. Lý do xin nghỉ:{" "}{absent?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 2 && <>
                        <p className={styles.offerlist_user}>
                          2. Ngày cần đổi:{" "}
                          <span>{formatDate_number_raw(switch_shift?.ngay_can_doi)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Ca cần đổi:{" "}
                          <span>{shiftName(switch_shift?.ca_can_doi)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Ngày muốn đổi:{" "}
                          <span>{formatDate_number_raw(switch_shift?.ngay_muon_doi)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          5. Ca muốn đổi:{" "}
                          <span>{shiftName(switch_shift?.ca_muon_doi)}</span>
                        </p>
                        <p className={styles.offerlist_user}>6. Lý do xin đổi ca:{" "}{switch_shift?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 3 && <>
                        <p className={styles.offerlist_user}>
                          2. Ngày tạm ứng:{" "}
                          <span>{formatDate_number_raw(advance?.ngay_tam_ung)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Số tiền tạm ứng:{" "}
                          <span>{advance?.sotien_tam_ung}</span>
                        </p>
                        <p className={styles.offerlist_user}>4. Lý do xin tạm ứng:{" "}{advance?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 4 && <>
                        <p className={styles.offerlist_user}>
                          2. Dánh sách tài sản:{" "}
                          <span>{asset_allocation?.danh_sach_tai_san}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Số lượng tài sản:{" "}
                          <span>{asset_allocation?.so_luong_tai_san}</span>
                        </p>
                        <p className={styles.offerlist_user}>4. Lý do xin cấp phát tài sản:{" "}{asset_allocation?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 5 && <>
                        <p className={styles.offerlist_user}>
                          2. Ngày bắt đầu thôi việc:{" "}
                          <span>{formatDate_ymd_to_dmy(quit?.ngaybatdau_tv)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Ca bắt đầu thôi việc:{" "}
                          <span>{shiftName(quit?.ca_bdnghi)}</span>
                        </p>
                        <p className={styles.offerlist_user}>4. Lý do xin thôi việc:{" "}{quit?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 6 && <>
                        <p className={styles.offerlist_user}>
                          2. Mức lương hiện tại:{" "}
                          <span>{raise?.mucluong_ht}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Mức lương muốn tăng:{" "}
                          <span>{raise?.mucluong_tang}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Ngày bắt đầu tăng lương:{" "}
                          <span>{formatDate_number(raise?.date_tang_luong)}</span>
                        </p>
                        <p className={styles.offerlist_user}>5. Lý do xin tăng lương:{" "}{raise?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 7 && <>
                        <p className={styles.offerlist_user}>
                          2. Thành viên được bổ nhiệm:{" "}
                          <span>{employee?.find((em:any) => em.ep_id === assign?.thanhviendc_bn).userName}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Tên phòng ban hiện tại:{" "}
                          <span>{department?.find((dep:any) => dep.dep_id.toString() === assign?.name_ph_bn).dep_name}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Chức vụ hiện tại:{" "}
                          <span>{position?.find((pos:any) => pos.value === assign?.chucvu_hientai.toString()).label}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          5. Chức vụ được đề xuất bổ nhiệm:{" "}
                          <span>{position?.find((pos:any) => pos.value === assign?.chucvu_dx_bn.toString()).label}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          6. Tên phòng ban mới:{" "}
                          <span>{department?.find((dep:any) => dep.dep_id.toString() === assign?.phong_ban_moi).dep_name}</span>
                        </p>
                        <p className={styles.offerlist_user}>7. Lý do đề xuất bổ nhiệm:{" "}{assign?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 8 && <>
                        <p className={styles.offerlist_user}>
                          2. Chức vụ người cần luân chuyển:{" "}
                          <span>{position?.find((pos:any) => pos.value === working_rotation?.cv_nguoi_lc).label}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Phòng ban người cần luân chuyển:{" "}
                          <span>{department?.find((dep:any) => dep.dep_id.toString() === working_rotation?.pb_nguoi_lc).dep_name}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Nơi đang công tác:{" "}
                          <span>{working_rotation?.noi_cong_tac}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          5. Nơi cần chuyển đến:{" "}
                          <span>{working_rotation?.noi_chuyen_den}</span>
                        </p>
                        <p className={styles.offerlist_user}>6. Lý do đề xuất luân chuyển công tác:{" "}{working_rotation?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 9 && <>
                        <p className={styles.offerlist_user}>
                          2. Chức vụ người cần tham gia dự án:{" "}
                          <span>{position?.find((pos:any) => pos.value === join_project?.cv_nguoi_da).label}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Phòng ban của người cần tham gia dự án:{" "}
                          <span>{department?.find((dep:any) => dep.dep_id.toString() === join_project?.pb_nguoi_da).dep_name}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Tên dự án muốn tham gia:{" "}
                          <span>{join_project?.dx_da}</span>
                        </p>

                        <p className={styles.offerlist_user}>5. Lý do đề xuất tham gia dự án:{" "}{join_project?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 10 && <>
                        <p className={styles.offerlist_user}>
                          2. Thời gian tăng ca:{" "}
                          <span>{formatDate_number(overtime?.time_tc)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Ca tăng:{" "}
                          <span>{shiftName(overtime?.shift_id)}</span>
                        </p>
                        <p className={styles.offerlist_user}>4. Lý do đề xuất tăng ca:{" "}{overtime?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 11 && <>
                        <p className={styles.offerlist_user}>
                          2. Ngày bắt đầu nghỉ thai sản:{" "}
                          <span>{formatDate_number(pregnant?.ngaybatdau_nghi_ts)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Ngày kết thúc nghỉ thai sản:{" "}
                          <span>{formatDate_number(pregnant?.ngayketthuc_nghi_ts)}</span>
                        </p>
                        <p className={styles.offerlist_user}>4. Lý do đề xuất nghỉ thai sản:{" "}{pregnant?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 12 && <>
                        <p className={styles.offerlist_user}>
                          2. Thời gian bắt đầu họp:{" "}
                          <span>{formatDate_number_hour(meeting_room?.bd_hop)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Thời gian kết thúc họp:{" "}
                          <span>{formatDate_number_hour(meeting_room?.end_hop)}</span>
                        </p>
                        <p className={styles.offerlist_user}>4. Lý do đề xuất sử dụng phòng họp:{" "}{meeting_room?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 13 && <>
                        <p className={styles.offerlist_user}>
                          2. Ngày bắt đầu sử dụng xe:{" "}
                          <span>{formatDate_number_raw(transportation?.bd_xe)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Ngày kết thúc sử dụng xe:{" "}
                          <span>{formatDate_number_raw(transportation?.end_xe)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Số lượng xe:{" "}
                          <span>{transportation?.soluong_xe}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          5. Giờ đi:{" "}
                          <span>{transportation?.local_di}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          6. Giờ đến:{" "}
                          <span>{transportation?.local_den}</span>
                        </p>
                        <p className={styles.offerlist_user}>7. Lý do đề xuất sử dụng xe công:{" "}{transportation?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 14 && <>  
                        <p className={styles.offerlist_user} >
                          <p style={{marginBottom: '20px'}}>2. Cơ sở vật chất cần sửa:{" "}</p>
                          {facility_fixing?.noi_dung.map((nd:any,index:any)=>{
                            return (
                              <>
                                <p key={index} className={styles.offerlist_user}>
                                  * Cở sở vật chất {index + 1}:{" "}
                                </p>
                                <p className={styles.offerlist_user}>   - Tên cơ sở vật chất: {nd.name_taisan}</p>
                                <p className={styles.offerlist_user}>   - Số tiền sửa chữa: {nd.so_tien}</p>
                                <p className={styles.offerlist_user}>   - Lý do sửa chữa: {nd.ly_do}</p>
                              </>
                            )
                          })}
                        </p>
                        <p className={styles.offerlist_user}>3. Lý do đề xuất sửa chữa cơ sở vật chất:{" "}{facility_fixing?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 15 && <>
                        <p className={styles.offerlist_user}>
                          2. Số tiền cần thanh toán:{" "}
                          <span>{payment?.so_tien_tt} đ</span>
                        </p>
                        <p className={styles.offerlist_user}>3. Lý do đề xuất thanh toán:{" "}{payment?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 16 && <>
                        <p className={styles.offerlist_user}>2. Nội dung khiếu nại:{" "}{complaint?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 17 && <>
                        <p className={styles.offerlist_user}>
                          2. Thời gian xác nhận công:{" "}
                          <span>{formatDate_string(plus_effort?.time_xnc)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Ca xác nhận công:{" "}
                          <span>{shiftName(plus_effort?.ca_xnc)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Thời gian vào ca:{" "}
                          <span>{plus_effort?.time_vao_ca}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          5. Thời gian hết ca:{" "}
                          <span>{plus_effort?.time_het_ca}</span>
                        </p>
                        <p className={styles.offerlist_user}>6. Lý do đề xuất cộng công:{" "}{plus_effort?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 19 && <>
                        <p className={styles.offerlist_user}>
                          2. Số tiền thưởng phạt:{" "}
                          <span>{bonus_payoff?.so_tien_tp} đ</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Thời gian thưởng phạt:{" "}
                          <span>{formatDate_string(bonus_payoff?.time_tp)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Người thưởng phạt:{" "}
                          <span>{bonus_payoff?.nguoi_tp}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          5. Loại thưởng phạt:{" "}
                          <span>{bonus_payoff?.type_tp === 1 ? <>Đề xuất thưởng</> : <>Đề xuất phạt</>}</span>
                        </p>
                        <p className={styles.offerlist_user}>6. Lý do đề xuất thưởng phạt:{" "}{bonus_payoff?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 20 && <>
                        <p className={styles.offerlist_user}>
                          2. Chu kỳ hoa hồng:{" "}
                          <span>{percentage?.chu_ky}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Thời gian hoa hồng:{" "}
                          <span>{percentage?.time_hh}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Thời gian kết thúc hoa hồng:{" "}
                          <span>{percentage?.item_mdt_date}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          5. Doanh thu:{" "}
                          <span>{percentage?.dt_money}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          6. Mức doanh thu:{" "}
                          <span>{percentage?.name_dt}</span>
                        </p>
                        <p className={styles.offerlist_user}>7. Lý do đề xuất hoa hồng doanh thu:{" "}{percentage?.ly_do}</p>
                      </>}
                      {detail_propose?.nhom_de_xuat === 18 && <>
                        <p className={styles.offerlist_user}>
                          2. Lịch làm việc:{" "}
                          <span>
                            {work_schedule?.lich_lam_viec === 1 && 'Thứ 2- Thứ 6'}
                            {work_schedule?.lich_lam_viec === 2 && 'Thứ 2- Thứ 7'}
                            {work_schedule?.lich_lam_viec === 3 && 'Thứ 2- CN'}
                          </span>
                        </p>
                        <p className={styles.offerlist_user}>
                          3. Tháng áp dụng:{" "}
                          <span>{formatDate_month(work_schedule?.thang_ap_dung)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          4. Ngày bắt đầu làm việc:{" "}
                          <span>{formatDate_number_raw(work_schedule?.ngay_bat_dau)}</span>
                        </p>
                        <p className={styles.offerlist_user}>
                          5. Chi tiết lịch làm việc:{" "}
                          <span style={{
                            color: '#4C5BD4',
                            padding: '5.5px 20px',
                            border: '1px solid #4C5BD4',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            }}
                            onClick={()=>setIsModalDetailsOpen(true)}
                            >
                            Xem lịch làm việc
                          </span>
                        </p>
                        <p className={styles.offerlist_user}>6. Lý do đề xuất lịch làm việc:{" "}{work_schedule?.ly_do}</p>
                      </>}
                      <p className={styles.offerlist_user}>
                        File đính kèm:{" "}
                      {detail_propose?.file_kem.map((file:any,index:any)=>{
                        return <a key={index} href={file.file} >File {index + 1}{" "}</a>
                      })}
                      </p>
                    </div>
                  </div>
                  <div className={styles.left_content_btn}>
                    {detail_propose?.del_type === 2 ? (
                      <>
                        <button className={styles.content_btn_confirm}>
                          <div className={styles.content_div_img}>
                            <Image
                              height={30}
                              width={30}
                              src="/icon/create_propose/dexuat_reject.png"
                              alt=""
                            />
                          </div>
                          <span className={styles.reject}>Đề xuất đã bị xóa</span>
                        </button>
                      </>
                    ):(
                      <>
                        {detail_propose?.type_duyet === 5 && (
                            <button className={styles.content_btn_confirm}>
                              <div className={styles.content_div_img}>
                                <Image
                                  height={30}
                                  width={30}
                                  src="/icon/create_propose/dexuat_accep.png"
                                  alt=""
                                />
                              </div>
                              <span className={styles.confirm}>Được chấp thuận</span>
                            </button>
                        )}
                        {detail_propose?.type_duyet === 11 && (
                            <button className={styles.content_btn_confirm}>
                              <div className={styles.content_div_img}>
                                <Image
                                  height={30}
                                  width={30}
                                  src="/icon/create_propose/dexuat_accepting.png"
                                  alt=""
                                />
                              </div>
                              <span className={styles.wait_confirm}>Chờ công ty duyệt</span>
                            </button>
                        )}
                        {detail_propose?.type_duyet === 3 && (
                          <button className={styles.content_btn_confirm}>
                            <div className={styles.content_div_img}>
                              <Image
                                height={30}
                                width={30}
                                src="/icon/create_propose/dexuat_reject.png"
                                alt=""
                              />
                            </div>
                            <span className={styles.reject}>Bị từ chối</span>
                          </button>
                        )}
                        {detail_propose?.type_duyet === 6 && (
                            <button className={styles.content_btn_confirm}>
                              <div className={styles.content_div_img}>
                                <Image
                                  height={30}
                                  width={30}
                                  src="/icon/create_propose/dexuat_reject.png"
                                  alt=""
                                />
                              </div>
                              <span className={styles.compulsory_work}>Bắt buộc đi làm</span>
                            </button>
                        )}
                        {detail_propose?.type_duyet === 0 && (
                            <button className={styles.content_btn_confirm}>
                              <div className={styles.content_div_img}>
                                <Image
                                  height={30}
                                  width={30}
                                  src="/icon/create_propose/dexuat_accepting.png"
                                  alt=""
                                />
                              </div>
                              <span className={styles.wait_confirm}>Đang chờ duyệt</span>
                            </button>
                        )}
                        {detail_propose?.type_duyet === 7 && (
                            <button className={styles.content_btn_confirm}>
                              <div className={styles.content_div_img}>
                                <Image
                                  height={30}
                                  width={30}
                                  src="/icon/create_propose/dexuat_accepting.png"
                                  alt=""
                                />
                              </div>
                              <span className={styles.wait_confirm}>Đã được tiếp nhận</span>
                            </button>
                        )}
                        {detail_propose?.type_duyet === 10 && (
                            <button className={styles.content_btn_confirm}>
                              <div className={styles.content_div_img}>
                                <Image
                                  height={30}
                                  width={30}
                                  src="/icon/create_propose/dexuat_accepting.png"
                                  alt=""
                                />
                              </div>
                              <span className={styles.wait_confirm}>Đang chờ lãnh đạo còn lại duyệt</span>
                            </button>
                        )}
                        {(detail_propose?.qua_han_duyet && detail_propose?.type_duyet !== 5) && (
                          <>
                            <button className={styles.content_btn_confirm}>
                              <div className={styles.content_div_img}>
                                <Image
                                  height={30}
                                  width={30}
                                  src="/icon/create_propose/dexuat_reject.png"
                                  alt=""
                                />
                              </div>
                              <span className={styles.reject}>Đã quá hạn duyệt</span>
                            </button>
                          </>
                        )}
                        {!detail_propose?.qua_han_duyet &&(
                          <>
                            {id_user_duyet && id_user_duyet?.some((user:any)=>user?.idQLC?.toString() === getCookie('userID')) && (
                              <>
                                {detail_propose?.type_duyet === 0 && (
                                  <button onClick={handleReceive} className={styles.apiBtnReceive}>
                                    <div className={styles.content_div_img}>
                                      <Image
                                        height={24}
                                        width={24}
                                        src="/icon/create_propose/dexuat_add.png"
                                        alt=""
                                      />
                                    </div>
                                  <span className={styles.aptBtnTiepnhan}>Tiếp nhận</span>
                                </button>
                                )}
                                {(detail_propose?.type_duyet === 7 || detail_propose?.type_duyet === 10 || 
                                (detail_propose?.type_duyet === 11 && getCookie('userID') === getCookie('com_id'))) && (
                                  <button onClick={handleDuyet} className={styles.apiBtnConfirm}>
                                  <div className={styles.content_div_img}>
                                      <Image
                                        height={24}
                                        width={24}
                                        src="/icon/create_propose/accept_dx.png"
                                        alt=""
                                      />
                                    </div>
                                  <span className={styles.aptBtnText}>Chấp Thuận</span>
                                </button>
                                )}
                                {(detail_propose?.type_duyet === 5 || detail_propose?.type_duyet === 10 ) && (
                                  <button onClick={handleReceive} className={styles.apiBtnReject}>
                                  <div className={styles.content_div_img}>
                                      <Image
                                        height={24}
                                        width={24}
                                        src="/icon/create_propose/reject_dx.png"
                                        alt=""
                                      />
                                    </div>
                                  <span className={styles.aptBtnText}>Hủy duyệt</span>
                                </button>
                                )}
                                {(detail_propose?.type_duyet === 7 || detail_propose?.type_duyet === 10) && (
                                  <button onClick={handleForward} className={styles.apiBtnOther}>
                                  <span className={styles.aptBtnText}>Duyệt chuyển tiếp</span>
                                </button>
                                )}
                                {(detail_propose?.type_duyet !== 3 && detail_propose?.type_duyet !== 6 && detail_propose?.nhom_de_xuat === 1 ) && (
                                  <button onClick={handleForceToWork} className={styles.apiBtnOther}>
                                  <span className={styles.aptBtnText}>Bắt buộc đi làm</span>
                                </button>
                                )}
                                {(detail_propose?.type_duyet !== 3 && detail_propose?.type_duyet !== 6 ) && (
                                  <button onClick={handleReject} className={styles.apiBtnReject}>
                                  <div className={styles.content_div_img}>
                                      <Image
                                        height={24}
                                        width={24}
                                        src="/icon/create_propose/reject_dx.png"
                                        alt=""
                                      />
                                    </div>
                                  <span className={styles.aptBtnText}>Từ chối</span>
                                </button>
                                )}
                                <button onClick={handleDelete} className={styles.apiBtnReject}>
                                  <div className={styles.content_div_img}>
                                      <Image
                                        height={24}
                                        width={24}
                                        src="/icon/create_propose/reject_dx.png"
                                        alt=""
                                      />
                                    </div>
                                  <span className={styles.aptBtnText}>Xóa đề xuất</span>
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p style={{marginTop: '20px'}}>Không tìm thấy bản ghi đề xuất</p>
            )}
          </div>
          <Comp_sidebar_detail>
            <div className={styles.right_row}>
              <div className={styles.approve_type}>
                <h3>Kiểu phê duyệt</h3>
                <p className={styles.type_img}>
                  <Image
                    src={"/icon/create_propose/type.png"}
                    width={25}
                    height={25}
                    alt="icon_print"
                  />
                  <span className={styles.text_primary}>
                    {detail_propose?.loai_de_xuat === 0 ? 'Phê duyệt đồng thời' : 'Phê duyệt lần lượt'}
                  </span>
                </p>
              </div>
              <div className={styles.infor}>
                <h3>Lãnh đạo duyệt</h3>
                {detail_propose?.lanh_dao_duyet.map((ngduyet:any,index:any)=>{
                  return <Item_detail_person
                            username={ngduyet.userName}
                            id={ngduyet.idQLC}
                            img={ngduyet.avatarUser}
                            key={index}
                          />
                })}
              </div>
              <div className={styles.infor}>
                <h3>Người theo dõi</h3>
                {detail_propose?.nguoi_theo_doi.map((ngtheodoi:any,index:any)=>{
                  return <Item_detail_person
                            username={ngtheodoi.userName}
                            id={ngtheodoi.idQLC}
                            img={ngtheodoi.avatarUser}
                            key={index}
                          />
                })}
              </div>
              <div className={styles.infor}>
                <h3>Trạng thái đề xuất</h3>
                {detail_propose && (
                  <div className={styles.infor_status}>
                    <div className={styles.div_img}>
                      <Image
                        src={"/icon/create_propose/dexuat_add.png"}
                        width={20}
                        height={20}
                        alt="ảnh đại diện"
                      />
                    </div>
                    <div className={styles.list_status}>
                      <p>
                      {createdDate}{" "}
                        <span className={styles.text_primary}>
                          {detail_propose?.nguoi_tao}
                        </span>{" "}
                        vừa tạo đề xuất
                      </p>
                    </div>
                  </div>
                )}
                {detail_propose?.lich_su_duyet && detail_propose?.lich_su_duyet.length > 0  && detail_propose?.lich_su_duyet.map(
                  (rec:any, index:any)=>{
                    return (
                      <div key={index} className={styles.infor_status}>
                        <div className={styles.div_img}>
                          {rec?.type_duyet === 1 && (
                            <Image src={"/icon/create_propose/dexuat_dtn.png"} width={20} height={20} alt="type duyet" />
                          )}
                          {rec?.type_duyet === 2 && (
                            <Image src={"/icon/create_propose/dexuat_accep.png"} width={20} height={20} alt="type duyet" />
                          )}
                          {rec?.type_duyet === 3 && (
                            <Image src={"/icon/create_propose/dexuat_reject.png"} width={20} height={20} alt="type duyet" />
                          )}
                          {rec?.type_duyet === 6 && (
                            <Image src={"/icon/create_propose/dexuat_reject.png"} width={20} height={20} alt="type duyet" />
                          )}
                          
                        </div>
                        <div className={styles.list_status}>
                          <p>
                            {formatDate_string(rec?.time)}{" "}
                            <span className={styles.text_primary}>
                              {rec?.ng_duyet}
                            </span>{" "}
                            {rec?.type_duyet === 1 && 'đã tiếp nhận đề xuất'}
                            {rec?.type_duyet === 2 && 'đã duyệt đề xuất'}
                            {rec?.type_duyet === 3 && 'đã từ chối đề xuất'}
                            {rec?.type_duyet === 6 && 'đã bắt buộc đi làm'}
                          </p>
                        </div>
                      </div>
                    )}
                )}
              </div>
            </div>
          </Comp_sidebar_detail>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
