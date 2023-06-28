import React,{ useState , useEffect} from "react";
import Axios from "axios";
import Swal from 'sweetalert2'

function SucessAlert(title)
{
  Swal.fire({
  title: title,
  customClass: {
    fontSize: '20px'
  },
  icon: 'success',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  heightAuto: false});
}
//'Email Address already exists'
function ErrorAlert(title)
{
  Swal.fire({
    title: title,
    icon: 'error',
    showClass: {
    popup: 'animate__animated animate__fadeInDown'
    },
    heightAuto: false,
    });
  
}

export default function Home() 
{
  const [email_dk, setEmailRegister] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleEmailRegister = (e) => { setEmailRegister(e.target.value) };
  const handleUsername = (e) => { setUsername(e.target.value) };
  const handleEmail = (e) => { setEmail(e.target.value) };
  const handlePassword = (e) => { setPassword(e.target.value) };


  const RegisterAccount = () =>
  {
    //check if email is actually an email
    var res = email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    if(res === null){
      ErrorAlert('Please enter a valid email address');
      return;
    }
    var res1 = email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    if(res1 === null){
      ErrorAlert('Please enter a valid email address');
      return;
    }

    Axios.post("http://127.0.0.1:8000/users-create",
    {
      email_dk: email_dk,
      name: username,
      email: email,
      pass: password,
    }).then((response) => {
        if(response.data.status == 0){
          ErrorAlert(response.data.message);
        }
        else{
          SucessAlert(response.data.message);
        }
    });
    return;
  }


  return (
    <>
        <div  className="content">
        <div className="content-main" style={{display:"flex",gap:"20px"}} >
          <h2 className="content-title">Create your account now</h2>

          <input className="input_huge" type="text" name="Username" placeholder="Username" onChange={handleUsername} required />
          <input className="input_huge" type="email"  name="Email" placeholder="Email" onChange={handleEmail} required />
          <input  className="input_huge" type="password" name="Password" placeholder="Password" onChange={handlePassword} required />
          <button className="btn_white" onClick={RegisterAccount}>Register</button>
          <a id="label_white" href="/">You already have account?</a>
        </div>

        <div className="sidebar">
          <div className="sidebar-content">

          <h1 id="sideBarCaption">Welcome</h1>
          <h3 id="sideBarDesc">You have not<br/> logged in yet</h3>    

          <a href="/"  className="btn_lightblue" >Login</a>       
          </div>
        </div>
      
    </div>

    <>
  <div className="content_ql ctn_bgr_body">
    <div className="content_nv">
      <div className="container">
        <div className="ctn_qmk">
          <form action="" className="register_form">
            <div className="one_page_qmk one_reg_ql share_reg_log share_brd_radius share_bgr_tow">
              <div className="header_qmk">
                <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                  Đăng ký tài khoản công ty, chuyển đổi số nhanh, tiện ích lớn
                </h1>
                <div className="qmk_avt_ic tex_center">
                  <img src="../img/one_ic_register.png" alt="" />
                </div>
              </div>
              <div className="ctn_form share_distance">
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Tài khoản đăng nhập <span className="cr_red">*</span>
                  </label>
                  <input
                    type="text"
                    name="email_dk"
                    id="email_dk"
                    className="form-control"
                    placeholder="Nhập số điện thoại"
                    onChange={handleEmail} required 
                  />
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Tên công ty <span className="cr_red">*</span>
                  </label>
                  <input
                    type="text"
                    name="name_cty"
                    className="form-control"
                    placeholder="Nhập tên công ty của bạn"
                    onChange={handleUsername} required 
                  />
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Email
                  </label>
                  <input
                    type="text"
                    name="Email"
                    className="form-control"
                    placeholder="Nhập số email"
                    onChange={handleEmail} required 
                  />
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Nhập mật khẩu <span className="cr_red">*</span>
                  </label>
                  <span className="see_log" toggle="#password-field-three" />
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password-field-three"
                    placeholder="Nhập mật khẩu"
                    onChange={handlePassword} required
                  />
                  {/* <span class="loi_error share_dnone">Hãy nhập mật khẩu từ 8 đến 16 ký tự bao gồm chữ hoa, chữ thường và ít nhất một chữ số và không chứa khoảng trắng</span> */}
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Nhập lại mật khẩu <span className="cr_red">*</span>
                  </label>
                  <span className="see_log" toggle="#password-field-four" />
                  <input
                    type="password"
                    name="res_password"
                    className="form-control"
                    id="password-field-four"
                    placeholder="Nhập lại mật khẩu"
                    onChange={handlePassword} required
                  />
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Địa chỉ <span className="cr_red">*</span>
                  </label>
                  <input type="text" name="address" class="form-control"
                                          placeholder="Nhập địa chỉ"/>
                  {/* <textarea
                    type="text"
                    id="user_name"
                    name="address"
                    style={{
                      resize: "none",
                      height: "auto",
                      minHeight: 42,
                      fontSize: 14,
                      lineHeight: 22,
                      padding: "10px 15px",
                      width: "100%",
                      color: "#666666",
                      borderRadius: 5,
                      border: "1px solid #DDDDDD"
                    }}
                    placeholder="Nhập địa chỉ công ty"
                    value="Công ty test 123"
                    defaultValue={""}
                  /> */}
                </div>
              </div>
              <div className="form-butt-one">
                <button
                  type="button"
                  className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                  onClick={RegisterAccount}
                >
                  Tiếp tục
                </button>
                <p className="bo_qua tex_center">
                  <a
                    href="/lua-chon-dang-ky.html"
                    className="share_fsize_three share_clr_one"
                  >
                    Quay lại
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
</>


    </>

    
  );
}