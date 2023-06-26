import React, { useState } from "react"
import styles from "./bodyFrame.module.css"
import Header from "../header/Header"
export interface BodyFrame { }

export default function Bodyframe({ children }: any) {
    return <div className={styles.main}>{children}</div>
}
