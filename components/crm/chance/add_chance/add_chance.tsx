import AddGeneralInfoChance from "./general_info_chance";
import styles from "../../potential/potential2.module.css";
import TableChanceProduct from "@/components/crm/table/table-chance-product";
import AddAddressInfo from "@/components/crm/potential/potential_add_files/address_info";
import TextEditor from "@/components/crm/text-editor/text_editor";
import GeneralCustomerInfor from "./general_customer_info";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useFormData } from "../../context/formDataContext";
import TextEditorV2 from "../../input_select/text_editor";
import { MTextAreaV2 } from "../../input_select/input";
import { MModalCompleteStep } from "@/components/commodity/modal";
export default function ChanceAddInfo() {
  const { formData, hanldeClearRecall, setFormData } = useContext(useFormData);
  const [formDataTest, setFormDataTest] = useState<any>({});
  const router = useRouter();
  return (
    <>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Thêm mới cơ hội</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <AddGeneralInfoChance />
                <TableChanceProduct />
                <div
                  style={{ marginBottom: -10 }}
                  className={styles["main__body__type"]}
                >
                  Thông tin mô tả
                </div>

                <MTextAreaV2 label="Mô tả" />

                <AddAddressInfo formData={formData} setFormData={setFormData} />
                <GeneralCustomerInfor />
              </div>
              <div className={styles.main__footer} style={{marginTop:'20px'}}>
                <button
                  type="button"
                  // onClick={() => setIsModalCancel(true)}
                >
                  Hủy
                </button>
                <button
                  className={styles.save}
                  type="submit"
                  onClick={() => {
                    // handleSave();
                    // setModal1Open(true);
                  }}
                >
                  Lưu
                </button>

                {/* {
                  <CancelModal
                    isModalCancel={isModalCancel}
                    setIsModalCancel={setIsModalCancel}
                    content={contentCancel}
                    title={titleCancel}
                    link={link}
                  />
                } */}

                <MModalCompleteStep
                  modal1Open={false}
                  setModal1Open={() => {}} 
                  // modal1Open={modal1Open}
                  // setModal1Open={setModal1Open}
                  // title={title}
                  // link={link}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
