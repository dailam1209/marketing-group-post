import Input_calender from '@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender';
import { Input_file_3 } from '@/components/van-thu-luu-tru/components/Input/Input_file/Input_file';
import Input_select from '@/components/van-thu-luu-tru/components/Input/Input_select/Input_select';
import { Custom_input_text, Custom_input_textarea } from '@/components/van-thu-luu-tru/components/Input/Input_text/Input_text';
import { Custom_label, Required_label } from '@/components/van-thu-luu-tru/components/Input/Label/Label';
import Section from '@/components/van-thu-luu-tru/components/Input/Section/Section';
import { fetch_supervisor_approver } from '@/utils/api/dexuat/api_fetch';
import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useState } from 'react';
import { select_style } from '../1_Absent_propose/Absent_propose';
import styles from './propose.module.css';
import * as Yup from 'yup';
import { post_percentage_propose } from '@/utils/api/dexuat/api_post';
import router from 'next/router';

const sales_level_options = [
    {name:'name_dt',value: '134' , label: 'Sản lượng TV - 15%'},
    {name:'name_dt',value: '135' , label: 'Sản lượng TV - 10%'},
    {name:'name_dt',value: '136' , label: 'Hoa hồng KD thẻ - 0.05 %'},
    {name:'name_dt',value: '143' , label: 'Sản lượng TV - 13%'},
    {name:'name_dt',value: '151' , label: 'Hoa hồng KD thẻ David'},
    {name:'name_dt',value: '152' , label: 'Hoa hồng KD thẻ - 0.1%'},
    {name:'name_dt',value: '173' , label: 'Sản lượng TV - 5%'},
    {name:'name_dt',value: '174' , label: 'Sản lượng TV - 8%'},
    {name:'name_dt',value: '232' , label: 'Hoa hồng chấm công'},
]
const Percentage_propose = ({ inuse }: { inuse?: boolean }) => {
    const validationSchema = Yup.object().shape({
        name_dx: Yup.string().required('Vui lòng nhập tên đề xuất.'),
        ly_do: Yup.string().required('Vui lòng nhập lý do.'),
        id_user_duyet: Yup.string().required('Vui lòng chọn người duyệt.'),
        id_user_theo_doi: Yup.string().required('Vui lòng chọn người theo dõi.'),
        chu_ky: Yup.string().required('Vui lòng nhập chu kỳ.'),
        dt_money: Yup.string().required('Vui lòng nhập doanh thu.'),
        name_dt: Yup.string().required('Vui lòng chọn mức doanh thu'),
        item_mdt_date: Yup.string().required('Vui lòng nhập thời gian')
      });
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [sales,setSales] = useState();
    const handleSalesInput = (e:any) => {
        const {name,value} = e.target;
        setSales(value);
        setFormData((prev:any) => ({
            ...prev,
            [name]: value
        }))
    }
    const [supervior,setSuperVisor] = useState<any>();
    const [approver,setApprover] = useState<any>();
    useEffect(()=>{
    const fetchdata = async () => {
        if(inuse){
            const token = sessionStorage.getItem("token");
            const response = await fetch_supervisor_approver(token)
            setSuperVisor(response?.data.listUsersTheoDoi)
            setApprover(response?.data.listUsersDuyet)
        }
    }
    fetchdata();
    },[])
    const id_user_duyet_options = approver?.map((opts:any) => {
    return { value:opts.idQLC, label:opts.userName,image:opts.avatarUser, name:'id_user_duyet'}
    })
    const id_user_theo_doi_options = supervior?.map((opts:any) => {
    return { value:opts.idQLC, label:opts.userName,image:opts.avatarUser, name:'id_user_theo_doi'}
    })
    const [formData, setFormData] = useState<any>({
        name_user: getCookie("userName")?.toString(),
        item_mdt_date: formattedDate
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
        const res = await post_percentage_propose(form_data)
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
                                placeholder=""
                                value="Đề xuất hoa hồng doanh thu"
                            />}
                        />
                    </div>
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={true} label_class="font_500" title="Chu kì" />}
                        input={<Input_calender
                            placeholder='Tháng 7 2023'
                            datetype='month'
                            calender_class="calender_class_schedule"
                            calender_label_class="calender_label_class_schedule"
                            input_name='chu_ky'
                            handle_input={handleInputChange}
                        />}
                        validation={errors.chu_ky && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.chu_ky}</p>
                        )}
                    />
                    <div className={styles.col_2}>
                        <Custom_label isRequired={true} title="Doanh thu theo thời điểm" label_class="font_500" />
                        <div className={styles.row}>
                            <div className={styles.col_2_doanhthu}>
                                <div className={styles.input_money}>
                                    <input onChange={handleSalesInput} 
                                        name='dt_money'
                                        className={styles.input_money_text} 
                                        type='number' 
                                        placeholder="Nhập số tiền" />
                                    <span className={styles.money}>VNĐ</span>
                                </div>
                                {errors.dt_money && (
                                    <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.dt_money}</p>
                                )}
                            </div>
                            <div className={styles.col_2_doanhthu}>
                                <div className={styles.date_input_area}>
                                    <input defaultValue={formattedDate}
                                        className={styles.date_input} 
                                        type="date"
                                        name='item_mdt_date'
                                        onChange={handleInputChange} />
                                </div>
                                {errors.item_mdt_date && (
                                    <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.item_mdt_date}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={true} title="Tổng doanh thu" label_class="font_500" />}
                        input={<Custom_input_text  inputclass="input_text_shedule" value={sales}  />}
                    />
                    <Section
                        style="col_2"
                        label={<Custom_label isRequired={true} title="Mức doanh thu" label_class="font_500" />}
                        input={<Input_select
                            style={select_style}
                            options={sales_level_options}
                            defautlValue={sales_level_options[0]}
                            onChange={handleSelectChange}
                        />}
                        validation={errors.name_dt && (
                            <p style={{color: 'red', margin: '10px 10px 10px 0'}} >{errors.name_dt}</p>
                        )}
                    />
                </div>
                <div className={styles.w_100}>
                    <Custom_label isRequired={true} label_class="font_500" title="Lý do đề xuất hoa hồng doanh thu" />
                    <div className={styles.textarea}>
                        <Custom_input_textarea
                            placeholder="Nhập lý do xin đề xuất hoa hồng doanh thu"
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
export default Percentage_propose;