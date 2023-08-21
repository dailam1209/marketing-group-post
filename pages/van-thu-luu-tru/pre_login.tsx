import Image from 'next/image'
import { useState } from 'react'
import s from './pre_login.module.css'

const Pre_login = () => {
    const [page,setPage] = useState(0);
    return (
        <body className={s.body}>
            <header className={s.header_top_quanlycongvan_h_flex}>
                <a href='https://timviec365.vn/' className={s.logo}>
                    <Image alt='logo' src='/logo.png' width={142} height={32}/>
                </a>
                <a href='https://timviec365.vn/' className={s.header_pagele_logo1}>
                    <Image alt='logo' src='/logo.png' width={142} height={32}/>
                </a>
                <a className={s.menu_logo_mobile}>
                    <Image alt='' src='/3cham_xanh.png' width={24} height={24} />
                </a>
                <ul className={s.h_flex_menu_desk}>
                    <li onClick={()=>setPage(1)} className={s.header_list}>
                        <a className={s.them_border_bot}>Quản lý công văn</a>
                    </li>
                    <li onClick={()=>setPage(2)} className={s.header_list}>
                        <a className={s.them_border_bot}>Gửi và nhận công văn</a>
                    </li>
                    <li onClick={()=>setPage(3)} className={s.header_list}>
                        <a className={s.them_border_bot}>Đề xuất</a>
                    </li>
                    <li className={s.header_list}>
                        <a className={s.them_border_bot}>Chuyển đổi số</a>
                    </li>
                    <li className={s.header_list}>
                        <a className={s.them_border_bot}> Đăng nhập / </a>
                        <a className={s.them_border_bot}> Đăng ký</a>
                    </li>
                </ul>
                <ul className={s.header_pagele_menu_background_hidden_h_flex}>
                    <div className={s.header_pagele_menu}>
                        <li className={s.header_pagele_menu_element}>
                            <a className={s.header_pagele_menu_element_a}>Chữ ký số</a>
                        </li>
                        <li className={s.header_pagele_menu_element}>
                            <a className={s.header_pagele_menu_element_a}>Quản lý công văn</a>
                        </li>
                        <li className={s.header_pagele_menu_element}>
                            <a className={s.header_pagele_menu_element_a}>Đề xuất</a>
                        </li>
                        <li className={s.header_pagele_menu_element}>
                            <a className={s.header_pagele_menu_element_a}>Chuyển đổi số</a>
                        </li>
                        <li className={s.header_pagele_menu_element}>
                            <a className={s.header_pagele_menu_element_a}>Đăng nhập /</a>
                            <a className={s.header_pagele_menu_element_a}> Đăng ký</a>
                        </li>
                    </div>
                </ul>
            </header>
            {page === 0 && (
                <div id='archival'>
                    <div className={s.v_banner}>
                        <div className={s.text_v_banner}>
                            <h1>PHẦN MỀM VĂN THƯ LƯU TRỮ 365</h1>
                            <p>Giải pháp tối ưu cho doanh nghiệp</p>
                            <p>Bảo mật thông tin khách hàng.</p>
                            <p>Phương pháp lưu trữ dữ liệu dưới điện toán đám mây.</p>
                            <div className={s.text_v_banner2}>
                                <a rel='nofollow' href='' className={s.dk}></a>
                                <a rel='nofollow' href='' className={s.lh}></a>
                            </div>
                            <div className={s.download_app_pc}>
                                <p className={s.download_app_tit}>Tải App Văn Thư Lưu Trữ 365 dành cho PC</p>
                                <div className={s.download_app_img}>
                                    <a href='https://app.timviec365.vn/Download/AppElectron/Quanlychung1.0.8.exe' rel='nofollow' download>
                                        <Image alt='App' src='/dl_app_pc2.png' width={168} height={52}/>
                                    </a>
                                    <a href='https://hungha365.com/upload_file/Quanlychung-1.0.2.dmg' rel='nofollow' download>
                                        <Image alt='App' src='/dl_app_pc1.png' width={168} height={52}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${s.container} ${s.conten_index}`}>
                        <h2 className={s.title_box} style={{width:'100%',textAlign:'center',marginTop:'20px'}}>TÍNH NĂNG CỦA PHẦN MỀM VĂN THƯ LƯU TRỮ 365</h2>
                        <div className={`${s.box_1} ${s.h_flex } ${s.space}`}>
                            <div className={s.item1_box}>
                                <h3 className={s.title_box}>Quản lý công văn</h3>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Tìm kiếm dễ dàng theo hàng loạt tiêu chí: Nhóm văn bản, loại văn bản,...
                                </p>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Sao lưu nhằm tránh thất thoát văn thư trong quá trình gửi, chuyển tiếp và nhận văn thư.
                                </p>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Lưu trữ tài liệu của doanh nghiệp không giới hạn
                                </p>
                                <div className={s.left}>
                                    <a rel='nofollow' href='/' className={s.btn_index}>Dùng miễn phí trọn đời ngay</a>
                                </div>
                            </div>
                            <div className={s.item1_box}>
                                <img className={s.img1} src='/item_home1.png' data-src='' alt='item1'/>
                            </div>
                        </div>
                        <div className={`${s.box_2} ${s.h_flex } ${s.space}`}>
                            <div className={s.item1_box}>
                                <img className={s.img1} src='/item_home2.png' data-src='' alt='item1'/>
                                </div>
                                <div className={s.item1_box}>
                                <h3 className={s.title_box}>Quản lý công văn</h3>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Quản lý văn bản hành chính, công văn đến - công văn đi
                                </p>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Dễ dàng theo dõi và tìm kiếm tài liệu của doanh nghiệp
                                </p>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Lưu trữ tài liệu của doanh nghiệp không giới hạn
                                </p>
                                <div className={s.left}>
                                    <a rel='nofollow' href='/' className={s.btn_index}>Dùng miễn phí trọn đời ngay</a>
                                </div>
                            </div>
                        </div>
                        <div className={`${s.box_3} ${s.h_flex } ${s.space}`}>
                        <div className={s.item1_box}>
                                <h3 className={s.title_box}>Đề xuất</h3>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Mọi tờ trình, đề xuất của cá nhân, nhóm trở nên đơn giản, nhanh chóng
                                </p>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Dễ dàng theo dõi tình trạng phê duyệt và không lo thất lạc giấy tờ
                                </p>
                                <p className={s.text_box} style={{position:'relative',paddingLeft:'35px'}}>
                                    <Image alt='icon' src='/icon1.png' width={25} height={25} style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        position: 'absolute',
                                        left: '0'
                                    }} />
                                    Số hóa tờ trình, dễ dàng đề xuất
                                </p>
                                <div className={s.left}>
                                    <a rel='nofollow' href='/' className={s.btn_index}>Dùng miễn phí trọn đời ngay</a>
                                </div>
                            </div>
                            <div className={s.item1_box}>
                                <img className={s.img1} src='/item_home3.png' data-src='' alt='item1'/>
                            </div>
                        </div>
                        <div className={`${s.box_4}`}></div>
                    </div>
                    <div className={s.banner_index}>
                        <p className={s.title_banner}>Ưu điểm vượt trội của hệ sinh thái Chuyển đổi số 365</p>
                        <div className={s.banner_index__mobile}>
                            <div className={s.item_banner}>
                                <Image alt='An toàn và bảo mật' src='/item_home5.png' width={54} height={54}/>
                                <p className={s.title_it_banner}>An toàn và bảo mật</p>
                                <p className={s.conten_it_banner}>Dữ liệu khổng lồ về văn thư, tài liệu, nhân sự,... được lưu trữ hoàn toàn theo mô hình điện toán đám mây, đảm bảo tiêu chí an toàn và bảo mật tuyệt đối.</p>
                                <a rel='nofollow' target='_blank' href='https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#ungdung'>{'Xem chi tiết ->'}</a>
                            </div>
                            <div className={s.item_banner}>
                                <Image alt='Một nền tảng duy nhất' src='/item_home6.png' width={54} height={54}/>
                                <p className={s.title_it_banner}>Một nền tảng duy nhất</p>
                                <p className={s.conten_it_banner}>Truy cập vào tài khoản duy nhất, người dùng được phép trải nghiệm được tất cả các ứng dụng cần thiết nhất cho doanh nghiệp trên một nền tảng.</p>
                                <a rel='nofollow' target='_blank' href='https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#ungdung'>{'Xem chi tiết ->'}</a>
                            </div>
                            <div className={s.item_banner}>
                                <Image alt='Giải pháp số một Việt Nam' src='/item_home7.png' width={54} height={54}/>
                                <p className={s.title_it_banner}>Giải pháp số một Việt Nam</p>
                                <p className={s.conten_it_banner}>Chuyển đổi số 365 là giải pháp số 1 Việt Nam phù hợp với tất cả các mô hình doanh nghiệp lớn nhỏ đến các tập đoàn xuyên quốc gia. Người dùng sẽ được hỗ trợ nhiệt tình 24h/24h.</p>
                                <a rel='nofollow' target='_blank' href='https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#ungdung'>{'Xem chi tiết ->'}</a>
                            </div>
                            <div className={s.item_banner}>
                                <Image alt='Ứng dụng công nghệ AI' src='/item_home8.png' width={54} height={54}/>
                                <p className={s.title_it_banner}>Ứng dụng công nghệ AI</p>
                                <p className={s.conten_it_banner}>Giải quyết tất cả các bài toán mà doanh nghiệp đang gặp phải cực nhanh chỉ trong 1 nốt nhạc nhờ vào công nghệ trí tuệ nhân tạo tự nhận thức, phân tích hành vi người dùng.</p>
                                <a rel='nofollow' target='_blank' href='https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#ungdung'>{'Xem chi tiết ->'}</a>
                            </div>
                            <div className={s.item_banner}>
                                <Image alt='Sử dụng miễn phí trọn đời' src='/item_home9.png' width={54} height={54}/>
                                <p className={s.title_it_banner}>Sử dụng miễn phí trọn đời</p>
                                <p className={s.conten_it_banner}>Trải nghiệm hệ sinh thái quản trị doanh nghiệp đa dạng các ứng dụng chỉ với giá 0 đồng.</p>
                                <a rel='nofollow' target='_blank' href='https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#ungdung'>{'Xem chi tiết ->'}</a>
                            </div>
                        </div>
                    </div>
                    <div className={s.home_box11}>
                        <div className={s.home_container}>
                            <div className={s.box11_main}>
                                <p className={s.b11_text_tt}>Những câu hỏi thường gặp về phần mềm văn thư lưu trữ</p>
                                <form action='' id='frm_send_ques' style={{display: 'inline'}} method='post' acceptCharset='utf-8'>
                                    <div className={s.box_send_ques}>
                                        <div className={s.send_ques_tit}>
                                            <Image alt='' src='/img_ques_chtg.png' width={30} height={30} />
                                            <p>Đặt câu hỏi với Văn thư 365</p>
                                        </div>
                                        <div className={s.typing_ques}>
                                            <textarea className={s.textarea} name='question' id='type_ques' placeholder='Viết câu hỏi của bạn'></textarea>
                                        </div>
                                        <p className={s.uwu}>Câu hỏi sẽ được ẩn danh</p>
                                        <div className={s.capcha_code}>
                                            <div className={s.input_capcha}>
                                                <div className={s.fsize}>
                                                    <label className={s.fsize}>Nhập mã captcha</label>
                                                </div>
                                                <div>
                                                    <input className={s.ip_kytu} type='text' name='txt_maxacthuc'></input>
                                                </div>
                                            </div>
                                            <div className={s.ma_xanhan}>
                                                <p className={s.random} id='code'></p>
                                                <input type='hidden' className={s.code_input} id='code_input'></input>
                                            </div>
                                            <Image alt='' className={s.img_rest} width={30} height={30} src='/recapcha.png' style={{
                                                transform: 'rotate(360deg)',
                                                transition: 'transition: all 0.5s ease 0'
                                            }} />
                                        </div>
                                        <div className={s.btn_send_ques}>
                                            <button className={s.send_ques} type='submit' id='send_ques' name='send_question' >Gửi</button>
                                        </div>
                                        <Image className={s.img_chtg} alt='' src='' />
                                    </div>
                                </form>
                                <div className={s.box_main_ques}>
                                    <div className={s.max_height_cmt}>
                                        <div className={s.box_ques}>
                                            <div className={s.box_row_f}>
                                                <Image src='/avt_acc.png' alt='' width={50} height={50}/>
                                                <div className={s.box_infor}>
                                                    <p className={s.text_tt}>Người dùng ẩn danh</p>
                                                    <p className={s.text_time}>8:40 AM, 16-10-2021</p>
                                                </div>
                                            </div>
                                            <p className={s.ques}>Vì sao đi điểm danh, vị trí nhiều điện thoại định vị vị trí sai hoặc quá xa trụ sở công ty?</p>
                                            <div className={s.box_row_e}>
                                                <div className={s.box_left}>
                                                    <div className={s.box_infor_ins}>
                                                        <Image alt='' src='/avt_365.png' width={50} height={50}/>
                                                        <p className={s.text_tt}>Timviec365</p>
                                                        <p className={s.text_time}>9:40 AM, 18-10-2021</p>
                                                    </div>
                                                    <div className={s.show_hide_cont}>
                                                        <span className={s.more}>
                                                            Thứ nhất, Có thể khi đó điện thoại của bạn đang bật chế độ tiết kiệm pin. Trên app chấm công 365 cùng nhiều ứng dụng hoạt động trên điện thoại, để kéo dài thời lượng pin, điện thoại của bạn sẽ chặn không cho các ứng dụng của bạn sử dụng vị trí hoặc dữ liệu.
                                                            <br/>
                                                            Do vậy, khi định vị để chấm công, máy sẽ lưu vị trí cuối cùng trước khi bạn bật chế độ tiết kiệm pin. Vậy nên khi thấy điện thoại không cập nhật được vị trí hay định vị sai với khoảng cách quá xa địa chỉ hiện tại, hãy kiểm tra lại máy của mình xem có đang sử dụng trình tiết kiệm pin không và tắt ngay chế độ này nhé.
                                                            <br/>
                                                            Nguyên nhân thứ hai khi điện thoại của bạn định vị sai, đó là máy đang không nhận đúng wifi được cài đặt mặc định để chấm công. Khi bạn đăng nhập vào nhiều wifi trong cùng một tòa nhà, sẽ dẫn đến tình trạng “loạn wifi”. Máy có xu hướng bắt những Wifi nào có cường độ mạnh nhất, gần bạn nhất, cho nên trước khi chấm công, hãy check lại thông tin wifi xem có chính xác là wifi mà công ty đã cài đặt mặc định để chấm công không nhé.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.box_main_ques}>
                                    <div className={s.max_height_cmt}>
                                        <div className={s.box_ques}>
                                            <div className={s.box_row_f}>
                                                <Image src='/avt_acc.png' alt='' width={50} height={50}/>
                                                <div className={s.box_infor}>
                                                    <p className={s.text_tt}>Người dùng ẩn danh</p>
                                                    <p className={s.text_time}>8:40 AM, 16-10-2021</p>
                                                </div>
                                            </div>
                                            <p className={s.ques}>Một công ty họ chỉ đăng ký 1 tài khoản tổng mà họ muốn chấm công ở nhiều vị trí khác nhau thì làm thế nào?</p>
                                            <div className={s.box_row_e}>
                                                <div className={s.box_left}>
                                                    <div className={s.box_infor_ins}>
                                                        <Image alt='' src='/avt_365.png' width={50} height={50}/>
                                                        <p className={s.text_tt}>Timviec365</p>
                                                        <p className={s.text_time}>9:40 AM, 18-10-2021</p>
                                                    </div>
                                                    <div className={s.show_hide_cont}>
                                                        <span className={s.more}>
                                                            Trên cùng một tài khoản công ty tổng trên timviec365.vn, công ty có thể dễ dàng theo dõi tình hình chấm công của tất cả các nhân viên ở tất cả các chi nhánh khác nhau. Để làm được điều này, các công ty phải cài đặt hệ thống công ty con cho mình trước. Sau đó, khi thiết lập cấu hình chấm công, bộ phận nhân sự sẽ vào chọn công ty. Với từng công ty, bạn sẽ cài thêm thêm nhiều vị trí để chấm công và cài đặt thêm các thông tin như Wifi hay chế độ nhận diện khuôn mặt...tương ứng tại mỗi văn phòng đó.
                                                            <br/>
                                                            Dĩ nhiên, nếu người cài đặt thông số này đang ngồi ở trụ sở chính của công ty thì phải liên hệ đến thành viên công ty đang ngồi ở văn phòng khác để gửi các thông số như địa chỉ IP, địa chỉ MAC, tên wifi để thiết lập cho chính xác nhé.
                                                            <br/>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.box_main_ques}>
                                    <div className={s.max_height_cmt}>
                                        <div className={s.box_ques}>
                                            <div className={s.box_row_f}>
                                                <Image src='/avt_acc.png' alt='' width={50} height={50}/>
                                                <div className={s.box_infor}>
                                                    <p className={s.text_tt}>Người dùng ẩn danh</p>
                                                    <p className={s.text_time}>8:40 AM, 16-10-2021</p>
                                                </div>
                                            </div>
                                            <p className={s.ques}>Đối với những ca gãy thì cài đặt như thế nào?</p>
                                            <div className={s.box_row_e}>
                                                <div className={s.box_left}>
                                                    <div className={s.box_infor_ins}>
                                                        <Image alt='' src='/avt_365.png' width={50} height={50}/>
                                                        <p className={s.text_tt}>Timviec365</p>
                                                        <p className={s.text_time}>9:40 AM, 18-10-2021</p>
                                                    </div>
                                                    <div className={s.show_hide_cont}>
                                                        <span className={s.more}>
                                                            Thật ra, trên app chấm công nhận diện khuôn mặt, cài đặt các ca gãy không khác với các ca thông thường như ca chiều hay ca tối. Để cài đặt ca gãy bạn, vào phần quản lý ca làm việc nhé. Sau đó, thêm ca và tùy chỉnh một số thông số của ca gãy như giờ vào, giờ ra và loại hình tính công sau đó đi vào thiết lập lịch làm việc cho nhân viên tương ứng là được nhé.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p style={{cursor: 'pointer'}} className={s.see_more_question}>
                                    <span>{'Xem thêm >>'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={s.conten_video}>
                        <h2 className={s.title_vd}>Phần mềm Văn thư lưu trữ</h2>
                        <div className={s.content_video}>
                            <div className={s.text_vd}>
                                <p>Liên hệ ngay để được tư vấn</p>
                                <p style={{
                                    color: '#4C5BD4',
                                    marginTop: '15px',
                                    fontWeight: 'bold',
                                }}>Hotline: 1900633682</p>
                            </div>
                            <div className={s.video_yt}>
                                <iframe width='100%' height='100%' src='https://www.youtube.com/embed/UssNzo6m1p8' 
                                    title='YouTube video player' frameBorder='0' 
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {page === 1 && (
                <div id='main_qlcv'>
                    <div className={`${s.banner_qlcv} ${s.back_x} ${s.d_flex} ${s.flex_start } ${s.position_r}`}>
                        <div className={s.banner_qlcv_left}>
                            <div className={s.text_banner}>
                                <h1 className={`${s.h1_banner_l} ${s.color_t}`}>QUẢN LÝ CÔNG VĂN 365</h1>
                                <p className={`${s.p_banner_l} ${s.color_t}`}>Hệ thống được phân chia các hình thức văn bản đến/đi/nội bộ.Cho phép xây dựng các tủ tài liệu để lưu trữ một cách khoa học</p>
                            </div>
                            <div className={s.img_app_banner}>
                                <div className={s.d_flex}>
                                    <div className={`${s.app_left} ${s.d_flex} ${s.flex_start}`}>
                                        <img src='/img_1.png' alt='' className={s.img_app}></img>
                                    </div>
                                    <div className={`${s.app_right} ${s.d_flex} ${s.space_b} ${s.flex_column}`}>
                                        <img src='/img_2.png' alt='' className={s.img_app}></img>
                                        <img src='/img_3.png' alt='' className={s.img_app}></img>
                                    </div>
                                </div>
                            </div>
                            <div className={s.btn_t}>
                                <p>Dùng thử ngay</p>
                            </div>
                        </div>
                        <div className={s.img_banner}>
                            <img src='/banner_qlcv.png' alt=''/>
                        </div>
                    </div>
                    <div className={`${s.list_qlcv} ${s.back_eee}`}>
                        <div className={`${s.container_l}`}>
                            <h2 className={`${s.title_qlcv} ${s.color_blue} ${s.text_c}`}>Quản lý công văn 365</h2>
                            <h3 className={`${s.h3_qlcv} ${s.color_x} ${s.text_c}`}>Quản lý và lưu trữ không giới hạn toàn bộ thông tin của doanh nghiệp</h3>
                            <div className={`${s.box_list_qlcv} ${s.d_flex} ${s.w_100}`}>
                                <div className={`${s.d_flex} ${s.space_b}`}>
                                    <div className={`${s.item_qlcv} ${s.back_w}`}>
                                        <div className={s.img_item_qlcv}>
                                            <img src='/img_item1.png' className={s.w_100}/>
                                        </div>
                                        <div className={s.text_item_qlcv}>
                                            <h3 className={`${s.name_tiem} ${s.color_blue} ${s.text_c}`}>Thiết lập danh sách văn bản</h3>
                                            <ul className={s.ul_item_qcv}>
                                                <li>
                                                    <p className={s.color_x}>Giúp cho doanh nghiệp chủ động trong việc tổ chức lập danh sách và quản lý tài liệu được chặt chẽ và khoa học.</p>
                                                </li>
                                                <li>
                                                    <p className={s.color_x}>Là căn cứ để lựa chọn tài liệu có giá trị để lưu trữ và phục vụ sử dụng.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={`${s.item_qlcv} ${s.back_w}`}>
                                        <div className={s.img_item_qlcv}>
                                            <img src='/img_item2.png' className={s.w_100}/>
                                        </div>
                                        <div className={s.text_item_qlcv}>
                                            <h3 className={`${s.name_tiem} ${s.color_blue} ${s.text_c}`}>Tìm kiếm và tra cứu nhanh</h3>
                                            <ul className={s.ul_item_qcv}>
                                                <li>
                                                    <p className={s.color_x}>Tìm kiếm dễ dàng theo hàng loạt tiêu chí: Nhóm văn bản, loại văn bản, keywords, tiêu đề & trạng thái văn bản.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={`${s.item_qlcv} ${s.back_w}`}>
                                        <div className={s.img_item_qlcv}>
                                            <img src='/img_item3.png' className={s.w_100}/>
                                        </div>
                                        <div className={s.text_item_qlcv}>
                                            <h3 className={`${s.name_tiem} ${s.color_blue} ${s.text_c}`}>Sao lưu, phục hồi dữ liệu.</h3>
                                            <ul className={s.ul_item_qcv}>
                                                <li>
                                                    <p className={s.color_x}>Phần mềm cho phép phục hồi các dữ liệu đã xóa.</p>
                                                </li>
                                                <li>
                                                    <p className={s.color_x}>Sao lưu nhằm tránh thất thoát văn thư trong quá trình gửi, chuyển tiếp và nhận văn thư.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${s.list_tnnb} ${s.w_100} ${s.back_w}`}>
                            <div className={s.list_tnnb_header}>  
                                <h2 className={`${s.title_qlcv} ${s.color_t} ${s.text_c}`}>CÁC TÍNH NĂNG NỔI BẬT CỦA QUẢN LÍ CÔNG VĂN</h2>
                                <p className={`${s.color_t} ${s.text_c} ${s.p_list_tnnb_header}`}>Mọi đề xuất, tờ trình đều trở nên dễ dàng, nhanh chóng, thuận lợi</p>
                            </div>  
                            <div className={`${s.list_tnnb_body} ${s.container_l}`}>       
                                <div className={`${s.box_list_tnnb_body} ${s.d_flex} ${s.flex_column}`}>
                                    <div className={`${s.item_tnnb} ${s.d_flex} ${s.space_b} ${s.align_c} ${s.w_100}`}>
                                        <div className={s.text_item_tnnb}>
                                            <h3 className={`${s.name_item_tnnb} ${s.color_blue} ${s.font_wB}`}>Quản lý văn bản tập trung và thống nhất, sắp xếp, phân loại theo các nhóm</h3>
                                            <ul className={s.ul_item_tnnb}>
                                                <li className={`${s.d_flex} ${s.flex_start}`}>
                                                    <div className={s.img_li_item_tnnb}>
                                                        <img src='/img_4.png'/>
                                                    </div> 
                                                    <p className={`${s.p_item_tnnb} ${s.color_x}`}>Phân chia văn bản theo nhóm: Tổ chức văn bản theo nhóm, mỗi nhóm lại có thể phân chia theo các mục.</p>
                                                </li>
                                                <li className={`${s.d_flex} ${s.flex_start}`}>
                                                    <div className={s.img_li_item_tnnb}>
                                                        <img src='/img_4.png'/>
                                                    </div> 
                                                    <p className={`${s.p_item_tnnb} ${s.color_x}`}>Phân chia văn bản theo từ khóa & thể loại: Tổ chức văn bản theo các loại riêng để dễ dàng tìm kiếm.</p>
                                                </li>
                                                <li className={`${s.d_flex} ${s.flex_start}`}>
                                                    <div className={s.img_li_item_tnnb}>
                                                        <img src='/img_4.png'/>
                                                    </div> 
                                                    <p className={`${s.p_item_tnnb} ${s.color_x}`}>Tìm kiếm hiệu quả : Tìm kiếm văn bản nhanh & dễ dàng theo tất cả các thông tin liên quan đến văn bản đó.</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={s.img_item_tnnb}>
                                            <img src='/img_5.png'/>
                                        </div>
                                    </div>
                                    <div className={`${s.item_tnnb} ${s.d_flex} ${s.space_b} ${s.align_c} ${s.w_100}`}>
                                        <div className={s.img_item_tnnb}>
                                            <img src='/img_6.png'/>
                                        </div>
                                        <div className={s.text_item_tnnb}> 
                                            <h3 className={`${s.name_item_tnnb} ${s.color_blue} ${s.font_wB}`}>Lưu trữ khối lượng lớn công văn</h3>
                                            <ul className={s.ul_item_tnnb}>
                                                <li className={`${s.d_flex} ${s.flex_start}`}>
                                                    <div className={s.img_li_item_tnnb}>
                                                        <img src='/img_4.png'/>
                                                    </div> 
                                                    <p className={`${s.p_item_tnnb} ${s.color_x}`}>Lưu trữ quản lý văn bản đến - đi.</p>
                                                </li>
                                                <li className={`${s.d_flex} ${s.flex_start}`}>
                                                    <div className={s.img_li_item_tnnb}>
                                                        <img src='/img_4.png'/>
                                                    </div> 
                                                    <p className={`${s.p_item_tnnb} ${s.color_x}`}>Quản lý và lưu trữ không giới hạn toàn bộ thông tin phi cấu trúc của doanh nghiệp.</p>
                                                </li>
                                                <li className={`${s.d_flex} ${s.flex_start}`}>
                                                    <div className={s.img_li_item_tnnb}>
                                                        <img src='/img_4.png'/>
                                                    </div> 
                                                    <p className={`${s.p_item_tnnb} ${s.color_x}`}>Trực tiếp trao đổi, phối hợp công việc nhịp nhàng, vận hành trơn tru.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={`${s.item_tnnb} ${s.d_flex} ${s.space_b} ${s.align_c} ${s.w_100}`}>
                                        <div className={s.text_item_tnnb}> 
                                            <h3 className={`${s.name_item_tnnb} ${s.color_blue} ${s.font_wB}`}>Đảm bảo an toàn, bảo mật văn bản</h3>
                                            <ul className={s.ul_item_tnnb}>
                                                <li className={`${s.d_flex} ${s.flex_start}`}>
                                                    <div className={s.img_li_item_tnnb}>
                                                        <img src='/img_4.png'/>
                                                    </div> 
                                                    <p className={`${s.p_item_tnnb} ${s.color_x}`}>Phân quyền truy cập, chỉnh sửa văn bản, kiểm soát lịch sử sửa đổi văn bản đảm bảo tính bảo mật, an toàn của văn thư.</p>
                                                </li>
                                                <li className={`${s.d_flex} ${s.flex_start}`}>
                                                    <div className={s.img_li_item_tnnb}>
                                                        <img src='/img_4.png'/>
                                                    </div> 
                                                    <p className={`${s.p_item_tnnb} ${s.color_x}`}>Thống nhất trong toàn công ty công tác tiếp nhận và xử lý văn bản đi /đến nhằm tránh thất thoát văn thư</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={s.img_item_tnnb}>
                                            <img src='/img_7.png'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${s.video_qlcv}`}>  
                        <h3 className={`${s.title_qlcv} ${s.color_x} ${s.text_c}`}>
                            Video hướng dẫn chi tiết
                        </h3>
                        <div className={s.box_video}>
                            <iframe width='100%' height='100%' src='https://www.youtube.com/embed/uUB7wnWeMdM' 
                                title='YouTube video player' frameBorder='0' 
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                            ></iframe>  
                        </div>
                    </div>
                </div>
            )}
            {page === 2 && (
                <div></div>
            )}
            {page === 3 && (
                <div></div>
            )}
            <div className={s.footer_main}>
                <div className={s.footer_content}>
                    <div className={s.footer_block1}>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/' className={s.footer_block1_txt} >Hồ sơ xin việc,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-tieng-anh' className={s.footer_block1_txt} >cv tiếng anh,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-tieng-viet' className={s.footer_block1_txt} >cv tiếng việt,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-tieng-han' className={s.footer_block1_txt} >cv tiếng hàn,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-tieng-nhat' className={s.footer_block1_txt} >cv tiếng nhật,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/mau-don-xin-viec' className={s.footer_block1_txt} >đơn xin việc,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/mau-cover-letter-thu-xin-viec' className={s.footer_block1_txt} >thư xin việc,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/mau-so-yeu-ly-lich' className={s.footer_block1_txt} >sơ yếu lý lịch,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-viet-tat-cua-tu-gi-nhung-dieu-can-biet-khi-viet-cv.html' className={s.footer_block1_txt} >cv là gì,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cau-hoi-tuyen-dung' className={s.footer_block1_txt} >câu hỏi phỏng vấn,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-ke-toan' className={s.footer_block1_txt} >cv kế toán,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-kinh-doanh' className={s.footer_block1_txt} >cv kinh doanh,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-it' className={s.footer_block1_txt} >cv IT,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-hanh-chinh-nhan-su' className={s.footer_block1_txt} >cv nhân sự,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-nhan-vien-ban-hang' className={s.footer_block1_txt} >cv bán hàng,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-marketing' className={s.footer_block1_txt} >CV marketing,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-xay-dung' className={s.footer_block1_txt} >cv xây dựng,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-co-khi' className={s.footer_block1_txt} >cv cơ khí,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-xuat-nhap-khau' className={s.footer_block1_txt} >cv xuất nhập khẩu,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-sinh-vien-moi-ra-truong' className={s.footer_block1_txt} >cv sinh viên mới ra trường,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-kien-truc-noi-that' className={s.footer_block1_txt} >cv kiến trúc nội thất,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-cham-soc-khach-hang' className={s.footer_block1_txt} >cv chăm sóc khách hàng,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-phat-trien-thi-truong' className={s.footer_block1_txt} >cv phát triển thị trường,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-du-lich' className={s.footer_block1_txt} >cv du lịch,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-thu-ngan' className={s.footer_block1_txt} >cv thu ngân,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-viec-lam-telesale' className={s.footer_block1_txt} >cv telesale,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-tai-chinh' className={s.footer_block1_txt} >cv tài chính,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-logistic' className={s.footer_block1_txt} >cv logistic,</a>
                        <a rel='dofollow' target='_blank' href='https://timviec365.vn/cv365/cv-nha-hang-khach-san' className={s.footer_block1_txt} >cv nhà hàng khách sạn</a>
                    </div>
                    <div className={s.gach_ngang}></div>
                    <div className={s.footer_block2}>
                        <div className={s.about_365}>
                            <div className={`${s.wrap_arr} ${s.open_content}`}>
                                <p className={s.footer_block2_header}>Về Timviec365</p>
                                <div className={`${s.arr_respon } ${s.hidden}`}>
                                    <Image alt='arrow_up' src='https://timviec365.vn/images/arr_up.svg' width={14} height={15}></Image>
                                    <Image alt='arrow_up' src='https://timviec365.vn/images/arr_down.svg' width={14} height={15}></Image>
                                </div>
                            </div>
                            <div className={`${s.list_about_365} ${s.content_show}`}>
                                <div className={s.timviec_item}>
                                    <div className={s.content_item}>
                                        <a rel='dofollow' href='https://timviec365.vn/gioi-thieu-chung.html' className={s.footer_block1_txt} >Giới thiệu</a>
                                        <a rel='dofollow' href='https://timviec365.vn/thong-tin-can-biet.html' className={s.footer_block1_txt} >Thông tin</a>
                                        <a rel='dofollow' href='https://timviec365.vn/blog/hoi-va-dap-ve-timviec365vn-chat365-va-cac-ung-dung-chuyen-doi-so-new16648.html' className={s.footer_block1_txt} >Hỏi đáp</a>
                                        <a rel='dofollow' href='https://timviec365.vn/blog' className={s.footer_block1_txt} >Cẩm nang</a>
                                        <a rel='dofollow' href='https://timviec365.vn/thoa-thuan-su-dung.html' className={s.footer_block1_txt} >Thỏa thuận</a>
                                        <a rel='dofollow' href='https://timviec365.vn/quy-dinh-bao-mat.html' className={s.footer_block1_txt} >Bảo mật</a>
                                    </div>
                                    <div className={s.content_item}>
                                        <a rel='dofollow' href='https://timviec365.vn/giai-quyet-tranh-chap.html' className={s.footer_block1_txt} >Giải quyết tranh chấp</a>
                                        <a rel='dofollow' href='https://timviec365.vn/so-do-trang-web.html' className={s.footer_block1_txt} >Sơ đồ Website</a>
                                        <a rel='dofollow' target='_blank' href='https://www.youtube.com/watch?v=UssNzo6m1p8' className={s.footer_block1_txt} >Video</a>
                                        <a rel='dofollow' href='https://timviec365.vn/blog/ung-dung-cua-trinh-sat-ai365-new16655.html' className={s.footer_block1_txt} >AI365</a>
                                        <a rel='dofollow' href='https://timviec365.vn/blog/huy-hieu-tia-set-new16722.html' className={s.footer_block1_txt} >Huy hiệu tia sét</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.footer_block2_right}>
                            <div className={s.for_uv}>
                                <div className={`${s.wrap_arr} ${s.open_content}`}>
                                    <p className={s.footer_block2_header}>Dành cho ứng viên</p>
                                    <div className={`${s.arr_respon } ${s.hidden}`}>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_up.svg' width={14} height={15}></Image>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_down.svg' width={14} height={15}></Image>
                                    </div>
                                </div>
                                <div className={`${s.list_for_uv} ${s.content_show}`}>
                                    <div className={s.timviec_item}>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/cv-xin-viec'>Mẫu CV xin việc</a>
                                            <a href='https://timviec365.vn/cv365/mau-cover-letter-thu-xin-viec'>Thư xin việc</a>
                                            <a href='https://timviec365.vn/cv365/mau-don-xin-viec'>Hồ sơ xin việc</a>
                                        </div>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/blog/c24/bi-quyet-viet-cv'>Bí quyết viết CV</a>
                                            <a rel='nofollow' href='https://timviec365.vn/trang-vang-doanh-nghiep.html'>Trang vàng</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.for_ntd}>
                                <div className={`${s.wrap_arr} ${s.open_content}`}>
                                    <p className={s.footer_block2_header}>Dành cho nhà tuyển dụng</p>
                                    <div className={`${s.arr_respon } ${s.hidden}`}>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_up.svg' width={14} height={15}></Image>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_down.svg' width={14} height={15}></Image>
                                    </div>
                                </div>
                                <div className={`${s.list_for_ntd} ${s.content_show}`}>
                                    <div className={s.timviec_item}>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/dang-tin-tuyen-dung-mien-phi.html'>Đăng tuyển dụng</a>
                                            <a href='https://timviec365.vn/cv365/blog'>Cẩm nang tuyển dụng</a>
                                            <a href='https://timviec365.vn/cv365/nguoi-tim-viec.html'>Tìm hồ sơ</a>
                                        </div>
                                        <div className={s.content_item}>
                                            <a rel='nofollow' href='https://quanlychung.timviec365.vn/'>Ứng dụng chuyển đổi số</a>
                                            <a href='https://timviec365.vn/bieu-mau'>Biểu mẫu</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.tien_ich}>
                                <div className={`${s.wrap_arr} ${s.open_content}`}>
                                    <p className={s.footer_block2_header}>Tiện ích</p>
                                    <div className={`${s.arr_respon } ${s.hidden}`}>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_up.svg' width={14} height={15}></Image>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_down.svg' width={14} height={15}></Image>
                                    </div>
                                </div>
                                <div className={`${s.list_tien_ich} ${s.content_show}`}>
                                    <div className={s.timviec_item}>
                                        <div className={s.content_item}>
                                            <a rel='nofollow' href='https://timviec365.vn/ssl/so-sanh-luong.html'>Tra cứu lương</a>
                                            <a href='https://timviec365.vn/tinh-luong-gross-net.html'>Lương Gross - Net</a>
                                            <a rel='nofollow' href='https://timviec365.vn/mail365/'>Email365</a>
                                        </div>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/gioi-thieu-app-tim-viec.html'>Tải app</a>
                                            <a rel='nofollow' href='https://timviec365.vn/tinh-bao-hiem-that-nghiep'>Tính bảo hiểm thất nghiệp</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.work_area}>
                                <div className={`${s.wrap_arr} ${s.open_content}`}>
                                    <p className={s.footer_block2_header}>Việc làm theo khu vực</p>
                                    <div className={`${s.arr_respon } ${s.hidden}`}>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_up.svg' width={14} height={15}></Image>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_down.svg' width={14} height={15}></Image>
                                    </div>
                                </div>
                                <div className={`${s.list_work_area} ${s.content_show}`}>
                                    <div className={s.timviec_item}>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/tim-viec-lam-tai-ha-noi.html'>Việc làm tại Hà Nội</a>
                                            <a href='https://timviec365.vn/viec-lam-tai-ho-chi-minh-c0v45'>Việc làm tại Hồ Chí Minh</a>
                                            <a href='https://timviec365.vn/viec-lam-tai-da-nang-c0v26'>Việc làm tại Đà Nẵng</a>
                                            <a href='https://timviec365.vn/viec-lam-tai-hai-phong-c0v2'>Việc làm tại Hải Phòng</a>
                                        </div>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/viec-lam-tai-binh-duong-c0v46'>Việc làm tại Bình Dương</a>
                                            <a href='https://timviec365.vn/viec-lam-tai-can-tho-c0v48'>Việc làm tại Cần Thơ</a>
                                            <a href='https://timviec365.vn/viec-lam-tai-dong-nai-c0v55'>Việc làm tại Đồng Nai</a>
                                            <a href='https://timviec365.vn/viec-lam-tai-bac-ninh-c0v5'>Việc làm tại Bắc Ninh</a>
                                        </div>
                                    </div>
                                    <a rel='nofollow' href='https://timviec365.vn/viec-lam-tai-tinh-thanh' className={s.seen_all}>
                                        Xem tất cả{' '} 
                                        <Image alt='see_all' src='https://timviec365.vn/images/2arr_right.svg' width={12} height={11} />
                                    </a>
                                </div>
                            </div>
                            <div className={s.work_job}>
                                <div className={`${s.wrap_arr} ${s.open_content}`}>
                                    <p className={s.footer_block2_header}>Việc làm theo ngành nghề</p>
                                    <div className={`${s.arr_respon } ${s.hidden}`}>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_up.svg' width={14} height={15}></Image>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_down.svg' width={14} height={15}></Image>
                                    </div>
                                </div>
                                <div className={`${s.list_work_job} ${s.content_show}`}>
                                    <div className={s.timviec_item}>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/viec-lam-nhan-vien-kinh-doanh-c9v0'>Việc làm kinh doanh</a>
                                            <a href='https://timviec365.vn/viec-lam-kd-bat-dong-san-c33v0'>Việc làm bất động sản</a>
                                            <a href='https://timviec365.vn/viec-lam-bao-hiem-c66v0'>Việc làm bảo hiểm</a>
                                            <a href='https://timviec365.vn/viec-lam-it-phan-mem-c13v0'>Việc làm IT</a>
                                        </div>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/viec-lam-nhan-su-c27v0'>Việc làm nhân sự</a>
                                            <a href='https://timviec365.vn/viec-lam-ban-hang-c10v0'>Việc làm bán hàng</a>
                                            <a href='https://timviec365.vn/viec-lam-luong-cao.html'>Việc làm lương cao</a>
                                            <a href='https://timviec365.vn/viec-lam-ke-toan-kiem-toan-c1v0'>Việc làm kế toán</a>
                                        </div>
                                    </div>
                                    <a rel='nofollow' href='https://timviec365.vn/danh-sach-nganh-nghe' className={s.seen_all}>
                                        Xem tất cả{' '} 
                                        <Image alt='see_all' src='https://timviec365.vn/images/2arr_right.svg' width={12} height={11} />
                                    </a>
                                </div>
                            </div>
                            <div className={s.work_tag}>
                                <div className={`${s.wrap_arr} ${s.open_content}`}>
                                    <p className={s.footer_block2_header}>Việc làm theo tag</p>
                                    <div className={`${s.arr_respon } ${s.hidden}`}>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_up.svg' width={14} height={15}></Image>
                                        <Image alt='arrow_up' src='https://timviec365.vn/images/arr_down.svg' width={14} height={15}></Image>
                                    </div>
                                </div>
                                <div className={`${s.list_work_tag} ${s.content_show}`}>
                                    <div className={s.timviec_item}>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/tim-viec-lam-php-t11394.html'>Việc làm PHP</a>
                                            <a href='https://timviec365.vn/tag7/DS-viec-lam-tuyen-dung-ke-toan-noi-bo-866'>Việc làm Kế toán nội bộ</a>
                                            <a href='https://timviec365.vn/tag7/DS-viec-lam-tuyen-dung-digital-marketing-521'>Việc làm Digital Marketing</a>
                                            <a href='https://timviec365.vn/tag7/DS-viec-lam-tuyen-dung-chuyen-vien-seo-2070'>Việc làm chuyên viên seo</a>
                                        </div>
                                        <div className={s.content_item}>
                                            <a href='https://timviec365.vn/tag7/DS-viec-lam-tuyen-dung-tu-van-bat-dong-san-2737'>Việc làm bất động sản</a>
                                            <a href='https://timviec365.vn/tag7/DS-viec-lam-tuyen-dung-thuc-tap-sinh-1265'>Việc làm thực tập sinh</a>
                                            <a href='https://timviec365.vn/tag7/DS-viec-lam-tuyen-dung-nhan-vien-bao-hiem-900'>Việc làm nhân viên bảo hiểm</a>
                                            <a href='https://timviec365.vn/tag7/DS-viec-lam-tuyen-dung-content-526'>Việc làm Content</a>
                                        </div>
                                    </div>
                                    <a rel='nofollow' href='https://timviec365.vn/danh-sach-viec-lam-theo-tags' className={s.seen_all}>
                                        Xem tất cả{' '} 
                                        <Image alt='see_all' src='https://timviec365.vn/images/2arr_right.svg' width={12} height={11} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.gach_ngang}></div>
                    <div className={s.footer_block3}>
                        <div className={s.wrap_365}>
                            <div>
                                <Image src='/365timviec.png' className={s.lazyloaded} alt='timviec365' width={184} height={47}/>
                            </div>
                            <span className={s.wrap_365_txt}>KẾT NỐI VỚI TIMVIEC365.VN</span>
                            <div className={s.wrap_block_connect}>
                                <div className={s.wrap_icon_connet}>
                                    <a href='https://chat365.timviec365.vn/' rel='nofollow' target='_blank'>
                                        <Image src='https://timviec365.vn/images/icon365.svg' alt='chat' width={27} height={14} />
                                    </a>
                                </div>
                                <div className={s.wrap_icon_connet}>
                                    <a href='https://www.facebook.com/Timviec365.Vn/' rel='nofollow' target='_blank'>
                                        <Image src='https://timviec365.vn/images/icon_fb.svg' alt='facebook' width={27} height={14} />
                                    </a>
                                </div>
                                <div className={s.wrap_icon_connet}>
                                    <a href='https://twitter.com/timviec365vn' rel='nofollow' target='_blank'>
                                        <Image src='https://timviec365.vn/images/icon_witter.svg' alt='twitter' width={27} height={14} />
                                    </a>
                                </div>
                                <div className={s.wrap_icon_connet}>
                                    <a href='https://www.youtube.com/channel/UCI6_mZYL8exLuvmtipBFrkg/videos' rel='nofollow' target='_blank'>
                                        <Image src='https://timviec365.vn/images/icon_youtube.svg' alt='youtube' width={27} height={14} />
                                    </a>
                                </div>
                            </div>
                            <div className={s.wrap_certify}>
                                <a rel='nofollow' href='http://online.gov.vn/Home/WebDetails/35979'>
                                    <Image src='/DK_bocongthuong.png' className={s.icon_bct} alt='Đã đăng ký bộ công thương' width={109} height={40}/>
                                </a>
                                <a rel='nofollow' href='//www.dmca.com/Protection/Status.aspx?ID=5b1070f1-e6fb-4ba4-8283-84c7da8f8398'>
                                    <Image src='/dmca.png' className={s.icon_bct} alt='DMCA.com Protection Status' width={37} height={40}/>
                                </a>
                            </div>
                        </div>
                        <div className={s.wrap_address}>
                            <p className={s.wrap_address_header}>CÔNG TY CỔ PHẦN THANH TOÁN HƯNG HÀ</p>
                            <a href='https://goo.gl/maps/stYYuH5Ln5U2' rel='nofollow' target='_blank' className={s.wrap_address_txt}>VP 1: Tầng 4, B50, Lô 6, KĐT Định Công - Hoàng Mai - Hà Nội</a>
                            <p className={s.wrap_address_txt}>VP2: Thôn Thanh Miếu, Xã Việt Hưng, Huyện Văn Lâm, Tỉnh Hưng Yên</p>
                            <p className={s.wrap_address_txt}>Hotline: 0982079209, 1900633682 - ấn phím 1</p>
                            <p className={s.wrap_address_txt}>Email: timviec365.vn@gmail.com</p>
                        </div>
                        <div className={s.wrap_qr}>
                            <p className={s.wrap_qr_header}>TẢI APP ĐỂ TÌM VIỆC SIÊU TỐC</p>
                            <div className={s.wrap_qr_block}>
                                <div className={s.wrap_qr_child}>
                                    <Image src='/qr_timviec_uv.png' width={116} height={115} className={s.qr_img} style={{width: '101.5%'}} alt='download_app'/>
                                    <p className={s.qr_txt}>App Timviec365 UV</p>
                                </div>
                                <div className={s.wrap_qr_child}>
                                    <Image src='/new_qr_ft1.png' width={116} height={115} className={s.qr_img} style={{width: '101.5%'}} alt='download_app'/>
                                    <p className={s.qr_txt}>App Timviec365 NTD</p>
                                </div>
                                <div className={s.wrap_qr_child}>
                                    <Image src='/qr_app_cv_new.png' width={116} height={115} className={s.qr_img} style={{width: '101.5%'}} alt='download_app'/>
                                    <p className={s.qr_txt}>App CV365</p>
                                </div>
                                <div className={s.wrap_qr_child}>
                                    <Image src='/qr_chat_365.png' width={116} height={115} className={s.qr_img} style={{width: '101.5%'}} alt='download_app'/>
                                    <p className={s.qr_txt}>App Chat365</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${s.footer_block3_2} ${s.hidden}`}>
                        <div>
                            <Image src='/365timviec.png' className={s.lazyloaded} alt='timviec365' width={184} height={47}/>
                        </div>
                        <div className={s.wrap_address}>
                            <p className={s.wrap_address_header}>CÔNG TY CỔ PHẦN THANH TOÁN HƯNG HÀ</p>
                            <a href='https://goo.gl/maps/stYYuH5Ln5U2' rel='nofollow' target='_blank' className={s.wrap_address_txt}>VP 1: Tầng 4, B50, Lô 6, KĐT Định Công - Hoàng Mai - Hà Nội</a>
                            <p className={s.wrap_address_txt}>VP2: Thôn Thanh Miếu, Xã Việt Hưng, Huyện Văn Lâm, Tỉnh Hưng Yên</p>
                            <p className={s.wrap_address_txt}>Hotline: 0982079209, 1900633682 - ấn phím 1</p>
                            <p className={s.wrap_address_txt}>Email: timviec365.vn@gmail.com</p>
                        </div>
                        <div className={`${s.flex} ${s.jtf_sb}`}>
                            <div className={s.wrap_certify}>
                                <a rel='nofollow' href='http://online.gov.vn/Home/WebDetails/35979'>
                                    <Image src='/DK_bocongthuong.png' className={s.icon_bct} alt='Đã đăng ký bộ công thương' width={109} height={40}/>
                                </a>
                                <a rel='nofollow' href='//www.dmca.com/Protection/Status.aspx?ID=5b1070f1-e6fb-4ba4-8283-84c7da8f8398'>
                                    <Image src='/dmca.png' className={s.icon_bct} alt='DMCA.com Protection Status' width={37} height={40}/>
                                </a>
                            </div>
                            <div className={s.wrap_block_connect}>
                                <div className={s.wrap_icon_connet}>
                                    <a href='https://chat365.timviec365.vn/' rel='nofollow' target='_blank'>
                                        <Image src='https://timviec365.vn/images/icon365.svg' alt='chat' width={27} height={14} />
                                    </a>
                                </div>
                                <div className={s.wrap_icon_connet}>
                                    <a href='https://www.facebook.com/Timviec365.Vn/' rel='nofollow' target='_blank'>
                                        <Image src='https://timviec365.vn/images/icon_fb.svg' alt='facebook' width={27} height={14} />
                                    </a>
                                </div>
                                <div className={s.wrap_icon_connet}>
                                    <a href='https://twitter.com/timviec365vn' rel='nofollow' target='_blank'>
                                        <Image src='https://timviec365.vn/images/icon_witter.svg' alt='twitter' width={27} height={14} />
                                    </a>
                                </div>
                                <div className={s.wrap_icon_connet}>
                                    <a href='https://www.youtube.com/channel/UCI6_mZYL8exLuvmtipBFrkg/videos' rel='nofollow' target='_blank'>
                                        <Image src='https://timviec365.vn/images/icon_youtube.svg' alt='youtube' width={27} height={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${s.gach_ngang} ${s.respon_1200} ${s.hidden}`}></div>
                    <div className={`${s.footer_block4} ${s.hidden}`}>
                        <p className={s.wrap_qr_header}>TẢI APP ĐỂ TÌM VIỆC SIÊU TỐC</p>
                        <p className={s.wrap_qr_header_2}>Tải app để tìm việc siêu tốc Tạo CV đẹp với 365+ mẫu CV xin việc</p>
                        <div className={s.wrap_qr_block}>
                            <div className={s.wrap_qr_child}>
                                <Image src='/qr_timviec_uv.png' width={116} height={115} className={s.qr_img} style={{width: '101.5%'}} alt='download_app'/>
                                <p className={s.qr_txt}>App Timviec365 UV</p>
                            </div>
                            <div className={s.wrap_qr_child}>
                                <Image src='/new_qr_ft1.png' width={116} height={115} className={s.qr_img} style={{width: '101.5%'}} alt='download_app'/>
                                <p className={s.qr_txt}>App Timviec365 NTD</p>
                            </div>
                            <div className={s.wrap_qr_child}>
                                <Image src='/qr_app_cv_new.png' width={116} height={115} className={s.qr_img} style={{width: '101.5%'}} alt='download_app'/>
                                <p className={s.qr_txt}>App CV365</p>
                            </div>
                            <div className={s.wrap_qr_child}>
                                <Image src='/qr_chat_365.png' width={116} height={115} className={s.qr_img} style={{width: '101.5%'}} alt='download_app'/>
                                <p className={s.qr_txt}>App Chat365</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
export default Pre_login