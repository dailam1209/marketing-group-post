import React from "react";
import HeaderHomePage from "@/components/bang-gia-tong-dai/header_bgtd";
import Footer from "@/components/crm/login/Footer";
import styles from "@/components/crm/login/login.module.css";
import Head from "next/head";
import BangGiaTongDai from "@/components/bang-gia-tong-dai";
import TableBangGiaTongDai from "@/components/bang-gia-tong-dai/table";
import CardTongDai from "@/components/bang-gia-tong-dai/card";
import Question from "@/components/bang-gia-tong-dai/question";
export default function BangGiaTD() {
    return (
        <>
            <HeaderHomePage />
            <BangGiaTongDai />
            <TableBangGiaTongDai />
            <CardTongDai />
            <Question />
            <Footer />
        </>
    );
}
