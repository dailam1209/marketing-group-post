import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import Cookies from "js-cookie";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = Cookies.get('acc_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <Layout isLoggedIn={isLoggedIn}>
        <Component {...pageProps} />
      </Layout>
    </div >
  )
}
