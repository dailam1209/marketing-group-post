import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "./index.module.css";
import styless from "@/components/crm/theo-doi-thu-chi/index.module.css";
import React, { useEffect } from "react";
import ImgCrop from "antd-img-crop";

import { message, Modal, Upload, UploadFile } from "antd";
// "../../potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import Link from "next/link";
import { Button, Input, InputNumber, Select, UploadProps } from "antd";
import { useState } from "react";
import ModalDelete from "../delete_data/modal/modal_delete";
import ModalReturn from "../delete_data/modal/modal_return";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/router";

export default function SuaSanPham() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const [screenWidth, setScreenWitdth] = useState<any>();
  const [type2, setType2] = useState(false);
  function handleResize() {
    // Lấy kích thước mới của cửa sổ trình duyệt sau khi resize
    try {
      const screenWidths = window.screen.width; // Chiều rộng màn hình
      setScreenWitdth(screenWidths);
      if (screenWidth < 800) {
        setType2(true);
      } else {
        setType2(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", handleResize);
    }
  });

  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  const handlePreview = async (file: UploadFile) => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }

      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(false);
      setPreviewTitle(
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();
  const handleSave = () => {
    setIsShowModal(true);
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    handlePreview(newFileList[newFileList.length - 1]); // Lấy ảnh
    // setPreviewOpen(true);
  };
  const getBase64 = async (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className={styles.fieldsetne}>
          <div className={styles.lefttm}>
            <p style={{ fontSize: 20, paddingBottom: 10, fontWeight: "800" }}>
              Thông tin sản phẩm *
            </p>
            <fieldset style={{ borderRadius: 10, padding: 20 }}>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Mã sản phẩm *
                </label>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={"Nhập mã sản phẩm"}
                ></Input>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Tên sản phẩm *
                </label>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={"Nhập tên sản phẩm"}
                ></Input>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Nhóm sản phẩm
                </label>
                <Select style={{ width: "100%" }}>
                  <option value={0}>312312</option>
                  <option value={1}>vava</option>
                </Select>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Đơn vị tính *
                </label>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={"Nhập đơn vị tính"}
                ></Input>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Kích thước *
                </label>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={"Nhập kích thước"}
                ></Input>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Định mức tồn tối thiểu *
                </label>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={"Nhập định mức tồn tối thiểu"}
                ></Input>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Giá nhập *
                </label>
                <InputNumber style={{ width: "100%" }}></InputNumber>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Giá bán lẻ *
                </label>
                <InputNumber style={{ width: "100%" }}></InputNumber>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Giá bán buôn *
                </label>
                <InputNumber style={{ width: "100%" }}></InputNumber>
              </div>
              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Bảo hành *
                </label>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={"Nhập bảo hành"}
                ></Input>
              </div>
              <div>
                <div>
                  <label style={{ fontSize: 20, fontWeight: 500 }}>
                    Hạn sử dụng *
                  </label>
                  <Input style={{ width: "100%" }} type="date"></Input>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 20, fontWeight: 500 }}>
                  Xuất xứ *
                </label>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={"Nhập xuất xứ"}
                ></Input>
              </div>
            </fieldset>
          </div>

          <div className={styles.righttm}>
            <p style={{ fontSize: 20, paddingBottom: 10, fontWeight: "800" }}>
              Hình ảnh sản phẩm *
            </p>
            <fieldset className={styles.imgview}>
              <ImgCrop>
                <Upload
                  id="img1"
                  listType="picture-circle"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={handlePreview}
                  openFileDialogOnClick
                  // className="custom-upload" // Thêm lớp CSS tùy chỉnh
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>

              <Modal
                open={previewOpen}
                title={previewTitle}
                // footer={null}
                onCancel={handleCancel}
                onOk={handleCancel}
              >
                <img style={{ width: "100%" }} src={previewImage} alt="" />
              </Modal>
              {previewImage ? (
                <img width={"100%"} src={previewImage} alt="" id="img2" />
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src="https://crm.timviec365.vn/assets/icons/img_file.svg" />
                </div>
              )}
            </fieldset>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 50,
          paddingTop: 50,
        }}
      >
        <div className={styless.btn}>
          <Button
            onClick={() => {
              setIsShowModalReturn(true);
            }}
            style={{ width: 200, height: 40, fontSize: 18 }}
            className="btn btn-warning"
          >
            Hủy
          </Button>
        </div>
        <div className={styless.btn}>
          <Button
            onClick={() => {
              alert("Lưu thành công"), router.push("/san-pham");
            }}
            style={{ width: 200, height: 40, fontSize: 18 }}
            type="primary"
            className="btn btn-warning"
          >
            Lưu
          </Button>
        </div>
        <ModalDelete
          isShowModal={isShowModal}
          onClose={onClose}
          handleSave={handleSave}
        />
        <ModalReturn
          isShowModalReturn={isShowModalReturn}
          onClose={onClose}
          handleSave={handleSave}
          name="Thay đổi sẽ không được lưu
                    Bạn có chắc muốn thoát"
        />
      </div>
    </>
  );
}
