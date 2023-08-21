import { ChamCong } from '@/components/lich-su/cham-cong/cham-cong'
import { POST, POST_SS } from '@/pages/api/BaseApi'
import moment from 'moment'

export default function HistoryPage({ ccData }) {
  return <ChamCong ccData={ccData} />
}

export const getServerSideProps = async (context) => {
  const startTime = moment()
  const oneMonthAgo = startTime?.subtract(1, 'M')?.format('YYYY-MM-DD')

  const thisWeekMonday = moment('2023-07-28').day(1).format('YYYY-MM-DD')

  const res = await POST_SS(
    'api/qlc/timekeeping/employee/home',
    {
      begin_time: oneMonthAgo,
      end_search_time: startTime?.format('YYYY-MM-DD'),
      time_chart_begin: thisWeekMonday,
      time_chart_end: startTime?.format('YYYY-MM-DD'),
    },
    context
  )

  return {
    props: {
      ccData: {
        count_late: res?.count_late || 0,
        time_keeping_not_valid: res?.time_keeping_not_valid || 0,
        count_success: res?.count_success || 0,
        resultChart: res?.resultChart || [],
        history: res?.history || [],
      },
    },
  }
}
