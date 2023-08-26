import React, { useState } from 'react';
import Image from 'next/image';
import styles from './dropDownMenu.module.css'

const ImageWithFallback = (props) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            className={`${styles.img_avatar}`}
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
            width={500}
            height={500}
        />
    );
};

export default ImageWithFallback;