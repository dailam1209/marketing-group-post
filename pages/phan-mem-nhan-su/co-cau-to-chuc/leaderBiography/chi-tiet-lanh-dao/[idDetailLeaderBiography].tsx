/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import styles from "./idDetailLeaderBiography.module.css";
import { useRouter } from "next/router";
import { LeaderBiographyDetail } from "@/pages/api/api-hr/co_cau_to_chuc";
import { LeaderBiograpphyUpdate } from "@/pages/api/api-hr/co_cau_to_chuc";
import MyEditorNew from "@/components/hr/myEditor";
import Head from "next/head";
import { getDataAuthentication } from "@/pages/api/api-hr/Home/HomeService";

export interface listRecruitmentProcess { }

interface InputTextareaProps {
  onDescriptionChange: (data: any) => void
  initialValue: any
}

function Input_textarea({ onDescriptionChange, initialValue }: InputTextareaProps) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState<any>("");


  useEffect(() => {
    setEditorLoaded(true);
    const initialValueWithoutSecondAndThird = initialValue.slice();
    initialValueWithoutSecondAndThird.splice(1, 2);
    const initialValueElements = initialValueWithoutSecondAndThird?.map((item: any) => {

      const element = document.createElement("p");
      element.className = styles.d_info_detail_text1;
      const valueToShow = item?.value ? item?.value : '';
      element.innerHTML = `
              ${item?.key}
              <span>${valueToShow}</span>
            `;
      return element;
    });

    // Tạo một container div để chứa các phần tử HTML
    const container = document.createElement("div");
    initialValueElements?.forEach((el: any) => container.appendChild(el));

    // Chuyển container thành chuỗi HTML và lưu vào state data
    setData(container?.innerHTML);
  }, []);

  return (
    <div>
      <MyEditorNew
        name="Editor"
        onChange={(editorData: string) => {
          setData(editorData);
          onDescriptionChange(editorData)
        }}
        editorLoaded={editorLoaded}
        value={data}
      />
    </div>
  );
}

export default function DetailLeaderBiography({ onCancel }: any) {
  const router = useRouter()
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [isOpenUpdate, setOpenUpdate] = useState(false);
  const [isLeaderDetail, setIsLeaderDetail] = useState<any>(null)
  const [addField, setAddField] = useState<any>(false)
  const [descriptions, setDescription] = useState("");
  const [provisionFile, setProvisionFile] = useState<File | null>(null);
  const [personalInfoData, setPersonalInfoData] = useState<any>(null)
  const { idDetailLeaderBiography }: any = router.query;
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [newData, setNewData] = useState(false);

  console.log(isLeaderDetail);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data?.data?.infoRoleHNNV);
      };
      fetchData();
    } catch (error) { }
  }, []);

  const perIdArray = displayIcon?.map((item) => item.perId);
  const authen = perIdArray?.includes(1);
  const iconAdd = perIdArray?.includes(2);
  const iconEdit = perIdArray?.includes(3);
  const iconDelete = perIdArray?.includes(4);

  useEffect(() => {
    if (idDetailLeaderBiography) { // Chỉ gọi API nếu idDetailLeaderBiography đã có giá trị
      const fetchData = async () => {
        try {
          const formData = new FormData();
          formData.append('empId', idDetailLeaderBiography);
          const response = await LeaderBiographyDetail(formData);
          if (response?.data) {
            setIsLeaderDetail(response?.data);
          }

        } catch (error) {
          throw error;
        }
      };
      fetchData();
    }
    if (descriptions) {
      // const parsedDescriptions = JSON.parse(descriptions);

    }
  }, [idDetailLeaderBiography, descriptions, newData]);

  const handleDescriptionChange = (updatedData: any) => {
    setPersonalInfoData(updatedData)
  };

  const handleBack = () => {
    router.back()
  }

  function handleUploadClick() {
    const uploadInput = document.getElementById('upload_img') as HTMLInputElement;
    if (uploadInput) {
      uploadInput.click();
    }
  }

  const handleProvisionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setProvisionFile(file);
      // Sử dụng FileReader để đọc dữ liệu hình ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        // Đọc dữ liệu thành công, gán nội dung vào thuộc tính src của thẻ img
        const previewImage = document.getElementById('preview_image') as HTMLImageElement;
        if (previewImage) {
          previewImage.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const personalInfoDatas: any = JSON.stringify(personalInfoData)

      formData.append('empId', idDetailLeaderBiography)
      formData.append('description', personalInfoDatas)
      const response = await LeaderBiograpphyUpdate(formData)
      if (response) {
        setOpenUpdate(false)
        setNewData(pre => !pre)
      }
    } catch (error) {
      throw error
    }
  }

  const description = isLeaderDetail?.result?.description;

  const cleanDescription = description?.replace(/^"|"$/g, "").replace(/\\"/g, '"');
  const regex = /:\s*([^<"]+)/g;
  const valuesArray: any = [];
  let match: any;
  while ((match = regex.exec(cleanDescription)) !== null) {
    valuesArray.push(match[1]);
  }

  const initialValue = [
    { key: 'Thông tin cá nhân', value: '' },
    { key: 'Họ và tên:', value: isLeaderDetail?.result?.ep_name },
    { key: 'Tên thường gọi:', value: isLeaderDetail?.result?.ep_name },
    { key: 'Ngày sinh:', value: valuesArray[0] ? valuesArray[0] : '' },
    { key: 'Quê quán:', value: valuesArray[1] ? valuesArray[1] : '' },
    { key: 'Dân tộc:', value: valuesArray[2] ? valuesArray[2] : '' },
    { key: 'Ngày vào đảng:', value: valuesArray[3] ? valuesArray[3] : '' },
    { key: 'Trình độ đào tạo', value: "" },
    { key: 'Giáo dục phổ thông:', value: valuesArray[4] ? valuesArray[4] : '' },
    { key: 'Chuyên môn nghiệp vụ:', value: valuesArray[5] ? valuesArray[5] : '' },
    { key: 'Ngoại ngữ:', value: valuesArray[6] ? valuesArray[6] : '' },
  ]

  return (
    <>
      <Head>
        <title>Tiểu sử lãnh đạo - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      {isLeaderDetail && (
        <div className={`${styles.l_body}`}>
          <div className={`${styles.add_quytrinh}`}>
            <div className={`${styles.back_quytrinh}`}>
              <span onClick={handleBack}>
                <picture>
                  <img
                    src={`${'/left_arrow.png'}`}
                    alt="Back"
                  ></img>
                </picture>
                Tiểu sử lãnh đạo / {isLeaderDetail?.result?.ep_name}
              </span>
              {iconAdd && (
                <button className={`${styles.btn_add1}`} onClick={() => setAddField(true)} >
                  <img src="/add.png" alt="" />
                  Thêm trường
                </button>
              )}
            </div>
          </div>
          <div className={`${styles.l_body_2}`}>
            <div className={`${styles.l_body_2_content} ${styles.l_body_2_left}`} style={{ width: addField ? '41.677%' : '100%' }}>
              <div className={`${styles.l_body_2_left_header}`}>
                <div className={`${styles.pull_left}`}>
                  <p>THÔNG TIN</p>
                </div>
                <div className={`${styles.text_right}`}>
                  {iconEdit && (
                    <a onClick={() => setOpenUpdate(true)} style={{ cursor: 'pointer' }} className={`${styles.edit_hs_uv}`}>
                      <img src="/icon-edit-white.svg" />
                    </a>
                  )}
                </div>
              </div>
              <div className={`${styles.l_body_2_left_body}`}>
                <div className={`${styles.d_info_detail}`} style={{ padding: 20 }}>
                  <p className={`${styles.d_info_name}`}>
                    <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>{isLeaderDetail?.result?.namePosition}</span>
                  </p>
                  <div className={`${styles.d_images_info}`} onClick={handleUploadClick}>
                    <img src="/logo_com.png" alt="" className={`${styles.d_img_info}`} id="preview_image" />
                    <img src="/camera.svg" alt="" className={`${styles.d_img_info1}`} />
                    <input type="file" id="upload_img" style={{ display: 'none' }} onChange={handleProvisionFileChange} />
                  </div>
                </div>
                <div className={`${styles.click_update}`} style={{ padding: 20 }}>
                  <div className={`${styles.d_info_detail2}`} style={{ display: isOpenUpdate ? 'none' : 'block' }}>
                    {initialValue.map((item, index) => (
                      <p key={index} className={`${item?.key === "Thông tin cá nhân" || item?.key === "Trình độ đào tạo"
                        ? styles.d_info_detail_text
                        : styles.d_info_detail_text1}`}>
                        {item?.key}
                        <span> {item?.value}</span>
                      </p>
                    ))}
                  </div>
                  <div className={`${styles.d_info_textarea1}`} style={{ display: isOpenUpdate ? 'block' : 'none' }}>
                    <div className={`${styles.d_info_detail3}`} style={{ marginTop: 22 }}>
                      {isOpenUpdate && <Input_textarea onDescriptionChange={handleDescriptionChange} initialValue={initialValue} />}
                    </div>
                    <div className={`${styles.d_info_detail4}`}>
                      <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                        <button className={`${styles.btn_cancel}`} onClick={() => setOpenUpdate(false)} >Hủy</button>
                        <button className={`${styles.btn_add}`} onClick={handleSubmit} >Lưu</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.l_body_2_content} ${styles.l_body_2_right}`} style={{ paddingTop: 0, paddingLeft: 15, display: addField ? 'inline' : 'none', width: addField ? '53%' : '0' }}>
              <div className={`${styles.d_info_header}`} >
                <input type="text" className={`${styles.d_input_info}`} id="d_input_name" placeholder="NHẬP TÊN TRƯỜNG" />
              </div>
              <div className={`${styles.d_info_body}`}>
                <div className={`${styles.d_info_textarea1}`}>
                  <div className={`${styles.d_info_detail3}`} style={{ marginTop: 22 }}>
                    <Input_textarea onDescriptionChange={handleDescriptionChange} initialValue={initialValue} />
                  </div>
                  <div className={`${styles.d_info_detail4}`}>
                    <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                      <button className={`${styles.btn_cancel}`} onClick={() => setAddField(false)} >Hủy</button>
                      <button className={`${styles.btn_add}`} >Thêm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}