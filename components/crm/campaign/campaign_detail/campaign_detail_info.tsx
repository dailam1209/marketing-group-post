import styles from "@/components/crm/campaign/campaign_detail/campaign_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import { timestampToCustomString } from "../../ultis/convert_date";

export default function AddCampaignDetailInfo({ formFields }) {
  const dataStatus = [
    <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>,
    <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>,
    <div style={{ color: "#FFA800" }}>Chưa diễn ra</div>,
    <div style={{ color: "#34B632" }}>Đã kết thúc</div>,
    <div style={{ color: "#FF3333" }}>Đang tạm dừng</div>,
    <div style={{ color: "#4C5BD4" }}>Đang diễn ra</div>,
  ];

  const dataTypeCampaign = [
    <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>,
    <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>,
    <div>Gửi mail</div>,
    <div>Điện thoại</div>,
    <div>Tổ chức hội thảo tập huấn</div>,
    <div>Gặp mặt trực tiếp</div>,
    <div>Qua bưu điện</div>,
    <div>Mạng xã hội</div>,
  ];
  return (
    <div>
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
                {dataTypeCampaign[formFields?.typeCampaign]}
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
                {dataStatus[formFields?.status]}
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Doanh số kỳ vọng:</b>
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
                <b>Ngày kỳ vọng/kết thúc:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                {timestampToCustomString(formFields?.timeEnd) ? (
                  timestampToCustomString(formFields?.timeEnd)
                ) : (
                  <div color="#CCCCCC">Chưa cập nhật</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.table_stt} `}>
          <div className={`${styles.table_stt_content} ${styles.flex_column}`}>
            <div className={`${styles.table_stt_title}`}>
              <b>Tình trạng tham gia</b>
            </div>
            <div className={`${styles.table_stt_value} ${styles.flex_column}`}>
              <div className={`${styles.flex_between}`}>
                Khách hàng<span>1</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Chưa liên hệ<span>1</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Chưa gửi thư mời<span>0</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã liên hệ<span>0</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã gửi thư mời<span>0</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã nhận<span>0</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã mở<span>0</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Xác nhận tham gia<span>0</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Không liên hệ được<span>0</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã tham gia<span>0</span>
              </div>
              <div className={`${styles.flex_between}`}>
                Chưa quan tâm<span>0</span>
              </div>
            </div>
          </div>

          <div className={`${styles.table_stt_item}`}>
            <div
              className={`${styles.table_stt_content} ${styles.flex_column}`}
            >
              <div className={`${styles.table_stt_title}`}>
                <b>Doanh số theo cơ hội</b>
              </div>
              <div
                className={`${styles.table_stt_value} ${styles.flex_column}`}
              >
                <div className={`${styles.flex_between}`}>
                  Đang thực hiện<span>0</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Chiến thắng<span>0</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Thất bại<span>0</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Tổng giá trị<span>0</span>
                </div>
              </div>
            </div>

            <div
              className={`${styles.table_stt_content} ${styles.flex_column}`}
            >
              <div className={`${styles.table_stt_title}`}>
                <b>Doanh số theo đơn hàng</b>
              </div>
              <div
                className={`${styles.table_stt_value} ${styles.flex_column}`}
              >
                <div className={`${styles.flex_between}`}>
                  Chờ duyệt<span>300.000</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Đã duyệt<span>300.000</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Đã hủy<span>300.000</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Tổng giá trị<span>300.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
