import Seo from '../components/head'
import { CheckLogin } from '../utils/function'

export default function ChangePwSuccess() {
    CheckLogin()
    
    return (
        <>  
        <Seo
        seo = ''
        title = 'Trang quên mật khẩu'
        />
            <div class="content_ql ctn_bgr_body">
                <div class="content_nv">
                    <div class="container">
                        <div class="ctn_qmk">
                            <div class="qmk_form">
                                <div class="four_page_qmk tow_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                    <div class="avt_tb_qmk">
                                        <img src="../img/thongbao.png" alt=""/>
                                    </div>
                                    <p class="titl_form share_clr_one tex_center">
                                        Chúc mừng bạn đã thay đổi mật khẩu thành công<br/>
                                            Đăng nhập ngay để sử dụng!
                                    </p>
                                    <div class="form-butt-one">
                                        <a href="/lua-chon-dang-nhap.html"
                                            class="share_bgr_one cr_weight tex_center share_clr_tow share_fsize_tow share_cursor share_hrf">
                                            Đăng nhập ngay</a>
                                        <p class="bo_qua tex_center"><a href="/" class="share_fsize_three share_clr_one">Bỏ
                                            qua</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
}