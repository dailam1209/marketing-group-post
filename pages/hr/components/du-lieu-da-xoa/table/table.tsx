import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import { Space } from "antd";
import CustomCollapse from "@/pages/hr/components/collapse/CustomCollapse";
import DataQTTD from "./quy-trinh-tuyen-dung";
import DataTTD from "./tin-tuyen-dung";
import DataVTCV from "./vi-tri-cong-viec";
import DataQTDT from "./quy-trinh-dao-tao";
import DataQTLV from "./quy-dinh-lam-viec";
import DataCSNV from "./chinh-sach-nhan-vien";

export default function TableData({ data, dataCheck, listCheck }) {
  const list_recuitment = data?.data.list_recuitment;
  const list_recuitment_new = data?.data.list_recuitment_new;
  const list_job_desc = data?.data.list_job_desc;
  const list_training_process = data?.data.list_training_process;
  const list_provision = data?.data.list_provision;
  const list_employe_policy = data?.data.list_employe_policy;
  const [localListCheck, setLocalListCheck] = useState<any>([]);

  const handleClickCheckBox = (event: any) => {
    event.stopPropagation();
    const { name, checked } = event.target;
    if (name === "list_recuitment" && checked) {
      const allIds = list_recuitment.data.map((item) => item.id.toString());
      const idsAsString = allIds.join(', ');
      const dataObject = {
        [name]: idsAsString,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_recuitment_new" && checked) {
      const allIds = list_recuitment_new.data.map((item) => item.id.toString());
      const idsAsString = allIds.join(', ');
      const dataObject = {
        [name]: idsAsString,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_job_desc" && checked) {
      const allIds = list_job_desc.data.map((item) => item.id.toString());
      const idsAsString = allIds.join(', ');
      const dataObject = {
        [name]: idsAsString,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_training_process" && checked) {
      const allIds = list_training_process.data.map((item) => item.id.toString());
      const idsAsString = allIds.join(', ');
      const dataObject = {
        [name]: idsAsString,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_provision" && checked) {
      const allIds = list_provision.data.map((item) => item.id.toString());
      const idsAsString = allIds.join(', ');
      const dataObject = {
        [name]: idsAsString,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_employe_policy" && checked) {
      const allIds = list_employe_policy.data.map((item) => item.id.toString());
      const idsAsString = allIds.join(', ');
      const dataObject = {
        [name]: idsAsString,
      };
      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_recuitment" && !checked) {
      const allIds = '';
      const dataObject = {
        [name]: allIds,
      };
      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_recuitment_new" && !checked) {
      const allIds = '';
      const dataObject = {
        [name]: allIds,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_job_desc" && !checked) {
      const allIds = '';
      const dataObject = {
        [name]: allIds,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_training_process" && !checked) {
      const allIds = '';
      const dataObject = {
        [name]: allIds,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_provision" && !checked) {
      const allIds = '';
      const dataObject = {
        [name]: allIds,
      };

      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    } else if (name === "list_employe_policy" && !checked) {
      const allIds = '';
      const dataObject = {
        [name]: allIds,
      };
      setLocalListCheck((prev) => (
        { ...prev, ...dataObject }
      ));
      dataCheck(dataObject);
    }
  };

  const handleListCheckChange = (newListCheck) => {
    dataCheck(newListCheck);
  };

  useEffect(() => {
    setLocalListCheck(listCheck);
  }, [listCheck]);

  return (
    <div className={`${styles.l_detail_delete} `}>
      <div className={`${styles.l_detail_delete_content}`}>
        <div className={`${styles.l_tr} ${styles.l_color_tr}`}>
          <div>ID</div>

          <div>Tên</div>

          <div>Thời gian</div>

          <div>Chọn</div>
        </div>

        <Space
          direction="vertical"
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <div className={`${styles.content}`}>
            <CustomCollapse
              label={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={`${styles.content}`}>
                    <p>Quy trình tuyển dụng </p>
                    <picture>
                      <img
                        src={`${"/icon_top_blue.svg"}`}
                        alt=""
                        style={{ marginBottom: 4 }}
                      ></img>
                    </picture>
                  </div>

                  <div className={`${styles.content_ckeckbox}`}>
                    <input
                      name="list_recuitment"
                      type="checkbox"
                      onClick={(e) => handleClickCheckBox(e)}
                    ></input>
                    <p>Tất Cả</p>
                  </div>
                </div>
              }
            >
              <DataQTTD
                list_recuitment={list_recuitment}
                dataCheckBox={handleListCheckChange}
                localListCheck={localListCheck}
              ></DataQTTD>
            </CustomCollapse>
          </div>
        </Space>

        <Space
          direction="vertical"
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <div className={`${styles.content}`}>
            <CustomCollapse
              label={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={`${styles.content}`}>
                    <p>Tin tuyển dụng</p>
                    <picture>
                      <img
                        src={`${"/icon_top_blue.svg"}`}
                        alt=""
                        style={{ marginBottom: 4 }}
                      ></img>
                    </picture>
                  </div>

                  <div className={`${styles.content_ckeckbox}`}>
                    <input
                      name="list_recuitment_new"
                      type="checkbox"
                      onClick={(e) => handleClickCheckBox(e)}
                    ></input>
                    <p>Tất Cả</p>
                  </div>
                </div>
              }
            >
              <DataTTD
                list_recuitment_new={list_recuitment_new}
                dataCheckBox={handleListCheckChange}
                localListCheck={localListCheck}
              ></DataTTD>
            </CustomCollapse>
          </div>
        </Space>

        <Space
          direction="vertical"
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <div className={`${styles.content}`}>
            <CustomCollapse
              label={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={`${styles.content}`}>
                    <p>Vị trí công việc</p>
                    <picture>
                      <img
                        src={`${"/icon_top_blue.svg"}`}
                        alt=""
                        style={{ marginBottom: 4 }}
                      ></img>
                    </picture>
                  </div>

                  <div className={`${styles.content_ckeckbox}`}>
                    <input
                      name="list_job_desc"
                      type="checkbox"
                      onClick={(e) => handleClickCheckBox(e)}
                    ></input>
                    <p>Tất Cả</p>
                  </div>
                </div>
              }
            >
              <DataVTCV
                list_job_desc={list_job_desc}
                dataCheckBox={handleListCheckChange}
                localListCheck={localListCheck}
              ></DataVTCV>
            </CustomCollapse>
          </div>
        </Space>

        <Space
          direction="vertical"
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <div className={`${styles.content}`}>
            <CustomCollapse
              label={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={`${styles.content}`}>
                    <p>Quy trình đào tạo</p>
                    <picture>
                      <img
                        src={`${"/icon_top_blue.svg"}`}
                        alt=""
                        style={{ marginBottom: 4 }}
                      ></img>
                    </picture>
                  </div>

                  <div className={`${styles.content_ckeckbox}`}>
                    <input
                      name="list_training_process"
                      type="checkbox"
                      onClick={(e) => handleClickCheckBox(e)}
                    ></input>
                    <p>Tất Cả</p>
                  </div>
                </div>
              }
            >
              <DataQTDT
                list_training_process={list_training_process}
                dataCheckBox={handleListCheckChange}
                localListCheck={localListCheck}
              ></DataQTDT>
            </CustomCollapse>
          </div>
        </Space>

        <Space
          direction="vertical"
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <div className={`${styles.content}`}>
            <CustomCollapse
              label={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={`${styles.content}`}>
                    <p>Quy định làm việc</p>
                    <picture>
                      <img
                        src={`${"/icon_top_blue.svg"}`}
                        alt=""
                        style={{ marginBottom: 4 }}
                      ></img>
                    </picture>
                  </div>

                  <div className={`${styles.content_ckeckbox}`}>
                    <input
                      name="list_provision"
                      type="checkbox"
                      onClick={(e) => handleClickCheckBox(e)}
                    ></input>
                    <p>Tất Cả</p>
                  </div>
                </div>
              }
            >
              <DataQTLV
                list_provision={list_provision}
                dataCheckBox={handleListCheckChange}
                localListCheck={localListCheck}
              ></DataQTLV>
            </CustomCollapse>
          </div>
        </Space>

        <Space
          direction="vertical"
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <div className={`${styles.content}`}>
            <CustomCollapse
              label={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={`${styles.content}`}>
                    <p>Chính sách nhân viên</p>
                    <picture>
                      <img
                        src={`${"/icon_top_blue.svg"}`}
                        alt=""
                        style={{ marginBottom: 4 }}
                      ></img>
                    </picture>
                  </div>

                  <div className={`${styles.content_ckeckbox}`}>
                    <input
                      name="list_employe_policy"
                      type="checkbox"
                      onClick={(e) => handleClickCheckBox(e)}
                    ></input>
                    <p>Tất Cả</p>
                  </div>
                </div>
              }
            >
              <DataCSNV
                list_employe_policy={list_employe_policy}
                dataCheckBox={handleListCheckChange}
                localListCheck={localListCheck}
              ></DataCSNV>
            </CustomCollapse>
          </div>
        </Space>
      </div>
    </div>
  );
}
