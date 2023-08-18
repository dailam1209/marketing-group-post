/** @format */

import {React, useState, useEffect} from 'react';
import Seo from '@/components/head';
import {CheckLogin} from '@/utils/function';
import {getServerSideProps} from '@/utils/function';
import HeaderQLC from '@/components/headerQLC/HeaderQLC';
import SidebarQLC from '@/components/sidebarQLC/SidebarQLC';
import FooterQLC from '@/components/footerQLC/FooterQLC';
import Congty from '@/components/gioi-han-ip/congty/Congty';

export {getServerSideProps};

export default function ListCongTy() {
   CheckLogin();

   const [narrow, setNarrow] = useState(false);
   const [currentPage, setCurrentPage] = useState('Tất cả');
   const [openSB, setOpenSB] = useState(true);

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

   return (
      <>
         <Seo seo='true' title='Trang chủ Quản Lý Chung Chuyển đổi số 365' des='Trang quản lý chung Chuyển đổi số 365. Quản lý các phần mềm, tiện ích trong hệ thống chuyển đổi số 365' url='quanlychung.timviec365.vn' />
         <div className='tc_wrap'>
            <div className={'khoi_sidebar'} style={{display: openSB ? 'block' : 'none'}}>
               <SidebarQLC narrow={narrow} setNarrow={setNarrow} openSB={openSB} />
            </div>

            <div className={narrow ? 'khoi_header_content_narrow' : 'khoi_header_content'}>
               <div className='content_ql'>
                  <div className='cnt_ttone'>
                     <HeaderQLC currentPage={currentPage} setOpenSB={setOpenSB} openSB={openSB} />
                     <div className='title_input' style={{display: 'none'}}></div>
                     <div className='notify_vip'>
                        <div className='left'>
                           <div className='text_1'>Tài khoản công ty bạn chưa phải là tài khoản VIP!</div>
                           <div className='text2'>Tài khoản của bạn chỉ đăng ký tối đa 5 nhân viên</div>
                        </div>
                        <div className='right'>
                           <img src='../img/crown.png' alt='' />
                           <span className='text'>Nâng cấp thành tài khoản VIP</span>
                        </div>
                     </div>
                     <Congty />
                  </div>
               </div>
            </div>
         </div>
         <link rel='stylesheet' href='https://timviec365.vn/css/footer_new.css?v=2' />
         <FooterQLC></FooterQLC>
      </>
   );
}
