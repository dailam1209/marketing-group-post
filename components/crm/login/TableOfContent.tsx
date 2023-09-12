/** @format */
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./TableOfContent.module.scss";
import HeaderBar from "./header_bar";
import SiebarContent from "./sidebar_content";
import style from "./sidebar.module.css";
import { SidebarContext } from "../context/resizeContext";
import { Link } from "react-scroll";

export default function TableOfContents() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openDropDown3, setOpenDropDown3] = useState(false);

  const [extend, setExtend] = useState(true);
  const { isOpen, setIsOpen } = useContext<any>(SidebarContext);
  const sidebarRef = useRef(null);

  const handleSidebarOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            <img
              src="../img/arrow-square-down.png"
              alt=""
              style={{ width: 20, paddingTop: 5 }}
            />
            <Link
              className={styles.text}
              to="content1"
              smooth={true}
              offset={-50}
              duration={500}
            >
              1. Vai trò của CV xin việc quan trọng ra sao?
            </Link>
          </div>
        </div>
        <div className={styles.item}>
          <div
            className={styles.item_img}
            onClick={() => setOpenDropDown(!openDropDown)}
          >
            {openDropDown ? (
              <img
                src="../img/arrow-square-down_2.png"
                alt=""
                style={{ width: 20, paddingTop: 5 }}
              />
            ) : (
              <img
                src="../img/arrow-square-down_3.png"
                alt=""
                style={{ width: 20, paddingTop: 5 }}
              />
            )}
            <div
              className={styles.text}
              style={{ color: openDropDown ? "#4C5BD4" : "#474747" }}
            >
              2. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên
            </div>
          </div>
        </div>
        {openDropDown && (
          <>
            <div className={styles.item}>
              <div className={styles.item_img}>
                <img
                  src="../img/arrow-square-down.png"
                  alt=""
                  style={{ width: 20, paddingTop: 5 }}
                />
                <Link
                  className={styles.text}
                  to="content1"
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  2.1 CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp
                </Link>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_img}>
                <img
                  src="../img/arrow-square-down.png"
                  alt=""
                  style={{ width: 20, paddingTop: 5 }}
                />
                <Link
                  className={styles.text}
                  to="content2"
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  2.2 Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên
                </Link>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_img}>
                <img
                  src="../img/arrow-square-down.png"
                  alt=""
                  style={{ width: 20, paddingTop: 5 }}
                />
                <Link
                  className={styles.text}
                  to="content2"
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  2.3 Vai trò của CV xin việc quan trọng ra sao?
                </Link>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_img}>
                <img
                  src="../img/arrow-square-down.png"
                  alt=""
                  style={{ width: 20, paddingTop: 5 }}
                />
                <Link
                  className={styles.text}
                  to="content2"
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  2.4 CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp
                </Link>
              </div>
            </div>
          </>
        )}
        <div className={styles.item}>
          <div
            className={styles.item_img}
            onClick={() => setOpenDropDown3(!openDropDown3)}
          >
            {openDropDown3 ? (
              <img
                src="../img/arrow-square-down_2.png"
                alt=""
                style={{ width: 20, paddingTop: 5 }}
              />
            ) : (
              <img
                src="../img/arrow-square-down_3.png"
                alt=""
                style={{ width: 20, paddingTop: 5 }}
              />
            )}
            <div
              className={styles.text}
              style={{ color: openDropDown3 ? "#4C5BD4" : "#474747" }}
            >
              3. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right_wrap}>
        <div
          className={extend ? styles.right : `${styles.right} ${styles.active}`}
        >
          <div className={styles.top}>
            <div className={styles.title}>
              <h2>CRM – gắn kết doanh nghiệp – khách hàng bền vững</h2>
            </div>
            <span>
              Trong những năm gần đây, việc lựa chọn đúng mô hình phát triển
              phần mềm đã trở nên cấp thiết hơn bao giờ hết. Bởi nó sẽ giúp các
              nhà lập trình có thể tạo ra được một phần mềm theo một trình tự
              khoa học và tránh được các lỗi sai sót. Ở bài viết lần này, trang
              web timviec365.vn sẽ giúp các bạn tìm hiểu
              <span className={styles.custom_span}>
                &nbsp;mô hình phát triển phần mềm là gì&nbsp;
              </span>
              và những loại mô hình phổ biến hiện nay.
            </span>
          </div>
          <div className={styles.content}>
            <div className={styles.title} id="content1">
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
            <div className={styles.img} id="content2">
              <img src="/crm/des2.png" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <button onClick={() => setExtend(extend)}>
            {extend ? "Xem thêm" : "Rút gọn"}
          </button>
        </div>
      </div>
    </div>
  );
}
