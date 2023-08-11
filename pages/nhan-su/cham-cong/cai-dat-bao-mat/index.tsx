import { Card, Tabs, TabsProps } from "antd"
import StickyBox from "react-sticky-box"
import { Wifi } from "@/components/cham-cong/bao-mat/wifi/wifi"
import { useRouter } from "next/router"
import { useContext } from "react"
import { HasBannerContext } from "@/components/Layout"
import { GioiHanIP } from "@/components/cham-cong/bao-mat/gioi-han-ip/gioi-han-ip"
import Head from "next/head"
import { POST, POST_SS } from "@/pages/api/BaseApi"
import { useState } from "react"
import { CCBanner } from "@/components/bodyFrame/cai-dat-cham-cong-banner/cc-banner"

export default function InstallSecurityPage({ listWifi, listIps }) {
  const { setHasBanner } = useContext(HasBannerContext)
  setHasBanner(true)
  const router = useRouter()
  const [wifiList, setWifiList] = useState(listWifi)
  const [ipList, setIpList] = useState(listIps)

  const tabItems = [
    {
      key: "1",
      label: "Wifi",
      children: (
        <Wifi listWifi={wifiList && listWifi} setListWifi={setWifiList} />
      )
    },
    {
      key: "2",
      label: "Vị trí",
      children: <div></div>
    },
    {
      key: "3",
      label: "Giới hạn IP chấm công nhân viên",
      children: <GioiHanIP listIps={ipList} router={router} />
    }
  ]

  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: "#fff" }} />
    </StickyBox>
  )

  const onChange = (key: string) => {
    if (key === "2") {
      router.push(`/cham-cong/cai-dat-vi-tri`)
    }
  }

  return (
    <>
      <Card>
        <Tabs
          items={tabItems}
          renderTabBar={renderTabBar}
          onChange={onChange}
        />
      </Card>
    </>
  )
}

export const getServerSideProps = async (context) => {
  let listWifi = []
  let listIps = []

  const [resWifi, resIp] = await Promise.all([
    await POST_SS("api/qlc/TrackingWifi/list", {}, context),
    await POST_SS("api/qlc/Setip/get", {}, context)
  ])

  if (resWifi?.result === true) {
    listWifi = resWifi?.data
  }

  if (resIp?.result === true) {
    listIps = resIp?.data
  }

  return {
    props: {
      listWifi,
      listIps
    }
  }
}
