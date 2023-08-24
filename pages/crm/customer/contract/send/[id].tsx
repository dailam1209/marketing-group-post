import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import MultipleSelection from "@/components/crm/customer/contract/multiple_selection";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import ContractSelectBoxStep from "@/components/crm/customer/contract/select_box_step-send";
import Link from "next/link";
import ModalCompleteContractStepADD from "@/components/crm/customer/contract/complete_contract_add";

const data = [
  {
    department: "Phòng A",
    positions: ["Chức vụ 1", "Chức vụ 2"],
    employees: ["Nhân viên 1", "Nhân viên 2"],
  },
  {
    department: "Phòng B",
    positions: ["Chức vụ 3", "Chức vụ 4"],
    employees: ["Nhân viên 3", "Nhân viên 4"],
  },
];

const dataDepartment = data?.map((item) => item.department);

console.log(123, data);

export default function ContractDetailsSend() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id } = router.query;
  const [checkbox1Checked, setCheckbox1Checked] = useState(true);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedPosition, setSelectedPosition] =
    useState<string>("Chọn chức vụ");
  const [selectedEmployee, setSelectedEmployee] =
    useState<string>("Chọn nhân viên");

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Hợp đồng bán / Gửi hợp đồng`);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/contract/list/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const selectedData = data.find(
    (item) => item.department === selectedDepartment
  );

  const handleChangeDepartment = (value: string) => {
    setSelectedDepartment(value);
  };

  const onChangeCheckbox1 = (e: CheckboxChangeEvent) => {
    setCheckbox1Checked(e.target.checked);
    setSelectedDepartment(null);
  };

  const onChangeCheckbox2 = (e: CheckboxChangeEvent) => {
    setCheckbox2Checked(e.target.checked);
  };

  const onChangeCheckbox3 = (e: CheckboxChangeEvent) => {
    setCheckbox3Checked(e.target.checked);
  };

  useEffect(() => {
    setSelectedPosition("");
    setSelectedEmployee("");
  }, [selectedDepartment]);

  return (
    <>
      <div className={styleHome.main}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Gửi hợp đồng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <p className={styles["main__body__send"]}>
                      Nơi nhận hợp đồng
                    </p>
                    <div className={styles.group_checkbox}>
                      <Checkbox defaultChecked onChange={onChangeCheckbox1}>
                        Nội bộ công ty
                      </Checkbox>
                      <Checkbox onChange={onChangeCheckbox2}>
                        Ngoài công ty
                      </Checkbox>
                      <Checkbox onChange={onChangeCheckbox3}>
                        Tài khoản cá nhân
                      </Checkbox>
                    </div>
                    <div className={styles.description_send}>
                      {checkbox1Checked && (
                        <div className={styles.incompany}>
                          <p className={styles["main__body__send"]}>
                            Nội bộ công ty
                          </p>
                          <div className={styles.select_incompany}>
                            <div
                              className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_send"]}`}
                            >
                              <label className={`${styles["form-label"]}`}>
                                Phòng ban <span className={styles.dot}>*</span>
                              </label>
                              <ContractSelectBoxStep
                                setSelectedDepartment={setSelectedDepartment}
                                value={selectedDepartment || "Chọn phòng ban"}
                                placeholder="Chọn phòng ban"
                                onChange={handleChangeDepartment}
                                data={dataDepartment}
                              >
                                {/* <option value="">Chọn phòng ban</option> */}
                                {/* {data.map((item) => (
                                  <option
                                    key={item.department}
                                    value={item.department}
                                  >
                                    {item.department}
                                  </option>
                                ))} */}
                              </ContractSelectBoxStep>
                            </div>
                            <div
                              className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_send"]}`}
                            >
                              <label className={`${styles["form-label"]}`}>
                                Chức vụ <span className={styles.dot}>*</span>
                              </label>
                              <ContractSelectBoxStep
                                value={selectedPosition || "Chọn chức vụ"}
                                placeholder="Chọn chức vụ"
                                data={selectedData?.positions}
                                setSelectedDepartment={setSelectedPosition}
                              />
                            </div>
                            <div
                              className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_send"]}`}
                            >
                              <label className={`${styles["form-label"]}`}>
                                Nhân viên <span className={styles.dot}>*</span>
                              </label>
                              <ContractSelectBoxStep
                                value={selectedEmployee || "Chọn nhân viên"}
                                placeholder="Chọn nhân viên"
                                data={selectedData?.employees}
                                setSelectedDepartment={setSelectedEmployee}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {checkbox2Checked && (
                        <div className={styles.outsidecompany}>
                          <p className={styles["main__body__send"]}>
                            Ngoài công ty
                          </p>
                          <div>
                            <div className={styles.input_select_group}>
                              <div className={styles.input_send}>
                                <label className={`${styles["form-label"]}`}>
                                  Công ty <span className={styles.dot}>*</span>
                                </label>
                                <input
                                  placeholder="Hãy nhập email công ty muốn gửi hợp đồng"
                                  defaultValue=""
                                  className={styles.input_custom}
                                />
                              </div>
                              <div className={styles.select_send}>
                                <label className={`${styles["form-label"]}`}>
                                  Nhân viên
                                </label>
                                <div className={styles.custom_multiple}>
                                  <MultipleSelection />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {checkbox3Checked && (
                        <div className={styles.personal}>
                          <p className={styles["main__body__send"]}>
                            Tài khoản cá nhân
                          </p>
                          <div
                            className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_employee"]}`}
                          >
                            <ContractSelectBoxStep
                              value="Chọn tài khoản cần gửi hợp đồng"
                              placeholder="Chọn tài khoản cần gửi hợp đồng"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.button_group_send}>
                <Link href={`/crm/customer/contract/detail/${id}`}>
                  <button className={styles.back_button}>Quay lại</button>
                </Link>
                <button
                  className={styles.send_button}
                  onClick={() => setModal1Open(true)}
                >
                  Gửi hợp đồng
                </button>
                <ModalCompleteContractStepADD
                  modal1Open={modal1Open}
                  setModal1Open={setModal1Open}
                  title={""}
                  id={id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
