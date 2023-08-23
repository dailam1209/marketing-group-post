import React, { useState, useEffect } from "react";
import { Button, Modal, Select, Table, DatePicker, Input } from "antd";
import Image from "next/image";
import styles from "./index.module.css";
import axios from "axios";
import checkCookie from "../../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";
const Allowance = () => {
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");
  //render data
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetchApiData();
  }, []);
  const fetchApiData = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_phuc_loi`, {
        token: token,
        companyId: cp,
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  //thêm mới
  const apiInsert = `${domain}/api/tinhluong/congty/insert_wf_shift`;
  const [isInsert, setIsInsert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policyDescription, setPolicyDescription] = useState("");
  const [policyTime, setPolicyTime] = useState(null);
  const [policySelect, setPolicySelect] = useState();
  const [policyTimeEnd, setPolicyTimeEnd] = useState(null);
  const [tables, setTables] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
    setIsInsert(true);
  };

  const handleOk = async () => {
    await axios.post(apiInsert, {
      wf_com: cp,
      wf_shift: 4442,
      wf_money: policyDescription,
      // shift_name: policySelect,
      wf_time: policyTime?.format("YYYY-MM"),
      wf_time_end: policyTimeEnd?.format("YYYY-MM"),
      token: token,
    });

    setIsModalOpen(false);
    setIsInsert(false);
    setPolicyDescription("");
    setPolicyTime(null);
    setPolicyTimeEnd(null);
    setPolicySelect();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsInsert(false);
    setPolicyDescription("");
    setPolicyTime(null);
    setPolicyTimeEnd(null);
  };

  //chỉnh sửa
  const [isModalTimeOpen, setIsModalTimeOpen] = useState(false);
  const hanleModalTimeCancer = () => {
    setIsModalTimeOpen(false);
  };
  const [editingData, setEditingData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const showModalEditConfirm = (index) => {
    setIsModalTimeOpen(true);
    setEditingIndex(index);
    setEditingData(tables[index]);

    setPolicyDescription(tables[index]?.policyDescription || "");
    setPolicySelect(tables[index]?.incomeType || "");
    setPolicyTime(
      tables[index]?.policyTime
        ? moment(tables[index].policyTime, "YYYY-MM")
        : null
    );
    setPolicyTimeEnd(
      tables[index]?.policyTimeEnd
        ? moment(tables[index].policyTimeEnd, "YYYY-MM")
        : null
    );
  };

  // xóa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const showModalDeleteConfirm = (index) => {
    setSelectedTableIndex(index);
    setIsModalDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTableIndex !== null) {
      setTables((prevTables) =>
        prevTables.filter((_, index) => index !== selectedTableIndex)
      );
      setSelectedTableIndex(null);
      setIsModalDeleteOpen(false);
    }
  };
  useEffect(fetchApiData, [isInsert]);
  //table thêm mới
  const columns = [
    {
      title: "Tên ca",

      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.shift?.shift_name}</p>
        </div>
      ),
    },
    {
      title: "Tiền phụ cấp",
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {record?.wf_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VNĐ
          </p>
        </div>
      ),
    },
    {
      title: "Áp dụng từ tháng",
      render: (record) => (
        <div>
          <p>{new Date(`${record?.wf_time}`).toLocaleDateString("en-GB")}</p>
        </div>
      ),
    },
    {
      title: "Đến tháng",

      render: (record) => (
        <div>
          <div>
            <p>
              {new Date(`${record?.wf_time_end}`).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "policyTimeEnd",
      render: () => (
        <div>
          <div>
            <button className={styles.button_style}>
              <Image
                alt="/"
                src={"/add-icon.png"}
                width={15}
                height={15}
                onClick={showModalEditConfirm}
              />
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "setting",
      render: () => (
        <div>
          <button
            className={styles.button_style}
            onClick={showModalDeleteConfirm}
          >
            <Image alt="/" src={"/delete-icon.png"} width={15} height={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.text}>
                <h3 className={styles.header_h3}>Phụ cấp theo ca</h3>
                <p className={styles.header_p}>
                  Phụ cấp theo ca được tính tại thời điểm áp dụng tương ứng. Phụ
                  cấp theo ca được miễn thuế.
                </p>
              </div>
              <Button type="primary" onClick={showModal} className={styles.btn}>
                Thêm mới
              </Button>
            </div>
            <div className={styles.table_style}>
              <Table
                columns={columns}
                dataSource={apiData?.data?.wf_shift}
                className={styles.table}
              />
            </div>
          </div>
        </div>
        <div className="modal_delete">
          <Modal
            className={styles.modal_delete}
            title="Bạn chắc chắn muốn xóa ?"
            open={isModalDeteleOpen}
            onCancel={handleDeleteCancel}
            footer={null}
          >
            <div className={styles.modal_delete_body}>
              <Button
                type="primary"
                onClick={handleDeleteCancel}
                className={styles.btn_cancer}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={handleConfirmDelete}
                className={styles.btn_delete}
              >
                Xóa
              </Button>
            </div>
          </Modal>
        </div>
        <div className="modal_edit_time">
          <Modal
            className={styles.modal_edit_time}
            title="Chỉnh sửa phụ cấp theo ca"
            open={isModalTimeOpen}
            onCancel={hanleModalTimeCancer}
            footer={null}
          >
            <div className={styles.edit_time_body}>
              <label className={styles.p}>Tiền phụ cấp:</label>
              <Input
                id="policy-description"
                placeholder="Nhập tiền phụ cấp"
                className={styles.input_time}
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
              />
              <div className={styles.select_p}>
                <p>Áp dụng từ tháng</p>
                <DatePicker picker="month" className={styles.edit_time_month} />
              </div>
              <div className={styles.select_p}>
                <p>Đến tháng</p>
                <DatePicker picker="month" className={styles.edit_time_month} />
              </div>
            </div>
            <div className={styles.modal_edit_time_body}>
              <Button
                type="primary"
                onClick={hanleModalTimeCancer}
                className={styles.btn_edit_time_cancer}
              >
                Hủy bỏ
              </Button>
              <Button type="primary" className={styles.btn_edit_save}>
                Lưu lại
              </Button>
            </div>
          </Modal>
        </div>
        <div className="modal_times">
          <Modal
            className={styles.modal_times}
            title="Thêm mới phụ cấp theo ca"
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <div className={styles.times_body}>
              <div>
                <p className={styles.p}>Ca làm việc</p>
                <Select
                  className={styles.seclected}
                  placeholder=""
                  defaultValue="Chọn ca"
                  optionFilterProp="children"
                  value={policySelect}
                  onChange={(value) => setPolicySelect(value)}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "Ca sáng",
                      label: "Ca sáng",
                    },
                    {
                      value: "Ca chiều",
                      label: "Ca chiều",
                    },
                    {
                      value: "Ca tối",
                      label: "Ca tối",
                    },
                    {
                      value: "Ca đêm",
                      label: "Ca đêm",
                    },
                    {
                      value: "Ca gãy sáng",
                      label: "Ca gãy sáng",
                    },
                    {
                      value: "Ca ăn trưa",
                      label: "Ca ăn trưa",
                    },
                  ]}
                />
              </div>
              <div className={styles.time_element}>
                <p className={styles.p}>Áp dụng từ tháng</p>
                <DatePicker
                  picker="month"
                  className={styles.times_month}
                  value={policyTime}
                  onChange={(date) => setPolicyTime(date)}
                />
              </div>
              <div>
                <p className={styles.p}>Đến hết(không bắt buộc)</p>
                <DatePicker
                  picker="month"
                  className={styles.times_month}
                  value={policyTimeEnd}
                  onChange={(date) => setPolicyTimeEnd(date)}
                />
              </div>
              <label className={styles.p}>Tiền phụ cấp:</label>
              <input
                id="policy-description"
                placeholder="Nhập tiền phụ cấp"
                className={styles.input}
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
              />
            </div>
            <div className={styles.modal_times_body}>
              <Button
                type="primary"
                className={styles.btn_cancer}
                onClick={handleCancel}
              >
                Hủy bỏ
              </Button>
              <Button
                type="primary"
                className={styles.btn_saves}
                onClick={handleOk}
              >
                Thêm
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Allowance;
