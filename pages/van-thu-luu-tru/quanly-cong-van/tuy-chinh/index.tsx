import styles from "./document.module.css";
import Image from "next/image";
import { BiSkipNext } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchData, handleCreate, handleDelete } from "@/utils/BaseApi";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { parse } from "cookie";
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

const Index = ({ data }: any) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setshowModalUpdate] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [modalDelete, setmodalDelete] = useState(false);

  const handleTogglePopover = (itemId: number) => {
    setSelectedItemId((prevItemId) => (prevItemId === itemId ? null : itemId));
  };
  // Phân trang
  const ItemsPerPage = 10;
  const [dataUseE, setDataUseE] = useState<any>([]); // Danh sách dữ liệu
  const [totalItems, setTotalItems] = useState<number>(0); // Tổng số mục được trả về
  const [currentPage, setCurrentPage] = useState<any>(1); // Trang hiện tại

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData(
          token,
          "api/vanthu/guiNhanCongVan/setting/getListSoVanBan",
          { page: currentPage, pageSize: ItemsPerPage }
        );
        setDataUseE(response?.data?.message?.listSoVanBan || []);
        setTotalItems(response?.data?.message?.total || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromApi();
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / ItemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCookie("page", pageNumber);
    console.log(getCookie("page"));
    setCurrentPage(getCookie("page"));
  };
  setCookie("pageSize", ItemsPerPage);

  // Modal - thêm
  const [show, setshow] = useState(false);
  const [so_vb, setso_vb] = useState("");
  const openModal = () => {
    setSelectedItemId(null);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedItemId(null);
    setShowModal(false);
  };

  const handleAddSo_vb = async () => {
    if (so_vb === "") {
      setshow(true);
    } else {
      setShowModal(!showModal);
      try {
        const api = "api/vanthu/guiNhanCongVan/setting/createSoVanBan";
        if (so_vb !== "") {
          await handleCreate(api, { name_book: so_vb });
          router.push("/van-thu-luu-tru/quanly-cong-van/tuy-chinh");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi ý kiến:", error);
      }
    }
  };

  // Modal - sửa
  const [updateSo_vb, setUpdateso_vb] = useState("");
  const openModalUpdate = (id: any) => {
    setSelectedItemId(id);
    setshowModalUpdate(true);
    if (token) {
      fetchGetDataBookId();
    }
  };
  const fetchGetDataBookId = async () => {
    try {
      const response = await fetchData(
        token,
        "api/vanthu/guiNhanCongVan/setting/getListSoVanBan",
        {
          id_so_vb: selectedItemId,
        }
      );
      setUpdateso_vb(response?.data?.so_vb?.name_book);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };
  const closeModalUpdate = () => {
    setshowModalUpdate(false);
  };
  const handleEditSo_vb = async (id: any) => {
    if (updateSo_vb === "") {
      setshow(true);
    } else {
      closeModalUpdate();
      try {
        const api = "api/vanthu/guiNhanCongVan/setting/updateSoVanBan";
        if (updateSo_vb !== "") {
          await handleCreate(api, { name_book: updateSo_vb, id_so_vb: id });
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi ý kiến:", error);
      }
    }
    router.push("/van-thu-luu-tru/quanly-cong-van/tuy-chinh");
    fetchGetDataBook();
  };
  // danh sách vb
  const fetchGetDataBook = async () => {
    try {
      const response = await fetchData(
        token,
        "api/vanthu/guiNhanCongVan/setting/getListSoVanBan"
      );
      setUpdateso_vb(response?.data?.so_vb?.name_book);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };
  // Modal - xóa
  const openModalDelete = (id: any) => {
    setSelectedItemId(id);
    setmodalDelete(true);
  };
  const closeModalDelete = () => {
    setSelectedItemId(null);
    setmodalDelete(false);
  };
  const handleDeleteItem = async (id: any) => {
    closeModalDelete();
    try {
      await handleDelete("api/vanthu/guiNhanCongVan/setting/deleteSoVanBan", {
        id_so_vb: id,
      });
      alert(`Đã xóa thành công`);
    } catch (error) {
      alert(`Xóa thất bại `);
    }
    router.push("/van-thu-luu-tru/quanly-cong-van/tuy-chinh");
  };

  return (
    <div className={styles.app}>
      <div className={styles.scrollMobile}>
        <div className={styles.header}>
          <Link href="/van-thu-luu-tru/quanly-cong-van/tuy-chinh" style={{ color: "#4c5bd4" }}>
            Sổ văn bản
          </Link>
          <Link
            href="/van-thu-luu-tru/quanly-cong-van/tuy-chinh/bo-phan-phong-ban"
            style={{ color: "black" }}
          >
            Bộ phận phòng ban
          </Link>
          <Link
            href="/van-thu-luu-tru/quanly-cong-van/tuy-chinh/cai-dat-chung"
            style={{ color: "black" }}
          >
            Cài đặt chung
          </Link>
        </div>
      </div>
      <div className={styles.sub_header}>
        <p>Danh sách sổ văn bản</p>
        <button onClick={openModal}>
          <Image src={"/icon/Up_text.png"} width={20} height={20} alt="" />
          <span style={{ padding: "0 4px" }}>Tạo mới</span>
        </button>
      </div>
      <div className={styles.scrollMobile}>
        <div className={styles.div_table}>
          <table>
            <thead className={styles.headerrr}>
              <tr>
                <th>STT</th>
                <th>Tên sổ văn bản</th>
                <th>Người tạo</th>
                <th>Thời gian tạo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data?.listSoVanBan?.map((item: any) => (
                    <tr key={item?._id} className={styles.content}>
                      <td>{item?._id}</td>
                      <td style={{ width: "250px" }}>{item?.name_book}</td>
                      <td
                        style={{ width: "250px" }}
                        className={styles.color_blue}
                      >
                        {item?.nguoi_tao}
                      </td>
                      <td
                        style={{ width: "250px" }}
                        className={styles.color_blue}
                      >
                        {item?.creat_date}
                      </td>
                      <td style={{ position: "relative" }}>
                        <button onClick={() => handleTogglePopover(item?._id)}>
                          ⁝
                        </button>
                        {selectedItemId === item?._id && (
                          <div className={styles.popover}>
                            <button
                              onClick={() => openModalUpdate(item._id)}
                              className={styles.editbtn}
                            >
                              <Image
                                src={"/icon/edit.png"}
                                width={21}
                                height={21}
                                alt="Avatar"
                              />
                              <span>Chỉnh sửa</span>
                            </button>
                            <button
                              onClick={() => openModalDelete(item._id)}
                              className={styles.editbtn}
                            >
                              <Image
                                src={"/icon/del.png"}
                                width={21}
                                height={21}
                                alt="Avatar"
                              />
                              <span>Xóa</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                : dataUseE?.map((item: any) => (
                    <tr key={item?._id} className={styles.content}>
                      <td>{item?._id}</td>
                      <td style={{ width: "250px" }}>{item?.name_book}</td>
                      <td
                        style={{ width: "250px" }}
                        className={styles.color_blue}
                      >
                        {item?.nguoi_tao}
                      </td>
                      <td
                        style={{ width: "250px" }}
                        className={styles.color_blue}
                      >
                        {item?.creat_date}
                      </td>
                      <td style={{ position: "relative" }}>
                        <button onClick={() => handleTogglePopover(item?._id)}>
                          ⁝
                        </button>
                        {selectedItemId === item?._id && (
                          <div className={styles.popover}>
                            <button
                              onClick={() => openModalUpdate(item._id)}
                              className={styles.editbtn}
                            >
                              <Image
                                src={"/icon/edit.png"}
                                width={21}
                                height={21}
                                alt="Avatar"
                              />
                              <span>Chỉnh sửa</span>
                            </button>
                            <button
                              onClick={() => openModalDelete(item._id)}
                              className={styles.editbtn}
                            >
                              <Image
                                src={"/icon/del.png"}
                                width={21}
                                height={21}
                                alt="Avatar"
                              />
                              <span>Xóa</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              <tr>
                <td
                  className={styles.td_ft}
                  style={{ borderRadius: "0 0 0 15px" }}
                ></td>
                <td style={{ background: "#fff" }}></td>
                <td style={{ background: "#fff" }}></td>
                <td style={{ background: "#fff" }}></td>
                <td className={styles.td_ft}></td>
              </tr>
            </tbody>
          </table>
          <div className={styles.paginate}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber: any) => (
                <li key={pageNumber} className={styles.li_navi}>
                  <Link
                    href="/van-thu-luu-tru/quanly-cong-van/tuy-chinh"
                    onClick={() => handlePageChange(pageNumber)}
                    // disabled={currentPage === pageNumber}
                    style={{
                      backgroundColor:
                        getCookie("page") == pageNumber ? "#ccc" : "",
                      cursor:
                        getCookie("page") == pageNumber ? "not-allowed" : "",
                    }}
                    className={styles.btn_navigation}
                  >
                    {pageNumber}
                  </Link>
                </li>
              )
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className={styles.module_forward}>
          <div className={styles.module_forward_table}>
            <div className={styles.module_forward_title}>
              <p
                className={styles.text_white_kochan}
                style={{ fontSize: "20px" }}
              >
                Tạo sổ văn bản
              </p>
              <div onClick={closeModal} className={styles.close_module}>
                <Image src="/icon/X-trang.png" height={30} width={30} alt="" />
              </div>
            </div>
            <div className={styles.module_forward_body}>
              <div className={styles.content_modal}>
                <p>Tên sổ văn bản</p>
                <input
                  type="text"
                  placeholder="Nhập sổ văn bản"
                  onChange={(e: any) => {
                    setso_vb(e.target.value);
                  }}
                />
              </div>
              {show ? (
                <>
                  <p
                    style={{
                      color: "red",
                      margin: "10px",
                      fontSize: "14px",
                    }}
                  >
                    Vui lòng nhập sổ văn bản...
                  </p>
                </>
              ) : (
                <></>
              )}
              <div className={styles.content_modal}>
                <p>Người tạo</p>
                <input
                  type="text"
                  value="Công ty Cổ phần Thanh toán Hưng Hà 2"
                />
              </div>
              <div className={styles.content_modal}>
                <p>Thời gian tạo</p>
                <input type="text" value="08/07/2023" />
              </div>
              <div className={styles.btn_footer}>
                <button onClick={handleAddSo_vb}>Lưu lại</button>
                <button
                  onClick={closeModal}
                  style={{
                    border: "border: 1px solid #4c5bd4",
                    background: "#fff",
                    color: "#4c5bd4",
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* //update */}
      {showModalUpdate && (
        <div className={styles.module_forward}>
          <div className={styles.module_forward_table}>
            <div className={styles.module_forward_title}>
              <p
                className={styles.text_white_kochan}
                style={{ fontSize: "20px" }}
              >
                Cập nhật sổ văn bản
              </p>
              <div onClick={closeModalUpdate} className={styles.close_module}>
                <Image src="/icon/X-trang.png" height={30} width={30} alt="" />
              </div>
            </div>
            <div className={styles.module_forward_body}>
              <div className={styles.content_modal}>
                <p>Tên sổ văn bản</p>
                <input
                  type="text"
                  placeholder="Nhập sổ văn bản"
                  value={updateSo_vb}
                  onChange={(e: any) => {
                    setUpdateso_vb(e.target.value);
                  }}
                />
              </div>
              {show ? (
                <>
                  <p
                    style={{
                      color: "red",
                      margin: "10px",
                      fontSize: "14px",
                    }}
                  >
                    Vui lòng nhập sổ văn bản...
                  </p>
                </>
              ) : (
                <></>
              )}
              <div className={styles.content_modal}>
                <p>Người tạo</p>
                <input
                  type="text"
                  value="Công ty Cổ phần Thanh toán Hưng Hà 2"
                />
              </div>
              <div className={styles.content_modal}>
                <p>Thời gian tạo</p>
                <input type="text" value="08/07/2023" />
              </div>
              <div className={styles.btn_footer}>
                <button onClick={() => handleEditSo_vb(selectedItemId)}>
                  Cập nhật
                </button>
                <button
                  onClick={() => {
                    setshowModalUpdate(!showModalUpdate);
                  }}
                  style={{
                    border: "border: 1px solid #4c5bd4",
                    background: "#fff",
                    color: "#4c5bd4",
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalDelete && (
        <div className={styles.module_forward}>
          <div
            className={`${styles.module_forward_table} ${styles.delete_content}`}
          >
            <p>Bạn có chắc chắn xóa khỏi hệ thống</p>
            <div className={styles.btn_footer}>
              <button onClick={() => handleDeleteItem(selectedItemId)}>
                Xóa
              </button>
              <button
                onClick={closeModalDelete}
                style={{
                  border: "border: 1px solid #4c5bd4",
                  background: "#fff",
                  color: "#4c5bd4",
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
export async function getServerSideProps(context: {
  req: { headers: { cookie: any } };
}) {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const token = `${cookies.token_first}${cookies.token_hafl}`;
    const currentPage = `${cookies.page}`;
    const ItemsPerPage = `${cookies.pageSize}`;
    if (!token) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    const data = await fetchData(
      token,
      "api/vanthu/guiNhanCongVan/setting/getListSoVanBan",
      { page: currentPage, pageSize: ItemsPerPage }
    );
    return {
      props: {
        data: data?.data?.message ? data?.data?.message : null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}
