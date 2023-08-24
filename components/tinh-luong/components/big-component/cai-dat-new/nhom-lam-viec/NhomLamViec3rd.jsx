import { useEffect, useState } from "react";
import { Select, Modal, Button } from "antd";
import { Space, Table, Tag } from "antd";
import styles from "./NhomLamViec3rd.module.css";
import axios from "axios";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

export default function NhomLamViec3rd({
  selected1,
  resetPage,
  handleSelected,
}) {
  console.log("ResetPage3 ở Page3", resetPage);
  checkCookie();
  const domain = process.env.NEXT_PUBLIC_BASE_URL_TL;
  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");
  const arrayInput = [{}];

  function findIndexById(array, id) {
    return array.findIndex((item) => item.gm_id === id);
  }

  //* Them attribute Group Name vao array
  function addGroupNametoArray(userGrouped, listGroup) {
    return userGrouped.map((item) => {
      const matchingId = listGroup.find(
        (idItem) => idItem.lgr_id === item.gm_id_group
      );

      return { ...item, lgr_name: matchingId ? matchingId.lgr_name : null };
    });
  }
  //* Them attribute tên người vào array
  function addUserNametoArray(userGroup_Edited, listUserDetail) {
    return userGroup_Edited.map((item) => {
      const matchingId = listUserDetail.find(
        (idItem) => idItem.idQLC === item.gm_id_user
      );
      return {
        ...item,
        lgr_user_name: matchingId ? matchingId.userName : null,
      };
    });
  }

  const handleRenderName = (id) => {
    console.log("id nhận được 4499 là: ", id);
  };

  //* list số thành viên của một nhóm
  const numberOfMemberInGroup = (groupId) => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_member_many_group`, {
        listGroup: `[${groupId}]`,
        token: token,
      })
      .then((res) => {
        console.log(
          `Số thành viên trong nhóm ${groupId} là: `,
          res.data.listUserFinal
        );
        setNumberOfMember(res.data.listUserFinal);
      })
      .catch((err) => {
        console.log("Error ở API:take_member_many_group ", err);
      });
  };

  //* Lọc array, nếu xét trùng tên thì nhóm hợp vào mảng. Lọc ở đây là lọc cái userGroup chứ k phải userGroupDetail
  const transformArray = (inputArray) => {
    const result = [];

    inputArray.forEach((item) => {
      const existingItem = result.find(
        (resultItem) => resultItem.lgr_user_name === item.lgr_user_name
      );
      if (existingItem) {
        if (!existingItem.lgr_name.includes(item.lgr_name)) {
          existingItem.lgr_name.push(item.lgr_name);
        }
        if (!existingItem.gm_id_group.includes(item.gm_id_group)) {
          existingItem.gm_id_group.push(item.gm_id_group);
        }
      } else {
        result.push({
          gm_id: item.gm_id,
          gm_id_com: item.gm_id_com,
          gm_id_group: [item.gm_id_group],
          gm_id_user: item.gm_id_user,
          gm_time_created: item.gm_time_created,
          lgr_name: [item.lgr_name],
          lgr_user_name: item.lgr_user_name,
          _id: item._id,
        });
      }
    });

    return result;
  };

  const handleClick = (c) => {
    handleSelected(c);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [numberOfMember, setNumberOfMember] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [userGrouped, setUserGrouped] = useState([]);
  const [userGroupedDetail, setUserGroupedDetail] = useState([]);
  const [gmIdSelected, setGmIdSelected] = useState();
  const [formData, setFormData] = useState({});
  const [allGroup, setAllGroup] = useState({}); //* State liet ke cac group và trong các gr đó có số thành viên
  console.log("allGroup:", allGroup);

  const handleDeleteUser = (gm_id_recive) => {
    axios
      .post(`${domain}api/tinhluong/congty/delete_member_group`, {
        gm_id: gm_id_recive,
        token: token,
      })
      .then((res) => {
        console.log("Kết quả sau khi xóa thành công : ", res);
      })
      .catch((err) => {
        console.log(
          "http://210.245.108.202:3009/api/tinhluong/congty/delete_member_group",
          err
        );
      });
    setIsDelete(!isDelete);
    console.log("gm_id nhận được", gm_id_recive);
  };

  //modal thiet lap
  const [isModalOpenThietLap, setIsModalOpenThietLap] = useState(false);
  const showModalThietLap = (id, groupId) => {
    setGmIdSelected(id);
    setIsModalOpenThietLap(true);
  };
  const handleCancelThietLap = () => {
    setIsModalOpenThietLap(false);
  };
  const handleOkThietLap = () => {
    setIsModalOpenThietLap(false);
  };

  //modal them moi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ TenNhom: "", Mota: "" });
  };
  const handleOk = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/insert_group`, {
        lgr_id_com: cp,
        lgr_name: formData.TenNhom,
        lgr_note: formData.Mota,
        token: token,
      })
      .then((res) => {
        console.log(" Response sau khi post ở Nhóm làm việc 3rd: ", res);
      })
      .catch((err) => {
        console.log("Error sau khi post ở nhóm làm việc 3rd: ", err);
      });
    setIsModalOpen(false);
    setFormData({ TenNhom: "", Mota: "" });
  };

  const columns = [
    {
      title: "     ",

      key: "name",
      width: "40%",
      render: (record) => (
        <div className={styles.tax_tb_avt}>
          <div className={styles.tax_avt_one}>
            <img src="/add.png" alt="" />
          </div>
          <div className={styles.tax_avt_tow}>
            <h4>{record?.lgr_user_name}</h4>
            <p>ID:{record?.gm_id_user}</p>
          </div>
        </div>
      ),
    },
    {
      title: "     ",

      key: "age",
      width: "30%",
      render: (record) => (
        <div>
          {record?.lgr_name.map((item, index) => (
            <p
              style={{
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "18px",
                color: "#5f648d",
              }}
            >
              {item}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: "     ",

      key: "age",
      width: "30%",
      render: (record) => (
        <p
          className={styles.btn_towselectgroup}
          onClick={() => showModalThietLap(record?.gm_id, record?.gm_id_group)}
        >
          <p>Thiết lập</p>
        </p>
      ),
    },
  ];
  useEffect(() => {
    axios
      .post(`${domain}/api/tinhluong/congty/takeinfo_member_group_com`, {
        com_id: cp,
        token: token,
      })
      .then((res) => {
        let userGroup_Edited = addGroupNametoArray(
          res.data.listUserGroup,
          res.data.listGroup
        );
        console.log("userGroup_Edited: ", userGroup_Edited);
        let userGroup_Edited_with_Name = addUserNametoArray(
          userGroup_Edited,
          res.data.listUserGroupDetail
        );
        console.log("userGroup_Edited_with_Name: ", userGroup_Edited_with_Name);
        let finalResultTest = transformArray(userGroup_Edited_with_Name);
        console.log("FinalResultTest: ", finalResultTest);
        setUserGrouped(finalResultTest);
        setUserGroupedDetail(res.data.listUserGroupDetail);
        setAllGroup(res.data.listGroup);
      });
  }, [isDelete]);
  console.log("user Grouped: ", userGrouped);
  return (
    <div>
      Hello from 3rd
      <div className={styles.tax_one}>
        <p className={styles.btn_new} onClick={showModal}>
          Tạo mới
        </p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Nhóm làm việc</p>
          <p onClick={() => handleClick(2)}>D/s nhân viên chưa nhóm</p>
          <p onClick={() => handleClick(3)} className={styles.active}>
            D/s nhân viên các nhóm
          </p>
          <p onClick={() => handleClick(4)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          {/* Thanh select ten nguoi */}
          <div className={styles.sl_thanh}>
            <Select
              showSearch
              placeholder="Nhập tên nhân viên cần tìm"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "jack",
                  label: "(146608)Hà Ngọc Ánh",
                },
                {
                  value: "lucy",
                  label: "(131845)Phùng Ngọc Anh",
                },
                {
                  value: "tom",
                  label: "(121640)Hoàng Minh Anh",
                },
              ]}
            />
          </div>

          {/* Bang Danh Sach */}
          <div className={styles.tax_tb}>
            <Table
              className="CustomTable3rdNhomLamViec"
              dataSource={userGrouped}
              columns={columns}
            />
          </div>
        </div>
      </div>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="Thêm mới nhóm làm việc"
        open={isModalOpenThietLap}
        footer={null}
        onCancel={handleCancelThietLap}
      >
        <div className={styles.modal_hd_tax_thietlap}>
          <div className={styles.modal_body_thietlap}>
            <div className={styles.cr_popup_tax_thietlap}>
              <form>
                <div className={styles.cr_popup_tax_avt_thietlap}>
                  <div className={styles.cr_avt_one_thietlap}>
                    <img src="/add.png" alt="" />
                    <span>
                      <h4>
                        {
                          userGrouped[findIndexById(userGrouped, gmIdSelected)]
                            ?.lgr_user_name
                        }
                      </h4>
                      <p>
                        {
                          userGrouped[findIndexById(userGrouped, gmIdSelected)]
                            ?.gm_id_user
                        }
                      </p>
                    </span>
                  </div>
                </div>

                {userGrouped[
                  findIndexById(userGrouped, gmIdSelected)
                ]?.lgr_name.map((item, index) => {
                  return (
                    <div className={styles.cat_join_thietlap}>
                      <div className={styles.cate_join_thielap}>
                        <div className={styles.cate_join_ct_one_thietlap}>
                          <h4>{item}</h4>
                          <p>( 6 người )</p>
                        </div>

                        <div className={styles.cate_join_ct_tow_thietlap}>
                          <img
                            src="/remove.png"
                            alt=""
                            onClick={() => handleDeleteUser(gmIdSelected)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <button
                  onClick={handleOkThietLap}
                  className={styles.btn_sv_Thietlap}
                >
                  Lưu lại
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="Thêm mới nhóm làm việc"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className={styles.modal_body}>
          <label className={styles.description}>Tên Nhóm</label>
          <input
            type="text"
            value={formData.TenNhom}
            name="TenNhom"
            placeholder="Nhập tên nhóm"
            onChange={(e) => handleChange(e)}
            className={styles.input}
          />

          <label className={styles.description}>Mô tả</label>
          <textarea
            value={formData.Mota}
            rows="5"
            placeholder="Nhập mô tả"
            name="Mota"
            onChange={(e) => handleChange(e)}
            className={styles.input}
          />

          <div>
            <Button className={styles.myBtn} type="primary" onClick={handleOk}>
              Tạo nhóm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
