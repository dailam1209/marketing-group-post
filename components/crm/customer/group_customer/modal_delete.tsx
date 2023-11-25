import { Modal, Table } from "antd";
import styles1 from "@/components/crm/input_select/potential.module.css";
import styles from "@/components/crm/input_select/potential2.module.css";
import stylesAdd from "@/components/crm/input_select/add_file_commodity.module.css";
import stylesBtn from "./customer_group.module.css";

import { useEffect, useRef, useState } from "react";
import { toLowerCaseNonAccentVietnamese } from "@/utils/function";
interface TypeDeleteProps {
  isOpenModalDelete: boolean;
  setIsOpenModalDelete: (value: boolean) => void;
  title?: string;
  link?: string;
  id?: any;
  name?: string;
  description?: string;
  updateData?: any;
}
export const ModalGroupCustomerDelete: React.FC<TypeDeleteProps> = ({
  isOpenModalDelete,
  setIsOpenModalDelete,
}) => {
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("Tên biến cần xóa");
  const [searchLabel, setSearchLabel] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labelSelect, setLabelSelect] = useState<string>("Chọn");
  let data = [];
  for (let i = 1; i < 20; i++) {
    data.push({ value: i, label: `Nhân viên ${i}` });
  }
  const [isOpen, setIsOpen] = useState(false);

  const handelChooceOption = (item: { value: number; label: string }) => {
    setFormData({ ...formData, [name]: item.value });
    setLabelSelect(item.label);
  };
  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
  };

  const handleScrollkOutside = (e: any) => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}

      <Modal
        // title={"Đối tượng được chia sẻ"}
        centered
        footer={null}
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        className={"mdal_delete_group_customer"}
        width={1000}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles1.select_single_add}>
            <div className={styles1.box_select_add}>
              <label className={`${stylesAdd["form-label"]} `}>
                Xóa chia sẻ
              </label>
            </div>
            <div
              ref={dropdownRef}
              className={`${styles1.select_item_box_step} flex_align_center_item`}
            >
              <span
                className={`select2 ${styles1.select2_container_step}`}
                dir="ltr"
                data-select2-id={2}
                onClick={handleClickSelectoption}
              >
                <span className={`${styles1.selection}`}>
                  <span
                    className={`${styles1.select2_selection} select2_selection_single`}
                    role="combobox"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex={0}
                    aria-labelledby="select2-g0q1-container"
                  >
                    <span
                      className={styles1.select2_selection__rendered}
                      id="select2-g0q1-container"
                      role="textbox"
                      aria-readonly="true"
                      // title="Chọn người dùng"
                    >
                      {labelSelect}
                    </span>
                    <span
                      className={styles1.select2_selection__arrow}
                      role="presentation"
                    >
                      <b role="presentation" />
                    </span>
                  </span>
                </span>
                {isOpen && (
                  <span
                    className={`${styles1.select2_container_open} ${styles1.select2_container} ${styles1.select2_container_default} `}
                    style={{
                      position: "absolute",
                      top: 35,
                      left: 0,
                      zIndex: 10,
                    }}
                  >
                    <span
                      className={`${styles1.select2_dropdown} ${styles1.select2_dropdown_below}`}
                      dir="ltr"
                      style={{ width: "100%", display: "block" }}
                    >
                      <span
                        className={`${styles1.select2_search} ${styles1.select2_search__dropdown}`}
                      >
                        <input
                          className={styles1.select2_search__field}
                          type="search"
                          tabIndex={0}
                          onChange={(e) => {
                            setSearchLabel(e.target.value);
                          }}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck="false"
                          role="textbox"
                          style={{ height: "34px" }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </span>
                      <span className={styles1.select2_results}>
                        <ul
                          className={styles1.select2_results__options}
                          role="tree"
                          aria-expanded="true"
                          aria-hidden="false"
                        >
                          {labelSelect && (
                            <li
                              //   onClick={() => selectData(labelSelect)}
                              className={`${styles1.select2_results__option} ${styles1.select2_results__option_highlighted}`}
                            >
                              {/* Chọn tất cả */}
                              {labelSelect}
                            </li>
                          )}
                          {searchLabel
                            ? data
                                ?.filter((itemFilter: any) =>
                                  toLowerCaseNonAccentVietnamese(
                                    itemFilter.label
                                  ).includes(
                                    toLowerCaseNonAccentVietnamese(searchLabel)
                                  )
                                )
                                .map(
                                  (
                                    item: { value: number; label: string },
                                    i: number
                                  ) => (
                                    <li
                                      key={i}
                                      className={`${styles1.select2_results__option}}`}
                                      style={{
                                        marginTop: "10px",
                                        padding: "5px 0",
                                        paddingLeft: "18px",
                                      }}
                                      onClick={() => handelChooceOption(item)}
                                    >
                                      {item.label}
                                    </li>
                                  )
                                )
                            : data?.map(
                                (
                                  item: { value: number; label: string },
                                  i: number
                                ) => (
                                  <li
                                    key={i}
                                    className={`${styles1.select2_results__option}}`}
                                    style={{
                                      marginTop: "10px",
                                      padding: "5px 0",
                                      paddingLeft: "18px",
                                    }}
                                    onClick={() => handelChooceOption(item)}
                                  >
                                    {item.label}
                                  </li>
                                )
                              )}
                        </ul>
                      </span>
                    </span>
                  </span>
                )}
              </span>
            </div>
          </div>
          <button
            style={{ marginLeft: "20px" }}
            className={stylesBtn.delete_button}
          >
            Xóa
          </button>
        </div>
      </Modal>
    </>
  );
};
