import { React, useState, useEffect } from 'react'
import Seo from '../components/head'
import SideBar from '../components/sideBar/SideBar'
import HeaderLogin from '../components/headerLogin/HeaderLogin'
import QlNhanluc from '../components/ql_nhanluc2'
import QlCongviec from '../components/ql_congviec2'
import QlNoibo from '../components/ql_noibo2'
import QlBanhang from '../components/ql_banhang2'
import { getServerSideProps } from '../utils/function'
import { useRouter } from 'next/router'

export { getServerSideProps }
export default function HomeEmployee() {
  const router = useRouter()
  const [show, setShow] = useState('all')
  const [active, setActive] = useState('all')
  const [nameList, setNameList] = useState('Tất cả')

  const showAll = () => {
    setShow('all')
    setActive('all')
    setNameList('Tất cả')
  }
  const showNhanluc = () => {
    setText(
      <>
        Ứng dụng / <span className='thay_doi'>Quản lý nhân lực</span>
      </>
    )
    setShow('nhan_luc')
    setActive('nhan_luc')
    setNameList('Quản lý nhân sự')
  }
  const showCongviec = () => {
    setText(
      <>
        Ứng dụng / <span className='thay_doi'>Quản lý công việc</span>
      </>
    )
    setShow('cong_viec')
    setActive('cong_viec')
    setNameList('Quản lý công việc')
  }
  const showNoibo = () => {
    setText(
      <>
        Ứng dụng / <span className='thay_doi'>Quản lý nội bộ</span>
      </>
    )
    setShow('noi_bo')
    setActive('noi_bo')
    setNameList('Quản lý nội bộ')
  }
  const showBanhang = () => {
    setText(
      <>
        Ứng dụng / <span className='thay_doi'>Quản lý bán hàng</span>
      </>
    )
    setShow('ban_hang')
    setActive('ban_hang')
    setNameList('Quản lý bán hàng')
  }
  const [getText, setText] = useState(
    <>
      Ứng dụng / <span className='thay_doi'>Tất cả</span>
    </>
  )

  // search
  function search() {
    let searchTerm = document.getElementById('myInput').value.toLowerCase()

    let items = document.getElementsByClassName('delt_titl_ud')

    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      let content = item.getElementsByTagName('h4')[0].innerText.toLowerCase()

      if (content.includes(searchTerm)) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    }
  }
  return (
    <>
      <Seo seo='' title='Quản lý ứng dụng' />

      <div id='qly_ungdung_nv' className='qly_ungdung'>
        <div className='wrapper'>
          <div className='left_ql'>
            <SideBar />
          </div>
          <div className='right_ql'>
            <div className='header_rigth_qly'>
              <div className='ctn_header_qly'>
                <HeaderLogin text={getText} />
              </div>
            </div>
            <div className='ctn_right_qly'>
              <div className='ctn_res_qly'>
                <div class='left_header_qly'>
                  <p class='share_clr_one share_fsize_one'>
                    Ứng dụng / <span class='thay_doi'>{nameList}</span>
                  </p>
                </div>
                <div className='search_qly'>
                  <form className='v_form_timkiem'>
                    <div className='tim_kiem'>
                      <input
                        type='text'
                        name='search'
                        id='myInput'
                        onKeyUp={search}
                        placeholder='Nhập tên phần mềm'
                        className='form-serach share_fsize_one share_clr_three share_bgr_tow'
                      />
                      <span className='ico_search'></span>
                    </div>
                  </form>
                </div>
                <div className='list_all_qly'>
                  <div className='ctn_chile_one'>
                    <div
                      className={`tab_content ${
                        active == 'all' ? 'active' : ''
                      }`}>
                      <div className='ctn_detl_tab' onClick={showAll}>
                        <label className='tab_label'>
                          <div className='avt_detl_tab'>
                            <h3>27</h3>
                            <p>Tất cả</p>
                            <input
                              type='radio'
                              name='gs-gd'
                              value='1'
                              defaultChecked={true}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div
                      className={`tab_content ${
                        active == 'nhan_luc' ? 'active' : ''
                      }`}>
                      <div
                        className='ctn_detl_tab'
                        // onClick={showNhanluc}
                        onClick={() => router.push('/cham-cong')}>
                        <label className='tab_label'>
                          <h3>05</h3>
                          <p>Quản lý nhân lực</p>
                          <input type='radio' name='gs-gd' value='2' />
                        </label>
                      </div>
                    </div>
                    <div
                      className={`tab_content ${
                        active == 'cong_viec' ? 'active' : ''
                      }`}>
                      <div className='ctn_detl_tab' onClick={showCongviec}>
                        <label className='tab_label'>
                          <h3>04</h3>
                          <p>Quản lý công việc</p>
                          <input type='radio' name='gs-gd' value='3' />
                        </label>
                      </div>
                    </div>
                    <div
                      className={`tab_content ${
                        active == 'noi_bo' ? 'active' : ''
                      }`}>
                      <div className='ctn_detl_tab' onClick={showNoibo}>
                        <label className='tab_label'>
                          <h3>07</h3>
                          <p>Quản lý nội bộ</p>
                          <input type='radio' name='gs-gd' value='4' />
                        </label>
                      </div>
                    </div>
                    <div
                      className={`tab_content ${
                        active == 'ban_hang' ? 'active' : ''
                      }`}>
                      <div className='ctn_detl_tab' onClick={showBanhang}>
                        <label className='tab_label'>
                          <h3>10</h3>
                          <p>Quản lý bán hàng</p>
                          <input type='radio' name='gs-gd' value='5' />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='ctn_chile_tow'>
                    {show == 'all' ? (
                      <>
                        <QlNhanluc />
                        <QlCongviec />
                        <QlNoibo />
                        <QlBanhang />
                      </>
                    ) : (
                      ''
                    )}
                    {show == 'nhan_luc' ? (
                      <>
                        <QlNhanluc />
                      </>
                    ) : (
                      ''
                    )}
                    {show == 'cong_viec' ? (
                      <>
                        <QlCongviec />
                      </>
                    ) : (
                      ''
                    )}
                    {show == 'noi_bo' ? (
                      <>
                        <QlNoibo />
                      </>
                    ) : (
                      ''
                    )}
                    {show == 'ban_hang' ? (
                      <>
                        <QlBanhang />
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <link
          rel='stylesheet'
          href='https://timviec365.vn/css/footer_new.css?v=2'
        />
      </>
    </>
  )
}
