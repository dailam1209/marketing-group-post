import styles from "./index.module.css";
import Giaiphap from "./giaiphap";
import Tongquan from "./tongquan";
import Seo from "../../../components/head/index";
const Dangnhap = () => {
  const Seo_tinhluong = {
    des: "Hungha365.com ra mắt phần mềm tính lương ưu việt top 1 thị trường – Lương 365, đem đến hiệu quả tính lương chính xác, nhanh chóng, đồng thời cho phép tất cả tài khoản nhân viên tự check soát lương cá nhân vô cùng tiện ích và minh bạch",
    title: "Doanh nghiệp tính lương dễ dàng, chính xác nhờ Lương365",
    url: "https://hungha365.com/tinh-luong",
  };
  return (
    <>
      <Seo
        des={Seo_tinhluong.des}
        title={Seo_tinhluong.title}
        url={Seo_tinhluong.url}
        seo="true"
      />
      <div className={styles.wrapper}>
        <div className={styles.wra_idx}>
          <div className={styles.idx_bg}>
            <picture>
              <source
                media="(max-width:768px)"
                srcSet={
                  "https://tinhluong.timviec365.vn/img/bg_index_mb_min.png"
                }
              />
              <source
                media="(max-width:1250px)"
                srcSet={"https://tinhluong.timviec365.vn/img/bg_index_mb.png"}
              />
              <source
                media="(max-width:1640px)"
                srcSet={"https://tinhluong.timviec365.vn/img/bg_index_tl.png"}
              />
              <img
                src={"https://tinhluong.timviec365.vn/img/bg_index_tl.png"}
                alt={"banner"}
              />
            </picture>
          </div>
          <div className={styles.bg_wra}>
            <div className={styles.bg_ima}>
              <a href={"https://timviec365.vn/"} target="_black">
                <img
                  src={"https://tinhluong.timviec365.vn/img/logo.png"}
                  alt={"Tính lương 365 – Phần mềm tính lương miễn phí"}
                />
              </a>
            </div>
            <div className={styles.header_nav}>
              <div className={styles.nav}>
                <ul>
                  <li>
                    <a
                      className={styles.is_index}
                      href={"https://tinhluong.timviec365.vn/"}
                    >
                      Trang chủ lương 365
                    </a>
                  </li>
                  <li>
                    <a
                      className={styles.is_index_a}
                      href={"https://tinhluong.timviec365.vn/huong-dan.html"}
                    >
                      Hướng dẫn
                    </a>
                  </li>
                  <li>
                    <a
                      className={styles.is_index_a_li}
                      target={"_blank"}
                      style={{
                        display: "inline-block",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Chuyển đổi số
                    </a>
                  </li>
                  <li>
                    <a className={styles.is_index_a}>Tin tức</a>
                  </li>
                </ul>
                <div className={styles.hd_log}>
                  <div className={styles.bg_log}>
                    <p>
                      <a href="/dang-nhap-nhan-vien.html">Đăng nhập</a>/
                      <a href={"/dang-ky-nhan-vien.html"}>Đăng ký</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.header_hps_res}>
            <div className={styles.hps_res_menu}>
              <img
                src={"https://tinhluong.timviec365.vn/img/loader.gif"}
                alt={"menu"}
              />
            </div>
            <div className={styles.hps_res_lg}>
              <a href={"https://tinhluong.timviec365.vn/"}>
                <img
                  src={"https://tinhluong.timviec365.vn/img/loader.gif"}
                  alt={"Tính lương 365 – Phần mềm tính lương miễn phí"}
                />
              </a>
            </div>
          </div>
          <div className={styles.bg_idx}>
            <h1>
              Lương 365 - phần mềm
              <br />
              tính lương chuyên nghiệp online
            </h1>
            <p>
              Giao diện thân thiện, tự động, chính xác và tuỳ chỉnh theo người
              dùng. Giúp nhân sự giải quyết bài toán quản lý lương.
            </p>
            <div className={styles.dl_idx}>
              <p>Tải App dành cho điện thoại</p>
              <div className={styles.gg_play}>
                <a
                  target={"_blank"}
                  href={
                    "https://play.google.com/store/apps/details?id=vn.hungha.time_keeping"
                  }
                >
                  <img
                    src={"https://tinhluong.timviec365.vn/img/gg_play.png"}
                    alt={"Phần mềm tính lương android"}
                  />
                </a>
              </div>
              <div className={styles.dl_aps}>
                <a
                  target={"_blank"}
                  href={
                    "https://apps.apple.com/vn/app/ch%E1%BA%A5m-c%C3%B4ng-365-nh%E1%BA%ADn-di%E1%BB%87n-m%E1%BA%B7t/id1547974966"
                  }
                >
                  <img
                    style={{ objectFit: "cover" }}
                    src={"https://tinhluong.timviec365.vn/img/app_store.png"}
                    alt={"Phần mềm tính lương ios"}
                  />
                </a>
              </div>
              <div className={styles.download_app_pc}>
                <span>Tải App dành cho PC</span>
                <div className={styles.download_app_img}>
                  <a
                    href={
                      "https://app.timviec365.vn/Download/TinhLuong/Install/TinhLuong.exe"
                    }
                  >
                    <img
                      src={
                        "https://tinhluong.timviec365.vn/img/downloadForWin7Black.png"
                      }
                      alt={"App"}
                    />
                  </a>
                  <a
                    href={
                      "https://apps.microsoft.com/store/detail/t%C3%ADnh-l%C6%B0%C6%A1ng-365/XPDNGRLQJ4HJW1"
                    }
                  >
                    <img
                      src={
                        "https://tinhluong.timviec365.vn/img/downloadForWin10Black.png"
                      }
                      alt={"App"}
                    />
                  </a>
                  <a
                    href={
                      "https://hungha365.com/upload_file/Quanlychung-1.0.2.dmg"
                    }
                  >
                    <img
                      src={
                        "https://tinhluong.timviec365.vn/img/img/dl_app_pc1.png"
                      }
                      alt={"App"}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ud_cds}>
            <div className={styles.container}>
              <h2>5 Ưu điểm vượt trội của hệ sinh thái Chuyển đổi số 365</h2>
              <div className={styles.box_udiem}>
                <div className={styles.box_udvt_box_mr_ud}>
                  <img
                    src={"https://tinhluong.timviec365.vn/img/udvt1.png"}
                    alt={"an toàn và bảo mật"}
                  />
                  <div className={styles.nd_udvt}>
                    <p>An toàn và bảo mật</p>
                    <p className={styles.p}>
                      An toàn, bảo mật tuyệt đối, dữ liệu được lưu trữ theo mô
                      hình điện toán đám mây.
                    </p>
                    <a>Xem chi tiết →</a>
                  </div>
                </div>
                <div className={styles.box_udvt_box_mr_ud}>
                  <img
                    src={"https://tinhluong.timviec365.vn/img/udvt2.png"}
                    alt={"một nền tảng duy nhất"}
                  />
                  <div className={styles.nd_udvt}>
                    <p>Một nền tảng duy nhất</p>
                    <p className={styles.p}>
                      Tích hợp tất cả các ứng dụng doanh nghiệp của bạn đang cần
                      trên cùng một nền tảng duy nhất.
                    </p>
                    <a>Xem chi tiết →</a>
                  </div>
                </div>
                <div className={styles.box_udvt}>
                  <img
                    src={"https://tinhluong.timviec365.vn/img/udvt3.png"}
                    alt={"ứng dụng công nghệ AI"}
                  />
                  <div className={styles.nd_udvt}>
                    <p>Ứng dụng công nghệ AI</p>
                    <p className={styles.p}>
                      Ứng dụng Công nghệ AI tự nhận thức phân tích hành vi người
                      dùng giải quyết toàn diện đối với từng doanh nghiệp cụ
                      thể.
                    </p>
                    <a>Xem chi tiết →</a>
                  </div>
                </div>
                <div className={styles.box_udvt_box_mr_ud_box_mr_ud2}>
                  <img
                    src={"https://tinhluong.timviec365.vn/img/udvt4.png"}
                    alt={"giải pháp số 1 việt name"}
                  />
                  <div className={styles.nd_udvt}>
                    <p>Giải pháp số 1 Việt Nam</p>
                    <p className={styles.p}>
                      Luôn đồng hành và hỗ trợ 24/7. Phù hợp với cả những tập
                      đoàn xuyên quốc gia đến những công ty SME.
                    </p>
                    <a>Xem chi tiết →</a>
                  </div>
                </div>
                <div className={styles.box_udvt}>
                  <img
                    src={"https://tinhluong.timviec365.vn/img/udvt5.png"}
                    alt={"miễn phí trọn đời"}
                  />
                  <div className={styles.nd_udvt}>
                    <p>Sử dụng miễn phí trọn đời</p>
                    <p className={styles.p}>
                      Miễn phí chọn đời đối với tất cả các doanh nghiệp đăng ký
                      trong đại dịch Covid 19.
                    </p>
                    <a>Xem chi tiết →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Giaiphap />
        <Tongquan />
      </div>
    </>
  );
};
export default Dangnhap;
