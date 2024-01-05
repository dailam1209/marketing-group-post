import React, { useRef, useState } from "react";
import { Plus, DropDown } from "@/public/img/marketing/facebook";
import styles from "./facebook.module.css";
import FacebookModal from "./facebook_modal";
import { Button, Modal, Select, Space } from "antd";

const FacebookNav = () => {
  const [ value, setValue ] = useState('');
  const [isOpen, setIsOpen ] = useState(false);
  const [oneIsActive, setOneIsActive] = useState(false);
  const [twoIsActive, setTwoIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const optionRef = useRef(null);
  const childrenRef  = useRef(null)

  const check = () => {
    console.log('in');
    setIsOpen(false)
    setValue('a');
  };


  document.addEventListener('click', function(e) {
    if(isOpen) {
      if(!optionRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    } 
  });

  const showOptions =  () => {
      setIsOpen(true)
  } ;

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  return (
    <section id="facebook_nav" className={styles.facebook__nav}>
      <div>
        {/* all */}
        <div className={styles.title_nav}>
          <p className={styles.title_nav_title}>Tất cả</p>
          <div className={styles.facebook_icon}>
            <Plus />
          </div>
          <div>
            <Modal
              open={true}
              title={
                <div className={styles.bg_modal} onClick={() => {}}>
                  <p>KỊCH BẢN TIN NHẮN</p>
                </div>
              }
              onOk={handleOk}
              onCancel={() => {}}
              footer={
                <div className={styles.btn_modal}>
                  <Button
                    className={styles.btn_modal_action}
                    key="back"
                    onClick={() => {}}
                  >
                    Hủy
                  </Button>
                  <Button
                    className={styles.btn_modal_action}
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                  >
                    Tạo mới
                  </Button>
                </div>
              }
            >
              <div>
                <div className={styles.modal_row}>
                  <p className={styles.modal_row_title}>Chọn loại kich bản</p>
                  <div
                    ref={optionRef}
                   onClick={() => showOptions()}
                    className={styles.moddal__options}
                  >
                    <input
                      className={`${styles.modal_row_input} ${styles.hidden}`}
                      type="checkbox"
                      id="filter-switch"
                    ></input>
                    <label
                      for="filter-switch"
                      className={styles.dropdown__options_filter}
                    >
                      Chọn loại kịch bản
                    </label>
                    <div className={styles.modal__option_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="8"
                        viewBox="0 0 14 8"
                        fill="none"
                      >
                        <path
                          d="M1.5 1.5L7 6.5L12.5 1.5"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <ul
                    ref={childrenRef}
                    style={{
                      display: `${isOpen ? 'block' : 'none'}`
                    }}
                      className={styles.dropdown__filter}
                      role="listbox"
                      tabindex="-1"
                    >
                      <li>
                        <ul className={styles.dropdown__select}>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                            onClick={(e) => check(e)}
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                          <li
                            className={styles.dropdown__select_option}
                            role="option"
                          >
                            Option 1
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.modal_row}>
                  <p className={styles.modal_row_title}>Tên mẫu tin nhắn</p>
                  <input
                    className={styles.modal_row_input}
                    placeholder="Nhập tên mẫu tin nhắn"
                  ></input>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        {/* details */}
        <div>
          <div className={styles.nav_1}>
            {/* click */}
            <div
              onClick={() => setOneIsActive(!oneIsActive)}
              className={styles.facebook__nav_scroll}
            >
              <p className={styles.facebook__nav_scroll_title}>
                Tin nhắn truyền thống
              </p>
              <div
                className={`${styles.facebook__nav_scroll_icon} ${
                  oneIsActive ? `${styles.icon_ronate}` : ""
                }`}
              >
                <DropDown />
              </div>
            </div>
            {/* children */}
            <ul
              className={`${styles.facebook__nav_scroll_list} ${
                oneIsActive ? `${styles.active}` : ""
              }`}
            >
              <li className={styles.facebook__nav_scroll_item}>
                Mẫu tin nhắn truyền thống 1
              </li>
              <li className={styles.facebook__nav_scroll_item}>
                Mẫu tin nhắn truyền thống 2
              </li>
              <li className={styles.facebook__nav_scroll_item}>
                Mẫu tin nhắn truyền thống 3
              </li>
            </ul>
          </div>
          <div>
            {/* click */}
            <div
              onClick={() => setTwoIsActive(!twoIsActive)}
              className={styles.facebook__nav_scroll}
            >
              <p className={styles.facebook__nav_scroll_title}>
                Tin nhắn truyền thống
              </p>
              <div
                className={`${styles.facebook__nav_scroll_icon} ${
                  twoIsActive ? `${styles.icon_ronate}` : ""
                }`}
              >
                <DropDown />
              </div>
            </div>
            {/* children */}
            <ul
              className={`${styles.facebook__nav_scroll_list} ${
                twoIsActive ? `${styles.active}` : ""
              }`}
            >
              <li className={styles.facebook__nav_scroll_item}>
                Mẫu tin nhắn truyền thống 1
              </li>
              <li className={styles.facebook__nav_scroll_item}>
                Mẫu tin nhắn truyền thống 2
              </li>
              <li className={styles.facebook__nav_scroll_item}>
                Mẫu tin nhắn truyền thống 3
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacebookNav;
