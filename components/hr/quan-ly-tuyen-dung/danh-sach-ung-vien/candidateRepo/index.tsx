import React, { useEffect, useState, useMemo, useCallback } from 'react'
import styles from './candidateRepo.module.css'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { parseISO, format } from 'date-fns'
import MyPagination from '@/components/hr/pagination/Pagination'
import Head from 'next/head'
import { CandidateList } from '@/pages/api/api-hr/quan-ly-tuyen-dung/candidateList'
import { GetListNews } from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'

type SelectOptionType = { label: string; value: any }

export default function CandidateRepo({ children }: any) {
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    null
  )
  const [isCandidateList, setCandidateList] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState<any>(1)
  const [isGender, setGender] = useState<any>('')
  const [isRecruitmentNewsId, setRecruitmentNewsId] = useState<any>('')
  const [isNewList, setNewsList] = useState<any>(null)
  const [isSeach, setSearch] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        const fromDate = (
          document.getElementById('from_date') as HTMLInputElement
        )?.value
        const todate = (document.getElementById('to_date') as HTMLInputElement)
          ?.value
        const name = (document.getElementById('name') as HTMLInputElement)
          ?.value
        formData.append('name', name)
        formData.append('fromDate', fromDate)
        formData.append('toDate', todate)
        formData.append('gender', isGender)
        formData.append('recruitmentNewsId', isRecruitmentNewsId)
        formData.append('page', currentPage)
        const response = await CandidateList(formData)
        setCandidateList(response?.data)
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [isSeach, currentPage, isGender, isRecruitmentNewsId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetListNews(1, 2000, '', '', '')
        if (response) {
          setNewsList(response?.data)
        }
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  const router = useRouter()
  const handleClickDetail = (
    item: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()
    if (typeof item === 'number' && !isNaN(item)) {
      router.push(
        `/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/chi-tiet-ung-vien/u${item}`
      )
    }
  }

  const handleSelectChange = (
    selectedOption: SelectOptionType | null,
    setState: any
  ) => {
    setSelectedOption(selectedOption)
    if (selectedOption) {
      setState(selectedOption.value)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = useCallback(() => {
    setSearch({ isGender })
  }, [isGender])

  const chonvitrituyendungOptions = useMemo(
    () =>
      isNewList &&
      isNewList?.data?.data?.map((news: any) => ({
        value: news.id,
        label: news.title,
      })),
    [isNewList]
  )

  const options = {
    vitrituyendung: chonvitrituyendungOptions,
    chongioitinh: [
      { value: 1, label: 'Nam' },
      { value: 2, label: 'Nữ' },
      { value: 3, label: 'Giới tính khác' },
    ],
  }

  return (
    <>
      <Head>
        <title>Kho ứng viên - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.body}`}>
          <div className={`${styles.row_search_new_t}`}>
            <div className={`${styles.div_no_pad}`}>
              <input
                type='date'
                id='from_date'
                className={`${styles.form_control} ${styles.search_date_from}`}
                placeholder='dd/mm/yyyy'
              />
            </div>
            <div className={`${styles.div_no_pad}`}>
              <input
                type='date'
                id='to_date'
                className={`${styles.form_control} ${styles.search_date_to}`}
                placeholder='dd/mm/yyyy'
              />
            </div>
            <div className={`${styles.div_no_pad} `}>
              <Select
                defaultValue={selectedOption}
                onChange={(option) => handleSelectChange(option, setGender)}
                options={options.chongioitinh}
                placeholder='Chọn giới tính'
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
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: 33.6,
                  }),
                  indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: 33.6,
                  }),
                }}
              />
            </div>
            <div className={`${styles.div_no_pad} `}>
              <Select
                defaultValue={selectedOption}
                onChange={(option) =>
                  handleSelectChange(option, setRecruitmentNewsId)
                }
                options={options.vitrituyendung}
                placeholder='Vị trí tuyển dụng'
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
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: 33.6,
                  }),
                  indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: 33.6,
                  }),
                }}
              />
            </div>
            <div className={`${styles.div_no_pad}`}>
              <input
                className={` ${styles.form_control}`}
                type='text'
                id='name'
                placeholder='Nhập tên ứng viên'
              />
            </div>
            <div className={`${styles.div_no_pad} `}>
              <a
                className={`${styles.icon_t_search_top}`}
                onClick={handleSearch}>
                <img src={`/t-icon-search-n.svg`} alt='' />
              </a>
            </div>
          </div>
          <div className={`${styles.member_list}`}>
            <div className={`${styles.navigate_next}`}>
              <div className={`${styles.turn} ${styles.turn_left}`}>
                <img src={`/arrow_left.png`} alt='' />
              </div>
              <div className={`${styles.turn} ${styles.turn_right}`}>
                <img src={`/arrow_right.png`} alt='' />
              </div>
            </div>
            <div className={`${styles.table_content}`}>
              <table className={`${styles.table} ${styles.table_list}`}>
                <thead>
                  <tr>
                    <th>Mã ứng viên</th>
                    <th>Tên ứng viên</th>
                    <th>Thông tin liên hệ</th>
                    <th>Nguồn nhận CV</th>
                    <th>Vị trí ứng tuyển</th>
                    <th>Mã tin ứng tuyển</th>
                    <th>Mã quy trình tuyển dụng áp dụng</th>
                    <th>Thời gian gửi hồ sơ</th>
                    <th>Tải CV từ ứng viên</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className={`${styles.filter_body}`}>
                  {isCandidateList?.data?.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>
                        {' '}
                        <a
                          target='_blank'
                          href={`/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/chi-tiet-ung-vien/u${item.id}`}
                          onClick={(event) => handleClickDetail(item.id, event)}
                          rel='noreferrer'>
                          {item.name} ( xem chi tiết ){' '}
                        </a>
                      </td>
                      <td>
                        <p>Email:{item.email}</p>
                        <p>SDT: {item.phone}</p>
                      </td>
                      <td>{item.cvFrom}</td>
                      <td>{item.Title}</td>
                      <td>{item.matinungtuyen}</td>
                      <td>{item.maquytrinhtuyendungapdung}</td>
                      {item?.timeSendCv && (
                        <td>
                          {format(parseISO(item?.timeSendCv), 'yyyy-MM-dd')}
                        </td>
                      )}

                      <td>
                        <a href=''>{item.cv}</a>
                      </td>
                      <td
                        className={`${styles.r_t_top_right}`}
                        style={{ position: 'relative' }}>
                        <img src={`/3cham.png`} alt=' ' />
                        <div
                          className={`${styles.settings}`}
                          style={{ width: '350%' }}>
                          <li>Xóa hồ sơ</li>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={`${styles.pagination}`}>
          <MyPagination
            current={currentPage}
            total={isCandidateList?.totalCount}
            pageSize={10}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}
