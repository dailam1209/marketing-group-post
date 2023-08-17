import { Card, Tabs } from 'antd'
import styles from './index.module.css'
import { AddButton } from '@/components/commons/Buttons'
import { AllNhanVien } from '@/components/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/all/AllNhanVien'
import { useState } from 'react'
import { AddNewEmpModal } from '@/components/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/modal/modal'
import { NhanVienChoDuyet } from '@/components/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/cho-duyet/NhanVienChoDuyet'
import { useRouter } from 'next/router'
import {
  POST,
  POST_SS,
  getCompIdSS,
  getCurrentToken,
} from '@/pages/api/BaseApi'
import { useEffect } from 'react'

export default function CaiDatThemNhanVienMoiPage({
  listStaffs,
  infoCom,
  listTeams,
  listDepartments,
  listGroups,
}) {
  const temp = getCurrentToken()
  const [openAddNew, setOpenAddNew] = useState(false)
  const [data, setData] = useState(
    listStaffs?.data?.filter((emp) => emp?.ep_status === 'Active')
  )
  const [activeKey, setActiveKey] = useState('1')
  const [listDepLabel, setListDepLabel]: any[] = useState(
    listDepartments?.data?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  )
  const [listTeamLabel, setListTeamLabel]: any[] = useState(
    listTeams?.data?.map((team) => ({
      label: team?.team_name,
      value: team?.team_id,
    }))
  )
  const [listGrLabel, setListGrLabel]: any[] = useState(
    listGroups?.data?.map((gr) => ({ label: gr?.gr_name, value: gr?.gr_id }))
  )
  const [comLabel, setComLabel]: any = useState({
    label: infoCom?.data?.userName,
    value: infoCom?.data?.idQLC,
  })
  const [listPendingEmp, setListPendingEmp]: any[] = useState(
    listStaffs?.data?.filter((emp) => emp?.ep_status === 'Pending')
  )

  const router = useRouter()
  const LIST_TABS = [
    {
      key: '1',
      label: ` Toàn bộ nhân viên (${data?.length || 0})`,
      children: (
        <AllNhanVien
          listStaffs={data}
          openAddNew={openAddNew}
          setOpenAddNew={setOpenAddNew}
          infoCom={infoCom}
          listDepLabel={listDepLabel}
          listTeamLabel={listTeamLabel}
          listGrLabel={listGrLabel}
        />
      ),
    },
    {
      key: '2',
      label: `Nhân viên chờ duyệt (${listPendingEmp?.length || 0})`,
      children: (
        <NhanVienChoDuyet listStaffs={listPendingEmp} comLabel={comLabel} listDepLabel={listDepLabel} />
      ),
    },
  ]

  return (
    <div>
      <Card>
        <Tabs
          defaultActiveKey={router.query.key?.toString()}
          items={LIST_TABS}
          onChange={(activeKey: string) => setActiveKey(activeKey)}
          tabBarExtraContent={
            activeKey === '1' && (
              <div className={styles.extraBTn}>
                {AddButton('Thêm mới nhân viên', () => setOpenAddNew(true))}
              </div>
            )
          }
        />
      </Card>
      {AddNewEmpModal(openAddNew, setOpenAddNew, data, setData)}
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let com_id = null
  com_id = getCompIdSS(context)
  console.log(com_id)
  const listStaffs = await POST_SS(
    'api/qlc/managerUser/listAllEmps',
    {
      com_id: com_id,
    },
    context
  )
  // console.log(listStaffs)

  const infoCom = await POST_SS('api/qlc/company/info', {}, context)

  const listTeams = await POST_SS(
    'api/qlc/team/list',
    {
      com_id: com_id,
    },
    context
  )

  const listDepartments = await POST_SS(
    'api/qlc/department/list',
    {
      com_id: com_id,
    },
    context
  )

  const listGroups = await POST_SS(
    'api/qlc/group/search',
    {
      com_id: com_id,
    },
    context
  )

  return {
    props: {
      listStaffs,
      infoCom,
      listTeams,
      listDepartments,
      listGroups,
    },
  }
}
