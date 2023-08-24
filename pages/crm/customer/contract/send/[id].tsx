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

export default function ContractDetailsSend() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id } = router.query;
  const [checkbox1Checked, setCheckbox1Checked] = useState(true);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Hợp đồng bán / Gửi hợp đồng`);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/detail/${id}`);
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
  };

  const onChangeCheckbox2 = (e: CheckboxChangeEvent) => {
    setCheckbox2Checked(e.target.checked);
  };

  const onChangeCheckbox3 = (e: CheckboxChangeEvent) => {
    setCheckbox3Checked(e.target.checked);
  };

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
                                value={
                                  selectedDepartment
                                    ? selectedDepartment
                                    : "Chọn phòng ban"
                                }
                                placeholder="Chọn phòng ban"
                                onChange={handleChangeDepartment}
                                data={data}
                              >
                                <option value="">Chọn phòng ban</option>
                                {data.map((item) => (
                                  <option
                                    key={item.department}
                                    value={item.department}
                                  >
                                    {item.department}
                                  </option>
                                ))}
                              </ContractSelectBoxStep>
                            </div>
                            <div
                              className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_send"]}`}
                            >
                              <label className={`${styles["form-label"]}`}>
                                Chức vụ <span className={styles.dot}>*</span>
                              </label>
                              <ContractSelectBoxStep
                                value={
                                  selectedData
                                    ? selectedData.positions[0]
                                    : "Chọn chức vụ"
                                }
                                placeholder="Chọn chức vụ"
                              />
                            </div>
                            <div
                              className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_send"]}`}
                            >
                              <label className={`${styles["form-label"]}`}>
                                Nhân viên <span className={styles.dot}>*</span>
                              </label>
                              <ContractSelectBoxStep
                                value={
                                  selectedData
                                    ? selectedData.employees[0]
                                    : "Chọn nhân viên"
                                }
                                placeholder="Chọn nhân viên"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
