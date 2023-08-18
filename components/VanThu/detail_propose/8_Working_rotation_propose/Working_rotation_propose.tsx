import Input_calender from '@/components/VanThu/components/Input/Input_calender/Input_calender';
import { Input_file_3 } from '@/components/VanThu/components/Input/Input_file/Input_file';
import Input_select from '@/components/VanThu/components/Input/Input_select/Input_select';
import { Custom_input_text, Custom_input_textarea } from '@/components/VanThu/components/Input/Input_text/Input_text';
import { Custom_label } from '@/components/VanThu/components/Input/Label/Label';
import Section from '@/components/VanThu/components/Input/Section/Section';
import { fetch_department, fetch_position, fetch_supervisor_approver } from '@/utils/api/dexuat/api_fetch';
import { getCookie } from 'cookies-next';
import { useState, useEffect, useCallback } from 'react';
import { select_style } from '../1_Absent_propose/Absent_propose';
import styles from './propose.module.css'; 
import * as Yup from 'yup';
import { post_working_rotation_propose } from '@/utils/api/dexuat/api_post';
import router from 'next/router';
import { confirm_type_options } from '../2_Switch_shift_propose/Switch_shift_propose';

const Working_rotation_propose = ({ inuse }: { inuse?: boolean }) => {
    const validationSchema = Yup.object().shape({
        name_dx: Yup.string().required('Vui lòng nhập tên đề xuất.'),
        ly_do: Yup.string().required('Vui lòng nhập lý do.'),
        id_user_duyet: Yup.string().required('Vui lòng chọn người duyệt.'),
        id_user_theo_doi: Yup.string().required('Vui lòng chọn người theo dõi.'),
        noi_chuyen_den: Yup.string().required('Vui lòng nhập địa chỉ nơi chuyển đến.')
      });
    const [supervior,setSuperVisor] = useState<any>();
    const [approver,setApprover] = useState<any>();
    const [department,setDepartment] = useState<any>();
    const [position,setPosition] = useState<any>();
    useEffect(()=>{
      const fetchdata = async () => {
        if(inuse){
            const token = sessionStorage.getItem("token");
            const response = await fetch_supervisor_approver(token);
            const res_department = await fetch_department(token);
            const res_position = await fetch_position('cv_nguoi_lc');
            setSuperVisor(response?.data.listUsersTheoDoi)
            setApprover(response?.data.listUsersDuyet)
            setDepartment(res_department?.data.data)
            setPosition(res_position)
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
    const departmnet_options = department?.map((opts:any) => {
        return { value:opts.dep_id, label:opts.dep_name, name:'pb_nguoi_lc'}
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
        var form_data = new FormData();
        for(var key in formData) {
            form_data.append(key, formData[key]);
        }
        if(formData.fileKem){
            if(formData.fileKem.length > 0){
              for( var i  = 0 ; i < formData.fileKem.length ; i++){
                form_data.append(`fileKem[${i}]`, formData.fileKem[i]);
              }
            }
          }
        console.log(form_data);
        const res = await post_working_rotation_propose(form_data)
        alert('Tạo đề xuất thành công')
        router.push('/trang-quan-ly-de-xuat/de-xuat');
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
                            inputclass="input_text_shedule"
                            value="Đơn xin luân chuyển công tác"
                            isDisabled={true}
                        />}
                    />
                </div>
                <div className={styles.row}>
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={false} title="Kiểm duyệt" label_class="font_500" />}
                        input={<Input_select
                            style={select_style}
                            options={confirm_type_options}
                            defautlValue={confirm_type_options[0]}
                        />} />
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={false} label_class="font_500" title="Họ và tên" />}
                        input={<Custom_input_text
                            inputclass="input_text_shedule"
                            placeholder="Họ và tên"
                            value={getCookie("userName")?.toString()}
                            isDisabled={true}
                        />}
                    />
                </div>
                <div className={styles.row}>
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={false} title="Phòng ban" label_class="font_500" />}
                        input={<Input_select
                            style={select_style}
                            options={departmnet_options}
                            onChange={handleSelectChange}
                            placeholder='Chọn phòng ban'
                        />}
                    />
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={false} title="Chức vụ" label_class="font_500" />}
                        input={<Input_select
                            style={select_style}
                            options={position}
                            onChange={handleSelectChange}
                            placeholder='Chọn chức vụ'
                        />}
                    />
                </div>
                <div className={styles.row}>
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={false} label_class="font_500" title="Nơi đang công tác" />}
                        input={<Custom_input_text
                            inputclass="input_text_shedule"
                            placeholder="Nhập nơi đang công tác"
                            input_name='noi_cong_tac'
                            handleChange={handleInputChange}
                        />}
                    />
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={true} label_class="font_500" title="Nơi xin chuyển đến" />}
                        input={<Custom_input_text
                            inputclass="input_text_shedule"
                            placeholder="Nhập nơi xin chuyển đến"
                            input_name='noi_chuyen_den'
                            handleChange={handleInputChange}
                        />}
                        validation={errors.noi_chuyen_den && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.noi_chuyen_den}</p>
                        )}
                    />
                </div>
                <div className={styles.w_100}>
                    <Custom_label isRequired={true} label_class="font_500" title="Lý do đề xuất luân chuyển công tác" />
                    <div className={styles.textarea}>
                        <Custom_input_textarea
                            placeholder="Nhập lý do đề xuất luân chuyển công tác"
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
export default Working_rotation_propose;