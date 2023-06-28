// import React from "react"
import Header from "./header/Header"
import head from "./head/Head"
import Footer from "./footer/Footer"
export default function Layout({children}) {
  return (
    <>
    {/* <head/> */}
    <Header/>
    {children}
    <Footer/>
    </>
  )
}
