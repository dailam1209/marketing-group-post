import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import Cookies from "js-cookie";

export default function App({ Component, pageProps }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const acc_token = Cookies.get('token_base365');
        const rf_token = Cookies.get('rf_token');
        const admin = Cookies.get('admin');
        setIsLoggedIn((!!acc_token && !!rf_token) || admin);
    }, []);

    return (
        <div>
            <Layout isLoggedIn={isLoggedIn}>
                <Component {...pageProps} />
            </Layout>
        </div >
    )
}
