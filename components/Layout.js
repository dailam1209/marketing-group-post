// import React from "react"
import Header from "./header/Header"
import Footer from "./footer/Footer"

//import Sidebar from "@/components/sidebar/Sidebar"
// import Feature from "@/components/feature/Feature"
//import Bodyframe from "@/components/bodyFrame/bodyFrame"
// import Header from "./header/Header"

export default function Layout({children}) {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}
