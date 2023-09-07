import React, { useEffect, useState } from 'react'
import styles from './Decentralization.module.css'
import Select from 'react-select'
import { getDataUser } from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'
import { SettingPermission, GetListPermision } from '@/pages/api/api-hr/cai-dat/generalSettings'

export default function Decentralization({ }) {
  const [user, setUser] = useState<any>()
  const [userId, setUserId] = useState<any>()
  const [loadData, setLoadData] = useState<any>(false)
  const [localListCheck, setLocalListCheck] = useState<any>([])
  const [infoRoleTD1, setInfoRoleTD1] = useState<any>(false)
  const [infoRoleTD2, setInfoRoleTD2] = useState<any>(false)
  const [infoRoleTD3, setInfoRoleTD3] = useState<any>(false)
  const [infoRoleTD4, setInfoRoleTD4] = useState<any>(false)

  const [infoRoleTTNS1, setinfoRoleTTNS1] = useState<any>(false)
  const [infoRoleTTNS2, setinfoRoleTTNS2] = useState<any>(false)
  const [infoRoleTTNS3, setinfoRoleTTNS3] = useState<any>(false)
  const [infoRoleTTNS4, setinfoRoleTTNS4] = useState<any>(false)

  const [infoRoleTTVP1, setinfoRoleTTVP1] = useState<any>(false)
  const [infoRoleTTVP2, setinfoRoleTTVP2] = useState<any>(false)
  const [infoRoleTTVP3, setinfoRoleTTVP3] = useState<any>(false)
  const [infoRoleTTVP4, setinfoRoleTTVP4] = useState<any>(false)

  const [infoRoleHNNV1, setinfoRoleHNNV1] = useState<any>(false)
  const [infoRoleHNNV2, setinfoRoleHNNV2] = useState<any>(false)
  const [infoRoleHNNV3, setinfoRoleHNNV3] = useState<any>(false)
  const [infoRoleHNNV4, setinfoRoleHNNV4] = useState<any>(false)

  const [infoRoleBCNS1, setinfoRoleBCNS1] = useState<any>(false)
  const [infoRoleBCNS2, setinfoRoleBCNS2] = useState<any>(false)
  const [infoRoleBCNS3, setinfoRoleBCNS3] = useState<any>(false)
  const [infoRoleBCNS4, setinfoRoleBCNS4] = useState<any>(false)

  const [infoRoleDXGD1, setinfoRoleDXGD1] = useState<any>(false)
  const [infoRoleDXGD2, setinfoRoleDXGD2] = useState<any>(false)
  const [infoRoleDXGD3, setinfoRoleDXGD3] = useState<any>(false)
  const [infoRoleDXGD4, setinfoRoleDXGD4] = useState<any>(false)


  const [infoRoleTGL1, setinfoRoleTGL1] = useState<any>(false)
  const [infoRoleTGL2, setinfoRoleTGL2] = useState<any>(false)
  const [infoRoleTGL3, setinfoRoleTGL3] = useState<any>(false)
  const [infoRoleTGL4, setinfoRoleTGL4] = useState<any>(false)

  const handleSelectionChange = (selectedOptions, actionMeta) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    const selectedValuesString = selectedValues.join(', ')
    setUserId((prevSelectedOption) => ({
      ...prevSelectedOption,
      userId: selectedValuesString,
    }))
  }

  console.log(localListCheck)

  const fetchData = async () => {
    try {
      if (userId.userId) {
        const formData = new FormData();
        formData.append("userId", userId.userId);
        const response = await GetListPermision(formData);
        if (response) {
          setInfoRoleTD1(response?.data?.infoRoleTD?.find((item: any) => item?.perId === 1) ? true : false)
          setInfoRoleTD2(response?.data?.infoRoleTD?.find((item: any) => item?.perId === 2) ? true : false)
          setInfoRoleTD3(response?.data?.infoRoleTD?.find((item: any) => item?.perId === 3) ? true : false)
          setInfoRoleTD4(response?.data?.infoRoleTD?.find((item: any) => item?.perId === 4) ? true : false)

          setinfoRoleTTNS1(response?.data?.infoRoleTTNS?.find((item: any) => item?.perId === 1) ? true : false)
          setinfoRoleTTNS2(response?.data?.infoRoleTTNS?.find((item: any) => item?.perId === 2) ? true : false)
          setinfoRoleTTNS3(response?.data?.infoRoleTTNS?.find((item: any) => item?.perId === 3) ? true : false)
          setinfoRoleTTNS4(response?.data?.infoRoleTTNS?.find((item: any) => item?.perId === 4) ? true : false)

          setinfoRoleTTVP1(response?.data?.infoRoleTTVP?.find((item: any) => item?.perId === 1) ? true : false)
          setinfoRoleTTVP2(response?.data?.infoRoleTTVP?.find((item: any) => item?.perId === 2) ? true : false)
          setinfoRoleTTVP3(response?.data?.infoRoleTTVP?.find((item: any) => item?.perId === 3) ? true : false)
          setinfoRoleTTVP4(response?.data?.infoRoleTTVP?.find((item: any) => item?.perId === 4) ? true : false)

          setinfoRoleHNNV1(response?.data?.infoRoleHNNV?.find((item: any) => item?.perId === 1) ? true : false)
          setinfoRoleHNNV2(response?.data?.infoRoleHNNV?.find((item: any) => item?.perId === 2) ? true : false)
          setinfoRoleHNNV3(response?.data?.infoRoleHNNV?.find((item: any) => item?.perId === 3) ? true : false)
          setinfoRoleHNNV4(response?.data?.infoRoleHNNV?.find((item: any) => item?.perId === 4) ? true : false)

          setinfoRoleBCNS1(response?.data?.infoRoleBCNS?.find((item: any) => item?.perId === 1) ? true : false)
          setinfoRoleBCNS2(response?.data?.infoRoleBCNS?.find((item: any) => item?.perId === 2) ? true : false)
          setinfoRoleBCNS3(response?.data?.infoRoleBCNS?.find((item: any) => item?.perId === 3) ? true : false)
          setinfoRoleBCNS4(response?.data?.infoRoleBCNS?.find((item: any) => item?.perId === 4) ? true : false)

          setinfoRoleDXGD1(response?.data?.infoRoleDXGD?.find((item: any) => item?.perId === 1) ? true : false)
          setinfoRoleDXGD2(response?.data?.infoRoleDXGD?.find((item: any) => item?.perId === 2) ? true : false)
          setinfoRoleDXGD3(response?.data?.infoRoleDXGD?.find((item: any) => item?.perId === 3) ? true : false)
          setinfoRoleDXGD4(response?.data?.infoRoleDXGD?.find((item: any) => item?.perId === 4) ? true : false)

          setinfoRoleTGL1(response?.data?.infoRoleTGL?.find((item: any) => item?.perId === 1) ? true : false)
          setinfoRoleTGL2(response?.data?.infoRoleTGL?.find((item: any) => item?.perId === 2) ? true : false)
          setinfoRoleTGL3(response?.data?.infoRoleTGL?.find((item: any) => item?.perId === 3) ? true : false)
          setinfoRoleTGL4(response?.data?.infoRoleTGL?.find((item: any) => item?.perId === 4) ? true : false)
        }
        setLoadData(pre => !pre)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    const elementIds = [
      "role_td1", "role_td2", "role_td3", "role_td4",
      "role_ttns1", "role_ttns2", "role_ttns3", "role_ttns4",
      "role_ttvp1", "role_ttvp2", "role_ttvp3", "role_ttvp4",
      "role_hnnv1", "role_hnnv2", "role_hnnv3", "role_hnnv4",
      "role_bcns1", "role_bcns2", "role_bcns3", "role_bcns4",
      "role_dldx1", "role_dldx2", "role_dldx3", "role_dldx4",
      "role_tgl1", "role_tgl2", "role_tgl3", "role_tgl4"
    ];

    const handleInputChange = (event) => {
      const { name, checked, value } = event.target;

      if (name.startsWith("role_")) {
        setLocalListCheck((prev) => {
          const prevValueArray = prev[name] ? prev[name].split(',') : [];

          if (checked) {
            if (!prevValueArray.includes(value)) {
              prevValueArray.push(value);
            }
          } else {
            const index = prevValueArray.indexOf(value);
            if (index !== -1) {
              prevValueArray.splice(index, 1);
            }
          }
          return {
            ...prev,
            [name]: prevValueArray.join(','),
          };
        });
      }
    };

    const processInitialValues = () => {
      elementIds.forEach((id) => {
        const element = document.getElementById(id) as HTMLInputElement;
        if (element) {
          const { name, checked, value } = element;
          console.log(name, checked, value);
          handleInputChange({ target: element });
        }
      });
    };
    processInitialValues()

    elementIds.forEach((id) => {
      const element = document.getElementById(id) as HTMLInputElement;
      if (element) {
        element.addEventListener("change", handleInputChange);
      }
    });

    return () => {
      // Cleanup: Remove event listeners when the component unmounts.
      elementIds.forEach((id) => {
        const element = document.getElementById(id) as HTMLInputElement;
        if (element) {
          element.removeEventListener("change", handleInputChange);
        }
      });
    };
  }, [userId, loadData]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDataUser()
        setUser(
          response?.data?.data?.items?.map((item) => ({
            name: 'userId',
            value: item.ep_id,
            label: `${item.ep_name} ( ${item.dep_name ? item.dep_name : "Chưa cập nhật"} )`,
          }))
        )
      } catch (err) { }
    }
    getData()
  }, [])

  const dataRes = { ...userId, ...localListCheck }
  const handleUpdateRole = async (event: any) => {
    try {
      const response = await SettingPermission(dataRes)
      if (response?.status !== 200) {
        alert('Cấp quyền thất bại')
      }
    } catch (error) { }
  }

  const options = {
    tennhanvien: user,
  }

  const handleChange = (e, setState) => setState(e?.target?.checked);

  return (
    <>
      <div className={`${styles.l_phanquyen}`}>
        <div className={`${styles.l_phanquyen_item1}`}>
          QUẢN LÝ PHÂN QUYỀN CHUNG CHO NGƯỜI DÙNG
        </div>

        <div className={`${styles.l_phanquyen_item2}`}>
          <div className={`${styles.l_timkiem_nhanvien_item1}`}>
            Chọn nhân viên :
          </div>
          <div className={`${styles.l_timkiem_nhanvien_item2}`}>
            <Select
              isMulti
              options={options.tennhanvien}
              placeholder='Chọn đối tượng'
              onChange={(option) =>
                handleSelectionChange(option, options.tennhanvien)
              }
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: 4,
                  orderColor: '#4747477a',
                  height: 'auto',
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
          <div>
            <form onSubmit={(e) => handleUpdateRole(e)}>
              <div className={`${styles.l_tbl}`}>
                <div className={`${styles.l_tbl_row}`}>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center}`}>
                    Quyền người dùng
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    Xem
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    Tạo mới
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    Chỉnh sửa
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    Xóa
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Quản lý tuyển dụng
                  </div>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_td'
                      id='role_td1'
                      type='checkbox'
                      checked={infoRoleTD1}
                      value='1'

                      onChange={(e) => handleChange(e, setInfoRoleTD1)}
                    >
                    </input>
                  </div>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_td'
                      id='role_td2'
                      type='checkbox'
                      value='2'
                      checked={infoRoleTD2}

                      onChange={(e) => handleChange(e, setInfoRoleTD2)}
                    ></input>

                  </div>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_td'
                      id='role_td3'
                      type='checkbox'
                      value='3'
                      checked={infoRoleTD3}

                      onChange={(e) => handleChange(e, setInfoRoleTD3)}
                    ></input>
                  </div>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_td'
                      id='role_td4'
                      type='checkbox'
                      value='4'
                      checked={infoRoleTD4}

                      onChange={(e) => handleChange(e, setInfoRoleTD4)}
                    ></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Quản lý thông tin nhân sự
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttns'
                      id='role_ttns1'
                      type='checkbox'
                      value='1'
                      checked={infoRoleTTNS1}

                      onChange={(e) => handleChange(e, setinfoRoleTTNS1)}
                    ></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttns'
                      id='role_ttns2'
                      type='checkbox'
                      value='2'
                      checked={infoRoleTTNS2}

                      onChange={(e) => handleChange(e, setinfoRoleTTNS2)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttns'
                      id='role_ttns3'
                      type='checkbox'
                      value='3'
                      checked={infoRoleTTNS3}

                      onChange={(e) => handleChange(e, setinfoRoleTTNS3)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttns'
                      id='role_ttns4'
                      type='checkbox'
                      value='4'
                      checked={infoRoleTTNS4}

                      onChange={(e) => handleChange(e, setinfoRoleTTNS4)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Thành tích - Vi phạm
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttvp'
                      id='role_ttvp1'
                      type='checkbox'
                      value='1'
                      checked={infoRoleTTVP1}

                      onChange={(e) => handleChange(e, setinfoRoleTTVP1)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttvp'
                      id='role_ttvp2'
                      type='checkbox'
                      value='2'
                      checked={infoRoleTTVP2}

                      onChange={(e) => handleChange(e, setinfoRoleTTVP2)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttvp'
                      id='role_ttvp3'
                      type='checkbox'
                      value='3'
                      checked={infoRoleTTVP3}

                      onChange={(e) => handleChange(e, setinfoRoleTTVP3)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttvp'
                      id='role_ttvp4'
                      type='checkbox'
                      value='4'
                      checked={infoRoleTTVP4}

                      onChange={(e) => handleChange(e, setinfoRoleTTVP4)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Hội nhập nhân viên
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_hnnv'
                      id='role_hnnv1'
                      type='checkbox'
                      value='1'
                      checked={infoRoleHNNV1}

                      onChange={(e) => handleChange(e, setinfoRoleHNNV1)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_hnnv'
                      id='role_hnnv2'
                      type='checkbox'
                      value='2'
                      checked={infoRoleHNNV2}

                      onChange={(e) => handleChange(e, setinfoRoleHNNV2)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_hnnv'
                      id='role_hnnv3'
                      type='checkbox'
                      value='3'
                      checked={infoRoleHNNV3}

                      onChange={(e) => handleChange(e, setinfoRoleHNNV3)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_hnnv'
                      id='role_hnnv4'
                      type='checkbox'
                      value='4'
                      checked={infoRoleHNNV4}

                      onChange={(e) => handleChange(e, setinfoRoleHNNV4)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Báo cáo nhân sự
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_bcns'
                      id='role_bcns1'
                      type='checkbox'
                      value='1'
                      checked={infoRoleBCNS1}

                      onChange={(e) => handleChange(e, setinfoRoleBCNS1)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_bcns'
                      id='role_bcns2'
                      type='checkbox'
                      value='2'
                      checked={infoRoleBCNS2}

                      onChange={(e) => handleChange(e, setinfoRoleBCNS2)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_bcns'
                      id='role_bcns3'
                      type='checkbox'
                      value='3'
                      checked={infoRoleBCNS3}

                      onChange={(e) => handleChange(e, setinfoRoleBCNS3)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_bcns'
                      id='role_bcns4'
                      type='checkbox'
                      value='4'
                      checked={infoRoleBCNS4}

                      onChange={(e) => handleChange(e, setinfoRoleBCNS4)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Dữ liệu đã xóa gần đây
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_dldx'
                      id='role_dldx1'
                      type='checkbox'
                      value='1'
                      checked={infoRoleDXGD1}

                      onChange={(e) => handleChange(e, setinfoRoleDXGD1)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_dldx'
                      id='role_dldx2'
                      type='checkbox'
                      value='2'
                      checked={infoRoleDXGD2}

                      onChange={(e) => handleChange(e, setinfoRoleDXGD2)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_dldx'
                      id='role_dldx3'
                      type='checkbox'
                      value='3'
                      checked={infoRoleDXGD3}

                      onChange={(e) => handleChange(e, setinfoRoleDXGD3)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_dldx'
                      id='role_dldx4'
                      type='checkbox'
                      value='4'
                      checked={infoRoleDXGD4}

                      onChange={(e) => handleChange(e, setinfoRoleDXGD4)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Tăng/giảm lương
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_tgl'
                      id='role_tgl1'
                      type='checkbox'
                      value='1'
                      checked={infoRoleTGL1}

                      onChange={(e) => handleChange(e, setinfoRoleTGL1)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_tgl'
                      id='role_tgl2'
                      type='checkbox'
                      value='2'
                      checked={infoRoleTGL2}

                      onChange={(e) => handleChange(e, setinfoRoleTGL2)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_tgl'
                      id='role_tgl3'
                      type='checkbox'
                      value='3'
                      checked={infoRoleTGL3}

                      onChange={(e) => handleChange(e, setinfoRoleTGL3)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_tgl'
                      id='role_tgl4'
                      type='checkbox'
                      value='4'
                      checked={infoRoleTGL4}

                      onChange={(e) => handleChange(e, setinfoRoleTGL4)}></input>
                  </div>
                </div>
              </div>
              <button className={`${styles.l_btn_retypePass}`} type='submit'>
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
