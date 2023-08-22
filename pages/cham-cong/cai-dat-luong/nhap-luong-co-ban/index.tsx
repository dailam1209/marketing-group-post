import React, { useEffect } from 'react'
import styles from './index.module.css'
import { NhapLuongCoBan } from '@/components/cai-dat-luong/nhap-luong-co-ban/nhap-luong-co-ban'
import {
  POST,
  POST_SS_TL,
  POST_TL,
  getCompIdCS,
  getCompIdSS,
} from '@/pages/api/BaseApi'
import _ from 'lodash'
import moment from 'moment'
export default function CaiDatNhapLuongCoBan({ data, listPb, listIds, temp }) {
  // console.log(temp)

  return (
    <div>
      <NhapLuongCoBan data={data} listPb={listPb} listIds={listIds} />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let com_id = null
  com_id = getCompIdSS(context)
  const currentTime = moment().format('YYYY-MM-DD')
  const currentMonth = moment().month() + 1
  const finalData: any[] = []

  const res = await POST_SS_TL(
    'api/tinhluong/congty/show_bangluong_nv',
    {
      com_id: com_id,
      month: moment().month() + 1,
      year: moment().year(),
      start_date: `${moment().year()}-${moment().month() + 1}-01`,
      end_date: `${moment().year()}-${
        moment().month() + 1
      }-${moment().daysInMonth()}`,
    },
    context
  )
  if (res) {
    res?.listUser?.forEach((item, index) => {
      const foundData = res?.listResult?.find((r) => r?.ep_id === item?.idQLC)

      finalData.push({
        ...item,
        ...foundData,
      })
    })
  }

  // get list phong ban
  const listPbRes = await POST('api/qlc/department/list', { com_id: com_id })
  return {
    props: {
      data: finalData,
      listPb: listPbRes?.items || [],
      temp: res,
      // listIds: listIds || [],
    },
  }
}
