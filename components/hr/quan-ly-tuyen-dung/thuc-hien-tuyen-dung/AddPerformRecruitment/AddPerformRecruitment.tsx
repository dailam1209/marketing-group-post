import React, { useState, useEffect } from 'react'
import styles from './AddPerformRecruitment.module.css'
import Select from 'react-select'
import * as Yup from 'yup'
import {
  CreateNewsRecruitment,
  GetDataCategory,
  getDataAddress,
  getDataUser,
} from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'
import { GetDataRecruitment } from '@/pages/api/api-hr/quan-ly-tuyen-dung/RecruitmentManagerService'
import nganh_nghe from '@/components/hr/util/listNganhNghe'
export interface AddPerformRecruitment { }

export default function AddPerformRecruitment({
  animation,
  handleCloseModalAdd,
  addData,
}: any) {
  const [content, setContent] = useState<any>()
  const [address, setAddress] = useState<any>()
  const [recruitmentId, setRecruitmentId] = useState<any>()
  const [userMemberFollow, setUserMemberFollow] = useState<any>()
  const [hrName, setHrName] = useState<any>()
  const [cateId, setCateId] = useState<any>()
  const [errors, setErrors] = useState<any>({})
  const [selectedOption, setSelectedOption] = useState<any | null>()

  const schema = Yup.object().shape({
    title: Yup.string().required('Hãy nhập tiêu đề'),
    posApply: Yup.string().required('Hãy chọn vị trí tuyển dụng'),
    cityId: Yup.string().required('Hãy chọn địa điểm làm việc'),
    salaryId: Yup.string().required('Hãy chọn mức lương'),
    number: Yup.string().required('Hãy nhập số ứng viên'),
    timeStart: Yup.string().required('Hãy nhập thời gian ứng tuyển'),
    timeEnd: Yup.string().required('Hãy nhập thời gian ứng tuyển'),
    jobDetail: Yup.string().required('Hãy nhập chi tiết công việc'),
    wokingForm: Yup.string().required('Hãy chọn hình thức'),
    jobDes: Yup.string().required('Hãy nhập mô tả công việc'),
    interest: Yup.string().required('Hãy nhập quyền lợi ứng viên'),
    jobExp: Yup.string().required('Hãy chọn kinh nghiệm '),
    gender: Yup.string().required('Hãy chọn giới tính'),
    degree: Yup.string().required('Hãy chọn bằng cấp'),
    jobRequire: Yup.string().required('Hãy nhập yêu cầu công việc'),
  })

  const handleContentChange = (event) => {
    const { name, value } = event.target
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectionChange = (option: any | null, optionsArray: any[]) => {
    if (option) {
      const { name, value } = option
      setSelectedOption((prevSelectedOption) => ({
        ...prevSelectedOption,
        [name]: Number(value),
      }))
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const responseAddress = await getDataAddress()
        const responseRecruitmentId = await GetDataRecruitment(1, 10000, '')
        const responseDataUser = await getDataUser()
        const responseCareer = await GetDataCategory()

        Promise.all([
          responseAddress,
          responseRecruitmentId,
          responseDataUser,
          responseCareer,
        ]).then(async (response) => {
          const dataAddress = await response[0]?.data.data
          const dataRecruitmentId = await response[1]?.data?.success
          const dataUser = await response[2]?.data?.data
          const dataCategory = await response[3]?.data.data


          setAddress(
            dataAddress?.data.map((item) => ({
              value: item.cit_id,
              label: item.cit_name,
              name: 'cityId',
            }))
          )
          setRecruitmentId(
            dataRecruitmentId?.data?.data.map((item) => ({
              value: item.id,
              label: `QTTD${item.id} ${item.name}`,
              name: 'recruitmentId',
            }))
          )
          setUserMemberFollow(
            dataUser?.items?.map((item) => ({
              name: 'memberFollow',
              value: item.ep_id,
              label: `${item.ep_name} ${item.dep_name}`,
            }))
          )
          setHrName(
            dataUser?.items?.map((item) => ({
              name: 'hrName',
              value: item.ep_id,
              label: `${item.ep_name} ${item.dep_name}`,
            }))
          )
          setCateId(
            dataCategory?.data.map((item) => ({
              value: item.cat_id,
              label: item.cat_name,
              name: 'cateId',
            }))
          )
        })
      } catch (err) { }
    }
    getData()
  }, [])

  const options = {
    vitrituyendung: [
      { name: 'posApply', value: '1', label: 'Mới tốt nghiệp' },
      { name: 'posApply', value: '6', label: 'Thực tập sinh' },
      { name: 'posApply', value: '3', label: 'Nhân viên' },
      { name: 'posApply', value: '2', label: 'Trưởng phòng' },
    ],

    diaiemlamviec: address,

    nganhnghe: cateId,

    mucluong: [
      { name: 'salaryId', value: '1', label: 'Thỏa thuận' },
      { name: 'salaryId', value: '2', label: '1 - 3 triệu' },
      { name: 'salaryId', value: '3', label: '3 - 5 triệu' },
      { name: 'salaryId', value: '4', label: '5 - 7 triệu' },
      { name: 'salaryId', value: '5', label: '7 - 10 triệu' },
      { name: 'salaryId', value: '6', label: '10 - 15 triệu' },
      { name: 'salaryId', value: '7', label: '15 - 20 triệu' },
      { name: 'salaryId', value: '8', label: '20 - 30 triệu' },
      { name: 'salaryId', value: '9', label: 'Trên 30 triệu' },
      { name: 'salaryId', value: '10', label: 'Trên 50 Triệu' },
      { name: 'salaryId', value: '11', label: 'Trên 100 Triệu' },
    ],

    hinhthuclamviec: [
      { name: 'wokingForm', value: '1', label: 'Toàn thời gian cố định' },
      { name: 'wokingForm', value: '2', label: 'Toàn thời gian tạm thời' },
      { name: 'wokingForm', value: '3', label: 'Bán thời gian' },
      { name: 'wokingForm', value: '4', label: 'Bán thời gian tạm thời' },
      { name: 'wokingForm', value: '5', label: 'Hợp đồng' },
      { name: 'wokingForm', value: '6', label: 'Khác' },
    ],

    maquytrinhapdung: recruitmentId,

    kinhnghiem: [
      { name: 'jobExp', value: '0', label: 'Chưa có kinh nghiệm' },
      { name: 'jobExp', value: '1', label: '0 - 1 năm kinh nghiệm' },
      { name: 'jobExp', value: '2', label: '1 - 2 năm kinh nghiệm' },
      { name: 'jobExp', value: '3', label: '2 - 5 năm kinh nghiệm' },
      { name: 'jobExp', value: '4', label: '5 - 10 năm kinh nghiệm' },
      { name: 'jobExp', value: '5', label: 'Trên 10 năm kinh nghiệm' },
    ],

    gioitinh: [
      { name: 'gender', value: '1', label: 'Nam' },
      { name: 'gender', value: '2', label: 'Nữ' },
      { name: 'gender', value: '0', label: 'Không yêu cầu' },
    ],

    yeucaubangcap: [
      { name: 'degree', value: '0', label: 'Không yêu cầu' },
      { name: 'degree', value: '1', label: 'THPT trở lên' },
      { name: 'degree', value: '2', label: 'Trung học trở lên' },
      { name: 'degree', value: '3', label: 'Chứng chỉ' },
      { name: 'degree', value: '4', label: 'Trung cấp trở lên' },
      { name: 'degree', value: '5', label: 'Cao đẳng trở lên' },
      { name: 'degree', value: '6', label: 'Cử nhân trở lên' },
      { name: 'degree', value: '7', label: 'Đại học trở lên' },
      { name: 'degree', value: '8', label: 'Thạc sĩ trở lên' },
      { name: 'degree', value: '9', label: 'Thạc sĩ Nghệ thuật' },
      { name: 'degree', value: '10', label: 'Thạc sĩ Thương mại' },
      { name: 'degree', value: '11', label: 'Thạc sĩ Khoa học' },
      { name: 'degree', value: '12', label: 'Thạc sĩ Kiến trúc' },
      { name: 'degree', value: '13', label: 'Thạc sĩ QTKD' },
      { name: 'degree', value: '14', label: 'Thạc sĩ Kỹ thuật ứng dụng' },
      { name: 'degree', value: '15', label: 'Thạc sĩ Luật' },
      { name: 'degree', value: '16', label: 'Thạc sĩ Y học' },
      { name: 'degree', value: '17', label: 'Thạc sĩ Dược phẩm' },
      { name: 'degree', value: '18', label: 'Tiến sĩ' },
      { name: 'degree', value: '19', label: 'Khác' },
    ],

    nhanvientheodoi: userMemberFollow,

    nhanvienphutrach: hrName,
  }

  const formData = Object.assign({}, content, selectedOption)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false })
      const response = await CreateNewsRecruitment(content, selectedOption)

      if (response?.status !== 200) {
      } else {
        handleCloseModalAdd()
        addData(response?.data)
      }
    } catch (error: any) {
      const validationErrors = {}
      if (error?.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message
        })
      }
      setErrors(validationErrors)
    }
  }

  const tinh_thanh = [{ "cit_id": 1, "cit_name": "Hà Nội", "cit_order": 10, "cit_type": 1, "cit_count": 48593, "cit_count_vl": 178133, "cit_count_vlch": 457, "postcode": "100000" }, { "cit_id": 2, "cit_name": "Hải Phòng", "cit_order": 0, "cit_type": 1, "cit_count": 4231, "cit_count_vl": 8346, "cit_count_vlch": 9, "postcode": "180000" }, { "cit_id": 3, "cit_name": "Bắc Giang", "cit_order": 0, "cit_type": 1, "cit_count": 1959, "cit_count_vl": 2974, "cit_count_vlch": 4, "postcode": "220000" }, { "cit_id": 6, "cit_name": "Cao Bằng", "cit_order": 0, "cit_type": 1, "cit_count": 182, "cit_count_vl": 159, "cit_count_vlch": 0, "postcode": "270000" }, { "cit_id": 4, "cit_name": "Bắc Kạn", "cit_order": 0, "cit_type": 1, "cit_count": 218, "cit_count_vl": 41, "cit_count_vlch": 0, "postcode": "960000" }, { "cit_id": 8, "cit_name": "Hòa Bình", "cit_order": 0, "cit_type": 1, "cit_count": 393, "cit_count_vl": 570, "cit_count_vlch": 0, "postcode": "350000" }, { "cit_id": 9, "cit_name": "Hải Dương", "cit_order": 3, "cit_type": 1, "cit_count": 2873, "cit_count_vl": 4654, "cit_count_vlch": 9, "postcode": "170000" }, { "cit_id": 5, "cit_name": "Bắc Ninh", "cit_order": 7, "cit_type": 1, "cit_count": 6193, "cit_count_vl": 9000, "cit_count_vlch": 7, "postcode": "790000" }, { "cit_id": 11, "cit_name": "Hà Nam", "cit_order": 0, "cit_type": 1, "cit_count": 1650, "cit_count_vl": 2390, "cit_count_vlch": 3, "postcode": "400000" }, { "cit_id": 12, "cit_name": "Hưng Yên", "cit_order": 5, "cit_type": 1, "cit_count": 2929, "cit_count_vl": 5598, "cit_count_vlch": 6, "postcode": "160000" }, { "cit_id": 13, "cit_name": "Lào Cai", "cit_order": 0, "cit_type": 1, "cit_count": 346, "cit_count_vl": 554, "cit_count_vlch": 0, "postcode": "330000" }, { "cit_id": 14, "cit_name": "Lai Châu", "cit_order": 0, "cit_type": 1, "cit_count": 97, "cit_count_vl": 163, "cit_count_vlch": 0, "postcode": "390000" }, { "cit_id": 15, "cit_name": "Lạng Sơn", "cit_order": 0, "cit_type": 1, "cit_count": 319, "cit_count_vl": 336, "cit_count_vlch": 0, "postcode": "240000" }, { "cit_id": 16, "cit_name": "Ninh Bình", "cit_order": 0, "cit_type": 1, "cit_count": 1096, "cit_count_vl": 985, "cit_count_vlch": 2, "postcode": "430000" }, { "cit_id": 17, "cit_name": "Nam Định", "cit_order": 0, "cit_type": 1, "cit_count": 1927, "cit_count_vl": 1215, "cit_count_vlch": 2, "postcode": "420000" }, { "cit_id": 18, "cit_name": "Phú Thọ", "cit_order": 0, "cit_type": 1, "cit_count": 945, "cit_count_vl": 921, "cit_count_vlch": 2, "postcode": "290000" }, { "cit_id": 19, "cit_name": "Quảng Ninh", "cit_order": 0, "cit_type": 1, "cit_count": 1505, "cit_count_vl": 2321, "cit_count_vlch": 8, "postcode": "200000" }, { "cit_id": 20, "cit_name": "Sơn La", "cit_order": 0, "cit_type": 1, "cit_count": 311, "cit_count_vl": 305, "cit_count_vlch": 0, "postcode": "360000" }, { "cit_id": 21, "cit_name": "Thái Bình", "cit_order": 0, "cit_type": 1, "cit_count": 1550, "cit_count_vl": 1282, "cit_count_vlch": 3, "postcode": "410000" }, { "cit_id": 22, "cit_name": "Thái Nguyên", "cit_order": 0, "cit_type": 1, "cit_count": 1603, "cit_count_vl": 1323, "cit_count_vlch": 0, "postcode": "250000" }, { "cit_id": 23, "cit_name": "Tuyên Quang", "cit_order": 0, "cit_type": 1, "cit_count": 319, "cit_count_vl": 236, "cit_count_vlch": 0, "postcode": "300000" }, { "cit_id": 24, "cit_name": "Vĩnh Phúc", "cit_order": 0, "cit_type": 1, "cit_count": 2260, "cit_count_vl": 2318, "cit_count_vlch": 5, "postcode": "280000" }, { "cit_id": 7, "cit_name": "Điện Biên", "cit_order": 0, "cit_type": 1, "cit_count": 149, "cit_count_vl": 201, "cit_count_vlch": 1, "postcode": "380000" }, { "cit_id": 26, "cit_name": "Đà Nẵng", "cit_order": 0, "cit_type": 2, "cit_count": 11551, "cit_count_vl": 21892, "cit_count_vlch": 34, "postcode": "550000" }, { "cit_id": 27, "cit_name": "Thừa Thiên Huế", "cit_order": 0, "cit_type": 2, "cit_count": 2012, "cit_count_vl": 892, "cit_count_vlch": 6, "postcode": "530000" }, { "cit_id": 28, "cit_name": "Khánh Hòa", "cit_order": 0, "cit_type": 2, "cit_count": 2804, "cit_count_vl": 3873, "cit_count_vlch": 5, "postcode": "650000" }, { "cit_id": 29, "cit_name": "Lâm Đồng", "cit_order": 0, "cit_type": 2, "cit_count": 1505, "cit_count_vl": 1555, "cit_count_vlch": 1, "postcode": "670000" }, { "cit_id": 31, "cit_name": "Bình Thuận", "cit_order": 0, "cit_type": 2, "cit_count": 969, "cit_count_vl": 1394, "cit_count_vlch": 0, "postcode": "800000" }, { "cit_id": 10, "cit_name": "Hà Giang", "cit_order": 0, "cit_type": 1, "cit_count": 207, "cit_count_vl": 209, "cit_count_vlch": 1, "postcode": "310000" }, { "cit_id": 32, "cit_name": "Đắk Lắk", "cit_order": 0, "cit_type": 2, "cit_count": 1361, "cit_count_vl": 824, "cit_count_vlch": 4, "postcode": "630000" }, { "cit_id": 33, "cit_name": "Đắk Nông", "cit_order": 0, "cit_type": 2, "cit_count": 336, "cit_count_vl": 238, "cit_count_vlch": 0, "postcode": "640000" }, { "cit_id": 34, "cit_name": "Gia Lai", "cit_order": 0, "cit_type": 2, "cit_count": 869, "cit_count_vl": 707, "cit_count_vlch": 0, "postcode": "600000" }, { "cit_id": 35, "cit_name": "Hà Tĩnh", "cit_order": 0, "cit_type": 2, "cit_count": 892, "cit_count_vl": 661, "cit_count_vlch": 1, "postcode": "480000" }, { "cit_id": 36, "cit_name": "Kon Tum", "cit_order": 0, "cit_type": 2, "cit_count": 333, "cit_count_vl": 336, "cit_count_vlch": 0, "postcode": "580000" }, { "cit_id": 37, "cit_name": "Nghệ An", "cit_order": 0, "cit_type": 2, "cit_count": 2261, "cit_count_vl": 1886, "cit_count_vlch": 3, "postcode": "460000 - 470000" }, { "cit_id": 38, "cit_name": "Ninh Thuận", "cit_order": 0, "cit_type": 2, "cit_count": 605, "cit_count_vl": 486, "cit_count_vlch": 1, "postcode": "660000" }, { "cit_id": 39, "cit_name": "Phú Yên", "cit_order": 0, "cit_type": 2, "cit_count": 1035, "cit_count_vl": 603, "cit_count_vlch": 2, "postcode": "620000" }, { "cit_id": 40, "cit_name": "Quảng Bình", "cit_order": 0, "cit_type": 2, "cit_count": 625, "cit_count_vl": 554, "cit_count_vlch": 0, "postcode": "510000" }, { "cit_id": 41, "cit_name": "Quảng Nam", "cit_order": 0, "cit_type": 2, "cit_count": 2352, "cit_count_vl": 2563, "cit_count_vlch": 1, "postcode": "560000" }, { "cit_id": 42, "cit_name": "Quảng Ngãi", "cit_order": 0, "cit_type": 2, "cit_count": 2104, "cit_count_vl": 1342, "cit_count_vlch": 2, "postcode": "570000" }, { "cit_id": 43, "cit_name": "Quảng Trị", "cit_order": 0, "cit_type": 2, "cit_count": 762, "cit_count_vl": 298, "cit_count_vlch": 0, "postcode": "520000" }, { "cit_id": 44, "cit_name": "Thanh Hóa", "cit_order": 0, "cit_type": 2, "cit_count": 2825, "cit_count_vl": 2278, "cit_count_vlch": 14, "postcode": "440000 - 450000" }, { "cit_id": 45, "cit_name": "Hồ Chí Minh", "cit_order": 9, "cit_type": 3, "cit_count": 71769, "cit_count_vl": 260279, "cit_count_vlch": 600, "postcode": "700000" }, { "cit_id": 46, "cit_name": "Bình Dương", "cit_order": 8, "cit_type": 3, "cit_count": 14943, "cit_count_vl": 25389, "cit_count_vlch": 48, "postcode": "590000" }, { "cit_id": 47, "cit_name": "Bà Rịa Vũng Tàu", "cit_order": 0, "cit_type": 3, "cit_count": 2496, "cit_count_vl": 401, "cit_count_vlch": 10, "postcode": "790000" }, { "cit_id": 25, "cit_name": "Yên Bái", "cit_order": 0, "cit_type": 1, "cit_count": 282, "cit_count_vl": 282, "cit_count_vlch": 0, "postcode": "320000" }, { "cit_id": 30, "cit_name": "Bình Định", "cit_order": 0, "cit_type": 2, "cit_count": 1958, "cit_count_vl": 1960, "cit_count_vlch": 4, "postcode": "820000" }, { "cit_id": 50, "cit_name": "Bạc Liêu", "cit_order": 0, "cit_type": 3, "cit_count": 673, "cit_count_vl": 810, "cit_count_vlch": 2, "postcode": "260000" }, { "cit_id": 51, "cit_name": "Bình Phước", "cit_order": 0, "cit_type": 3, "cit_count": 769, "cit_count_vl": 1178, "cit_count_vlch": 0, "postcode": "830000" }, { "cit_id": 52, "cit_name": "Bến Tre", "cit_order": 0, "cit_type": 3, "cit_count": 948, "cit_count_vl": 1286, "cit_count_vlch": 2, "postcode": "930000" }, { "cit_id": 53, "cit_name": "Cà Mau", "cit_order": 0, "cit_type": 3, "cit_count": 1024, "cit_count_vl": 712, "cit_count_vlch": 1, "postcode": "970000" }, { "cit_id": 54, "cit_name": "Đồng Tháp", "cit_order": 0, "cit_type": 3, "cit_count": 1480, "cit_count_vl": 1091, "cit_count_vlch": 2, "postcode": "870000" }, { "cit_id": 55, "cit_name": "Đồng Nai", "cit_order": 6, "cit_type": 3, "cit_count": 8738, "cit_count_vl": 13099, "cit_count_vlch": 16, "postcode": "810000" }, { "cit_id": 56, "cit_name": "Hậu Giang", "cit_order": 0, "cit_type": 3, "cit_count": 865, "cit_count_vl": 461, "cit_count_vlch": 1, "postcode": "910000" }, { "cit_id": 57, "cit_name": "Kiên Giang", "cit_order": 0, "cit_type": 3, "cit_count": 1775, "cit_count_vl": 1823, "cit_count_vlch": 1, "postcode": "920000" }, { "cit_id": 58, "cit_name": "Long An", "cit_order": 4, "cit_type": 3, "cit_count": 2691, "cit_count_vl": 6245, "cit_count_vlch": 11, "postcode": "850000" }, { "cit_id": 59, "cit_name": "Sóc Trăng", "cit_order": 0, "cit_type": 3, "cit_count": 1008, "cit_count_vl": 635, "cit_count_vlch": 1, "postcode": "950000" }, { "cit_id": 60, "cit_name": "Tiền Giang", "cit_order": 0, "cit_type": 3, "cit_count": 1305, "cit_count_vl": 1839, "cit_count_vlch": 3, "postcode": "860000" }, { "cit_id": 61, "cit_name": "Tây Ninh", "cit_order": 0, "cit_type": 3, "cit_count": 1126, "cit_count_vl": 2073, "cit_count_vlch": 3, "postcode": "840000" }, { "cit_id": 62, "cit_name": "Trà Vinh", "cit_order": 0, "cit_type": 3, "cit_count": 633, "cit_count_vl": 577, "cit_count_vlch": 1, "postcode": "940000" }, { "cit_id": 63, "cit_name": "Vĩnh Long", "cit_order": 0, "cit_type": 3, "cit_count": 1532, "cit_count_vl": 850, "cit_count_vlch": 0, "postcode": "890000" }, { "cit_id": 48, "cit_name": "Cần Thơ", "cit_order": 0, "cit_type": 3, "cit_count": 8459, "cit_count_vl": 3309, "cit_count_vlch": 15, "postcode": "900000" }, { "cit_id": 49, "cit_name": "An Giang", "cit_order": 0, "cit_type": 3, "cit_count": 2169, "cit_count_vl": 1646, "cit_count_vlch": 0, "postcode": "880000" }]


  useEffect(() => {
    if (tinh_thanh) {
      setAddress(
        tinh_thanh?.map((item) => ({
          value: item.cit_id,
          label: item.cit_name,
          name: 'cityId',
        }))
      )
    }
    if (nganh_nghe) {
      setCateId(
        nganh_nghe?.map((item) => ({
          value: item.cat_id,
          label: item.cat_name,
          name: 'cateId',
        }))
      )
    }
  }, [tinh_thanh, nganh_nghe])

  return (
    <>
      <div className={`${styles.overlay}`} onClick={handleCloseModalAdd}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
        style={{ display: 'block' }}>
        <div className={` ${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>THÊM TIN MỚI</h5>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodytuyendung}`}>
                <div className={`${styles.form_groups}`}>
                  <label style={{ display: 'contents' }}>
                    Tiêu đề tin tuyển dụng
                    <span className={`${styles.red}`}> *</span>
                    {errors.title && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.title}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='title'
                      placeholder='Nhập tiêu đề tin tuyển dụng'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Vị trí tuyển dụng
                    <span className={`${styles.red}`}> *</span>
                    {errors.posApply && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.posApply}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.vitrituyendung)
                      }
                      options={options.vitrituyendung}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Địa điểm làm việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.cityId && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.cityId}
                      </div>
                    )}
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.diaiemlamviec)
                      }
                      options={options.diaiemlamviec}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Địa chỉ tuyển dụng
                    <span className={`${styles.red}`}> </span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='address'
                      placeholder='Nhập địa chỉ tuyển dụng'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Ngành nghề
                    <span className={`${styles.red}`}> </span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.nganhnghe)
                      }
                      options={options.nganhnghe}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Mức lương
                    <span className={`${styles.red}`}> *</span>
                    {errors.salaryId && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.salaryId}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.mucluong)
                      }
                      options={options.mucluong}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div
                  className={`${styles.form_groups} ${styles.small_left}  ${styles.full_width}`}>
                  <label>
                    Số lượng ứng tuyển
                    <span className={`${styles.red}`}> *</span>
                    {errors.number && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.number}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='number'
                      name='number'
                      placeholder='Nhập số lượng ứng viên cần tuyển'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.big_right}`}>
                  <label>
                    Thời hạn tuyển
                    <span className={`${styles.red}`}> *</span>
                    {errors.timeStart ||
                      (errors.timeEnd && (
                        <div className={`${styles.red} ${styles.float_right}`}>
                          {errors.timeStart || errors.timeEnd}
                        </div>
                      ))}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      style={{ fontWeight: '600' }}
                      name='timeStart'
                      type='date'
                      className={`${styles.form_date}`}
                      onChange={handleContentChange}></input>
                    <span className={`${styles.formto}`}>đến</span>
                    <input
                      style={{ fontWeight: '600' }}
                      type='date'
                      className={`${styles.to_date}`}
                      name='timeEnd'
                      onChange={handleContentChange}></input>
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Chi tiết công việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobDetail && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.jobDetail}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='jobDetail'
                      placeholder='Mô tả chi tiết công việc'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Hình thức làm việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.wokingForm && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.wokingForm}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.hinhthuclamviec)
                      }
                      options={options.hinhthuclamviec}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Thời gian thử việc
                    <span className={`${styles.red}`}></span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      style={{ width: '96%' }}
                      type='text'
                      name='probationaryTime'
                      placeholder='Nhập thời gian thử việc'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div
                  className={`${styles.form_groups} ${styles.group_left}`}
                  style={{ width: '100%' }}>
                  <label>Hoa hồng (nếu có)</label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='number'
                      name='moneyTip'
                      placeholder='Nhập hoa hồng được nhận (nếu có)'
                      spellCheck='false'
                      style={{ width: '43%' }}
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Mô tả công việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobDes && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.jobDes}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='jobDes'
                      placeholder='Mô tả công việc'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Quyền lợi
                    <span className={`${styles.red}`}> *</span>
                    {errors.interest && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.interest}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='interest'
                      placeholder='Quyền lợi ứng viên'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Mã quy trình áp dụng
                    <span className={`${styles.red}`}></span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.maquytrinhapdung)
                      }
                      options={options.maquytrinhapdung}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Kinh nghiệm
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobExp && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.jobExp}
                      </div>
                    )}
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.kinhnghiem)
                      }
                      options={options.kinhnghiem}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Yêu cầu giới tính
                    <span className={`${styles.red}`}></span>
                    {errors.gender && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.gender}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.gioitinh)
                      }
                      options={options.gioitinh}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Yêu cầu bằng cấp
                    <span className={`${styles.red}`}> *</span>
                    {errors.degree && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.degree}
                      </div>
                    )}
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.yeucaubangcap)
                      }
                      options={options.yeucaubangcap}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Yêu cầu công việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobRequire && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.jobRequire}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='jobRequire'
                      placeholder='Yêu cầu công việc'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} `}>
                  <label>
                    Thành viên theo dõi
                    <span className={`${styles.red}`}></span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.nhanvientheodoi)
                      }
                      options={options.nhanvientheodoi}
                      placeholder='Chọn nhân viên'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên nhân viên phụ trách tuyển dụng
                    <span className={`${styles.red}`}></span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.nhanvienphutrach)
                      }
                      options={options.nhanvienphutrach}
                      placeholder='Chọn nhân viên'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
                <button
                  type='button'
                  className={`${styles.btn_huy}`}
                  onClick={handleCloseModalAdd}>
                  Hủy
                </button>
                <button type='submit' className={`${styles.update}`}>
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
