import { Card, Tabs } from 'antd'
import styles from './di-muon-ve-som.module.css'
import { CpmDiMuonVeSom } from '@/components/cai-dat-luong/di-muon-ve-som/di-muon-ve-som'
import { CpmCaiDatDiMuonVeSom } from '@/components/cai-dat-luong/di-muon-ve-som/cai-dat-di-muon-ve-som/cai-dat-di-muon-ve-som'
import { CpmNghiSaiQuyDinh } from '@/components/cai-dat-luong/di-muon-ve-som/nghi-sai-quy-dinh/nghi-sai-quy-dinh'
import { CpmDanhSachNghiSaiQuyDinh } from '@/components/cai-dat-luong/di-muon-ve-som/danh-sach-nghi-sai-quy-dinh/danh-sach-nghi-sai-quy-dinh'
import { POST_SS, POST_SS_TL, getCompIdSS } from '@/pages/api/BaseApi'
import moment from 'moment'
import _ from 'lodash'

export default function DiMuonVeSom({
  pmInfo,
  listStaffLate,
  listStaffAbsent,
  listCaPhat,
  listPb,
}) {
  const tabItems = [
    {
      key: '1',
      label: 'Đi muộn về sớm',
      children: (
        <CpmDiMuonVeSom
          listEmpLateEarly={listStaffLate}
          listPb={listPb}></CpmDiMuonVeSom>
      ),
    },
    {
      key: '2',
      label: 'Cài đặt đi muộn về sớm',
      children: (
        <CpmCaiDatDiMuonVeSom lateInfoList={pmInfo}></CpmCaiDatDiMuonVeSom>
      ),
    },
    {
      key: '3',
      label: 'Nghỉ sai quy định',
      children: <CpmNghiSaiQuyDinh listCaPhat={listCaPhat}></CpmNghiSaiQuyDinh>,
    },
    {
      key: '4',
      label: 'Danh sách nghỉ sai quy định',
      children: (
        <CpmDanhSachNghiSaiQuyDinh
          listEmpAbsent={listStaffAbsent}></CpmDanhSachNghiSaiQuyDinh>
      ),
    },
  ]

  return (
    <Card>
      <Tabs
        items={tabItems}
        defaultActiveKey='2'
        //   renderTabBar={renderTabBar}
        //   onChange={onChange}
      />
    </Card>
  )
}

export const getServerSideProps = async (context) => {
  // const currentTime = moment().format("YYYY-MM-DD")
  const end = moment().subtract(14, 'd').format('YYYY-MM-DD')
  const start = moment()
    .subtract(14, 'd')
    .subtract(60, 'd')
    .format('YYYY-MM-DD')
  // const com_id = getCompId(context)
  const com_id = 3312

  const listApiRes = await Promise.all([
    POST_SS_TL(
      'api/tinhluong/congty/takeinfo_phat_muon',
      {
        pm_time_begin: start,
        pm_time_end: end,
        pm_id_com: com_id,
      },
      context
    ),
    POST_SS_TL(
      'api/tinhluong/congty/show_staff_late',
      {
        start_date: '2023-01-01',
        end_date: '2023-05-07',
        com_id: com_id,
      },
      context
    ),
    POST_SS_TL(
      'api/tinhluong/congty/take_listuser_nghi_khong_phep',
      {
        start_date: start,
        end_date: end,
        com_id: com_id,
        skip: 0,
        month: moment().month(),
        year: moment().year(),
      },
      context
    ),
    POST_SS_TL(
      'api/tinhluong/congty/takeinfo_phat_ca_com',
      { pc_com: 3312 },
      context
    ),
    POST_SS('api/qlc/department/list', { com_id: com_id }, context),
  ])

  //render list staff late
  const listStaffLate: any[] = []
  const resInfo = listApiRes?.[1]?.['data']?.['listUserDetail']
  const resDataLate = listApiRes?.[1]?.['data']?.['list_data_late_early']
  const resMoney = listApiRes?.[1]?.['data']?.['tien_phat_muon']

  resDataLate &&
    resDataLate?.forEach((item) => {
      const sheetData = resMoney?.find((m) => m?.sheet_id === item?.sheet_id)

      const info = resInfo?.find((inf) => inf?.idQLC === item?.ep_id)

      listStaffLate.push({
        info: info || {},
        moneyData: sheetData || {},
        lateData: item || {},
      })
    })

  //const render list ca phat

  const listCaPhat: any[] = []
  listApiRes?.[3]?.listPhatCa?.forEach((item) => {
    item?.shifts &&
      item?.shifts?.forEach((sh) => {
        listCaPhat.push({ ...item, ...sh })
      })
  })

  //render list phòng ban
  const listPb: any[] = []
  listApiRes &&
    listApiRes?.[4]?.data?.forEach((item) => {
      listPb.push({
        dep_id: item?.dep_id,
        dep_name: item?.dep_name,
      })
    })

  return {
    props: {
      pmInfo: listApiRes?.[0]?.['phat_muon_info'] || [],
      listStaffLate: listStaffLate || [],
      listStaffAbsent: listApiRes?.[2]?.['data'] || [],
      listCaPhat: listCaPhat,
      listPb: listPb,
    },
  }
}
