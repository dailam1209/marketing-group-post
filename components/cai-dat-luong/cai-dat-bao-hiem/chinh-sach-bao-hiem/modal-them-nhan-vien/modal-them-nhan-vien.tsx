import {
  Row,
  Col,
  Modal,
  Input,
  Checkbox,
  Button,
  List,
  Divider,
  Skeleton,
  Tabs,
} from 'antd'
import styles from './modal-them-nhan-vien.module.css'
import Image from 'next/image'
import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { StaffLable } from '../staff-lable/staff-lable'
import { useEffect, useState } from 'react'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { POST_TL } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

interface Staff {
  id: string
  url: string
  name: string
}

interface Group {
  id: string
  quantity: string
  name: string
}

export function ModalThoiGianApDung({
  open,
  setOpen,
  activeTabGroup,
  modalKey,
  // listStaff,
  insureSelected,
}: // idNV

{
  open: boolean
  setOpen: any
  activeTabGroup: any
  modalKey: any
  // listStaff:any
  insureSelected: any
  // idNV:any
}) {
  const [clsDay, setClsDay] = useState<any>('')
  const [clsDayEnd, setClsDayEnd] = useState<any>('')
  const router = useRouter()
  const ListStaff1 = [
    {
      key: '1',
      name: 'Hồ Mạnh Hùng',
      url: '/anhnhanvien.png',
    },
    {
      key: '2',
      name: 'Hồ Mạnh Hùng',
      url: '/anhnhanvien.png',
    },
    {
      key: '3',
      name: 'Hồ Mạnh Hùng',
      url: '/anhnhanvien.png',
    },
  ]

  const handleSubmit = () => {
    // let countSuccess = 0
    modalKey?.map(async (emp) => {
      // console.log(
      //  taxSelected?.cl_id,
      //   taxSelected?.cl_com,
      //   nv?.id,
      //   dayjs().format('YYYY-MM-[01T00:00:00.000]Z'),
      //   dayjs().format('YYYY-MM-[01T00:00:00.000]Z')
      // )
      await POST_TL('api/tinhluong/congty/them_nv_nhom_insrc', {
        cls_id_cl: insureSelected?.cl_id,
        cls_id_com: insureSelected?.cl_com,
        cls_id_user: emp?.id,
        cls_day: dayjs(`${clsDay}-01`).format('YYYY-MM-[01T00:00:00.000]Z'),
        cls_day_end: dayjs(`${clsDayEnd}-01`).format(
          'YYYY-MM-[01T00:00:00.000]Z'
        ),
      }).then((res) => {
        if (res?.message === 'success') {
          // countSuccess += 1
        }
      })
    })
    setOpen(false)
    router.reload()
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      className={`modal_congthuc2`}>
      <div className={styles.header}>
        <div className={styles.textHead}>Thời gian áp dụng</div>
        <div className={styles.crossImage}>
          <Image
            alt='/'
            src={'/cross.png'}
            width={14}
            height={14}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
      <div className={styles.body}>
        {activeTabGroup === false ? (
          <div className={styles.bodyItem1}>
            {modalKey.map((item, index) => (
              <div key={index} className={styles.item}>
                <StaffLable url={item.url} name={item.name} />
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}

        <div className={styles.bodyItem}>
          <span style={{ fontSize: '16px' }}>
            Áp dụng từ tháng <span style={{ color: 'red' }}>*</span>
          </span>
          <Input
            required
            type='month'
            style={{ width: '100%', fontSize: '16px' }}
            placeholder='Chọn tháng'
            value={clsDay}
            onChange={(e) => setClsDay(`${e.target.value}`)}></Input>
        </div>

        <div className={styles.bodyItem}>
          <span style={{ fontSize: '16px' }}>Đến tháng (Không bắt buộc)</span>
          <Input
            type='month'
            style={{ width: '100%', fontSize: '16px' }}
            placeholder='Chọn tháng'
            value={clsDayEnd}
            onChange={(e) => setClsDayEnd(`${e.target.value}`)}></Input>
        </div>

        <div className={styles.bodyItem}>
          <span style={{ fontSize: '16px' }}>
            Nhập tiền bảo hiểm <span style={{ color: 'red' }}>*</span>
          </span>
          <Input
            type='text'
            style={{ width: '100%', fontSize: '16px' }}
            placeholder='Nhập số tiền (VNĐ)'></Input>
        </div>

        <div className={styles.hasButton}>
          <Button className={styles.Button} onClick={handleSubmit}>
            <p className={styles.txt}>Lưu</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export function ModalThemNhanVien({
  openFilterAddClick,
  setOpenFilterAddClick,
  setOpenFilterNextClick,
  setActiveTabGroup,
  listEmp,
  insureSelected,
  listEmpSelected,
  setListEmpSelected,
}: {
  openFilterAddClick: boolean
  setOpenFilterAddClick: any
  setOpenFilterNextClick: any
  setActiveTabGroup: any
  listEmp: any
  insureSelected: any
  listEmpSelected: any
  setListEmpSelected: Function
}) {
  const [listStaff, setListStaff]: any[] = useState(
    listEmp?.items?.map((e, index) => ({
      key: `${index + 1}`,
      id: `${e?.idQLC}`,
      url: e?.avatarUser ? `/${e?.avatarUser}` : '/anhnhanvien.png',
      name: e?.userName,
    }))
  )

  // const ListGroup = [
  //   {
  //     id: "1",
  //     quantity: "2",
  //     name: "Nhóm 1",
  //   },
  //   {
  //     id: "2",
  //     quantity: "3",
  //     name: "Nhóm 2",
  //   },
  //   {
  //     id: "3",
  //     quantity: "4",
  //     name: "Nhóm 3",
  //   },
  //   {
  //     id: "4",
  //     quantity: "5",
  //     name: "Nhóm 4",
  //   },
  //   {
  //     id: "5",
  //     quantity: "6",
  //     name: "Nhóm 5",
  //   },
  // ];

  const [checkedListStaff, setCheckedListStaff] = useState<Staff[]>([])
  const [checkedListGroup, setCheckedListGroup] = useState<Group[]>([])
  const [activeTab, setActiveTab] = useState('1')
  const [isTimeSetting, setIsTimeSetting] = useState(false)

  const handleTabChange = (key) => {
    setActiveTab(key)
  }

  const Save = () => {
    setActiveTabGroup(activeTab === '1' ? false : true)
    setOpenFilterAddClick(false)
    setOpenFilterNextClick(true)
    setIsTimeSetting(true)
  }

  const onSearch = () => {
    // console.log("on search");
  }

  const onChange1 = (checkedValues) => {
    setCheckedListStaff(checkedValues)
    setListEmpSelected(checkedValues)
  }

  const onChange2 = (checkedValues) => {
    setCheckedListGroup(checkedValues)
  }

  useEffect(() => {
    // console.log(checkedListStaff);
  }, [checkedListStaff])

  useEffect(() => {
    //console.log(checkedListGroup);
  }, [checkedListGroup])
  const [modalKey, setModalKey] = useState(Array<String>)
  const [idNV, setIdNV] = useState(Array<Number>)
  // console.log(modalKey)
  // console.log(idNV)
  const LIST_TABS = [
    {
      key: '1',
      label: 'Nhân viên',
      children: (
        <div style={{ marginBottom: '20px' }}>
          <div className={styles.listStaff}>
            {listStaff?.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '0px',
                  marginTop: '0px',
                  width: '100%',
                }}>
                <Checkbox
                  key={index}
                  style={{ width: '100%' }}
                  onChange={(e: CheckboxChangeEvent) => {
                    if (e.target.checked === true) {
                      setListEmpSelected([...listEmpSelected, item])
                      setModalKey([...modalKey, item.key])
                      setIdNV([...idNV, item.id])
                    } else {
                      setModalKey(modalKey.filter((x) => x !== item.key))
                      setIdNV(idNV.filter((x) => x !== item.id))
                    }
                  }}>
                  <Row style={{ margin: '10px', width: '100%' }}>
                    <Col
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        src={item.url}
                        alt=''
                        height={46}
                        width={46}></Image>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '10px',
                      }}>
                      <div style={{ color: '#4C5BD4', fontSize: '18px' }}>
                        {item.name}
                      </div>

                      <div style={{ fontSize: '16px' }}>{item.id}</div>
                    </Col>
                  </Row>
                </Checkbox>
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    borderBottom: '1px dashed rgba(0, 0, 0, 0.3)',
                  }}></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // {
    //   key: "2",
    //   label: "Nhóm",
    //   children: (
    //     <div style={{ marginBottom: "20px" }}>
    //       <div className={styles.listStaff}>
    //         {ListGroup.map((item, index) => (
    //           <div
    //             key={index}
    //             style={{
    //               marginBottom: "0px",
    //               marginTop: "0px",
    //               width: "100%",
    //             }}
    //           >
    //             <Checkbox
    //               key={index}
    //               value={item}
    //               style={{ width: "100%" }}
    //               checked={checkedListGroup.some(
    //                 (group) => group.id === item.id
    //               )}
    //               onChange={(e) => {
    //                 const checkedItem = e.target.checked ? item : null;
    //                 onChange2(
    //                   checkedItem
    //                     ? [...checkedListGroup, checkedItem]
    //                     : checkedListGroup.filter(
    //                         (group) => group.id !== item.id
    //                       )
    //                 );
    //               }}
    //             >
    //               <Row style={{ margin: "10px", width: "100%" }}>
    //                 <Col
    //                   style={{
    //                     display: "flex",
    //                     flexDirection: "column",
    //                     margin: "10px",
    //                   }}
    //                 >
    //                   <div style={{ color: "#4C5BD4", fontSize: "18px" }}>
    //                     {item.name}
    //                   </div>
    //                   <div style={{ fontSize: "16px" }}>
    //                     {"(" + item.quantity + " người)"}
    //                   </div>
    //                 </Col>
    //               </Row>
    //             </Checkbox>
    //             <div
    //               style={{
    //                 width: "100%",
    //                 height: "1px",
    //                 borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
    //               }}
    //             ></div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   ),
    // },
  ]

  return (
    <Modal
      open={openFilterAddClick}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      className={`modal_themNhanVien`}>
      <div className={styles.header}>
        <div className={styles.textHead}>Thêm nhân viên</div>
        <div className={styles.crossImage}>
          <Image
            alt='/'
            src={'/cross.png'}
            width={14}
            height={14}
            onClick={() => setOpenFilterAddClick(false)}
          />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyItem}>
          <Input
            prefix={<SearchOutlined style={{ marginRight: '10px' }} rev='' />}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #9F9F9F',
            }}
            placeholder='Nhập từ cần tìm'
            onPressEnter={onSearch}
          />
        </div>

        <div>
          <Tabs
            defaultActiveKey='1'
            items={LIST_TABS}
            onChange={handleTabChange}
          />
        </div>

        <div className={styles.hasButton}>
          <Button className={styles.Button} onClick={Save}>
            <p className={styles.txt}>Tiếp tục</p>
          </Button>
        </div>
      </div>
      {/* {ModalThoiGianApDung({
        open: isTimeSetting,
        setOpen: setIsTimeSetting,
        activeTabGroup: activeTab,
        modalKey,
        // listStaff,
        insureSelected,
        // idNV
      })} */}
    </Modal>
  )
}
