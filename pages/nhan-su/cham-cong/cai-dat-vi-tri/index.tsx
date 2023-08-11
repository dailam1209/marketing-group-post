import { Banner } from '@/components/bodyFrame/banner/banner'
import styles from './vitri.module.css'
import { useContext } from 'react'
import { HasBannerContext } from '@/components/Layout'
import Image from 'next/image'

export default function Vitri() {
  // const { setHasBanner } = useContext(HasBannerContext)
  // setHasBanner(false)

  return <div className={styles.main}></div>
}
