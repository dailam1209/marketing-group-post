import Input_calender from '@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender';
import { Input_file_3 } from '@/components/van-thu-luu-tru/components/Input/Input_file/Input_file';
import Input_select from '@/components/van-thu-luu-tru/components/Input/Input_select/Input_select';
import { Custom_input_text, Custom_input_textarea } from '@/components/van-thu-luu-tru/components/Input/Input_text/Input_text';
import Label, { Custom_label } from '@/components/van-thu-luu-tru/components/Input/Label/Label';
import Section from '@/components/van-thu-luu-tru/components/Input/Section/Section';
import { fetch_shift, fetch_supervisor_approver } from '@/utils/api/dexuat/api_fetch';
import { getCookie } from 'cookies-next';
import { useState, useEffect, useCallback } from 'react';
import { select_style } from '../1_Absent_propose/Absent_propose';
import styles from './propose.module.css';
import * as Yup from 'yup';
import { post_overtime_propose } from '@/utils/api/dexuat/api_post';
import router from 'next/router';

const ca_fake_options = [
  {name:'shift_id', value:'1',label:'Ca sáng'},
  {name:'shift_id', value:'2',label:'Ca chiều'},
]
const Overtime_propose = ({ inuse }: { inuse?: boolean }) => {
    const validationSchema = Yup.object().shape({
        name_dx: Yup.string().required('Vui lòng nhập tên đề xuất.'),
        ly_do: Yup.string().required('Vui lòng nhập lý do.'),
        id_user_duyet: Yup.string().required('Vui lòng chọn người duyệt.'),
        id_user_theo_doi: Yup.string().required('Vui lòng chọn người theo dõi.'),
        time_tc: Yup.string().required('Vui lòng nhập thời gian tăng ca.'),
        shift_id: Yup.string().required('Vui lòng chọn ca tăng.')
      });
    const [supervior,setSuperVisor] = useState<any>();
    const [approver,setApprover] = useState<any>();
    const [shiftData,setShiftData] = useState<any>();
    useEffect(()=>{
      const fetchdata = async () => {
        if(inuse){
            const token = sessionStorage.getItem("token");
            const response = await fetch_supervisor_approver(token);
            const response2 = await fetch_shift(token)
            setSuperVisor(response?.data.listUsersTheoDoi)
            setApprover(response?.data.listUsersDuyet)
            setShiftData(response2?.data.items)
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
    const shift_id_options = shiftData?.map((opt:any) => {
        return {value: opt.shift_id, label: opt.shift_name, name:'shift_id'}
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
        else if(type === 'date' || type === 'datetime' || type === 'datetime-local' || type === 'month') {
          const date = new Date(value);
          const numberDate = date.getTime();
          setFormData((prev:any) => ({
            ...prev,
            [name]: numberDate,
          }))
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
        const res = await post_overtime_propose(form_data)
        console.log(res);
        alert('Tạo đề xuất thành công')
        router.push('/van-thu-luu-tru/trang-quan-ly-de-xuat/de-xuat');
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
                        input_name="name_dx"
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
                                placeholder="Loại đề xuất"
                                value="Đơn xin tăng ca ca"
                            />}
                        />
                    </div>
                    <Section style='col_2'
                        label={<Custom_label isRequired={false} label_class="font_500" title="Ngày tăng ca" />}
                        input={<Input_calender
                            placeholder='Chọn ngày tăng ca'
                            datetype='date'
                            calender_class="calender_class_schedule"
                            calender_label_class="calender_label_class_schedule"
                            input_name='time_tc'
                            handle_input={handleInputChange}
                        />}
                        validation={errors.time_tc && (
                          <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.time_tc}</p>
                        )}
                    />
                   <Section 
                        style="col_2" 
                        label={<Custom_label isRequired={false} title="Chọn ca tăng" label_class="font_500" />} 
                        input={<Input_select 
                            style={select_style}
                            placeholder={'Chọn ca tăng'}
                            options={shift_id_options}
                            onChange={handleSelectChange}
                        />}
                        validation={errors.shift_id && (
                          <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.shift_id}</p>
                        )}
                    />
                </div>
                <div className={styles.w_100}>
                    <Custom_label isRequired={true} label_class="font_500" title="Lý do đề xuất tăng ca" />
                    <div className={styles.textarea}>
                        <Custom_input_textarea
                            placeholder="Nhập lý do đề xuất tăng ca"
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
                        input={<Input_file_3 placeholder="Thêm tài liệu đính kèm"
                            name='fileKem' 
                            handleChange={handleFileChange}/>}
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
export default Overtime_propose;