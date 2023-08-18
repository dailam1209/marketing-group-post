import Input_calender from '@/components/VanThu/components/Input/Input_calender/Input_calender';
import { Input_file_3 } from '@/components/VanThu/components/Input/Input_file/Input_file';
import Input_select from '@/components/VanThu/components/Input/Input_select/Input_select';
import { Custom_input_text, Custom_input_textarea } from '@/components/VanThu/components/Input/Input_text/Input_text';
import { Custom_label } from '@/components/VanThu/components/Input/Label/Label';
import Section from '@/components/VanThu/components/Input/Section/Section';
import { select_style } from '../1_Absent_propose/Absent_propose';
import styles from './propose.module.css';
import Image from "next/image";
import React, { useCallback, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { fetch_supervisor_approver } from '@/utils/api/dexuat/api_fetch';
import * as Yup from 'yup';
import { post_facility_fixing_propose } from '@/utils/api/dexuat/api_post';
import router from 'next/router';
import { confirm_type_options } from '../2_Switch_shift_propose/Switch_shift_propose';

const Facility_fixing_propose = ({ inuse }: { inuse?: boolean }) => {
    const validationSchema = Yup.object().shape({
        name_dx: Yup.string().required('Vui lòng nhập tên đề xuất.'),
        ly_do: Yup.string().required('Vui lòng nhập lý do.'),
        id_user_duyet: Yup.string().required('Vui lòng chọn người duyệt.'),
        id_user_theo_doi: Yup.string().required('Vui lòng chọn người theo dõi.'),
      });
    const [row,setRow] = useState(
        {
            name_taisan: '',
            ly_do: '',
            so_tien: ''
        }
    )
    const blankrow = {
        name_taisan: '',
        ly_do: '',
        so_tien: ''
    }
    const [rows, setRows] = useState<typeof row[]>([row]);
    const handleClick = () => {
        setRows(prevRows => [...prevRows, blankrow]);
    };
    const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, name, value } = e.target;
        const updatedRow = { ...row, [name]: value };
        setRow(updatedRow);

        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[parseInt(id, 10)] = updatedRow;
          return updatedRows;
        });
      };
    useEffect(()=>{
        setFormData((prev:any)=>({
            ...prev,
            noi_dung: rows
        }))
    },[rows])
    const [supervior,setSuperVisor] = useState<any>();
    const [approver,setApprover] = useState<any>();
    useEffect(()=>{
      const fetchdata = async () => {
        if(inuse){
            const token = sessionStorage.getItem("token");
            const response = await fetch_supervisor_approver(token);
            setSuperVisor(response?.data.listUsersTheoDoi)
            setApprover(response?.data.listUsersDuyet)
        }
      }
      fetchdata();
    },[inuse])
    const id_user_duyet_options = approver?.map((opts:any) => {
        return { value:opts.idQLC, label:opts.userName,image:opts.avatarUser, name:'id_user_duyet'}
    })
    const id_user_theo_doi_options = supervior?.map((opts:any) => {
        return { value:opts.idQLC, label:opts.userName,image:opts.avatarUser, name:'id_user_theo_doi'}
    })
    const [formData, setFormData] = useState<any>({
        name_user: getCookie("userName")?.toString(),
      });
    const handleInputChange = (e:any)=>{
        const {name, type, value} = e.target;
        if(type === 'checkbox'){
          if(name === 'time_ndx'){
            setFormData((prev:any) => ({
              ...prev,
              type_time: '0',
            }))
          }else if(name === 'time_nkh'){
            setFormData((prev:any) => ({
              ...prev,
              type_time: '1',
            }))
          }
        }
        else{
          setFormData((prev:any) => ({
            ...prev,
            [name]: value
          }))
        }
    }
    const handleSelectChange = (e:any)=>{
        const {name,value} = e;
        if(name){
          setFormData((prev:any) => ({
            ...prev,
            [name]: value
          }))
        }else{
          setFormData((prev:any) => ({
            ...prev,
            id_user_duyet: [...e.map((rec: any) => rec.value)].join(',')
          }))
        }
    }
    const handleFileChange = useCallback((e:any) => {
        const {name,value} = e;
        setFormData((prev:any) => ({
          ...prev,
          [name]: value
        }))
    },[])
    const [errors, setErrors] = useState<any>({});
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log(formData);
            var form_data = new FormData();
            for(var key in formData) {
                if(key === 'noi_dung'){
                    form_data.append('noi_dung',JSON.stringify(formData.noi_dung))
                }else{
                    form_data.append(key, formData[key]);
                }
                
            }
            if(formData.fileKem){
                if(formData.fileKem.length > 0){
                    for( var i  = 0 ; i < formData.fileKem.length ; i++){
                        form_data.append(`fileKem[${i}]`, formData.fileKem[i]);
                    }
                }
              }
            const res = await post_facility_fixing_propose(form_data)
            console.log(res);
            alert('Tạo đề xuất thành công')
            router.push('/VanThu/trang-quan-ly-de-xuat/de-xuat');
        } 
        catch (error: any) {
            const newErrors : any = {};
            if (error?.inner) {
                error.inner.forEach((err:any) => {
                    newErrors[err.path] = err.message;
                });
            }
            setErrors(newErrors);
        }
    };
    return (
        <form className={styles.form_propose}>
            <div className={styles.wrapper_form}>
                <div className={styles.row}>
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={true} title="Tên đề xuất" label_class="font_500" />}
                        input={<Custom_input_text inputclass="input_text_shedule" placeholder="Nhập tên đề xuất"
                            input_name="name_dx"
                            handleChange={handleInputChange} />}
                        validation={errors.name_dx && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.name_dx}</p>
                        )}
                    />
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={false} label_class="font_500" title="Loại đề xuất" />}
                        input={<Custom_input_text
                            isDisabled={true}
                            inputclass="input_text_shedule"
                            placeholder=""
                            value="Đề xuất sửa chữa cơ sở vật chất"
                        />}
                    />
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={false} title="Kiểm duyệt" label_class="font_500" />}
                        input={<Input_select
                            style={select_style}
                            options={confirm_type_options}
                            defautlValue={confirm_type_options[0]}
                        />}
                    />
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={false} title="Họ và tên" label_class="font_500" />}
                        input={<Custom_input_text
                            isDisabled={true}
                            inputclass="input_text_shedule"
                            placeholder="Họ và tên"
                            value={getCookie("userName")?.toString()}
                        />}
                    />

                </div>
                <div className={styles.w_100}>
                    <p style={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '19px', color: '#4C5BD4', margin: '0 0 18px 0' }}>Cơ sở vật chất cần sửa chữa</p>
                    <div className={styles.div_table}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>STT</th>
                                    <th className={styles.th}>Tên tài sản</th>
                                    <th className={styles.th}>Lý do sửa chữa</th>
                                    <th className={styles.th}>Chi phí dự kiến</th>
                                </tr>
                            </thead>
                            {rows.map((row,index) => (
                                <tr key={index}>
                                    <td className={styles.td}>{index + 1}</td>
                                    <td className={styles.td}>
                                        <Section
                                            style="w_100"
                                            label={<Custom_label isRequired={false} title="" label_class="font_500" />}
                                            input={<Custom_input_text
                                                isDisabled={false}
                                                inputclass="input_text_shedule"
                                                placeholder="Nhập tên tài sản"
                                                id={index}
                                                input_name='name_taisan'
                                                handleChange={handleFacilityChange}
                                            />}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <Section
                                            style="w_100"
                                            label={<Custom_label isRequired={false} title="" label_class="font_500" />}
                                            input={<Custom_input_text
                                                isDisabled={false}
                                                inputclass="input_text_shedule"
                                                placeholder="Nhập lý do sửa chữa"
                                                id={index}
                                                input_name='ly_do'
                                                handleChange={handleFacilityChange}
                                            />}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <Section
                                            style="w_100"
                                            label={<Custom_label isRequired={false} title="" label_class="font_500" />}
                                            input={<Custom_input_text
                                                isDisabled={false}
                                                inputclass="input_text_shedule"
                                                placeholder="Nhập chi phí dự kiến"
                                                id={index}
                                                type='number'
                                                input_name='so_tien'
                                                handleChange={handleFacilityChange}
                                            />}
                                        />
                                    </td>

                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} style={{ padding: '10px', float: 'left' }}>
                                    <a style={{ display: 'flex' }} onClick={handleClick}>
                                        <Image
                                            src={"/icon/create_propose/add.png"}
                                            width={20}
                                            height={20}
                                            alt="Create đề xuất"
                                        />
                                        <span style={{ padding: '0 12px' }}>Thêm dòng</span>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <br />
                <div className={styles.w_100}>
                    <Custom_label isRequired={true} label_class="font_500" title="Lý do đề xuất sửa chữa cơ sở vật chất" />
                    <div className={styles.textarea}>
                        <Custom_input_textarea
                            placeholder="Nhập lý do đề xuất xin sử dụng xe công"
                            inputclass="custom_input_textarea_adsent"
                            input_name='ly_do'
                            handleChange={handleInputChange}
                        />
                    </div>
                    {errors.ly_do && (
                        <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.ly_do}</p>
                      )}
                </div>
                <div className={`${styles.mt_15} ${styles.row}`}>
                    <Section 
                        style="col_2" 
                        label={<Custom_label isRequired={true} label_class="font_500" title="Người xét duyệt" />} 
                        input={<Input_select 
                                    style={select_style}
                                    options={id_user_duyet_options}
                                    onChange={handleSelectChange}
                                    placeholder='Chọn người xét duyệt'
                                    isMulti={true}
                                />} 
                        validation={errors.id_user_duyet && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.id_user_duyet}</p>
                        )}
                    />
                    <Section 
                        style="col_2" 
                        label={<Custom_label isRequired={true} label_class="font_500" title="Người theo dõi" />} 
                        input={<Input_select 
                                    style={select_style}
                                    options={id_user_theo_doi_options}
                                    onChange={handleSelectChange}
                                    placeholder='Chọn người theo dõi'
                                />}
                        validation={errors.id_user_theo_doi && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.id_user_theo_doi}</p>
                        )}
                    />
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={true} label_class="font_500" title="Tài liệu đính kèm" />}
                        input={<Input_file_3 placeholder="Thêm tài liệu đính kèm" name='fileKem' handleChange={handleFileChange} />}
                    />
                </div>
            </div>
            <div className={styles.confirm}>
                <button className={styles.cancel}>Hủy</button>
                <button onClick={handleSubmit} type="submit" className={styles.create_propose}>Tạo đề xuất</button>
            </div>
        </form>
    )
}
export default Facility_fixing_propose;