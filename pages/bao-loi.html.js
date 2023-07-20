import { React, useState, useEffect } from 'react'
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import { reportError } from "../utils/handleApi";
import { useRouter } from 'next/router';
import { useRef } from 'react';
import FormData from 'form-data';

export default function Danhgia() {
    const router = new useRouter();

    const fileInputRef = useRef(null);
    const [comment, setComment] = useState('');
    const [popup, setPopup] = useState(false);
    const [error, setError] = useState(false);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const closePopup = () => {
        setPopup(false);
        router.reload();
    }
    const [getSl, setSL] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const handleImageSelect = (event) => {
        let file = event.target.files[0];
        setSL(event.target.files.length)
        setSelectedFile(file);
    };
    const chonAnh = () => {
        fileInputRef.current.click();
    }
    const handleSubmit = () => {
        if (comment == '') {
            setError(true)
        } else {
            const data = new FormData();
            data.append('detail_error', comment);
            if (selectedFile) {
                data.append('gallery_image_error', selectedFile);
            }

            let res = reportError(data);
            if (res) {
                setPopup(true)
            } else {
                alert("Có lỗi xảy ra trong quá trình xử lý!");
            }

        }
    };
    return (
        <>
            <Seo
                seo=''
                title='Gửi lỗi'
            />
            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <HeaderLogin text={<>Báo lỗi</>} />
                            </div>
                        </div>
                        <div className="ctn_right_qly ">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14">Báo lỗi</p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan">
                                        <div className="container_taikhoan">
                                            <div className="box_error">
                                                <img src="../img/error_report.png" alt="bao_loi" />
                                                <textarea className="text_dg" placeholder="Nhập mô tả lỗi để chúng tôi hiểu rõ hơn" onChange={handleCommentChange}></textarea>
                                                <span className="error" style={{ textAlign: 'left', display: error ? ' block' : 'none' }}>Mô tả lỗi không được bỏ trống</span>
                                                <div className='box_btn'>
                                                    <div className='bao_loi bl_btn' onClick={chonAnh}>
                                                        <p className="img_error">Chọn ảnh lỗi {getSl ? `(${getSl})` : ''} </p>
                                                        <input
                                                            ref={fileInputRef}
                                                            type="file"
                                                            classname="file_error hidden"
                                                            // multiple="multiple"
                                                            accept=".png,.gif,.jpg,.jpeg,.jtif,.PNG"
                                                            onChange={handleImageSelect}
                                                        />
                                                    </div>
                                                    <div className="sm_danhgia bl_btn" onClick={handleSubmit}>Gửi báo lỗi</div>
                                                </div>


                                            </div>
                                        </div>

                                        <div className="box_popup box_done">
                                            <div className="popup_2">
                                                <div className="box_popup_3">
                                                    <img src="/images/bao_loi.png" alt="bao_loi" />
                                                    <p className="pop_note">Cảm ơn các bạn đã đóng góp ý kiến về lỗi phần mềm của chúng tôi!!</p>
                                                    <p className="sm_pop_3 sm_done">Xác nhận</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    float: "left",
                                    width: "100%",
                                    margin: "35px 0",
                                    textAlign: "center"
                                }}
                            >
                                <iframe
                                    className="video_hd"
                                    width={800}
                                    height={420}
                                    src="https://www.youtube.com/embed/XMOT4egzVx0"
                                    title="YouTube video player"
                                    frameBorder={0}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen=""
                                />
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="box_popup box_done" style={{ display: popup ? 'block' : 'none' }}>
                <div className="popup_2">
                    <div className="box_popup_3">
                        <img src="../img/bao_loi_success.png" alt="icon" />
                        <p className="pop_note">Cảm ơn các bạn đã đóng góp ý kiến về lỗi phần mềm của chúng tôi!!</p>
                        <p className="sm_pop_3 sm_done" onClick={closePopup}>Xác nhận</p>
                    </div>
                </div>
            </div>
        </>
    )
}