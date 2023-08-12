import React, { createContext, useContext, useState } from 'react'

import Bodyframe from '../components/bodyFrameNs/bodyFrame'
import Header from './header/Header'
import { Banner } from '../components/bodyFrameNs/banner/banner'
// import { CCBanner } from './bodyFrame/cai-dat-cham-cong-banner/cc-banner'
import { useRouter } from 'next/router'
import { CCBannerNV_TKCTY } from './cham-cong-nhan-vien/cc-bang-tk-nv'
import { BANNER_CCBNDKM_CHAMCONG365 } from './cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/cham-cong-365'
import { BANNER_CCBNDKM_CHAT365 } from './cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/chat-365'
import { BANNER_CCBNDKM_PC365NV } from './cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/pc-365-nhan-vien'

// import { ADMIN_ROLE, CurrentRoleContext } from '@/pages/_app'
import { ChamCong365 } from './cham-cong-bang-QR/cham-cong-365/cham-cong-365'
import { Chat365 } from './cham-cong-bang-QR/chat-365/chat365'
import { PC365 } from './cham-cong-bang-QR/pc365/pc365'
import { ADMIN_ROLE } from '@/pages/cai-dat-chung'
import { CCBanner } from './bodyFrameNs/cai-dat-cham-cong-banner/cc-banner'

export const HasBannerContext = createContext({} as any)
export const UPDATE_FACE_URL = '/cap-nhat-du-lieu-khuon-mat'
export const CC_TK_CTY_URL = '/cham-cong-bang-tai-khoan-cong-ty'

export function LayoutNs({ children }: any) {
  const router = useRouter()
  const currentRole = ADMIN_ROLE

  const pathname = router.pathname

  const renderBanner = () => {
    if (pathname === '/cham-cong-nhan-vien/cc-bang-tai-khoan-cong-ty') {
      return <CCBannerNV_TKCTY />
    } else if (
      pathname ===
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/cham-cong-365'
    ) {
      return <BANNER_CCBNDKM_CHAMCONG365 />
    } else if (
      pathname ===
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/chat-365'
    ) {
      return <BANNER_CCBNDKM_CHAT365 />
    } else if (
      pathname ===
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/pc-365-nhan-vien'
    ) {
      return <BANNER_CCBNDKM_PC365NV />
    } else if (pathname === '/cham-cong-bang-QR/cham-cong-365') {
      return <ChamCong365 />
    } else if (pathname === '/cham-cong-bang-QR/chat-365') {
      return <Chat365 />
    } else if (pathname === '/cham-cong-bang-QR/pc-365') {
      return <PC365 />
    } else {
      return <CCBanner />
    }
  }

  const bodyRender = () => {
    if (pathname !== CC_TK_CTY_URL && pathname !== UPDATE_FACE_URL) {
      return (
        <div
          style={{
            overflowX: 'hidden',
            backgroundColor: currentRole === ADMIN_ROLE ? '#F6F6F6' : '#F9FBFF',
          }}>
          <Bodyframe>{children}</Bodyframe>
        </div>
      )
    } else {
      return <>{children}</>
    }
  }

  return (
    <>
      {renderBanner()}
      {bodyRender()}
    </>
  )
}
