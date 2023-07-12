import { React, useState, useEffect } from 'react'
import Cookies from "js-cookie";
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import { vote } from "../utils/handleApi";
import { useRouter } from 'next/router';

export default function Danhgia() {
    const router = new useRouter();
    let role = Cookies.get('role')
    // if (role == 2) {
    //     window.location.href = '/quan-ly-ung-dung-nhan-vien.html'
    // } else if (role == 0) {
    //     window.location.href = '/quan-ly-ung-dung-ca-nhan.html'
    // }

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [popup, setPopup] = useState(false);
    const [error, setError] = useState(false);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        if (rating == 0 || comment == '') {
            setError(true)
        } else {
            let data = {
                rating: rating,
                feed_back: comment
            }
            vote(data)
            setPopup(true)

        }
    };

    const closePopup = () => {
        setPopup(false)
        router.reload();
    }

    return (
        <>
            <Seo
                seo=''
                title='Đánh giá'
            />
            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <HeaderLogin text={<>Đánh giá</>} />
                            </div>
                        </div>
                        <div className="ctn_right_qly ">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14">Đánh giá</p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan">
                                        <div className="container_taikhoan">
                                            <div className="box_error">
                                                <img src="../img/danhgia.png" alt="danhgia" /><br />
                                                <div className="form_rate">
                                                    {/* <span className="star5" data="5">★</span>
                                                    <span className="star4" data="4">★</span>
                                                    <span className="star3 rate_star" data="3">★</span>
                                                    <span className="star2 rate_star" data="2">★</span>
                                                    <span className="star1 rate_star" data="1">★</span> */}
                                                    {[5, 4, 3, 2, 1].map((star) => (
                                                        <span
                                                            key={star}
                                                            onClick={() => handleStarClick(star)}
                                                            className={` ${star <= rating ? 'rate_star' : ''}`}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                <textarea className="text_dg" placeholder="Nhập đánh giá của bạn" onChange={handleCommentChange}></textarea>
                                                <span className="error" style={{ textAlign: 'left', display: error ? ' block' : 'none' }}>Đánh giá hoặc số sao không được bỏ trống</span>
                                                <p className="sm_danhgia" onClick={handleSubmit}>Đánh giá</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="box_popup box_done" style={{ display: popup ? 'block' : 'none' }}>
                <div className="popup_2">
                    <div className="box_popup_3">
                        <img src="../img/icon_loveface.png" alt="icon" />
                        <p className="pop_note">Cảm ơn bạn đã đánh giá về phần mềm chúng tôi!</p>
                        <p className="sm_pop_3 sm_done" onClick={closePopup}>Xác nhận</p>
                    </div>
                </div>
            </div>
        </>
    )
}