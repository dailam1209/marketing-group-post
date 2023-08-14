import React, { useEffect, useState } from "react";
import styles from '../room/editRoomModal/editRoomModal.module.css'
import Select from 'react-select';
import { OrganizationalStructureUpdate } from "@/pages/hr/api/co_cau_to_chuc";

type SelectOptionType = { label: any, value: any }
type EditGorupModalProps = {
    gr_id: any,
    defaultValue: SelectOptionType | null;
    options: { [key: string]: SelectOptionType[] };
    mota: string;
    onCancel: any
};

export default function EditGroupModal({ gr_id, defaultValue, options, mota, onCancel }: EditGorupModalProps) {

    const handleSubmit = async () => {

        try {
            const description = (document.getElementById('description') as HTMLInputElement)?.value
            const formData = new FormData()

            formData.append('groupId', gr_id)
            formData.append('description', description)
            const response = await OrganizationalStructureUpdate(formData)
        } catch (error) {
            throw error
        }
    }

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: SelectOptionType | null }>({
        chonphongban: options?.chonphongban ? options?.chonphongban[0] : null,
        tento: options?.tento ? options?.tento[0] : null,
        tennhom: options?.tennhom ? options?.tennhom[0] : null
    });

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);

    const handleSelectionChange = (option: SelectOptionType | null, field: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [field]: option
        }));
    };

    const optionss = {
        chonphongban: [
            { value: 'BAN GIÁM ĐỐC', label: 'BAN GIÁM ĐỐC' },
            { value: 'Phó GIÁM ĐỐC', label: 'Phó GIÁM ĐỐC' },
        ],
        tento: [
            { value: 'tổ anh hiệp', label: 'Tổ anh Hiệp' },
        ],
        tennhom: [
            { value: 'nhóm a', label: 'Nhóm A' },
        ],


    };


    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CHỈNH SỬA CHI TIẾT PHÒNG BAN</h5>
                            </div>
                            <div className={`${styles.modal_body}`}>
                                <form action="">
                                    <div className={`${styles.form_groups} ${styles.edit_room}`}>
                                        <label htmlFor="">Tên phòng  <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}  ${styles.edit_right}`}>
                                            <Select
                                                defaultValue={selectedOptions.chonphongban ? selectedOptions.chonphongban : selectedOption}
                                                onChange={(option) => handleSelectionChange(option, 'chonphongban')}
                                                options={options?.chonphongban}
                                                placeholder="Cập nhật phòng ban"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 4,
                                                        fontSize: state.isFocused ? 14 : 14,
                                                        minHeight: state.isFocused ? 20 : 20,
                                                        width: '100%',
                                                        fontWeight: state.isFocused ? 600 : 600
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups} ${styles.edit_room}`}>
                                        <label htmlFor="">Tên tổ <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}  ${styles.edit_right}`}>
                                            <Select
                                                defaultValue={selectedOptions.tento ? selectedOptions.tento : selectedOption}
                                                onChange={(option) => handleSelectionChange(option, 'tento')}
                                                options={options?.tento}
                                                placeholder="Cập nhật trưởng phòng"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 4,
                                                        fontSize: state.isFocused ? 14 : 14,
                                                        minHeight: state.isFocused ? 20 : 20,
                                                        width: '100%',
                                                        fontWeight: state.isFocused ? 600 : 600
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups} ${styles.edit_room}`}>
                                        <label htmlFor="">Tên nhóm <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}  ${styles.edit_right}`}>
                                            <Select
                                                defaultValue={selectedOptions.tennhom ? selectedOptions.tennhom : selectedOption}
                                                onChange={(option) => handleSelectionChange(option, 'tennhom')}
                                                options={options?.tennhom}
                                                placeholder="Cập nhật trưởng phòng"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 4,
                                                        fontSize: state.isFocused ? 14 : 14,
                                                        minHeight: state.isFocused ? 20 : 20,
                                                        width: '100%',
                                                        fontWeight: state.isFocused ? 600 : 600
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Mô tả <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <textarea style={{ height: 100 }} defaultValue={mota} id="description" placeholder="" className={`${styles.input_process}`} />
                                        </div>
                                    </div>
                                    <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                        <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                        <button className={`${styles.btn_add}`} onClick={handleSubmit}>Cập nhật</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}