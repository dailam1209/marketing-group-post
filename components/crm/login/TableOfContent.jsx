/** @format */
import React, { useState } from "react";
import styles from "./TableOfContent.module.scss";
import HeaderBar from "./header_bar";
import SiebarContent from "./sidebar_content";
import style from "./sidebar.module.css";

export default function TableOfContents() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [extend, setExtend] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.tableofcontents}>
      <div className={style["menu-nav"]}>
        <img
          onClick={handleSidebarOpen}
          className={style.icon_menu_nav}
          src="/crm/sel.png"
          alt="icon-menu-nav"
        />
      </div>
      {isOpen ? (
        <div className={style.sidebar_m}>
          <HeaderBar />
          <SiebarContent />
        </div>
      ) : (
        ""
      )}

      <div className={styles.left}>
        <img
          src="../img/table_of_contents.png"
          alt=""
          className={styles.img_than_1024}
        />
        <img
          src="../img/table_of_contents_1024.png"
          alt=""
          style={{ display: "none" }}
          className={styles.img_1024}
        />
        <img
          src="../img/table_of_contents_768.png"
          alt=""
          style={{ display: "none" }}
          className={styles.img_768}
        />
        <img
          src="../img/table_of_contents_414.png"
          alt=""
          style={{ display: "none" }}
          className={styles.img_414}
        />
        <div className={styles.item}>
          <div className={styles.item_img}>
            <img src="../img/arrow-square-down.png" alt="" />
          </div>
          <div className={styles.text}>
            1. Vai trò của CV xin việc quan trọng ra sao?
          </div>
        </div>
        <div className={styles.item}>
          <div
            className={styles.item_img}
            onClick={() => setOpenDropDown(!openDropDown)}
          >
            {openDropDown ? (
              <img src="../img/arrow-square-down_2.png" alt="" />
            ) : (
              <img src="../img/arrow-square-down_3.png" alt="" />
            )}
          </div>
          <div
            className={styles.text}
            style={{ color: openDropDown ? "#4C5BD4" : "#474747" }}
          >
            2. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên
          </div>
        </div>
        {openDropDown && (
          <>
            <div className={styles.item}>
              <div className={styles.item_img}>
                <img src="../img/arrow-square-down.png" alt="" />
              </div>
              <div className={styles.text}>
                2.1 CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_img}>
                <img src="../img/arrow-square-down.png" alt="" />
              </div>
              <div className={styles.text}>
                2.2 Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_img}>
                <img src="../img/arrow-square-down.png" alt="" />
              </div>
              <div className={styles.text}>
                2.3 Vai trò của CV xin việc quan trọng ra sao?
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_img}>
                <img src="../img/arrow-square-down.png" alt="" />
              </div>
              <div className={styles.text}>
                2.4 CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.right_wrap}>
        <div
          className={extend ? styles.right : `${styles.right} ${styles.active}`}
        >
          <div className={styles.top}>
            <div className={styles.title}>
              <h1>CRM – gắn kết doanh nghiệp – khách hàng bền vững</h1>
            </div>
            <span>
              Trong những năm gần đây, việc lựa chọn đúng mô hình phát triển
              phần mềm đã trở nên cấp thiết hơn bao giờ hết. Bởi nó sẽ giúp các
              nhà lập trình có thể tạo ra được một phần mềm theo một trình tự
              khoa học và tránh được các lỗi sai sót. Ở bài viết lần này, trang
              web timviec365.vn sẽ giúp các bạn tìm hiểu mô hình phát triển phần
              mềm là gì và những loại mô hình phổ biến hiện nay.
            </span>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              <h2>
                1. CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi
                nhuận
              </h2>
            </div>
            <div className={styles.desc}>
              <span>
                CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc
                kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các
                nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và
                thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay,
                lợi ích đến ngay!
              </span>
            </div>
            <div className={styles.img}>
              <img src="/crm/des1.png" alt="" />
            </div>
            <div className={styles.desc}>
              <span>
                CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc
                kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các
                nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và
                thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay,
                lợi ích đến ngay! CRM 365 được đánh giá là công cụ tốt nhất hiện
                nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú
                trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng
                tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng
                ký hôm nay, lợi ích đến ngay!
              </span>
            </div>
            <div className={styles.img}>
              <img src="/crm/des2.png" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <button onClick={() => setExtend(!extend)}>
            {extend ? "Rút gọn" : "Xem thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}
