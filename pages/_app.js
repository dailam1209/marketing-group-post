import React, { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {

    useEffect(() => {

    }, []);

    return (
        <div>
            <Component {...pageProps} />
        </div >
    )
}
