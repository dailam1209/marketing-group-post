import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styles from "@/components/crm/potential/potential.module.css";
import { Select } from "antd";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import ContractBtsGroupFooter from "@/components/crm/customer/contract/contract_footer_btns_group";

export default function ContractDetailsCreate() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id } = router.query;
  const [valueContract, setValueContract] = useState("");
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const onChangeSelect = (value: string) => {
    setValueContract(value);
  };

  useEffect(() => {
    setHeaderTitle(`${id} / Hợp đồng bán / Thêm hợp đồng bán`);
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
  return (
    <>
      <div ref={mainRef} className={styleHome.main}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin hợp đồng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                    className={styles["main__body_item"]}
                  >
                    <div style={{ flex: "1" }}>
                      <label className={`${styles["form-label"]} required`}>
                        Loại hợp đồng
                      </label>
                      <div>
                        <Select
                          style={{
                            maxWidth: "519px",
                            width: "100%",
                          }}
                          placeholder="Chọn loại hợp đồng"
                          optionFilterProp="children"
                          onChange={onChangeSelect}
                          options={[
                            {
                              value: "0",
                              label: "Chọn loại hợp đồng",
                            },
                            {
                              value: "lucy",
                              label: "Cáchtạođềxuấtxinnghỉ.docx",
                            },
                            {
                              value: "tom",
                              label: "Cáchtạođềxuấtxinnghỉ22.docx",
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div style={{ flex: "1" }}>
                      <InputText bonus="disabled" label="Người tạo" require />
                    </div>
                  </div>

                  {valueContract !== "0" && <div>
                    <ContractBtsGroupFooter id={id?id:'default'} /></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
