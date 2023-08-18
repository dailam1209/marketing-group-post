/** @format */

import {React, useState, useEffect} from 'react';
import Seo from '../components/head';
import {CheckLogin} from '../utils/function';
import Footer from '../components/footer/Footer';
import {getServerSideProps} from '../utils/function';
import QLC_item from '../components/QLC_item';
import {Col, Row, Spin, Tabs} from 'antd';
import HeaderQLC from '../components/headerQLC/headerQLC';
import SidebarQLC from '../components/sidebarQLC/SidebarQLC';
import FooterQLC from '../components/footerQLC/FooterQLC';
import ModalRegsiter from '@/components/modal/ModalRegsiter';
import ModalLogin from '@/components/modal/ModalLogin';
import ModalConfirm from '@/components/modal/ModalConfirm';
import {LoadingComp} from './_app';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
export {getServerSideProps};

export default function Home() {
   CheckLogin();

   const [show, setShow] = useState('all');
   const [narrow, setNarrow] = useState(false);
   const [currentPage, setCurrentPage] = useState('Tất cả');
   const [openMenu, setOpenMenu] = useState(false);
   const [openModalConfirm, setOpenModalConfirm] = useState(false);
   const [openModalLogin, setOpenModalLogin] = useState(false);
   const [openModalRegister, setOpenModalRegister] = useState(false);
   const [openSB, setOpenSB] = useState(false);
   const [loading, setLoading] = useState(true);
   const [hasTokens, setHasTokens] = useState(false);
   const router = useRouter();
   useEffect(() => {
      const accToken = Cookies.get('token_base365');
      const rfToken = Cookies.get('rf_token');
      const userRole = Cookies.get('role');

      if (accToken && rfToken && userRole) {
         setHasTokens(true);
      }
   }, []);
   const handleClickCheckVip = () => {
      hasTokens ? router.push('/thong-bao-tai-khoan-vip.html') : setOpenModalConfirm(true);
   };
   useEffect(() => {
      window.addEventListener(
         'resize',
         function (event) {
            if (window.innerWidth >= 1024) {
               setOpenSB(true);
            } else if (window.innerWidth < 1024) {
               setOpenSB(false);
               setNarrow(false);
            } else if (window.innerWidth === 1024) {
               setNarrow(false);
            }
         },
         true,
      );
   });

   useEffect(() => {
      if (window.innerWidth > 1024) {
         setOpenSB(true);
      }
   }, []);

   // do loading
   useEffect(() => {
      const timeout = setTimeout(() => {
         setLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
   }, []);

   const items = [
      {
         label: 'Tất cả',
         key: '1',
      },
      {
         label: 'Quản lý nhân sự',
         key: '2',
      },
      {
         label: 'Quản lý công việc',
         key: '3',
      },
      {
         label: 'Quản lý nội bộ',
         key: '4',
      },
      {
         label: 'Quản lý bán hàng',
         key: '5',
      },
      {
         label: 'Hệ sinh thái 365',
         key: '6',
      },
   ];
   const handleOnChange = (key) => {
      console.log(key);
      if (key === '1') {
         setShow('all');
         setCurrentPage('Tất cả');
         setOpenMenu(false);
      } else if (key === '2') {
         setShow('nhan_luc');
         setCurrentPage('Nhân sự');
         setOpenMenu(false);
      } else if (key === '3') {
         setShow('cong_viec');
         setOpenMenu(false);
         setCurrentPage('Quản lý công việc');
      } else if (key === '4') {
         setShow('noi_bo');
         setOpenMenu(false);
         setCurrentPage('Quản lý nội bộ');
      } else if (key === '5') {
         setShow('ban_hang');
         setOpenMenu(false);
         setCurrentPage('Quản lý bán hàng');
      } else if (key === '6') {
         setShow('he_sinh_thai');
         setOpenMenu(false);
         setCurrentPage('Hệ sinh thái 365');
      }
   };

   return (
      <>
         <Seo seo='true' title='Trang chủ Quản Lý Chung Chuyển đổi số 365' des='Trang quản lý chung Chuyển đổi số 365. Quản lý các phần mềm, tiện ích trong hệ thống chuyển đổi số 365' url='quanlychung.timviec365.vn' />
         {loading ? (
            <LoadingComp />
         ) : (
            <>
               <div className='tc_wrap'>
                  <div className={'khoi_sidebar'} style={{display: openSB ? 'block' : 'none'}}>
                     <SidebarQLC narrow={narrow} setNarrow={setNarrow} openSB={openSB} setOpenModalLogin={setOpenModalLogin} setOpenModalRegister={setOpenModalRegister} />
                  </div>

                  <div className={narrow ? 'khoi_header_content_narrow' : 'khoi_header_content'}>
                     <div className='content_ql'>
                        <div className='cnt_ttone'>
                           <HeaderQLC currentPage={currentPage} setOpenSB={setOpenSB} openSB={openSB} setOpenModalLogin={setOpenModalLogin} setOpenModalRegister={setOpenModalRegister} />
                           {/* <HeaderLogin /> */}
                           <div className='title_input' style={{display: 'none'}}>
                              <div className='title'>
                                 <span className='prev_page'>Ứng dụng</span>
                                 <span> / </span>
                                 <span className='curent_page'>{currentPage}</span>
                              </div>
                              <div className='search_input'>
                                 <input type='text' placeholder='Nhập nội dung' />
                                 <span>
                                    <img src='../img/search_icon.png' alt='' />
                                 </span>
                              </div>
                           </div>
                           <div className='notify_vip' onClick={handleClickCheckVip}>
                              <div className='left'>
                                 <div className='text_1'>Tài khoản công ty bạn chưa phải là tài khoản VIP!</div>
                                 <div className='text2'>Tài khoản của bạn chỉ đăng ký tối đa 5 nhân viên</div>
                              </div>
                              <div className='right'>
                                 <img src='../img/crown.png' alt='' />
                                 <span className='text'>Nâng cấp thành tài khoản VIP</span>
                              </div>
                           </div>
                           <div className='one_bod_td'>
                              <h2 className='share_clr_one cr_weight_bold '>Hệ thống phần mềm chuyển đổi số 365</h2>
                           </div>
                           <div className='tab_pane'>
                              <Tabs items={items} onChange={(key) => handleOnChange(key)} /> <Tabs />
                           </div>
                           <div className='tab_pane_mb'>
                              <div
                                 className='tab_pane_mb_title'
                                 onClick={() => {
                                    setOpenMenu(!openMenu);
                                 }}
                              >
                                 <div className='text'>{currentPage}</div>
                                 <img src='./Expand_down_light.png' alt='' />
                              </div>

                              {openMenu && (
                                 <div className='list'>
                                    <div className='item' key={1} onClick={() => handleOnChange('1')}>
                                       Tất cả
                                    </div>
                                    <div className='item' key={2} onClick={() => handleOnChange('2')}>
                                       Quản lý nhân sự
                                    </div>
                                    <div className='item' key={3} onClick={() => handleOnChange('3')}>
                                       Quản lý công việc
                                    </div>
                                    <div className='item' key={4} onClick={() => handleOnChange('4')}>
                                       Quản lý nội bộ
                                    </div>
                                    <div className='item' key={5} onClick={() => handleOnChange('5')}>
                                       Quản lý bán hàng
                                    </div>
                                    <div className='item' key={6} onClick={() => handleOnChange('6')}>
                                       Hệ sinh thái 365
                                    </div>
                                 </div>
                              )}
                           </div>
                           <div className='cnt_count_detail tab_active'>
                              <div>
                                 <div>
                                    {show == 'all' ? (
                                       <Row gutter={[24, 36]}>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Chấm công' img={'../img/qlc_cc.png'} url='/quan-ly-nhan-luc' />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Chat365' img={'../img/qlc_chat.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Tính lương' img={'../img/qlc_tl.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Quản trị nhân sự' img={'../img/qlc_ns.png'} url='/hr' />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm giao việc' img={'../img/qlc_gv.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Văn thư lưu trữ' img={'../img/qlc_vt.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm CRM' img={'../img/qlc_crm.png'} url='/crm' />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Quản lý tài sản' img={'../img/qlc_qlts.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Đánh giá năng lực nhân viên' img={'../img/qlc_dgnl.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Quản lý KPI' img={'../img/qlc_kpi.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Số hóa tài liệu' img={'../img/qlc_shtl.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm DMS' img={'../img/qlc_dms.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='SmartID 365' img={'../img/qlc_sm365.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Chuyển văn bản thành giọng nói' img={'../img/qlc_vb_gn.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý Gara ô tô' img={'../img/qlc_gara.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm phiên dịch' img={'../img/qlc_pd.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý kho vật tư xây dựng' img={'../img/qlc_qlkho.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm Loyalty' img={'../img/qlc_loyalty.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý tài chính công trình' img={'../img/qlc_qltc.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý đầu tư xây dựng' img={'../img/qlc_qldtxd.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý công trình' img={'../img/qlc_qldtxd.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý quy trình sản xuất' img={'../img/qlc_qldtxd.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý vận tải' img={'../img/qlc_qldtxd.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý cung ứng' img={'../img/qlc_qlcu.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý lịch biểu' img={'../img/qlc_qllb.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Phần mềm quản lý kho 365' img={'../img/qlc_qlkho365.png'} />
                                          </Col>
                                          <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                             <QLC_item title='Truyền thông văn hóa' img={'../img/qlc_tt_vh.png'} />
                                          </Col>
                                       </Row>
                                    ) : (
                                       ''
                                    )}
                                    {show == 'nhan_luc' ? (
                                       <>
                                          <Row gutter={[24, 36]}>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Chấm công' img={'../img/qlc_cc.png'} url='/quan-ly-nhan-luc' />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Tính lương' img={'../img/qlc_tl.png'} />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Quản trị nhân sự' img={'../img/qlc_ns.png'} url='/hr' />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Quản lý tài sản' img={'../img/qlc_qlts.png'} />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Quản lý cuộc họp' img={'../img/qlc_qlts.png'} />
                                             </Col>
                                          </Row>
                                       </>
                                    ) : (
                                       ''
                                    )}
                                    {show == 'cong_viec' ? (
                                       <>
                                          <Row gutter={[24, 36]}>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Phần mềm giao việc' img={'../img/qlc_gv.png'} />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Quản lý KPI' img={'../img/qlc_kpi.png'} />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Phần mềm quản lý lịch biểu' img={'../img/qlc_qllb.png'} />
                                             </Col>{' '}
                                          </Row>
                                       </>
                                    ) : (
                                       ''
                                    )}
                                    {show == 'noi_bo' ? (
                                       <>
                                          <Row gutter={[24, 36]}>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Văn thư lưu trữ' img={'../img/qlc_vt.png'} />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Quản lý tài sản' img={'../img/qlc_qlts.png'} />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Chuyển văn bản thành giọng nói' img={'../img/qlc_vb_gn.png'} />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Phần mềm phiên dịch' img={'../img/qlc_pd.png'} />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Phần mềm quản lý kho 365' img={'../img/qlc_qlkho365.png'} />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Truyền thông văn hóa' img={'../img/qlc_tt_vh.png'} />
                                             </Col>{' '}
                                          </Row>
                                       </>
                                    ) : (
                                       ''
                                    )}
                                    {show == 'ban_hang' ? (
                                       <>
                                          <Row gutter={[24, 36]}>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Phần mềm CRM' img={'../img/qlc_crm.png'} url='/crm' />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Phần mềm DMS' img={'../img/qlc_dms.png'} />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Phần mềm quản lý cung ứng' img={'../img/qlc_vb_qlcu.png'} />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Phần mềm quản lý kho 365' img={'../img/qlc_qlkho365.png'} />
                                             </Col>
                                          </Row>
                                       </>
                                    ) : (
                                       ''
                                    )}
                                    {show == 'he_sinh_thai' ? (
                                       <>
                                          <Row gutter={[24, 36]}>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Việc làm tự do' img={'../img/qlc_vltd.png'} desc='Cập nhật hàng triệu việc làm tự do với mức lương hấp dẫn.' />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Việc làm theo giờ' img={'../img/qlc_vltg.png'} desc='Việc làm theo giờ với kho tin tuyển dụng đa dạng, mức lương hấp dẫn.' />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Gia sư' img={'../img/qlc_gs.png'} desc='Kết nối với gia sư đa môn học, ở mọi tỉnh thành, dễ dàng, nhanh chóng.' />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Tìm nhà trọ' img={'../img/qlc_gs.png'} desc='Giải pháp tìm phòng trọ, người thuê trọ nhanh chóng, miễn phí.' />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Khóa học' img={'../img/qlc_nt.png'} desc='Cập nhật divên tục các khóa học đa dạng môn học từ offdivne và online.' />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Trang vàng miễn phí' img={'../img/qlc_trangvang.png'} desc='Cung cấp danh bạ của tất cả các công ty lớn nhỏ trên toàn quốc.' />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Tra cứu lương' img={'../img/qlc_tracuuluong.png'} desc='Tra cứu thông tin lương theo vị trí công việc chính xác, nhanh chóng.' />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Rao vặt' img={'../img/qlc_raovat.png'} desc='Đăng tải thông tin rao vặt miễn phí, cập nhật liên tục mỗi ngày.' />
                                             </Col>
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Vé máy bay' img={'../img/qlc_vemaybay.png'} desc='Thỏa sức vi vu với kho vé máy bay nội địa, quốc tế với giá rẻ bất ngờ.' />
                                             </Col>{' '}
                                             <Col xxl={6} sm={12} md={12} xl={8} xs={24} onClick={() => setOpenModalConfirm(true)}>
                                                <QLC_item title='Thẻ cào điện thoại' img={'../img/qlc_thedt.png'} desc='Thẻ điện thoại đa dạng mệnh giá, an toàn, bảo mật cao.' />
                                             </Col>
                                          </Row>
                                       </>
                                    ) : (
                                       ''
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='ctn_1'>
                           <div className='ctn_1_left'>
                              <div className='img_bgr'>
                                 <img src='../img/bgr_nentang.png' alt='Trang chủ Quản Lý Chung Chuyển đổi số 365' />
                              </div>
                           </div>
                           <div className='ctn_1_right'>
                              <h2>Nền tảng quản trị doanh nghiệp phổ biến nhất</h2>
                              <span>Chuyển đổi số 365 là nền tảng quản trị doanh nghiệp phổ biến, được tin dùng bởi hơn 10,000 doanh nghiệp thuộc nhiều lĩnh vực khác nhau. Hầu hết các doanh nghiệp dẫn đầu thị trường và các công ty tăng trưởng nhanh đang dùng một trong số các sản phẩm của chuyển đổi số 365</span>
                              <span>Tất cả các ứng dụng trên Chuyển đổi số 365 có thể sử dụng dễ dàng trên trình duyệt, smartphone (iOS, Android), máy tính bảng, hoặc cài đặt trên máy tính để bàn.</span>
                           </div>
                        </div>
                        <div className='cnt_2'>
                           <div className='cnt_2_left'>
                              <h2>Bước 1: Tải app chat365 cài đặt chấm công + chấm công tại mục tiện ích</h2>
                              <span>
                                 Để có cơ sở dữ liệu phục vụ công việc tính lương, trước hết bạn cần tải app chấm công 365 bằng cách truy cập link <a href='https://chamcong.timviec365.vn/download.html'>https://chamcong.timviec365.vn/download.html</a> hoặc truy cập CH play/ App store tìm kiếm Chấm công 365 và tải về.
                              </span>
                           </div>
                           <div className='cnt_2_right'>
                              <div className='img_bgr'>
                                 <img src='../pc_QLC.png' alt='Trang chủ Quản Lý Chung Chuyển đổi số 365' />
                              </div>
                           </div>
                        </div>
                        <div className='ctn_3'>
                           <div className='title'>
                              <h2>Bước 2: Đăng ký tài khoản</h2>
                           </div>
                           <div className='ctn_3_wrap'>
                              <div className='ctn_3_left'>
                                 <div className='img_bgr'>
                                    <img src='../lt_QLC.png' alt='Trang chủ Quản Lý Chung Chuyển đổi số 365' />
                                 </div>
                              </div>
                              <div className='ctn_3_right'>
                                 <h2>Bước 2: Đăng ký tài khoản</h2>
                                 <span>Bạn hãy truy cập website hoặc app Chấm công 365 để đăng ký tài khoản. Đối với tài khoản công ty, chọn mục "Công ty" và điền đầy đủ thông tin đăng ký tài khoản. Lưu ý đối với tạo tài khoản nhân viên có 2 cách để tạo tài khoản:</span>
                                 <span>Cách 1: Nhân viên tự đăng ký tài khoản bằng cách nhập ID công ty do nhân sự cung cấp và điền đầy đủ thông tin đăng ký</span>
                                 <span>Cách 2: Công ty tạo tài khoản cho nhân viên bằng cách đăng nhập tài khoản công ty và thêm mới tài khoản cho nhân viên.</span>
                                 <span>Sau khi điền đầy đủ thông tin, hệ thống sẽ gửi về email đăng ký mã OTP để xác thực tài khoản, người dùng nhập mã OTP để có thể bắt đầu sử dụng.</span>
                                 <span>Công ty và nhân viên đăng nhập bằng tài khoản đó trên các phần mềm của hệ sinh thái 365 để quản lý doanh nghiệp, trong đó có phần mềm tính lương 365 để thiết lập, quản lý và theo dõi công lương.</span>
                              </div>
                           </div>
                        </div>
                        <div className='ctn_4'>
                           <div className='title'>
                              <h2>Bước 3: Thiết lập dữ liệu</h2>
                           </div>
                           <div className='ctn_4_wrap'>
                              <div className='ctn_4_left'>
                                 <div className='img_bgr'>
                                    <img src='../gd_QLC.png' alt='Trang chủ Quản Lý Chung Chuyển đổi số 365' />
                                 </div>
                              </div>
                              <div className='ctn_4_right'>
                                 <h2>Bước 3: Thiết lập dữ liệu</h2>
                                 <span>Sau khi hoàn tất quá trình đăng ký, bạn đăng nhập hệ thống để thiết lập các trường nhằm mục đích hỗ trợ hệ thống tính lương chính xác nhất. </span>
                                 <span>Danh sách nhân viên: toàn bộ nhân viên trong công ty đã đăng ký tài khoản trên hệ thống. Nhân sự thao tác nhập lương cơ bản, lương tính bảo hiểm (nếu không tính bảo hiểm theo lương cơ bản), Hợp đồng và phần trăm lương tương ứng, số người</span>
                                 <button>+ Xem Thêm</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <link rel='stylesheet' href='https://timviec365.vn/css/footer_new.css?v=2' />
               <FooterQLC></FooterQLC>
               {openModalConfirm && <ModalConfirm setOpenModalConfirm={setOpenModalConfirm} setOpenModalRegister={setOpenModalRegister} setOpenModalLogin={setOpenModalLogin} />}
               {openModalRegister && <ModalRegsiter setOpenModalRegister={setOpenModalRegister} />}
               {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
            </>
         )}
      </>
   );
}
