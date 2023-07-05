import { React, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import OptionUser from '../optionUser/OptionUser';
import { infoCom, infoEp, infoPersonal } from '../../utils/handleApi';

export default function HeaderLogin() {

    let type = Cookies.get('role');

    const [data, setData] = useState([]);

    const [option, setOption] = useState(false);
    const optionUser = () => {
        if(option) {
            setOption(false)
        } else {
            setOption(true)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                if (type == '2') {
                    let response = await infoEp();
                    setData(response.data);
                } else if (type == '1') {
                    let response = await infoCom();
                    setData(response.data);
                } else {
                    let response = await infoPersonal();
                    setData(response.data);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
        getData()
    }, [])

    return (
        <>
            <div className="right_header_qly" id="header_qly_nv">
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <picture>
                            <img src="../img/mess-qly.png" alt="" className="cli_show_mess" />
                        </picture>
                        <span className="item_num">0</span>
                    </div>
                </div>
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <picture>
                            <img src="../img/nhac-nho.png" alt="" className="cli_show_mess ic_nhacnho" />
                        </picture>
                        <span className="item_num">0</span>
                    </div>
                </div>
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <img src="../img/thong-bao.png" alt="" className="cli_show_mess ic_thongbao" />
                        <span className="item_num">0</span>
                    </div>

                </div>
                <div className="ic_nhanh_avt">
                    <div className="img_ic">
                        {
                            data.avatarUser ? (<img src={data.avatarUser} alt="" className="avt_img_tk" />) : (<img src="../img/logo_com.png" alt="" className="avt_img_tk" />)
                        }
                        <p className="logout_fname share_clr_one" onClick={optionUser}>{data.userName}</p>
                    </div>
                    {(option) && <OptionUser type = {type}/>}
                </div>
            </div>
        </>
    )
}
