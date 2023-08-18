import React, { useState, useEffect, useRef } from "react";
import styles from './addRegulationsModal.module.css'
import MyEditorNew from "@/components/hr/myEditor";
import { AddSpecifiedGroup } from "@/pages/api/api-hr/quy_dinh_chinh_sach";
import * as Yup from "yup";
interface InputTextareaProps {
  onDescriptionChange: (data: any) => void;
}

interface AddRegulationsModalProps {
  onCancel: () => void;
}

function Input_textarea({ onDescriptionChange }: InputTextareaProps) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <div>
      <MyEditorNew
        name="Editor"
        onChange={(data: React.SetStateAction<string>) => {
          setData(data);
          onDescriptionChange(data)
        }}
        editorLoaded={editorLoaded}
        value={data}
      />
    </div>
  );
}

export default function AddRegulationsModal({ onCancel }: AddRegulationsModalProps) {

  const [content, setContent] = useState('');
  const [provisionFile, setProvisionFile] = useState<File | null>(null);
  const [descriptions, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel()
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onCancel]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên nhóm quy định không được để trống"),
    time: Yup.string().required("Thời gian không được để trống"),
    supervisor: Yup.string().required("Người giám sát không được để trống"),
    note: Yup.string().required("Mô tả không được để trống không được để trống"),
  });


  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      // Lấy giá trị từ các trường input
      const name = (document.getElementById('names') as HTMLInputElement)?.value;
      const time_start = (document.getElementById('time-start') as HTMLInputElement)?.value;
      const supervisor_name = (document.getElementById('supervisor-name') as HTMLInputElement)?.value;
      const description = descriptions;

      const formDatas = {
        name: name || "",
        time: time_start || "",
        supervisor: supervisor_name || "",
        note: description || "",
      };

      await validationSchema.validate(formDatas, {
        abortEarly: false,
      });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("time_start", time_start);
      formData.append("supervisor_name", supervisor_name);
      formData.append("description", description);
      if (provisionFile) {
        formData.append("provision", provisionFile);
      }

      const response = await AddSpecifiedGroup(formData);
      if (response) {
        onCancel()
      }

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};
        error.inner.forEach((yupError: any) => {
          yupErrors[yupError.path] = yupError.message;
        });
        setErrors(yupErrors);
      } else {
        console.error("Lỗi validate form:", error);
      }
    }
  }
  function handleUploadClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const uploadInput = document.getElementById('upload_cv') as HTMLInputElement;
    if (uploadInput) {
      uploadInput.click();
    }
  }

  const handleDescriptionChange = (data: string) => {
    setDescription(data);
  };
  const handleProvisionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setProvisionFile(file);
  };

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`} ref={modalRef}>
              <div className={`${styles.modal_header} ${styles.header_process}`}>
                <h5 className={`${styles.modal_tittle}`}>THÊM NHÓM QUY ĐỊNH</h5>
              </div>
              <form action="">
                <div className={`${styles.modal_body} ${styles.body_process}`}>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Tên nhóm <span style={{ color: 'red' }}> * </span></label>
                    <div className={`${styles.input_right}`}>
                      <input type="text" id="names" placeholder="Nhập tên nhóm" className={`${styles.input_process}`} />
                      <span> {errors.name && <div className={`${styles.t_require} `}>{errors.name}</div>}</span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Thời gian bắt đầu hiệu lực <span style={{ color: 'red' }}> * </span></label>
                    <div className={`${styles.input_right}`}>
                      <input type="date" id="time-start" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />
                      <span> {errors.time && <div className={`${styles.t_require} `}>{errors.time}</div>}</span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Người giám sát <span style={{ color: 'red' }}> * </span></label>
                    <div className={`${styles.input_right}`}>
                      <input type="text" id="supervisor-name" placeholder="Người giám sát" className={`${styles.input_process}`} />
                      <span> {errors.supervisor && <div className={`${styles.t_require} `}>{errors.supervisor}</div>}</span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups} ${styles.cke}`}>
                    <label htmlFor="">Mô tả ngắn <span style={{ color: 'red' }}> *
                      <span > {errors.note && <div className={`${styles.t_require} `}>{errors.note}</div>}</span>
                    </span></label>
                    <div className={`${styles.ckeditor}`}>
                      <Input_textarea onDescriptionChange={handleDescriptionChange} />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">File đính kèm </label>
                    <div className={`${styles.input_right} ${styles.input_upload_t}`}>
                      <input type="file" className={`${styles.upload_cv}`} id="upload_cv" accept="application/pdf, image/*" onChange={handleProvisionFileChange} />
                      <a href="" className={`${styles.t_ion_file}`} onClick={handleUploadClick} >
                        <img src={`/t-icon-file.svg`} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                  <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                  <button className={`${styles.btn_add}`} onClick={handleSubmit} >Thêm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}