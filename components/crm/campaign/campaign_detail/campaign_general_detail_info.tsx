// import OrderSelectBoxStep from "../order_steps/select_box_step";
import { useEffect, useState } from "react";
import { fetchApi } from "../../ultis/api";
import { timestampToCustomString } from "../../ultis/convert_date";
import styles from "./campaign_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import Cookies from "js-cookie";
import { color } from "highcharts";

export default function AddCampaignGeneralDetailInfo({ formFields }) {
  const [empList, setEmpList] = useState([]);
  const dataChanelCampaign = [
    { value: 0, label: "Chưa cập nhật" },
    { value: 1, label: "Chưa cập nhật" },
    { value: 2, label: "Website" },
    { value: 3, label: "Báo điện tử" },
    { value: 4, label: "Báo viết" },
    { value: 5, label: "Truyền hình" },
    { value: 6, label: "Mạng xã hôi" },
    { value: 7, label: "Tài trợ" },
    { value: 8, label: "Hội thảo-Triển lãm" },
  ];
  const token = Cookies.get("token_base365");

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "http://210.245.108.202:3000/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setEmpList(dataApi?.data?.data);
  };

  const renderText = (text) => {
    if (text) {
      return text;
    }
    return <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>;
  };

  useEffect(() => {
    fetchAPIEmployee();
  }, []);
  return (
    <div>
      <div className={styles.main__campaign__body}>
        <p className={styles.main__body__type}>Thông tin chung</p>
        <div className={styles.main__content__body}>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Tên chiến dịch:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {" "}
                  {formFields?.nameCampaign}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Loại:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  Gửi mail
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Tình trạng:</b>
                </div>
                <div
                  className={`${styles.main__body__item__value} ${styles.stt_yellow}`}
                >
                  Chưa diễn ra
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-3"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngày bắt đầu:</b>
                </div>
                <div className={`${styles.main__body__item__value} `}>
                  {renderText(timestampToCustomString(formFields?.timeStart))}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-3"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngày kết thúc:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(timestampToCustomString(formFields?.timeEnd))}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-3"]} `}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngân sách:</b>
                </div>
                <div className={`${styles.main__body__item__value} `}>
                  {formFields?.investment} VNĐ
                </div>
              </div>
            </div>
            <div className={`${styles["col-lg-3"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Doanh số:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {formFields?.expectedSales} VNĐ
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Kênh truyền thống:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {dataChanelCampaign?.[formFields?.chanelCampaign]?.label}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Số đã chi:</b>
                </div>
                <div className={`${styles.main__body__item__value} `}>
                  {formFields?.money} VNĐ
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Nhân viên phụ trách:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(
                    empList?.filter(
                      (item) => item?.ep_id === formFields?.empID
                    )[0]?.userName
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.main__body__type}>Thông tin mô tả</p>
        <div className={styles.main__content__body}>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item_des} ${styles.d_flex} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Mô tả:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(formFields?.description)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.main__body__type}>Thông tin hệ thống</p>
        <div className={styles.main__content__body}>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Người tạo:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(
                    empList?.filter(
                      (item) => item?.ep_id === formFields?.userIdCreate
                    )[0]?.userName
                  )}
                  {/* <div style={{ display: "flex", justifyContent: 'center' }}> <div><img src="/crm/user_kh.png" alt="hungha365.com" /></div>&nbsp;Nguyễn Văn Nam</div> */}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngày tạo:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(timestampToCustomString(formFields?.createdAt))}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Người sửa:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(
                    empList?.filter(
                      (item) => item?.ep_id === formFields?.userIdUpdate
                    )[0]?.userName
                  )}
                  {/* <div style={{ display: "flex", justifyContent: 'center' }}> <div><img src="/crm/user_kh.png" alt="hungha365.com" /></div>&nbsp;Nguyễn Văn Nam</div> */}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngày sửa:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(timestampToCustomString(formFields?.updatedAt))}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Dùng chung:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {formFields?.shareAll ? (
                    <i
                      style={{ color: "green", width: "16px", height: "16px" }}
                      className="bi bi-check2-circle"
                    ></i>
                  ) : (
                    <i className="bi bi-check2-circle"></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
