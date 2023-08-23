import { Col, Popover, Row } from 'antd'
import { MyTable } from '../../quan-ly-phong-ban/table/Table'
import { MySeachBar, MySelect } from '../../quan-ly-cong-ty-con/modal'
import styles from './AllNhanVien.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { DeleteEmpModal, EditEmpModal, SetRoleModal } from '../modal/modal'
import { useRouter } from 'next/router'
import { AddButton } from '@/components/commons/Buttons'
import { EDIT_ICON, KEY_ICON, TRASH_ICON } from './icons'
import dayjs from 'dayjs'
import { getPosition } from '@/utils/function'

export function AllNhanVien({
  listStaffs,
  openAddNew,
  setOpenAddNew,
  infoCom,
  listDepLabel,
  listTeamLabel,
  listGrLabel,
}: {
  listStaffs: any
  openAddNew?: any
  setOpenAddNew?: Function
  infoCom: any
  listDepLabel: any
  listTeamLabel: any
  listGrLabel: any
}) {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openSetRole, setOpenSetRole] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [currentRow, setCurrentRow] = useState()
  const [data, setData] = useState(listStaffs)
  const [comLabel, setComLabel]: any = useState({
    label: infoCom?.data?.com_name,
    value: infoCom?.data?.com_id,
  })
  const [listEmpLabel, setListEmpLabel] = useState<any>(
    listStaffs?.map((e) => ({ label: e?.ep_name, value: e?.ep_id }))
  )

  useEffect(() => {
    setData(listStaffs)
    setListEmpLabel(
      listStaffs?.map((e) => ({ label: e?.ep_name, value: e?.ep_id }))
    )
  }, [listStaffs])

  const CustomPopover = () => {
    const SingleItem = ({
      title,
      icon,
      onClick,
      isBlue,
    }: {
      title: string
      icon: any
      onClick: (event: any) => void
      isBlue: boolean
    }) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          marginTop: '10px',
          cursor: 'pointer',
        }}
        onClick={(event) => onClick(event)}>
        {icon}
        <p
          style={{ marginLeft: '10px', color: isBlue ? '#4C5BD4' : '#FF5B4D' }}>
          {title}
        </p>
      </div>
    )

    return (
      <div style={{ padding: '5px 15px' }}>
        <SingleItem
          icon={<EDIT_ICON />}
          title='Chỉnh sửa thông tin tài khoản'
          onClick={(event) => {
            event.stopPropagation()

            setOpenEdit(true)
          }}
          isBlue={true}
        />
        <SingleItem
          icon={<KEY_ICON />}
          title='Phân quyền'
          onClick={(event) => {
            event.stopPropagation()
            setOpenSetRole(true)
          }}
          isBlue={true}
        />
        <SingleItem
          icon={<TRASH_ICON />}
          title='Xóa thành viên'
          onClick={(event) => {
            event.stopPropagation()
            setOpenDelete(true)
          }}
          isBlue={false}
        />
      </div>
    )
  }
  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }))
  // console.log(listStaffs)

  const columns = [
    {
      title: <p className='tableHeader'>ID</p>,
      render: (record: any, index: number) => <p>{record?.ep_id}</p>,
    },
    {
      title: <p className='tableHeader'>Họ và tên</p>,
      render: (record: any) => (
        <p style={{ color: '#4C5BD4' }}>{record?.ep_name || 'Chưa cập nhật'}</p>
      ),
    },
    {
      title: <p className='tableHeader'>SĐT</p>,
      render: (record: any) => (
        <p>{record?.phone || record?.ep_phone || 'Chưa cập nhật'}</p>
      ),
    },
    {
      title: <p className='tableHeader'>Tài khoản đăng nhập</p>,
      render: (record: any) => <p>{record?.ep_phone || record?.ep_phone}</p>,
    },
    {
      title: <p className='tableHeader'>Email</p>,
      render: (record: any) => (
        <p>{record?.email || record?.ep_email || 'Chưa cập nhật'}</p>
      ),
    },
    {
      title: <p className='tableHeader'>Phòng ban</p>,
      render: (record: any) => (
        <p>
          {listDepLabel?.find((dep) => dep?.value === record?.dep_id)?.label ||
            'Chưa cập nhật'}
        </p>
      ),
    },
    {
      title: <p className='tableHeader'>Chức vụ</p>,
      render: (record: any) => (
        <p>
          {positionLabel?.find((p) => p?.value === record?.position_id)
            ?.label || 'Chưa cập nhật'}
        </p>
      ),
    },
    {
      title: <p className='tableHeader'>Tùy chỉnh</p>,
      render: (record: any) => (
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}>
          <Popover
            content={<CustomPopover />}
            placement='bottomLeft'
            onOpenChange={(e) => {
              setCurrentRow(record)
            }}
            trigger={['click', 'hover']}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image alt='/' src={'/3dots.png'} width={3} height={15} />
              <p style={{ marginLeft: '5px', color: '#4C5BD4' }}>Tùy chỉnh</p>
            </div>
          </Popover>
        </div>
      ),
    },
  ]

  const onRowClicked = (id: any) => {
    router.push(`${router.pathname}/chi-tiet-nhan-vien/${id}`)
  }

  const [listDataFiltered, setListDataFiltered] = useState([])
  const [depFilter, setDepFilter]: any = useState<any>(undefined)
  const [epNameFilter, setEpNameFilter]: any = useState<any>(undefined)

  useEffect(() => {
    setListDataFiltered(data)
  }, [data])

  useEffect(() => {
    if (depFilter === undefined) {
      setListDataFiltered(data)
    }
    if (depFilter !== undefined) {
      setListDataFiltered(data?.filter((emp) => emp?.dep_id === depFilter))
    }
    if (epNameFilter !== undefined) {
      if (depFilter === undefined) {
        setListDataFiltered(data)
      } else {
        setListDataFiltered(data?.filter((emp) => emp?.idQLC === epNameFilter))
      }
    }
  }, [depFilter, epNameFilter])

  return (
    <div>
      <div>
        <Row gutter={{ xs: 20, sm: 20 }}>
          <Col md={8} sm={12} xs={24}>
            {MySelect('Công ty', 'Chọn công ty', false, false, 'com_id', [
              comLabel,
            ])}
          </Col>
          <Col md={8} sm={12} xs={24}>
            {MySelect(
              'Phòng ban',
              'Chọn phòng ban',
              false,
              false,
              'dep_id',
              listDepLabel,
              undefined,
              setDepFilter
            )}
          </Col>

          <Col md={8} sm={12} xs={24} className={styles.nameInput}>
            {MySelect(
              'Nhân viên',
              'Nhập tên cần tìm',
              false,
              false,
              'ep_id',
              listEmpLabel,
              undefined,
              setEpNameFilter
            )}
          </Col>
          <Col md={0} sm={12} xs={24} className={styles.btnAdd}>
            {AddButton(
              'Thêm mới nhân viên',
              () => setOpenAddNew && setOpenAddNew(!openAddNew)
            )}
          </Col>
        </Row>
      </div>
      <div>
        <MyTable
          colunms={columns}
          data={listDataFiltered}
          onRowClick={(record, index) => onRowClicked(record?.ep_id)}
          hasRowSelect={false}
          onSelectChange={() => null}
          selectedRowKeys={[]}
          rowKey='id'
          Footer={null}
        />
      </div>
      {EditEmpModal(
        openEdit,
        setOpenEdit,
        { label: infoCom?.data?.com_name, value: infoCom?.data?.com_id },
        listDepLabel,
        listTeamLabel,
        listGrLabel,
        data,
        setData,
        currentRow
      )}
      {SetRoleModal(openSetRole, setOpenSetRole)}
      {DeleteEmpModal(
        openDelete,
        setOpenDelete,
        currentRow ? currentRow['name'] : '',
        currentRow
      )}
    </div>
  )
}
