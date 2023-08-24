import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Select from 'react-select'
import styles from '../../thong-tin-nhan-su/tab/employeeManagement.module.css'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer'
import { format, parseISO } from 'date-fns'
import GetComId from '@/components/hr/getComID'
import { DetailReport } from '@/pages/api/api-hr/bao-cao-nhan-su/HrReportService'
import { EmployeeList } from '@/pages/api/api-hr/listNhanVien'

type SelectOptionType = { value: string; label: string }
export interface TabSalary { }

export default function TabSalary({ children }: any) {
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    null
  )
  const [isSalaryList, setSalaryList] = useState<any>(null)
  const [EmpData, setEmpData] = useState<any>(null)
  const [isEmp_id, setEmp_id] = useState<any>('')
  const [isSeach, setSearch] = useState<any>(null)
  const [isPageSize, setPageSize] = useState<any>(10)
  const comid: any = GetComId()

  console.log(isSalaryList)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        const fromDate = (
          document.getElementById('from_date') as HTMLInputElement
        )?.value
        const toDate = (document.getElementById('to_date') as HTMLInputElement)
          ?.value
        formData.append(
          'link',
          'bieu-do-danh-sach-nhan-vien-tang-giam-luong.html'
        )
        formData.append('ep_id', isEmp_id)
        formData.append('from_date', fromDate)
        formData.append('to_date', toDate)
        formData.append('pageSize', isPageSize)
        const response = await DetailReport(formData)
        if (response) {
          setSalaryList(response?.data)
        }
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [isSeach, isPageSize])

  // -- lấy dữ liệu nhân viên --
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        const response = await EmployeeList(formData)
        setEmpData(response?.data)
      } catch (error) { }
    }
    fetchData()
  }, [])

  const handleChoose = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value)
    setPageSize(value)
    window.scrollTo(0, 0)
  }

  const handleSearch = useCallback(() => {
    setSearch({ isEmp_id })
  }, [isEmp_id])

  const handleSelectChange = (
    selectedOption: SelectOptionType | null,
    setState: any
  ) => {
    setSelectedOption(selectedOption)
    if (selectedOption) {
      setState(selectedOption.value) // Set giá trị đã chọn vào state setIsDep_id
    }
  }

  const chonnhanvienOptions = useMemo(
    () =>
      EmpData?.items?.map((emp: any) => ({
        value: emp.ep_id,
        label: emp.ep_name,
      })),
    [EmpData?.items]
  )
  const options = {
    chonnhanvien: chonnhanvienOptions,
  }

  const tableContentRef = useRef<HTMLDivElement>(null)
  const currentPositionRef = useRef(0)

  const handleLeftClick = () => {
    if (tableContentRef.current) {
      const newPosition = currentPositionRef.current - 100
      if (newPosition >= 0) {
        tableContentRef.current.scrollLeft = newPosition
        currentPositionRef.current = newPosition
      }
    }
  }

  const handleRightClick = () => {
    if (tableContentRef.current) {
      const newPosition = currentPositionRef.current + 100
      if (
        newPosition <=
        tableContentRef.current.scrollWidth -
        tableContentRef.current.clientWidth
      ) {
        tableContentRef.current.scrollLeft = newPosition
        currentPositionRef.current = newPosition
      }
    }
  }
  return (
    <>
      <div className={`${styles.tab_content}`}>
        <div className={`${styles.tab_pane}`}>
          <div className={`${styles.body}`}>
            <div className={`${styles.bg_search}`}>
              <div className={`${styles.search_new_t}`}>
                <div
                  className={`${styles.div_no_pad} ${styles.div_no_pad_salary} `}>
                  <Select
                    defaultValue={selectedOption}
                    onChange={(option) => handleSelectChange(option, setEmp_id)}
                    options={options.chonnhanvien}
                    placeholder='Chọn nhân viên'
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: 4,
                        borderColor: '#4747477a',
                        height: 'auto',
                        fontSize: state.isFocused ? 14 : 14,
                        width: '100%',
                        fontWeight: state.isFocused ? 600 : 600,
                        minHeight: 20,
                        color: 'black',
                      }),
                      valueContainer: (baseStyles) => ({
                        ...baseStyles,
                        height: 33.6,
                      }),
                      indicatorsContainer: (baseStyles) => ({
                        ...baseStyles,
                        height: 33.6,
                      }),
                      placeholder: (baseStyles) => ({
                        ...baseStyles,
                        color: '#444444',
                      }),
                    }}
                  />
                </div>
                <div
                  className={`${styles.div_no_pad} ${styles.div_no_pad_salary} `}>
                  <input
                    type='date'
                    id='from_date'
                    className={`${styles.search_date} ${styles.form_control}`}
                    placeholder='Từ dd/mm/yyyy'
                  />
                </div>
                <div
                  className={`${styles.div_no_pad} ${styles.div_no_pad_salary}`}>
                  <input
                    type='date'
                    id='to_date'
                    className={`${styles.search_date} ${styles.form_control}`}
                    placeholder='Từ dd/mm/yyyy'
                  />
                </div>
                <div className={`${styles.div_no_pad_search}  `}>
                  <a
                    onClick={handleSearch}
                    className={`${styles.icon_search_top} ${styles.div_search_salary}`}>
                    <img
                      style={{ verticalAlign: '-webkit-baseline-middle' }}
                      src={`/t-icon-search-n.svg`}
                      alt=''
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              className={`${styles.member_list} ${styles.member_list_salary}`}>
              <div
                className={`${styles.navigate_next} ${styles.navigate_next_salary}`}>
                <div
                  className={`${styles.turn} ${styles.turn_left}`}
                  onClick={handleLeftClick}>
                  <img src={`/arrow_left.png`} alt='' />
                </div>
                <div
                  className={`${styles.turn} ${styles.turn_right}`}
                  onClick={handleRightClick}>
                  <img src={`/arrow_right.png`} alt='' />
                </div>
              </div>
              <div className={`${styles.table_content}`} ref={tableContentRef}>
                <table className={`${styles.table} ${styles.table_list}`}>
                  <thead>
                    <tr>
                      <th>ID nhân viên</th>
                      <th>Họ và tên</th>
                      <th>Chức vụ</th>
                      <th>Phòng ban</th>
                      <th>Mức lương ban đầu</th>
                      <th>Mức lương tăng</th>
                      <th>Mức lương giảm</th>
                      <th>Thời gian thay đổi</th>
                      <th>Quyết định</th>
                    </tr>
                  </thead>
                  <tbody className={`${styles.filter_body}`}>
                    {isSalaryList?.data?.map((item: any, index: any) => (
                      <tr key={index}>
                        <td>{item.sb_id_user}</td>
                        <td>{item.userName}</td>
                        <td>{item.chucvu}</td>
                        <td>{item.dep}</td>
                        <td>{item.luonghientai}</td>
                        {item.luonghientai > item.luongmoi ? (
                          <td>0</td>
                        ) : (
                          <td>{item.luongmoi - item.luonghientai}</td>
                        )}
                        <td>{item.giamLuong}</td>
                        {item?.sb_time_up && (
                          <td>
                            {format(new Date(item?.sb_time_up), 'yyyy-MM-dd')}
                          </td>
                        )}
                        <td>{item.sb_quyetdinh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div id='choose_limit' className={`${styles.pull_left}`}>
              <select
                name=''
                id='choose_limit_page'
                className={`${styles.form_control}`}
                onChange={(event) => handleChoose(event)}>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
              </select>
            </div>
          </div>
          <BodyFrameFooter src='https://www.youtube.com/embed/sOGBYQHRlDA'></BodyFrameFooter>
        </div>
      </div>
    </>
  )
}
