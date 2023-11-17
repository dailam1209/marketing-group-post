import { useRouter } from "next/router";
import styles from "./information.module.css";
import InforText from "./text_info";
import { UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { axiosCRM } from "@/utils/api/api_crm";
import {
  renderBank,
  renderBusinessType,
  renderCategory,
  renderListGender,
  renderPotentialDepartment,
  renderPotentialPosition,
  renderPotentialResource,
  renderPotentialType,
  renderProfession,
  renderRevenue,
  renderSector,
  renderVocative,
} from "@/utils/listOption";
import { convertTimestampToDate } from "@/utils/function";
import { renderCity, renderDistrict } from "@/constants/address-constant";

const diaryEntries = [
  {
    time: "10:10 - 10/10/2020",
    content: "Nhóm khách hàng được cập nhật bởi",
    author: "Nguyễn Văn Nam",
  },
];

export default function GeneralRowInforText() {
  const router = useRouter();
  const emptyEntries = new Array(10).fill(null);
  const { id } = router.query;
  const [detailData, setDataDetail] = useState<any>({});
  let [social, setSocial] = useState([]);
  useEffect(() => {
    axiosCRM
      .post("/potential/detail-potential", { cus_id: id })
      .then((res) => {

        setDataDetail({...res.data.data.data,...res.data.data.data.potential_id});
        handlePotentialId(res.data.data.data.potential_id)
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePotentialId = (datas) => {
    social = [];
    for (const key in datas.social) {
      if (datas.social[key]) {
        social.push([key]);
      }
    }
    setSocial(social);
  };
  return (
    <main>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Thông tin chi tiết</h4>
        </div>
        <h2 className={styles.table_description}>Thông tin chung</h2>
        <div className={styles.row_input_text}>
          <InforText
            field="Mã tiềm năng:"
            value={detailData.potential_id}
          />
          <InforText
            field="Xưng hô:"
            value={renderVocative(detailData.vocative)}
          />
          <InforText field="Họ và đệm:" value={detailData.stand_name} />
          <InforText field="Tên:" value={detailData.name} />
          <InforText
            field="Họ và tên:"
            value={`${detailData.stand_name ? detailData.stand_name : ""} ${
              detailData.name
            }`}
          />
          <InforText
            field="Chức danh:"
            value={renderPotentialPosition(detailData.pos_id)}
          />
          <InforText
            field="Phòng ban:"
            value={renderPotentialDepartment(detailData.department)}
          />
          <InforText
            field="Điện thoại cơ quan:"
            value={detailData.office_phone}
          />
          <InforText
            field="Email cơ quan:"
            value={detailData.office_email}
          />
          <InforText
            field="Điện thoại cá nhân:"
            value={detailData.private_phone}
          />
          <InforText
            field="Email cá nhân:"
            value={detailData.private_email}
          />
          <InforText field="Mã số thuế:" value={detailData.tax_code} />
          <InforText
            field="Nguồn gốc:"
            value={renderPotentialResource(detailData.resource)}
          />
          <InforText
            field="Loại tiềm năng:"
            value={renderPotentialType(detailData.classify)}
          />
          <InforText
            field="Mạng xã hội:"
            value={social ? social.join(",") : "Chưa cập nhập"}
          />

          {social?.map((item) => (
            <InforText
              field={`${item}:`}
              link={detailData.social?.[item]}
            />
          ))}
          {/* <InforText field="Facebook:" link="12345.site.facebook.com" /> */}

          <InforText
            field="Nhân viên phụ trách:"
            value="Nguyễn Văn Nam Sẽ thêm sau khi có dữ liệu"
            icon={<UserOutlined rev={null} />}
          />
        </div>

        <h2 className={styles.table_description}>Thông tin cá nhân</h2>
        <div className={styles.row_input_text}>
          <InforText
            field="Giới tính:"
            value={renderListGender(detailData.gender)}
          />
          <InforText
            field="Ngày sinh:"
            value={
              detailData.birthday && convertTimestampToDate(detailData.birthday)
            }
          />
        </div>
        <h2 className={styles.table_description}>Thông tin tổ chức</h2>
        <div className={styles.row_input_text}>
          <InforText field="Tổ chức:" value={detailData.office} />
          <InforText
            field="Tài khoản ngân hàng:"
            value={detailData.bank_account}
          />
          <InforText
            field="Mở tại ngân hàng:"
            value={renderBank(detailData.bank_id)}
          />
          <InforText
            field="Ngày thành lập:"
            value={
              detailData.founding_date &&
              convertTimestampToDate(detailData.founding_date)
            }
          />
          <InforText
            field="Loại hình:"
            value={renderBusinessType(detailData.business_type)}
          />
          <InforText
            field="Lĩnh vực:"
            value={renderSector(detailData.sector)}
          />
          <InforText
            field="Ngành nghề:"
            value={renderProfession(detailData.category)}
          />
          <InforText
            field="Doanh thu:"
            value={renderRevenue(detailData.revenue)}
          />
        </div>

        <h2 className={styles.table_description}>Thông tin địa chỉ</h2>
        <div className={styles.row_input_text}>
          <InforText field="Quốc gia:" value="Việt Nam" />
          <InforText
            field="Tỉnh/Thành phố:"
            value={renderCity(detailData.cit_id)}
          />
          <InforText
            field="Quận/Huyện:"
            value={renderDistrict(detailData.district_id)}
          />
          <InforText field="Phường/Xã:" value={detailData.ward} />
          <InforText field="Số nhà, đường phố:" value={detailData.address} />
          <InforText field="Mã vùng:" value={detailData.bill_area_code} />
          <InforText
            field="Địa chỉ đơn hàng:"
            value={`${detailData.address && `${detailData.address}, `}${
              detailData.ward && `${detailData.ward}, `
            }${
              detailData.district_id &&
              `${renderDistrict(detailData.district_id)}, `
            }${detailData.cit_id && `${renderCity(detailData.cit_id)}`} `}
          />
        </div>
        <div>
          <h2 className={styles.table_description}>Thông tin địa chỉ</h2>
          <div className={styles.custom_potential_input_text}>
            <InforText field="Mô tả:" value={detailData.description} />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Thông tin hệ thống</h4>
        </div>
        <div className={styles.row_input_text}>
          <InforText
            field="Người tạo:"
            value="Chỗ này sẽ thêm sau"
            icon={<UserOutlined rev={null} />}
          />
          <InforText field="Ngày tạo:" value="10:10 - 10/10/2022" />
          <InforText
            field="Người sửa:"
            value="Chỗ này sẽ thêm sau"
            icon={<UserOutlined rev={null} />}
          />
          <InforText field="Ngày sửa:" value="10:10 - 10/10/2022" />
          <div className={styles.custom_icon}>
            <InforText
              field="Dùng chung:"
              value={detailData.share_all && <CheckCircleOutlined rev={null} />}
            />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Nhật ký</h4>
        </div>
        <div className={styles.table_overflow}>
          {emptyEntries.map((_, index) => (
            <div className={styles.table_diary} key={index}>
              <h3>10:10 - 10/10/2020</h3>
              <p>
                Nhóm khách hàng được cập nhật bởi <span>Nguyễn Văn Nam</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
