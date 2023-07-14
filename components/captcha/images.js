import { useState, useEffect } from 'react';
import { createCanvas } from 'canvas';

const ImageConverter = ({ text }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const canvas = createCanvas(130, 50); // Kích thước của ảnh
        const ctx = canvas.getContext('2d');

        ctx.font = '16px Arial'; // Font chữ và kích thước

        for (let i = 0; i < text.length; i++) {
            // Thiết lập màu cho từng ký tự
            ctx.fillStyle = i % 2 === 0 ? 'red' : 'blue'; // Màu chữ xen kẽ (ví dụ: đỏ và xanh dương)

            // Thiết lập font-style cho từng ký tự
            ctx.font = i % 2 === 0 ? 'italic bold 20px Arial' : '20px Arial'; // Font chữ xen kẽ

            ctx.fillText(text[i], 15 + i * 20, 25); // Vẽ từng ký tự lên canvas
        }

        const dataUrl = canvas.toDataURL('image/png'); // Chuyển canvas thành URL dữ liệu hình ảnh

        setImageUrl(dataUrl);
    }, [text]);

    return (
        <>{imageUrl && <img src={imageUrl} alt="Converted Image" />}</>
    );
};

export default ImageConverter;