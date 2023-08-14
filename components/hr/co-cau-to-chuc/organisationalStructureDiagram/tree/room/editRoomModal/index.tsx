import React, { useEffect, useState } from "react";
import styles from './editRoomModal.module.css'
import Select from 'react-select';
import { OrganizationalStructureUpdate } from "@/pages/hr/api/co_cau_to_chuc";

type SelectOptionType = { label: any, value: any }
type EditRoomModalProps = {
    idRoom: any
    defaultValue: SelectOptionType | null;
    options: { [key: string]: SelectOptionType[] };
    soluongnhanvien: number;
    mota: string;
    onCancel: any
};

export default function EditRoomModal({ idRoom, defaultValue, options, soluongnhanvien, mota, onCancel }: EditRoomModalProps) {

    const handleSubmit = async () => {

        try {
            const description = (document.getElementById('description') as HTMLInputElement)?.value
            const formData = new FormData()

            formData.append('depId', idRoom)
            formData.append('description', description)
            const response = await OrganizationalStructureUpdate(formData)
        } catch (error) {
            throw error
        }
    }

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: SelectOptionType | null }>({
        chonphongban: options?.chonphongban ? options?.chonphongban[0] : null,
        truongphong: options?.truongphong ? options?.truongphong[0] : null,
        photruongphong: options?.photruongphong ? options?.photruongphong[0] : null
    });

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);

    const handleSelectionChange = (option: SelectOptionType | null, field: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [field]: option
        }));
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
                                        <label htmlFor="">Tên phòng ban <span style={{ color: 'red' }}> * </span></label>
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
                                        <label htmlFor="">Trưởng phòng <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}  ${styles.edit_right}`}>
                                            <Select
                                                defaultValue={selectedOptions.truongphong ? selectedOptions.truongphong : selectedOption}
                                                onChange={(option) => handleSelectionChange(option, 'truongphong')}
                                                options={options?.truongphong}
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
                                        <label htmlFor="">Phó trưởng phòng <span style={{ color: 'red' }}> * </span> </label>
                                        <div className={`${styles.input_right} ${styles.edit_right}`}>
                                            <Select
                                                defaultValue={selectedOptions.photruongphong ? selectedOptions.photruongphong : selectedOption}
                                                onChange={(option) => handleSelectionChange(option, 'photruongphong')}
                                                options={options?.photruongphong}
                                                placeholder="Cập nhật phó trưởng phòng"
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
                                        <label htmlFor="">Số lượng nhân viên <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}  ${styles.edit_right}`}>
                                            <input defaultValue={soluongnhanvien} type="text" id="names" placeholder="" className={`${styles.input_process}`} />
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