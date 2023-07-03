import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import Cookies from "js-cookie";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = Cookies.get('acc_token');
    const admin = Cookies.get('admin');
    setIsLoggedIn(!!token || admin);
  }, []);

  return (
    <div>
      <Layout isLoggedIn={isLoggedIn}>
        <Component {...pageProps} />
      </Layout>
    </div >
  )
}
