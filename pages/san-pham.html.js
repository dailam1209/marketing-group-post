import React from "react"
import Seo from '../components/head'

export default function Product() {
  return (
    <>
      <Seo
        seo=''
        title='Trang sản phẩm'
      />

      <div className="content_ql share_sp">
        <div className="cnt_ttone">
          <div className="one_bod_td">
            <div className="container">
              <h2 className="share_clr_one cr_weight_bold tex_center h_share">
                Hệ thống phần mềm chuyển đổi số 365
              </h2>
              <p className="tieu_de share_clr_one tex_center">
                Tích hợp tất cả các ứng dụng doanh nghiệp của bạn đang cần trên cùng
                một nền tảng duy nhất.
              </p>
            </div>
          </div>
          <div className="cnt_count_tab">
            <div className="cnt_counts_one">
              <div className="cnt_counts">
                <label
                  htmlFor=""
                  className="pmc_all active"
                  data-tab="list_detl_one"
                >
                  <p className="share_fsize_three share_clr_one tex_center share_cursor">
                    Tất cả
                  </p>
                </label>
              </div>
              <div className="cnt_counts">
                <label htmlFor="" className="pmc_all" data-tab="list_detl_two">
                  <p className="share_fsize_three share_clr_one tex_center share_cursor">
                    Quản lý nhân lực
                  </p>
                </label>
              </div>
              <div className="cnt_counts">
                <label htmlFor="" className="pmc_all" data-tab="list_detl_three">
                  <p className="share_fsize_three share_clr_one tex_center share_cursor">
                    Quản lý công việc
                  </p>
                </label>
              </div>
            </div>
            <div className="cnt_counts_tow">
              <div className="cnt_counts">
                <label htmlFor="" className="pmc_all" data-tab="list_detl_four">
                  <p className="share_fsize_three share_clr_one tex_center share_cursor">
                    Quản lý nội bộ
                  </p>
                </label>
              </div>
              <div className="cnt_counts">
                <label htmlFor="" className="pmc_all" data-tab="list_detl_five">
                  <p className="share_fsize_three share_clr_one tex_center share_cursor">
                    Quản lý bán hàng
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className="cnt_count_detail tab_active">
            <div className="container">
              <div className="list_detl active" id="list_detl_one">
                <div className="detal_titl">
                  <div className="ctn_detl_one">
                    <a
                      className="pmc_detl_one"
                      href="https://chamcong.timviec365.vn"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/cham-cong.png" alt="Chấm công" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm chấm công
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Chấm công nhận diện khuôn mặt chính xác ngay trên điện
                          thoại.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://chat365.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/ic_Chat365.png" alt="Phần Mềm Chat 365" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần Mềm Chat 365
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giữ kết nối trong và ngoài doanh nghiệp một cách thông
                          suốt hoàn toàn miễn phí.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://tinhluong.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/tinh-luong.png" alt="Tính lương" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm tính lương
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Tính lương chính xác theo thiết lập của doanh nghiệp trên
                          phần mềm.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemnhansu.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/nhan-su.png" alt="Quản trị nhân sự" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản trị nhân sự
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Quản lý đầu vào nhân sự, quy trình tuyển dụng, hành chính,
                          lương thưởng.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one" style={{ display: "none" }}>
                    <a
                      href="https://kpi.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/kpi.png" alt="PC 365" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          PC 365
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          App chấm công bằng công nghệ mới nhất hiện nay.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://vanthu.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/vanthu-lt.png" alt="Văn thư lưu trữ" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm văn thư lưu trữ
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Quản lý kho tài liệu, công văn, quyết định, thông báo
                          trong doanh nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlytaisan.timviec365.vn"
                      rel="noffolow"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/qly_taisan.png" alt="Quản lý tài sản" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Quản lý tài sản
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Số hóa công tác quản lý tài sản trong doanh nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemdanhgiananglucnhanvien.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/tai-chinh.png"
                          alt="Đánh giá năng lực nhân viên"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm đánh giá năng lực nhân viên
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Đánh giá nhân viên trên nhiều góc độ: công việc, khen
                          thưởng,...
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://cardvisitthongminh.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/nhan-su.png" alt="Phần mềm SMARTID365" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm SMARTID365
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Xu hướng kết nối, giao tiếp mới trong thời đại công nghệ
                          số.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href=" https://crm.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/crm.png" alt="CRM" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm CRM
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Hỗ trợ doanh nghiệp nâng cao hiệu quả kinh doanh, thu hút
                          khách hàng.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://dms.timviec365.vn"
                      rel="noffolow"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/dms.png" alt="DMS" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm DMS
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Hỗ trợ doanh nghiệp quản lý hệ thống phân phối.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://chuyenvanbanthanhgiongnoi.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/vanban-gn.png"
                          alt="Chuyển văn bản - giọng nói"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Chuyển văn bản - giọng nói
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Chuyển văn bản thành giọng nói với ngữ điệu tự nhiên.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://bienphiendich.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/phanmem-pd.png"
                          alt="Phần mềm phiên dịch"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm phiên dịch
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giao tiếp dễ dàng, vượt qua rào cản ngôn ngữ.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemsohoatailieu.timviec365.vn/"
                      rel="noffolow"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/dms.png" alt="Phần mềm Số hóa tài liệu" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm Số hóa tài liệu
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Tổ chức, quản lý, cộng tác trên tất cả tài liệu nội bộ
                          doanh nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  {/* <div class="ctn_detl_one">
                  <a href="#" class="pmc_detl_one" target="_blank">
                      <div class="pcm_detl_img tex_center">
                          <img src="../img/cuoc-hop.png" alt="Quản lý cuộc họp">
                      </div>
                      <div class="pcm_detl_titl">
                          <h4 class="share_clr_four cr_weight_bold tex_center">Quản lý cuộc họp</h4>
                          <p class="share_clr_one tex_left share_fsize_one">Giúp các cuộc họp được tổ
                              chức hiệu quả hơn.</p>
                      </div>
                      <div class="pcn_delt_hrf">
                          <p class="share_fsize_three share_clr_four tex_center delt_see_pm">
                              Xem chi tiết <span> <img src="../img/detl_bgr.png" alt="Xem chi tiết"></span>
                          </p>
                      </div>
                  </a>
              </div> */}
                  {/*  <div class="ctn_detl_one">
                  <a href="#" class="pmc_detl_one" target="_blank">
                      <div class="pcm_detl_img tex_center">
                          <img src="../img/nhan-vien.png" alt="Quản lý tài chính">
                      </div>
                      <div class="pcm_detl_titl">
                          <h4 class="share_clr_four cr_weight_bold tex_center">Quản lý tài chính</h4>
                          <p class="share_clr_one tex_left share_fsize_one">Theo dõi tình hình tài
                              chính, tăng trưởng, lạm phát.</p>
                      </div>
                      <div class="pcn_delt_hrf">
                          <p class="share_fsize_three share_clr_four tex_center delt_see_pm">
                              Xem chi tiết <span> <img src="../img/detl_bgr.png" alt="Xem chi tiết"></span>
                          </p>
                      </div>
                  </a>
              </div> */}
                  <div className="ctn_detl_one">
                    <a
                      href="https://kpi.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/pc365.png" alt="Quản lý KPI" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản lý KPI
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Quản lý chỉ tiêu, kết quả KPI của nhân viên, tối ưu hóa
                          lợi ích doanh nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  {/*  */}
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemgiaoviec.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/giao-viec.png" alt="Giao việc" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Giao việc
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giải quyết bài toán điều hành công việc và dự án của doanh
                          nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="ctn_detl_one" style={{ display: "none" }}>
                    <a href="#" className="pmc_detl_one" target="_blank">
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/qly_banhang.png" alt="Quản lý bán hàng" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Quản lý bán hàng
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Phù hợp với tất cả các ngành hàng, giao diện thân thiện dễ
                          dàng quản lý.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlygaraoto.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/pm_gara_oto.png"
                          alt="Phần mềm quản lý Garage ô tô"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản lý Garage ô tô
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giải pháp hỗ trợ quản lý vận hành các gara ô tô
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlykhoxaydung.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/pm_khoxd.png"
                          alt="Phần mềm quản lý kho xây dựng"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản lý kho xây dựng
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giải pháp hỗ trợ doanh nghiệp quản lý kho, vận hành kho
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://loyalty.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/loyalty.png" alt="Loyalty" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Loyalty
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giải pháp hỗ trợ doanh nghiệp gia tăng khách hàng "trung
                          thành".
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlytaichinhcongtrinh.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/nhan-vien.png"
                          alt="Quản lý tài chính công trình"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Quản lý tài chính công trình
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giúp dễ dàng quản lý thu chi, hoạt động tài chính, ngân
                          hàng của các công trình xây dựng, giảm thiểu sai sót, hao
                          hụt khi sử dụng quỹ.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlydautuxaydung.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/pm_cungung.png"
                          alt="Phần mềm quản lý đầu tư xây dựng"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản lý đầu tư xây dựng
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Hỗ trợ quản lý đầu tư xây dựng , theo dõi tiến độ dự án,
                          quản lý chứng từ liên quan và dòng tiền đầu tư cho chủ đầu
                          tư
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlycongtrinh.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/pm_congtrinh.png"
                          alt="Phần mềm quản lý công trình"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản lý công trình
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giải pháp hỗ trợ doanh nghiệp quản lý các công trình, theo
                          dõi tiến độ
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlyquytrinhsanxuat.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/qly_banhang.png" alt="Quản lý bán hàng" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản lý sản xuất
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giải pháp quản trị sản xuất toàn diện cho doanh nghiệp!
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlyvantai.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/pm_gara_oto.png"
                          alt="Phần mềm Quản lý vận tải"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm Quản lý vận tải
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giúp doanh nghiệp quản lý vận tải dễ dàng hơn, thông minh
                          hơn, tối ưu hơn!
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlycungung.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/pm_cungung.png"
                          alt="Phần mềm quản lý cung ứng"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản lý cung ứng
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giúp các doanh nghiệp xây dựng hàng đầu quản lý chi phí,
                          vật tư cung ứng
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://lichbieu.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/lich_bieu.png" alt="Phần mềm lịch biểu" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm lịch biểu
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Hỗ trợ quản lý và thực hiện công việc một cách khoa học và
                          dễ dàng.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlykho.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/pm_khoxd.png"
                          alt="Phần mềm quản lý kho 365"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản lý kho 365
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Cho phép quản lý toàn bộ vật tư, hàng hoá, thành phẩm,
                          dịch vụ của doanh nghiệp
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://truyenthongnoibo.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/truyenthong-vh.png"
                          alt="Truyền thông văn hóa"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Truyền thông văn hóa
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Mạng nội bộ giúp xây dựng văn hóa doanh nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="list_detl" id="list_detl_two">
                <div className="detal_titl">
                  <div className="ctn_detl_one">
                    <a
                      className="pmc_detl_one"
                      href="https://chamcong.timviec365.vn"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/cham-cong.png" alt="Chấm công" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm chấm công
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Chấm công nhận diện khuôn mặt chính xác ngay trên điện
                          thoại.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://tinhluong.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/tinh-luong.png" alt="Tính lương" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm tính lương
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Tính lương chính xác theo thiết lập của doanh nghiệp trên
                          phần mềm.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemnhansu.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/nhan-su.png" alt="Quản trị nhân sự" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm quản trị nhân sự
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Quản lý đầu vào nhân sự, quy trình tuyển dụng, hành chính,
                          lương thưởng.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one" style={{ display: "none" }}>
                    <a href="#" className="pmc_detl_one" target="_blank">
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/kpi.png" alt="PC 365" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          PC 365
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          App chấm công bằng công nghệ mới nhất hiện nay.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemdanhgiananglucnhanvien.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/tai-chinh.png"
                          alt="Đánh giá năng lực nhân viên"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm đánh giá năng lực nhân viên
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Đánh giá nhân viên trên nhiều góc độ: công việc, khen
                          thưởng,...
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a href="#" className="pmc_detl_one" target="_blank">
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/cuoc-hop.png" alt="Quản lý cuộc họp" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Quản lý cuộc họp
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giúp các cuộc họp được tổ chức hiệu quả hơn.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="list_detl" id="list_detl_three">
                <div className="detal_titl">
                  <div className="ctn_detl_one">
                    <a
                      href="https://lichbieu.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/lich_bieu.png" alt="Phần mềm lịch biểu" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm lịch biểu
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Hỗ trợ quản lý và thực hiện công việc một cách khoa học và
                          dễ dàng.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a href="#" className="pmc_detl_one" target="_blank">
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/giao-viec.png" alt="Giao việc" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Giao việc
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giải quyết bài toán điều hành công việc và dự án của doanh
                          nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="list_detl" id="list_detl_four">
                <div className="detal_titl">
                  <div className="ctn_detl_one">
                    <a
                      href="https://vanthu.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/vanthu-lt.png" alt="Văn thư lưu trữ" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm văn thư lưu trữ
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Quản lý kho tài liệu, công văn, quyết định, thông báo
                          trong doanh nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://truyenthongnoibo.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/truyenthong-vh.png"
                          alt="Truyền thông văn hóa"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Truyền thông văn hóa
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Mạng nội bộ giúp xây dựng văn hóa doanh nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://bienphiendich.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/phanmem-pd.png"
                          alt="Phần mềm phiên dịch"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm phiên dịch
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giao tiếp dễ dàng, vượt qua rào cản ngôn ngữ.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://chuyenvanbanthanhgiongnoi.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img
                          src="../img/vanban-gn.png"
                          alt="Chuyển văn bản - giọng nói"
                        />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Chuyển văn bản - giọng nói
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Chuyển văn bản thành giọng nói với ngữ điệu tự nhiên.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://phanmemquanlytaisan.timviec365.vn"
                      rel="noffolow"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/qly_taisan.png" alt="Quản lý tài sản" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Quản lý tài sản
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Số hóa công tác quản lý tài sản trong doanh nghiệp.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="list_detl" id="list_detl_five">
                <div className="detal_titl">
                  <div className="ctn_detl_one">
                    <a
                      href=" https://crm.timviec365.vn/"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/crm.png" alt="CRM" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm CRM
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Hỗ trợ doanh nghiệp nâng cao hiệu quả kinh doanh, thu hút
                          khách hàng.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a
                      href="https://dms.timviec365.vn"
                      className="pmc_detl_one"
                      target="_blank"
                    >
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/dms.png" alt="DMS" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Phần mềm DMS
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Hỗ trợ doanh nghiệp quản lý hệ thống phân phối.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one">
                    <a href="#" className="pmc_detl_one" target="_blank">
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/qly_banhang.png" alt="Quản lý bán hàng" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Quản lý bán hàng
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Phù hợp với tất cả các ngành hàng, giao diện thân thiện dễ
                          dàng quản lý.
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="ctn_detl_one" style={{ display: "none" }}>
                    <a href="#" className="pmc_detl_one" target="_blank">
                      <div className="pcm_detl_img tex_center">
                        <img src="../img/loyalty.png" alt="Loyalty" />
                      </div>
                      <div className="pcm_detl_titl">
                        <h4 className="share_clr_four cr_weight_bold tex_center">
                          Loyalty
                        </h4>
                        <p className="share_clr_one tex_left share_fsize_one">
                          Giải pháp hỗ trợ doanh nghiệp gia tăng khách hàng "trung
                          thành".
                        </p>
                      </div>
                      <div className="pcn_delt_hrf">
                        <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                          Xem chi tiết{" "}
                          <span>
                            {" "}
                            <img src="../img/detl_bgr.png" alt="Xem chi tiết" />
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
    </>
  )
}
