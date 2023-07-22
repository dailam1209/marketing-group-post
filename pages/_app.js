import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
export async function getServerSideProps({ req }) {
    // console.log(req)
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    return {
        props: {
            ipAddress,
        },
    };
}

export default function App({ Component, pageProps, ipAddress }) {
    // console.log('ipAddress:', ipAddress)
    useEffect(() => {

    }, []);

    return (
        <div>
            <Component {...pageProps} />
        </div >
    )
}
