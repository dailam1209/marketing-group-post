import Input_calender from '@/components/VanThu/components/Input/Input_calender/Input_calender';
import Input_select from '@/components/VanThu/components/Input/Input_select/Input_select';
import { Custom_input_text, Custom_input_textarea } from '@/components/VanThu/components/Input/Input_text/Input_text';
import { Custom_label } from '@/components/VanThu/components/Input/Label/Label';
import Section from '@/components/VanThu/components/Input/Section/Section';
import { fetch_employee, fetch_supervisor_approver } from '@/utils/api/dexuat/api_fetch';
import { getCookie } from 'cookies-next';
import { useState, useEffect, useCallback } from 'react';
import { select_style } from '../1_Absent_propose/Absent_propose';
import styles from './propose.module.css';
import * as Yup from 'yup';
import { post_bonus_payoff_propose } from '@/utils/api/dexuat/api_post';
import router from 'next/router';

const Bonus_payoff_propose = ({ inuse }: { inuse?: boolean }) => {
    const validationSchema = Yup.object().shape({
        name_dx: Yup.string().required('Vui lòng nhập tên đề xuất.'),
        ly_do: Yup.string().required('Vui lòng nhập lý do.'),
        id_user_duyet: Yup.string().required('Vui lòng chọn người duyệt.'),
        id_user_theo_doi: Yup.string().required('Vui lòng chọn người theo dõi.'),
        type_tp: Yup.string().required('Vui lòng chọn loại thưởng phạt.'),
        so_tien_tp: Yup.string().required('Vui lòng nhập số tiền thưởng phạt.'),
        time_tp: Yup.string().required('Vui lòng nhập ngày áp dụng.'),
      });
    const [supervior,setSuperVisor] = useState<any>();
    const [approver,setApprover] = useState<any>();
    const [employee,setEmployee] = useState<any>();
    const [showNgtp, setShowNgtp] = useState(false)
    useEffect(()=>{
    const fetchdata = async () => {
        if(inuse){  
            const token = sessionStorage.getItem("token");
            const response = await fetch_supervisor_approver(token)
            const res_employee = await fetch_employee(token)
            setSuperVisor(response?.data.listUsersTheoDoi)
            setApprover(response?.data.listUsersDuyet)
            setEmployee(res_employee?.data.data)
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
    const employee_options = employee?.map((opts:any) => {
        return { value:opts.idQLC, 
                label:opts.userName,
                image: opts.avatarUser, 
                department:opts.nameDeparment, 
                department_id:opts.dep_id, 
                name:'thanhviendc_bn',
                role:opts.position_id}
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
    const handleRadioChange = (e:any) => {
        const {id,value} = e.target;
        if(id === 'tien_thuong'){
            setFormData((prev:any) => ({
                ...prev,
                type_tp: '1'
            }))
            setShowNgtp(false)
        }else{
            setFormData((prev:any) => ({
                ...prev,
                type_tp: '2'
            }))
            setShowNgtp(true)
        }
    }
    const [errors, setErrors] = useState<any>({});
    
    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      try {
        await validationSchema.validate(formData, { abortEarly: false });
        var form_data = new FormData();
        for(var key in formData) {
            form_data.append(key, formData[key]);
        }
        const res = await post_bonus_payoff_propose(form_data)
        console.log(res);
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
    useEffect(() => {
      console.log(errors)
    })
    return (
        <form className={styles.form_propose}>
            <div className={styles.wrapper_form}>
                <div className={styles.row}>
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={true} title="Tên đề xuất" label_class="font_500" />}
                        input={<Custom_input_text inputclass="input_text_shedule" placeholder="Nhập tên đề xuất"
                        input_name='name_dx'
                        handleChange={handleInputChange} />}
                        validation={errors.name_dx && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.name_dx}</p>
                        )}
                    />
                    <div className={styles.col_2_d_flex}>
                        <Section
                            style="w_50_g20"
                            label={<Custom_label isRequired={false} label_class="font_500" title="Họ và tên" />}
                            input={<Custom_input_text
                                inputclass="input_text_shedule"
                                placeholder="Họ và tên"
                                value={getCookie("userName")?.toString()}
                                isDisabled={true}
                            />}
                        />
                        <Section
                            style="w_50_g20"
                            label={<Custom_label isRequired={false} label_class="font_500" title="Loại đề xuất" />}
                            input={<Custom_input_text
                                isDisabled={true}
                                inputclass="input_text_shedule"
                                value="Đề xuất thưởng phạt"
                            />}
                        />
                    </div>
                    <div style={{width:'100%'}}>
                        <div style={{width:'100%', display: 'flex'}}>
                            <div className={styles.col_2_d_flex_align_c}>
                                <input onChange={handleRadioChange} type='radio' name='type_tp' id ='tien_thuong' className={styles.mr5}/>
                                <label htmlFor="tien_thuong" className={styles.radio_button_label}>Tiền thưởng</label>
                            </div>
                            <div className={styles.col_2_d_flex_align_c}>
                                <input onChange={handleRadioChange} type='radio' name='type_tp' id ='tien_phat' className={styles.mr5}/>
                                <label htmlFor="tien_phat" className={styles.radio_button_label}>Tiền phạt</label>
                            </div>
                        </div>
                        {errors.type_tp && (
                            <p style={{color: 'red', margin: '0px 10px 10px 10px'}} >{errors.type_tp}</p>
                        )}
                    </div>
                    {showNgtp && (
                        <Section
                            style="col_2"
                            label={<Custom_label isRequired={true} title="Người phạt" label_class="font_500" />}
                            input={<Input_select
                                style={select_style}
                                options={employee_options}
                                placeholder={'Chọn người phạt'}
                                onChange={handleSelectChange}
                                isMulti={true}
                            />}
                        />
                    )}
                    <div className={styles.col_2}>
                        <Custom_label isRequired={true} title="Số tiền" label_class="font_500" />
                        <div className={styles.input_money}>
                            <input className={styles.input_money_text} type='number' placeholder="Nhập số tiền"
                                 name='so_tien_tp' onChange={handleInputChange} />
                            <span className={styles.money}>VNĐ</span>
                        </div>
                        {errors.so_tien_tp && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.so_tien_tp}</p>
                        )}
                    </div>
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={true} label_class="font_500" title="Ngày áp dụng" />}
                        input={<Input_calender
                            placeholder='Chọn ngày'
                            datetype='datetime-local'
                            calender_class="calender_class_schedule"
                            calender_label_class="calender_label_class_schedule"
                            input_name='time_tp'
                            handle_input={handleInputChange}
                        />}
                        validation={errors.time_tp && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.time_tp}</p>
                        )}
                    />
                </div>
                <div className={styles.w_100}>
                    <Custom_label isRequired={true} label_class="font_500" title="Lý do" />
                    <div className={styles.textarea}>
                        <Custom_input_textarea
                            placeholder="Nhập lý do"
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
                </div>
            </div>
            <div className={styles.confirm}>
              <button className={styles.cancel}>Hủy</button>
              <button onClick={handleSubmit} type="submit" className={styles.create_propose}>Tạo đề xuất</button>
            </div>
        </form> 
    )
}
export default Bonus_payoff_propose;