import Image from 'next/image'
import React, { useRef } from 'react'
import styles from './article.module.css'
import { Button } from 'antd'

export default function Article({
  className,
  showMore,
  setShowmore,
}: {
  className: string
  showMore: boolean
  setShowmore: any
}) {
  return (
    <>
      <div
        className={className}
        style={{
          height: `${showMore ? 'max-content' : '1600px'}`,
          overflow: 'hidden',
        }}>
        <p className={styles.tieuDe}>
          HƯỚNG DẪN SỬ DỤNG PHẦN MỀM CHAMCONG VÀ CÁC ỨNG DỤNG CHUYỂN ĐỔI SỐ 365
        </p>

        <div
        // className='blog_detail news-detail'
        >
          <div className='content-detail'>
            <p dir='ltr' style={{}}>
              <span style={{ fontSize: '22px' }}>
                <strong>
                  <span
                    style={{
                      fontFamily: 'arial,helvetica,sans-serif',
                      fontSize: '22px !important',
                    }}>
                    I. Đối với Doanh nghiệp/NTD
                  </span>
                </strong>
              </span>
            </p>{' '}
            <h2 dir='ltr' style={{}} id='cham-cong'>
              <span style={{}}>
                <span id='1'>1. Chấm công&nbsp;</span>
              </span>
            </h2>{' '}
            <p dir='ltr' style={{}}>
              <span style={{}}>
                <span>
                  Link truy cập:{' '}
                  <a
                    style={{ color: 'blue' }}
                    href='https://hungha365.com/cham-cong'>
                    https://hungha365.com/cham-cong
                  </a>
                  &nbsp;
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{}}
              id='huong-dan-cai-dat-tai-khoan-cham-cong-cong-ty'>
              <span style={{}}>
                <span id='1_1'>
                  1.1. Hướng dẫn cài đặt tài khoản chấm công công ty
                </span>
              </span>
            </h3>{' '}
            <h4 dir='ltr' style={{}} id='dang-ky'>
              <span style={{}}>
                <span id='1_1_1'>1.1.1. Đăng ký</span>
              </span>
            </h4>{' '}
            <p dir='ltr' style={{}}>
              <span style={{}}>
                <span>
                  Nhấn lệnh <strong>Đăng ký</strong>&nbsp;&gt; Chọn loại tài
                  khoản là{' '}
                  <strong>
                    <em>Công ty</em>
                  </strong>
                </span>
              </span>
            </p>{' '}
            <p dir='ltr' style={{}}>
              <span style={{}}>
                <span>
                  <u>
                    <strong>Bước 1</strong>
                  </u>
                  : Nhập thông tin đăng ký theo yêu cầu, gồm các trường bắt buộc
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Điền thông tin đăng ký tài khoản công ty'
                  height={729}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/dien-thong-tin(1).jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Điền thông tin đăng ký tài khoản công ty
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <ul style={{ marginLeft: '40px' }}>
              {' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Tài khoản đăng nhập: bạn cần nhập vào ô này số điện
                        thoại
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Tên công ty
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Số điện thoại&nbsp;
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Mật khẩu
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Địa chỉ của công ty
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>
                        <strong>Bước 2</strong>
                      </u>
                      : Nhận mã OTP
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Bấm nhận mã
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Cần xác minh không phải là người máy
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Mã được gửi về điện thoại gồm 6 số- nhập đúng để được
                        dẫn tới bước tiếp theo.
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>
                        <strong>Bước 3</strong>
                      </u>
                      : Thêm nhân viên đầu tiên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bước này bạn có thể cài đặt thêm người nhân viên đầu tiên
                      hoặc Bỏ qua (nhấn vào lệnh Bỏ qua nằm ở góc phải, trên
                      cùng bảng pop up)
                    </span>
                    <br />{' '}
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Nếu cài đặt thêm người nhân viên đầu tiên sẽ xử lý 3 bước:
                      điền thông tin đầy đủ vào bảng hiển thị, nhận và nhập mã
                      OTP, ...
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Điền thông tin:&nbsp;
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt thêm nhân vên đầu tiên'
                  height={740}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-nhan-vien-dau-tien(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt thêm nhân vên đầu tiên</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      ==&gt; Thông báo đăng ký thành công &gt; bạn chọn{' '}
                      <em>Đăng nhập ngay</em> để sử dụng phần mềm quản lý chung
                      của Chuyển đổi số 365 và thực hiện cài đặt thêm nhiều tính
                      năng khác cho công ty.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thông báo đăng ký tài khoản thành công'
                  height={486}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/thong-bao-dang-ky-thanh-cong(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thông báo đăng ký tài khoản thành công</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h4
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cach-dang-nhap'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      id='1_1_2'
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      1.1.2. Cách đăng nhập
                    </span>
                  </span>
                </span>
              </span>
            </h4>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Đăng nhập tài khoản công ty'
                  height={630}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/dang-nhap(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Đăng nhập tài khoản công ty</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Có hai cách để đăng nhập tài khoản công ty
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <span style={{ color: '#FF0000' }}>(*)</span> Cách 1:{' '}
                      <em>quét QR để đăng nhập</em>, bạn cần tải ứng dụng
                      chat365 về máy
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Link tải tại đây:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bản PC:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://apps.microsoft.com/store/detail/chat365/XPFCH59RLHFFR6'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://apps.microsoft.com/store/detail/chat365/XPFCH59RLHFFR6
                      </span>
                    </a>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bản Mobile:&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Android:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://play.google.com/store/apps/details?id=vn.timviec365.chat_365&hl=vi&pli=1'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://play.google.com/store/apps/details?id=vn.timviec365.chat_365&amp;hl=vi&amp;pli=1
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + IOS:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://apps.apple.com/vn/app/chat365-nh%E1%BA%AFn-tin-nhanh-ch%C3%B3ng/id1623353330'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://apps.apple.com/vn/app/chat365-nh%E1%BA%AFn-tin-nhanh-ch%C3%B3ng/id1623353330
                      </span>
                    </a>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Với cơ chế đồng bộ tài khoản vô cùng tiện lợi của hệ thống
                      chuyển đổi số 365, bạn có thể sử dụng ngay tài khoản công
                      ty vừa tạo được để đăng nhập vào chat và tiến hành quét
                      QR, đồng thời áp dụng cách này cho các lần đăng nhập tiếp
                      theo để đăng nhập nhanh chóng.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Về cách quét QR từ chat365 như thế nào, bạn nhấp vào link
                      điều hướng <em>Hướng dẫn quét</em> ở phía bên dưới mã QR
                      để nhận hướng dẫn cụ thể.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Huong-dan-quet-qr-de-dang-nhap'
                  height={507}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/Huong-dan-quet-qr-de-dang-nhap.jpg'
                  width={800}
                />{' '}
                <figcaption>Hướng dẫn quét QR để đăng nhập</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <span style={{ color: '#FF0000' }}>(*) </span>Cách 2, bạn
                      đăng nhập bằng tài khoản vừa tạo bằng cách nhập email hoặc
                      số điện thoại đã đăng ký và mật khẩu và bấm đăng
                      nhập.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Đăng nhập bằng tài khoản như thế nào'
                  height={628}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/dang-nhap-bang-tai-khoan.jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Đăng nhập bằng tài khoản công ty như thế nào?
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='thiet-lap-cau-hinh-cham-cong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='1_2'>
                      1.2. Thiết lập cấu hình chấm công
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tại trang quanlychung.timviec365.vn sau khi đã đăng nhập
                      tài khoản công ty, bạn chọn ứng dụng Chấm công để thực
                      hiện thiết lập cài đặt:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Link page chamcong:{' '}
                    </span>
                  </span>
                </span>
              </span>
              https://chamcong.timviec365.vn/quan-ly-cong-ty.html&nbsp; &nbsp;
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Chọn ứng dụng chấm công'
                  height={438}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/chon-ung-dung-cham-cong.jpg'
                  width={800}
                />{' '}
                <figcaption>Chọn ứng dụng chấm công</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Thiết lập cấu hình chấm công để thiết lập cài wifi, vị
                      trí, giới hạn IP chấm công công ty.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cách thực hiện chi tiết cài đặt cho từng yếu tố như sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>
                        <strong>Bước 1</strong>
                      </u>
                      : Chọn danh mục Cấu hình chấm công
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>
                        <strong>Bước 2</strong>
                      </u>
                      : Cài đặt thiết bị/nền tảng để chấm công
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chỉ việc tích chọn vào các ứng dụng do timviec365.vn cung
                      cấp mà công ty muốn nhân viên chấm công, gồm:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chấm công trên app timviec365.vn
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chấm công khuôn mặt trên app chat365
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chấm công bằng QR trên app chat365
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chấm công bằng QR trên app PC365
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chấm công trên PC365
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <u>
                <em>
                  <span style={{}}>
                    <span>
                      <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                        <span
                          style={{
                            fontVariantNumeric: 'normal',
                            fontVariantEastAsian: 'normal',
                            fontVariantAlternates: 'normal',
                            verticalAlign: 'baseline',
                          }}>
                          Link tải app PC365:&nbsp;
                        </span>
                      </span>
                    </span>
                  </span>
                </em>
              </u>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bản ios:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://apps.apple.com/us/app/pc365-c%C3%B4ng-ty/id1599246163'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://apps.apple.com/us/app/pc365-c%C3%B4ng-ty/id1599246163
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bản Android:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://play.google.com/store/apps/details?id=com.timviec365.pc365company'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://play.google.com/store/apps/details?id=com.timviec365.pc365company
                      </span>
                    </a>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <u>
                    <strong>Bước 3</strong>
                  </u>
                  : Thiết lập wifi, vị trí chấm công
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cho phép thiết lập giới hạn wifi và vị trí. Bạn cần giới
                      hạn nhân viên chấm công theo wifi và vị trí cụ thể như thế
                      nào thì tích chọn vào từng cài đặt để cài. Trong đó:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tích chọn vào{' '}
                      <em>
                        <strong>Địa chỉ MAC của wifi </strong>
                      </em>
                      để cài wifi cụ thể cho phép phép chấm công. Có nghĩa là
                      nhân viên phải kết nối với đúng wifi được cài thì mới chấm
                      được công, nếu bắt wifi khác sẽ không chấm công được. Khi
                      tích chọn, hệ thống hiển thị bảng popup{' '}
                      <em>Thêm wifi mới </em>cho bạn cài đặt. Bạn cần nhập tên
                      wifi và nhập địa chỉ MAC vào các ô tương ứng để cập
                      nhật.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt wifi'
                  height={417}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-wifi.jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt wifi</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Có thể thêm nhiều wifi bằng cách nhấn vào lệnh{' '}
                      <em>Thêm wifi</em> hoặc xóa wifi đã cài cho phép chấm công
                      bằng cách nhấn vào biểu tượng xóa. Tương tự, bạn cũng có
                      thể chỉnh sửa lại wifi tại biểu tượng chỉnh sửa có hình
                      chiếc bút.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài wifi để chấm công'
                  height={403}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-wifi-cham-cong.jpg'
                  width={800}
                />{' '}
                <figcaption>Cài wifi để chấm công</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Với wifi đầu tiên được cài đặt để cho phép chấm công, hệ
                      thống sẽ tự động ghi nhận là wifi mặc định chấm công. Bạn
                      có thể thay đổi chế độ mặc định này bất cứ lúc nào với
                      cách làm rất đơn giản, nhấp vào lệnh{' '}
                      <em>Đặt làm mặc định</em> ở ngay dưới thông tin wifi muốn
                      đặt.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cập nhật wifi mặc định để chấm công'
                  height={360}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cap-nhat-wifi-mac-dinh.jpg'
                  width={800}
                />{' '}
                <figcaption>Cập nhật wifi mặc định để chấm công</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cài đặt vị trí chấm công để giới hạn khu vực, vị trí nhân
                      viên công ty có thể chấm được công, Ví dụ, công ty cài vị
                      trí chấm công tại địa chỉ công ty, bán kính cho phép là
                      100m tính từ vị trí dược thiết lập, như vậy khi nhân viên
                      quên chấm công tại công ty thì việc chấm công tại nhà hoặc
                      ngoài vị trí đã cài đặt cũng sẽ không được hệ thống chấm
                      công ghi nhận.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để cập nhật vị trí chấm công chính xác, bạn cần tải app{' '}
                      <strong>PC365</strong> hoặc app{' '}
                      <strong>Chấm công 365</strong> về điện thoại để cập nhật
                      vị trí ngay qua app.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cách cập nhật qua app chamcong365 như sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul style={{ marginLeft: '40px' }}>
              {' '}
              <li
                style={{
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Tại trang chủ tài khoản công ty, chọn vào{' '}
                        <em>Cấu hình</em>
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Tiếp theo nhấn chọn lệnh <em>Cài đặt</em> để thực hiện
                        các thao tác cài đặt vị trí
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chọn vào <em>Danh sách vị trí</em> và nhấn biểu tượng
                        dấu <strong>+</strong> để thêm vị trí&nbsp;
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chọn vị trí cụ thể muốn cài đặt, sau đó điều chỉnh bán
                        kính chấm công và chọn lệnh “Ghim lại” để vị trí vừa cài
                        đặt được lưu.&nbsp;
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cách cập nhật vị trí qua app PC365 CÔNG TY
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <span style={{ color: '#FF0000' }}>
                        <strong>(*) </strong>
                      </span>
                      <em>
                        <strong>Cài đặt chấm công bằng website</strong>
                      </em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Có thể thiết lập chế độ chấm công trên tài khoản nhân viên
                      và chế độ chấm công trên tài khoản công ty để áp dụng chấm
                      công.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Thiết lập chấm công Nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tích chọn Chấm công nhân viên để cập nhật cấu hình chấm
                      công bằng tài khoản nhân viên. Nhân viên đã có thể mở tài
                      khoản chamcong của mình trên web để chấm công với điều
                      kiện máy tính phải có camera. Công ty có thể cài giới hạn
                      IP chấm công để nhân viên chấm công bằng tài khoản cá nhân
                      theo IP đã được cài đặt. Để thực hiện cài, tích chọn Giới
                      hạn IP chấm công ở cấu hình chấm công nhân viên.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Thiết lập chấm công Công ty
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn vào Chấm công công ty: cập nhật cấu hình chấm công,
                      sử dụng tài khoản công ty để chấm công nhân diện khuôn mặt
                      cho toàn bộ nhân viên trong công ty.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Có thể thiết lập giới hạn IP chấm công: tích chọn vào ô
                      lệnh Giới hạn IP chấm công.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <span style={{ color: '#FF0000' }}>
                        <strong>(*)</strong>
                      </span>{' '}
                      <em>
                        <strong>Chấm công bằng mã QR</strong>
                      </em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <strong>
                        <u>Bước 1:</u>
                      </strong>{' '}
                      Cài đặt cấu hình chấm công bằng mã QR
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tài khoản công ty chỉ cần tích chọn vào ô cấu hình Chấm
                      công bằng mã QR thì các tài khoản nhân viên thuộc công ty
                      đã có thể chấm bằng mã QR.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>
                        <strong>Bước 2</strong>
                      </u>
                      : Thiết lập danh sách vị trí để chấm công bằng QR
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;- Nhấn vào lệnh <em>Thêm vị trí</em>&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhập <em>địa chỉ </em>và <em>bán kính</em> cho phép chấm
                      công tại địa chỉ đó
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm vị trí chấm công QR'
                  height={666}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-vi-tri-cham-cong-qr(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm vị trí chấm công QR</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhấn <em>ghim lại</em> để lưu vị trí và nhận mã QR được
                      tạo.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhấn lệnh Tùy chọn bên cạnh mã QR cho phép bạn:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
                marginLeft: '40px',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Xem Thông tin mã QR
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
                marginLeft: '40px',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tải mã QR về máy
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
                marginLeft: '40px',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + In mã QR để tiện sử dụng lưu động
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
                marginLeft: '40px',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Xóa mã QR. Việc xóa mã QR cũng đồng thời xóa toàn bộ
                      thông tin vị trí chấm công vừa cài đặt.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tùy theo nhu cầu mở cài đặt chấm công ở nhiều vị trí khác
                      nhau, bạn chỉ cần nhấp vào lệnh <em>Thêm vị trí</em> và
                      thực hiện quy trình nêu trên để thêm nhiều vị trí cho phép
                      chấm công bằng mã QR. Với mỗi mã QR sinh ra, việc chấm
                      công sẽ được ghi nhấn khi bạn chấm đúng mã QR của vị trí
                      cụ thể đó.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt chấm công QR'
                  height={461}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-vi-tri-cham-cong-qr.jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt chấm công QR</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-ca-lam-viec'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='1_3'>
                      1.3.&nbsp; Cài đặt Ca làm việc
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Từ page Chấm công, bạn chọn danh mục{' '}
                      <strong>Lịch làm việc</strong> &gt; đến trang Quản lý lịch
                      làm việc. Tại đây, hãy chọn mục Ca làm việc để cài đặt các
                      các làm việc cho nhân viên.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Ngoài ra, có thể đi từ page Tính lương &gt; chọn Cài đặt
                      &gt; Cài ca và lịch làm việc &gt; Ca làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn <strong>Thêm ca</strong> và thiết lập các cài đặt
                      cho ca làm việc:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài ca làm việc'
                  height={738}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-ca-lam-viec.jpg'
                  width={800}
                />{' '}
                <figcaption>Cài ca làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhập tên ca làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cài giờ vào ca và giờ ra ca
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cài đặt giới hạn thời gian: phần này không bắt buộc. Nếu
                      cài đặt, bạn cài thời gian cho phép nhân viên được: check
                      in sớm nhất và checkout muộn nhất.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn loại&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sau khi thiết lập xong, hệ thống sẽ đưa bạn đến quy trình
                      tiếp theo – Thiết lập lịch làm việc. Tại thông báo xác
                      nhận bạn có muốn thiết lập lịch làm việc ngay không, bạn
                      chọn Yes để chuyển đến cài Lịch làm việc.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Hoàn thành thiết lập ca làm việc'
                  height={349}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/hoan-thanh-thiet-lap-ca-lam-viec.jpg'
                  width={800}
                />{' '}
                <figcaption>Hoàn thành thiết lập ca làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-lich-lam-viec'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='1_4'>
                      1.4. Cài đặt lịch làm việc
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Truy cập quản lý lịch làm việc để thiết lập bằng 2
                      cách:&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cách 1: đi từ quy trình thiết lập hoàn thành Ca làm việc
                      (Ca làm việc &gt; Lịch làm việc)
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cách 2: chọn <em>Cài ca và lịch làm việc</em> &gt; chọn{' '}
                      <em>Lịch làm việc &gt; Thêm lịch</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt lịch làm việc'
                  height={745}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/Cai-lich-lam-viec.jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt lịch làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              &nbsp;
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <strong>
                        <u>Bước 1</u>
                      </strong>
                      : Thiết lập Lịch làm việc mới
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Đặt tên lịch làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn lịch làm việc: chọn một trong 3 lịch theo lịch đi
                      làm của công ty bạn
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Thứ 2 – thứ 6
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Thứ 2 – thứ 7
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Thứ 2 – chủ nhật
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thiếp lập chọn lịch làm việc'
                  height={219}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/Chon-lich.jpg'
                  width={800}
                />{' '}
                <figcaption>Thiếp lập chọn lịch làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn tháng áp dụng lịch
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn ngày bắt đầu áp dụng lịch cho tháng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Thông thường áp dụng từ ngày mùng 1 đầu tháng
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Tùy sự thay đổi lịch trong tháng để cài thời gian bắt
                        đầu cho phù hợp.
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhấn <em>Tiếp tục</em>&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Tạo lịch làm việc'
                  height={554}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/Tao-lich-lam-viec.jpg'
                  width={800}
                />{' '}
                <figcaption>Tạo lịch làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn ca làm việc đã thiết lập ở bước Ca làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Có nghĩa là lịch này sẽ áp dụng đối với các ca sẽ chọn
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Tích vào ca làm việc mà bạn muốn áp dụng'
                  height={331}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/tich-chon-ca-ap-dung.jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Tích vào ca làm việc mà bạn muốn áp dụng
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>
                        <strong>Bước 2</strong>
                      </u>
                      : Tạo chu kỳ cho lịch làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Bạn tích vào ngày bên trên. Tiếp theo tích vào ca làm
                      việc bên dưới để chọn ca làm việc tương ứng với ngày hôm
                      đó.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Ví dụ dựa theo hình ảnh minh họa:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Số 2 ở các ngày thể hiện ngày làm việc 2 ca theo thiết
                      lập, gồm cài ca sáng, ca chiều.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nếu công ty áp dụng lịch đi làm từ thứ 2 đến hết sáng
                      thứ 7, vậy bạn tích chọn vào từng ngày thứ 7 trong tháng
                      để chọn ca làm việc sáng cho các thứ 7 đó.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chẳng hạn, tích chọn vào ngày 01/7, sau đó bỏ chọn ca
                      chiều, chỉ tích chọn ca sáng. Hệ thống sẽ ghi nhận ngày
                      1/7, nhân viên được add vào lịch này sẽ đi làm ca sáng.
                      Đồng thời số ca ở ngày 1/7 sẽ thay đổi về số 1 thể hiện
                      ngày này đi làm 1 ca sáng.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài chu ky cho lịch làm việc'
                  height={758}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-chu-ky-cho-lich-lam-viec.jpg'
                  width={800}
                />{' '}
                <figcaption>Cài chu ky cho lịch làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Thiết lập xong, chọn lệnh <em>Tạo chu kỳ</em> để áp dụng
                      lịch cho toàn bộ tháng 7 và toàn bộ nhân viên được add vào
                      lịch.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>
                        <strong>Bước 3</strong>
                      </u>
                      : Tùy chọn với Lịch làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Với lịch đã được thiết lập, bạn có thể thực hiện tiếp các
                      điều chỉnh, thiết lập:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <em style={{}}>
                <strong>
                  <span style={{ color: 'rgb(255, 0, 0)' }}>(*)&nbsp;</span>
                </strong>
              </em>
              <em>
                <span style={{}}>
                  <span>
                    <span>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Thêm nhân viên vào lịch làm việc
                      </span>
                    </span>
                  </span>
                </span>
              </em>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Tại bảng lịch làm việc, bạn chọn dấu (...) ỏ trên góc
                      bảng để hiển thị các tùy chọn.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn lệnh{' '}
                      <em>
                        <strong>Thêm nhân viên</strong>
                      </em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm nhân viên vào lịch làm việc'
                  height={523}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-nhan-vien-vao-lich-lam-viec.jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm nhân viên vào lịch làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Popup <em>Thêm mới nhân viên</em> xuất hiện, thêm nhân
                      viên vào lịch theo 2 cách:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Add nhân viên mới vào lịch'
                  height={553}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-nhan-vien-moi-vao-lich.jpg'
                  width={800}
                />{' '}
                <figcaption>Add nhân viên mới vào lịch</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cách 1: Tích chọn nhân viên trong hệ thống đã được hiển
                      thị sẵn, bạn có thể dùng thanh tìm kiếm theo tên để tìm
                      nhân viên nhanh hơn
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tích vào tên nhân viên cần add vào lịch &gt; Nhấn Chọn
                      &gt;Nhận thông báo Thêm nhân viên thành công.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cách 2: Add danh sách những nhân viên sẽ áp dụng theo
                      lịch làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul style={{ marginLeft: '40px' }}>
              {' '}
              <li style={{}}>
                Chọn lệnh <em>Add file nhân viên</em> &gt; Nhấn{' '}
                <em>Tải file mẫu</em> để điền danh sách nhân viên theo đúng
                mẫu&nbsp;hệ thống
              </li>{' '}
              <li style={{}}>
                Chọn vào <em>Browe file</em> để tải file mẫu đã có danh sách
                nhân viên lên&nbsp;
              </li>{' '}
              <li style={{}}>
                Nhấn lệnh <em>Thêm nhân viên </em>để hoàn tất, toàn bộ nhân viên
                trong file sẽ được add vào lịch.
              </li>{' '}
            </ul>{' '}
            <p style={{}}>
              Lưu ý: Những nhân viên đã được xét lịch làm việc cụ thể sẽ không
              thể tạo thêm vào bất kỳ lịch làm việc nào khác.
            </p>{' '}
            <p style={{}}>
              <em>
                <strong>
                  <span style={{ color: '#FF0000' }}>(*) </span>
                </strong>
                Xem Danh sách nhân viên đã được add vào lịch làm việc
              </em>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn <em>Danh sách nhân viên </em>ở bảng tùy chọn{' '}
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Xuất hiện bảng danh danh các nhân viên được áp dụng lịch
                      làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Tại danh sách, bạn có thể Xóa nhân viên ra khỏi lịch
                      bằng cách nhấn vào biểu tượng xóa&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Danh sách nhân viên'
                  height={332}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/danh-sach-nhan-vien.jpg'
                  width={800}
                />{' '}
                <figcaption>Danh sách nhân viên trong lịch làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <em style={{}}>
                <strong>
                  <span style={{ color: 'rgb(255, 0, 0)' }}>(*)&nbsp;</span>
                </strong>
              </em>
              <em>
                <span style={{}}>
                  <span>
                    <span>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chỉnh sửa lịch
                      </span>
                    </span>
                  </span>
                </span>
              </em>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cho phép chỉnh sửa lại lịch làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <em style={{}}>
                <strong>
                  <span style={{ color: 'rgb(255, 0, 0)' }}>(*)&nbsp;</span>
                </strong>
              </em>
              <em>
                <span style={{}}>
                  <span>
                    <span>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Sao chép lịch làm việc
                      </span>
                    </span>
                  </span>
                </span>
              </em>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Sao chép để áp dụng lịch tương tự vào tháng theo nhu
                      cầu.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn lệnh <em>Sao chép lịch làm việc</em> &gt; Chọn
                      tháng cần áp dụng &gt; Nhấn<em> Lưu lại</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Lưu ý: Những nhân viên đã được xét lịch làm việc trong
                      tháng áp dụng sẽ không được cài đặt trong lịch làm việc
                      sao chép này. Bạn cần thực hiện thao tác add lại nhân viên
                      vào lịch được sao chép.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <em style={{}}>
                <strong>
                  <span style={{ color: 'rgb(255, 0, 0)' }}>(*)&nbsp;</span>
                </strong>
              </em>
              <em>
                <span style={{}}>
                  <span>
                    <span>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Xóa lịch làm việc
                      </span>
                    </span>
                  </span>
                </span>
              </em>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn lệnh xóa lịch làm việc thì toàn bộ lịch sẽ bị xóa
                      hoàn toàn, bao gồm cả các cài đặt trong đó.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-cong-chuan-cua-thang'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='1_5'>
                      1.5. Cài đặt Công chuẩn của tháng
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Link cài đặt:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://tinhluong.timviec365.vn/quan-ly-lich-lam-viec.html?t=1'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://tinhluong.timviec365.vn/quan-ly-lich-lam-viec.html?t=1
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Công ty sẽ cài số công làm việc chuẩn cho từng tháng, được
                      biểu thị ra bằng số ngày công của nhân viên trong mỗi
                      tháng và ảnh hưởng tới việc hệ thống tính lương cho nhân
                      viên theo từng công.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Ví dụ: Nhân viên A lương 10 triệu, số công chuẩn tháng 5
                      là 25 công.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Vậy suy ra: 1 công làm việc sẽ nhận mức lương là 400.000.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Việc xét đầy đủ các yếu tố về lương, số công chuẩn sẽ giúp
                      cho việc tính lương chính xác, nhanh chóng.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Công chuẩn dược thiết lập dựa vào lịch làm việc đã tạo cho
                      các tháng. Do đó, muốn thiết lập công chuẩn cho tháng nào,
                      bạn chọn tìm kiếm tháng đó rồi nhập công chuẩn cho tháng
                      dựa theo số công đã thiết lập ở lịch làm việc. Nhấn{' '}
                      <em>Lưu công chuẩn</em>.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Nhập vào công chuẩn'
                  height={468}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/nhap-cong-chuan.jpg'
                  width={800}
                />{' '}
                <figcaption>Nhập vào công chuẩn</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để chỉnh sửa số công chuẩn, chỉ cần nhập lại số công vào ô
                      công chuẩn và nhấn lại lệnh Lưu công chuẩn là được.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cap-nhat-lai-khuon-mat'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='1_6'>
                      1.6. Cập nhật lại khuôn mặt
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Truy cập ứng dụng chấm công công ty, đến trang:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://chamcong.timviec365.vn/quan-ly-cong-ty.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://chamcong.timviec365.vn/quan-ly-cong-ty.html
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn danh mục <em>Cập nhật lại khuôn mặt</em> &gt;{' '}
                      <em>Cho phép cập nhật khuôn mặt</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tại phần này, toàn bộ danh sách nhân viên công ty sẽ được
                      hiển thị. Bạn có thể phân quyền cho họ được phép cập nhật
                      khuôn mặt bằng cách tích chọn vào ô vuông ở cột{' '}
                      <u>Quyền</u>. Bỏ chọn có nghĩa là nhân viên đó không được
                      cấp quyền cập nhật khuôn mặt.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Ví dụ từ hình ảnh minh họa:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Duyệt cho phép cập nhật khuôn mặt'
                  height={403}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cho-phep-cap-nhat-khuon-mat.jpg'
                  width={800}
                />{' '}
                <figcaption>Duyệt cho phép cập nhật khuôn mặt</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhân viên Đặng Minh Hiếu không được cho phép cập nhật
                      khuôn mặt
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhân viên Trần Phúc Long, Vũ Hoàng Minh, Nguyễn Bảo
                      Ngọc, Hoàng Bảo Trang, ... được cho phép cập nhật khuôn
                      mặt. Do đó, khi chấm công khó khăn, các nhân viên này có
                      thể truy cập vào app chấm công và mở phần tiện ích cập
                      nhật lại khuôn mặt để cập nhật lại.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='duyet-thiet-bi-moi-khi-cham-cong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='1_7'>
                      1.7. Duyệt thiết bị mới khi chấm công&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Có hai trường hợp:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Khi nhân viên được tạo bằng tài khoản công ty sẽ không
                      cần phải duyệt thiết bị chấm công
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Khi nhân viên tự tạo tài khoản thông qua nhập ID công ty
                      thì tài khoản sau khi được tạo cần phải duyệt thiết bị
                      chấm công.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để duyệt cho thiết bị đăng nhập tài khoản nhân viên đó
                      được phép chấm công, doanh nghiệp cần thực hiện:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chọn danh mục Cập nhật lại khuôn mặt &gt; Chờ duyệt
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Tích chọn vào tài khoản được duyệt chấm công
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Nhấn lệnh Duyệt
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Duyệt cho nhân viên có thể chấm được công'
                  height={404}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/Duyet-nhan-vien-cham-cong.jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Duyệt cho nhân viên có thể chấm được công
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='xuat-cong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='1_8'>
                      1.8. Xuất công
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Phần mềm chấm công &gt; <strong>Xuất công</strong>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Công sẽ được xuất theo từng nhân viên hoặc theo phòng ban,
                      theo toàn bộ nhân viên trong công ty tùy theo chọn lọc của
                      bạn tại các trường lọc.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Thông tin được lọc sẽ hiển thị trong danh sách với đầy đủ,
                      chi tiết thời gian chấm công vào và ra, giúp công ty dễ
                      kiểm soát tình trạng đi muộn về sớm, thiếu công của từng
                      nhân viên.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sau khi lọc theo đúng ý, bạn chọn lệnh Xuất công để lưu
                      giữ bản cứng về máy.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h2
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='quan-ly-cong-ty'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2'>
                      2. Quản lý công ty&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </h2>{' '}
            <p
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Từ page chấm công, bạn chọn danh mục Quản lý công
                      ty.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tại đây, bạn có thể Quản lý ca làm việc, Quản lý công ty
                      con, Quản lý phòng ban, cài đặt thêm nhân viên, quyền truy
                      cập và đi muộn về sớmản{' '}
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='quan-ly-ca-lam-viec'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-9785a806-7fff-168e-7352-f0b84c6a1e50'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2_1'>
                      2.1. Quản lý ca làm việc
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tại đây, bạn có thể thêm ca làm việc mới hoặc chỉnh sửa,
                      xóa các ca đã thiết lập từ trước. Cách thêm tương tự như
                      hướng dẫn ở phần 1.3. Cài đặt ca làm việc.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Muốn chỉnh sửa hoặc xóa các ca đã thiết lập, bạn đưa chuột
                      vào ca làm việc đó để hiển thị hai chức năng Chỉnh sửa –
                      xóa và chọn theo nhu cầu.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Tùy chọn cài đặt ca làm việc'
                  height={327}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/tuy-chon-cai-dat-ca-lam-viec(2).jpg'
                  width={800}
                />{' '}
                <figcaption>Tùy chọn cài đặt ca làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sửa ca làm việc sẽ điều chỉnh là các yếu tố cài đặt trước
                      đó. Ví dụ ở ca đã thiết lập chưa cài đặt giới hạn thời
                      gian, bạn chọn Sửa ???? xuất hiện Popup Sửa ca làm việc
                      ???? Cài đặt giới hạn thời gian ???? nhấn Cập nhật.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Sửa ca làm việc '
                  height={636}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/sua-ca-lam-viec(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Sửa ca làm việc</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-quan-ly-cong-ty-con'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      2.2. Cài đặt Quản lý công ty con
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn danh mục Quản lý công ty con hoặc click vào đường
                      link:&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://chamcong.timviec365.vn/quan-ly-cong-ty/cong-ty-con.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://chamcong.timviec365.vn/quan-ly-cong-ty/cong-ty-con.html
                      </span>
                    </a>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn lệnh Thêm công ty để thêm công ty con
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm công ty con'
                  height={607}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-cong-ty-con(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm công ty con</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Điền các trường thông tin của công ty con:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tải logo công ty con nếu có
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Điền tên công ty
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhập email công ty
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Điền số điện thoại, địa chỉ.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Bấm lệnh Thêm công ty
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Lưu ý:&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Password của công ty con mới thêm sẽ được gửi về email
                      của công ty đó.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Công ty con được tạo sẽ có ID và xuất hiện trong danh
                      sách công ty con
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Để chỉnh sửa thông tin công ty con, bạn click vào lệnh
                      Sửa để điều chỉnh.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-quan-ly-phong-ban'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2_3'>
                      2.3. Cài đặt Quản lý phòng ban
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn vào danh mục Quản lý phòng ban hoặc click đường link:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://chamcong.timviec365.vn/quan-ly-cong-ty/phong-ban.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://chamcong.timviec365.vn/quan-ly-cong-ty/phong-ban.html
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul style={{ marginLeft: '40px' }}>
              {' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Thiết lập Cấu trúc phòng ban
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Có thể thiết lập phòng ban cho công ty mẹ hoặc công ty
                      con. Chọn công ty con cần thiết lập hoặc không chọn sẽ mặc
                      định các thiết lập sau đó sẽ tạo cho công ty mẹ.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cách thiết lập:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhấn lệnh Thêm phòng ban
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhập tên phòng ban cần thêm ở Popup hiển thị
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhấn Xác nhận, phòng ban mới sẽ được tạo.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cấu trúc phòng ban'
                  height={232}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cau-truc-phong-ban(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/cau-truc-phong-ban(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cấu trúc phòng ban</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <ul style={{ marginLeft: '40px' }}>
              {' '}
              <li
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Thiết lập tổ và nhóm
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tùy vào sự phân chia cấu trúc của các bộ phận trong phòng
                      ban để xây dựng tổ, nhóm cho phù hợp. Nếu không xây dựng
                      các tổ hoặc nhóm thì không cần thiết lập các phần
                      này.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Tạo thêm Tổ
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Danh mục Tổ &gt; Thêm mới tổ
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm mới cho tổ'
                  height={126}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-moi-to(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/them-moi-to(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm mới cho tổ</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Xuất hiện bảng Thêm mới tổ: Chọn phòng ban cần thiết lập
                      tổ và đặt tên tổ&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhấn Xác nhận
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm tổ vào các phòng ban'
                  height={433}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/Them-moi-to-2(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/Them-moi-to-2(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm tổ vào các phòng ban</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      =&gt; Thực hiện quy trình thêm tổ tương tự cho các phòng
                      ban khác cần thêm tổ
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Tạo thêm Nhóm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Mục <strong>Nhóm</strong> &gt; <em>Thêm mới nhóm</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm mới nhóm'
                  height={130}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-moi-nhom(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/them-moi-nhom(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm mới nhóm</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Điền thông tin cài đặt tại bảng popup{' '}
                      <em>Thêm mới nhóm</em>: chọn Phòng ban &gt; chọn Tổ (thuộc
                      phòng ban) &gt; Đặt tên nhóm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhấn Xác nhận
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm nhóm mới'
                  height={502}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-moi-nhom-2(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/them-moi-nhom-2(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm nhóm mới</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Thêm nhân viên vào các phòng ban/tổ/nhóm
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Yêu cầu: Cấu trúc phòng ban đã thiết lập ban đầu sẽ không
                      có nhân viên trong các phòng ban đó. Bạn cần tiến hành
                      thêm nhân viên vào các phòng và sắp xếp vào tổ, nhóm thuộc
                      phòng ban.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để thực hiện, bạn truy cập danh mục Quản lý nhân viên từ
                      page chấm công. Hoặc vào theo đường link:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://chamcong.timviec365.vn/quan-ly-cong-ty/nhan-vien.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://chamcong.timviec365.vn/quan-ly-cong-ty/nhan-vien.html
                      </span>
                    </a>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài nhân viên vào các phòng ban'
                  height={703}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-nhan-vien-vao-cac-phong-ban(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-nhan-vien-vao-cac-phong-ban(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cài nhân viên vào các phòng ban</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Danh sách nhân viên trong công ty được hiển thị, bạn sẽ
                      thêm từng nhân viên vào các phòng ban/tổ/nhóm cụ thể bằng
                      cách:&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhấn lệnh chỉnh sửa ở nhân viên cần thêm vào phòng
                      ban.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm nhân viên vào phòng ban'
                  height={305}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/them-nhan-vien-vao-phong-ban(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm nhân viên vào phòng ban</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Bảng cập nhật thông tin nhân viên xuất hiện, chọn phòng
                      ban, chọn tổ và nhóm thuộc phòng ban đó (nếu có thiết
                      lập).
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhấn <em>Cập nhật</em> để thêm nhân viên vào cấu trúc
                      phòng ban.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Chọn phòng ban'
                  height={630}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/chon-phong-ban(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/chon-phong-ban(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Chọn phòng ban</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;- Sau khi cập nhật xong tình trạng phòng ban cho
                      từng nhân viên, thông tin phòng ban sẽ được hiển thị ở
                      danh sách nhân viên.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cập nhật phòng ban cho nhân viên'
                  height={468}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/cap-nhat-phong-ban-cho-nhan-vien(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/cap-nhat-phong-ban-cho-nhan-vien(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cập nhật phòng ban cho nhân viên</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-them-nhan-vien-moi'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2_4'>
                      2.4. Cài đặt thêm nhân viên mới
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Khi công ty tuyển dụng nhân viên mới, nhân viên sẽ được
                      thêm vào danh sách nhân viên công ty trên hệ thống chuyển
                      đổi số timviec365, thuộc quản lý của tài khoản công ty
                      đó.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để thêm nhân viên mới, có hai cách thực hiện:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <strong>
                <span
                  style={{
                    color: 'rgb(255, 0, 0)',
                    fontFamily: 'arial, helvetica, sans-serif',
                    fontSize: '14px',
                  }}>
                  (*){' '}
                </span>
              </strong>
              <span style={{}}>
                <span>
                  <span>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <em>Cách 1</em>: Nhân viên tự tạo tài khoản trên ứng dụng
                      chamcong.timviec365.vn và add ID công ty vào. Lúc này, tài
                      khoản của nhân viên sẽ được hệ thống đẩy vào danh sách Chờ
                      duyệt tài khoản chấm công. Tài khoản công ty sẽ chọn mục
                      Quản lý nhân viên ? Chờ duyệt và duyệt tài khoản để nhân
                      viên trở thành nhân viên của công ty.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <strong>
                        <span style={{ color: '#FF0000' }}>(*)</span>{' '}
                      </strong>
                      <em>Cách 2</em>: Tài khoản công ty tạo cho nhân viên tài
                      khoản chấm công
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 1</u>: Chọn danh mục Quản lý nhân viên &gt; Chọn
                      Thêm nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm nhân viên mới'
                  height={420}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-nhan-vien-moi(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/them-nhan-vien-moi(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm nhân viên mới</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 2</u>: Điền thông tin cho nhân viên mới theo các
                      trường yêu cầu
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Hoàn tất tạo nhân viên mới'
                  height={616}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/hoan-tat-tao-tai-khoan-nhan-vien-moi(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/hoan-tat-tao-tai-khoan-nhan-vien-moi(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Hoàn tất tạo nhân viên mới</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-bien-dong-nhan-su'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2_5'>
                      2.5. Cài đặt biến động nhân sự
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cài đặt thực hiện tại ứng dụng Quản trị nhân sự
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Đường link truy cập:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://phanmemnhansu.timviec365.vn/quan-ly-chung.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://phanmemnhansu.timviec365.vn/quan-ly-chung.html
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h4
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='luan-chuyen-cong-tac'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2_5_1'>
                      2.5.1. Luân chuyển công tác
                    </span>
                  </span>
                </span>
              </span>
            </h4>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 1</u>: Thực hiện quy trình: Quản lý hành chính
                      &gt; Biến động nhân sự &gt; Luân chuyển công tác
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Quản lý nhân viên'
                  height={777}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/quan-ly-nhan-vien(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/quan-ly-nhan-vien(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Quản lý nhân viên</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 2</u>: Chọn <em>Thêm mới luân chuyển công tác</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 3</u>: Khai báo, cập nhật các thông tin theo bảng
                      nội dung yêu cầu để thực hiện luân chuyển&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm luân chuyển công tác'
                  height={784}
                  className=' lazyloaded'
                  src='https://timviec365.vn/pictures/images_06_2023/them-luan-chuyen-cong-tac(1).jpg'
                  src='https://timviec365.vn/pictures/images_06_2023/them-luan-chuyen-cong-tac(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm luân chuyển công tác</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Đơn vị đang công tác hiện tại: Chọn công ty mà nhân viên
                      đang làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn phòng ban hiện tại đang làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn nhân viên cần thực hiện luân chuyển công tác
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn chức vụ của nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn đơn vị công tác mới: nơi nhân viên sẽ được chuyển
                      đến làm việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn phòng ban mới sẽ chuyển nhân viên về&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn tổ, nhóm nếu có
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn chức vụ mới cho nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn thời gian bắt đầu luân chuyển
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn quy định: không bắt buộc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Trình bày nội dung nhiệm vụ công việc mới
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Viết ghi chú nếu cần
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      =&gt; Nhấn Đồng ý, nhân viên sẽ được luân chuyển theo
                      thiết lập
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h4
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='giam-bien-che'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2_5_2'>
                      2.5.2. Giảm biên chế
                    </span>
                  </span>
                </span>
              </span>
            </h4>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 1</u>: Chọn Biến động nhân sự &gt; Giảm biên chế
                      &gt; Thêm mới giảm biên chế
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Giảm biên chế'
                  height={335}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/giam-bien-che.jpg'
                  width={800}
                />{' '}
                <figcaption>Giảm biên chế</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 2</u>: Điền thông tin thêm mới giảm biên chế&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn hoàn thành các trường thông tin sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tên nhân viên:{' '}
                      <span style={{}}>
                        <span>
                          <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                            <span
                              style={{
                                fontVariantNumeric: 'normal',
                                fontVariantEastAsian: 'normal',
                                fontVariantAlternates: 'normal',
                                verticalAlign: 'baseline',
                              }}>
                              Khi đã chọn nhân viên, các trường thông tin có
                              liên quan đến nhân viên, đã được cài đặt cho tài
                              khoản nhân viên đó sẽ mặc định được hiển thị, bao
                              gồm chức vụ hiện tại, phòng ban, đơn vị công
                              tác.&nbsp;
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Bạn chọn thời gian bắt đầu cho nhân viên nghỉ việc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn ca nghỉ
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Hình thức nghỉ: chọn 1 trong 2 hình thức tùy theo tình
                      trạng thực tế, gồm giảm biên chế (tức công ty cho nhân
                      viên nghỉ) hoặc nghỉ việc (nhân viên chủ động nghỉ việc).
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn quy định áp dụng: nếu có, phần này không bắt buộc.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Người cài đặt cho nhân viên nghỉ sẽ ghi rõ lý do nghỉ
                      việc của nhân viên là gì.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      =&gt; Nhấn{' '}
                      <strong>
                        <em>Đồng ý</em>
                      </strong>
                      , nhân viên đã được chuyển từ danh sách nhân viên công ty
                      vào danh sách nghỉ việc, đồng thời tài khoản của nhân viên
                      đó cũng không còn nằm trong hệ thống quản trị của công
                      ty.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              style={{
                listStyleType: 'disc',
                fontSize: '11pt',
                fontFamily: 'Arial',
                fontVariantNumeric: 'normal',
                fontVariantEastAsian: 'normal',
                fontVariantAlternates: 'normal',
                verticalAlign: 'baseline',
                whiteSpace: 'pre',
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      =&gt;{' '}
                    </span>
                  </span>
                </span>
              </span>
              <span
                style={{
                  color: 'rgb(85, 85, 85)',
                  fontFamily: 'Roboto',
                  fontSize: '17px',
                  letterSpacing: '0.34px',
                  textIndent: '20px',

                  backgroundColor: 'rgb(242, 242, 242)',
                }}>
                Chọn vào Thêm lương
              </span>
              <span style={{}}>
                <span>
                  <span>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn có thể xuất file excel danh sách các nhân viên nghỉ
                      việc theo mục đích sử dụng.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h4
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='nghi-viec-sai-quy-dinh'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2_5_3'>
                      2.5.3. Nghỉ việc sai quy định
                    </span>
                  </span>
                </span>
              </span>
            </h4>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Đối với những nhân viên nghỉ việc không đúng quy định của
                      công ty sẽ được đưa vào danh sách Nghỉ việc sai quy định.
                      Hệ thống đối chiếu danh sách này với quy định xử lý nhân
                      viên nghỉ sai quy định để tính toán lương chính xác.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Do đó, nếu có nhân viên nghỉ việc sai quy định, tài khoản
                      công ty sẽ đưa nhân viên đó vào danh sách theo thao tác
                      đơn giản sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Biến động nhân sự &gt; Nghỉ việc sai quy định &gt; Thêm
                      mới nghỉ việc sai quy định
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Điền thông tin của nhân viên và ngày bắt đầu nghỉ
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h4
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='bo-nhiem-quy-hoach'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='2_5_4'>
                      2.5.4. Bổ nhiệm, quy hoạch
                    </span>
                  </span>
                </span>
              </span>
            </h4>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn lệnh <em>Thêm mới bổ nhiệm, quy hoạch</em>&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Điền thông tin tại bảng Popup
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn nhân viên được bổ nhiệm, quy hoạch &gt; đồng thời
                      các thông tin thuộc về ứng viên sẽ tự động được cập nhật
                      (chức vụ, phòng ban)
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn chức vụ sẽ quy hoạch bổ nhiệm nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn phòng ban mới nhân viên được bổ nhiệm, quy hoạch
                      đến làm việc ở chức vụ mới.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn thời gian chính thức được quy hoạch bổ nhiệm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn quy định: không bắt buộc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nêu rõ lý do cho việc bổ nhiệm, quy hoạch
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhấn <em>Đồng ý</em> để hoàn tất.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Nhân viên sau khi được bổ nhiệm, quy hoạch sẽ xuất hiện
                      trong danh sách Bổ nhiệm, quy hoạch để tiện theo dõi thông
                      tin.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h2
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-luong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3'>
                      3. Cài đặt lương
                    </span>
                  </span>
                </span>
              </span>
            </h2>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-nhap-luong-co-ban'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_1'>
                      3.1. Cài đặt nhập lương cơ bản
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Truy cập tính lương bằng hai cách:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cách 1: Truy cập từ giao diện phần mềm Quản trị nhân
                      sự&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn <em>Lương thưởng và phúc lợi</em> &gt; Tính lương
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn sẽ được dẫn đến giao diện&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt lương thưởng phúc lợi'
                  height={584}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/luong-thuong-phuc-loi(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt lương thưởng phúc lợi</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;Cách 2: Truy cập từ ứng dụng Tính lương
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Link truy cập:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://tinhluong.timviec365.vn/quan-ly-nhan-su.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://tinhluong.timviec365.vn/quan-ly-nhan-su.html
                      </span>
                    </a>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn sẽ được dẫn ngay đến page Tính lương.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Ứng dụng tính lương'
                  height={827}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/ung-dung-tinh-luong(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Ứng dụng tính lương</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cách thực hiện cài lương cho nhân viên:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 1</u>: Tại page Tính lương, chọn vào mục{' '}
                      <strong>
                        <em>Nhập lương cơ bản và chế độ</em>
                      </strong>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Danh sách nhân viên hiển thị với các thông tin về mức
                      lương, loại hợp đồng.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 2</u>: Nhập lương cơ bản cho nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Cách 1: Nhập cùng lúc nhiều nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn vào tính năng Nhập lương cơ bản
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Nhập lương cơ bản'
                  height={191}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/nhap-luong-co-ban(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Nhập lương cơ bản</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Add file lương cơ bản nếu đã có file lương theo mẫu hoặc
                      tải file mẫu về điền theo hướng dẫn sau đó add file lương
                      cơ bản.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Add file lương để cài đặt lương'
                  height={524}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/add-file-luong(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Add file lương để cài đặt lương</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + File mẫu cần điền đúng ID Nhân viên, họ và tên, lương cơ
                      bản và ngày tháng áp dụng.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='File lương mẫu'
                  height={550}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/file-luong-mau(1).jpg'
                  width={800}
                />{' '}
                <figcaption>File lương mẫu</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Cách 2: Nhập lương cho từng nhân viên cụ thể
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhấp chuột vào tên của nhân viên cần nhập lương trong
                      Danh sách nhân viên&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      =&gt; Xuất hiện giao diện Hồ sơ nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhập lương cơ bản:&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Chọn vào <em>Thêm lương</em>
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm lương cơ bản'
                  height={113}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/them-luong-co-ban(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm lương cơ bản</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <ul dir='ltr' style={{ marginLeft: '40px' }}>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Điền thông tin để thêm mức lương cơ bản theo gợi ý, các
                        trường bắt buộc gồm nhập lương cơ bản và thời gian áp
                        dụng.
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Nhấn <em>Lưu</em> =&gt; lương cơ bản của nhân viên sẽ
                        được thêm
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm mức lương cơ bản'
                  height={773}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/them-muc-luong-co-ban(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm mức lương cơ bản</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-thiet-lap-phat-di-muonve-som'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_2'>
                      3.2. Cài đặt thiết lập phạt đi muộn/về sớm
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Truy cập phần mềm tính lương &gt; chọn Cài đặt &gt; Đi
                      muộn về sớm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn mục Cài đặt đi muộn về sớm &gt; nhấn{' '}
                      <em>Thêm mới</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt chế độ phạt đi muộn về sớm'
                  height={325}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-di-muon-ve-som(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt chế độ phạt đi muộn về sớm</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Xuất hiện bảng Thêm mới mức phạt đi muộn về sớm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn điền các thông tin sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Lý do phạt là gì? Chọn Đi muộn hay về sớm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Áp dụng cho ca làm việc nào?
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Số phút áp dụng mức phạt
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Loại phạt: chọn Phạt tiền hay Phạt công
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhập vào con số phạt theo tiền hoặc công dựa trên loại
                      phương thức phạt
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Thời gian bắt đầu áp dụng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Thời gian kết thúc áp dụng: không bắt buộc, nếu không
                      chọn thì mặc định mức cài phạt đang set sẽ áp dụng cho đến
                      khi thay đổi cài đặt.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn <em>Lưu </em>để thêm mức phạt thành công.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Mức phạt này sẽ hiển thị trong danh sách các mức phạt đi
                      muộn về sớm để bạn tiện theo dõi. Đồng thời có thể chỉnh
                      sửa lại hoặc xóa mức phạt.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt các mức phạt cho đi muộn về sớm'
                  height={357}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-muc-phat-di-muon-ve-som(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt các mức phạt cho đi muộn về sớm</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-bao-hiem'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_3'>
                      3.3. Cài đặt Bảo hiểm
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Truy cập phần mềm tinhluong.timviec365.vn để cài đặt bảo
                      hiểm, các thao tác cần chọn như sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn danh mục Dữ liệu tính lương &gt; Bảo hiểm&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhập tiền bảo hiểm: click vào dấu ba chấm ở ô Nhập tiền
                      bảo hiểm &gt; chọn Thêm nhân viên. Có thể áp dụng cho từng
                      nhân viên hoặc áp dụng theo các nhóm nếu có chung các mức
                      tiền bảo hiểm. Chọn nhân viên nào tích vào nhân viên đó
                      hoặc chọn các nhóm nhân viên mà công ty đã thiết lập &gt;
                      đi đến thiết lập thời gian áp dụng và nhập số tiền bảo
                      hiểm theo đơn vị VNĐ.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Hệ thống cung cấp sẵn cho công ty hai chính sách tính
                      bảo hiểm gồm: tính theo lương cơ bản và tính theo lương
                      nhập vào.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn có thể thêm nhân viên vào chính sách và xem danh sách
                      nhân viên đã được áp dụng chính sách.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Để tạo chính sách bảo hiểm mới, chọn Tạo mới &gt; Đi đến
                      thiết lập tạo mới chính sách bảo hiểm theo chính sách của
                      công ty và luật lao động.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Bảo hiểm'
                  height={296}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/bao-hiem(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Bảo hiểm</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhập thông tin chính sách bảo hiểm mới cần thêm;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tên chính sách bảo hiểm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Miêu tả chính sách bảo hiểm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Click chức năng thiết lập công thức
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sau khi tạo chính sách xong, bạn có thể thực hiện các chức
                      năng Thêm nhân viên, xem Danh sách nhân viên, Chỉnh sửa
                      chính sách bảo hiểm đã thêm hoặc Xóa chính sách.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Tạo chính sách bảo hiểm'
                  height={653}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/tao-chinh-sach-bao-hiem(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Tạo chính sách bảo hiểm</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-phuc-loi'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_4'>
                      3.4. Cài đặt Phúc lợi
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Thực hiện cài đặt tại phần mềm tinhluong &gt; chọn mục
                      Phúc lợi
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhấn lệnh Thêm mới tại mục Danh sách phúc lợi
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Điền thông tin phúc lợi cần thêm mới
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tên phúc lợi
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Số tiền phúc lợi được hưởng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Thời gian áp dụng: bắt buộc nhập thời gian áp dụng,
                      không bắt buộc thời hạn kết thúc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn áp dụng phúc lợi cho loại thu nhập nào: chịu thuế
                      hoặc không chịu thuế.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Viết ghi chú nếu có
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhấn vào lệnh Thêm để hoàn thành thêm mới 1 khoản phúc
                      lợi.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Nếu công ty áp dụng nhiều khoản phúc lợi thì thiết lập
                      theo quy trình tương tự vừa nêu.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      * Thêm nhân viên vào phúc lợi đã thiết lập
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sau khi đã thêm phúc lợi, để add nhân viên vào các chế độ
                      vừa set thì bạn sẽ đưa chuột đến biểu tượng hình răng cưa,
                      nhấn chọn để các lựa chọn được show ra, tiếp tục chọn Thêm
                      nhân viên.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm nhân viên vào phúc lợi'
                  height={290}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/them-nhan-vien-vao-phuc-loi(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm nhân viên vào phúc lợi</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Xuất hiện bảng cài đặt thêm nhân viên:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tích chọn Tất cả nhân viên để chọn toàn bộ nhân viên
                      trong danh sách nhân viên của công ty được hưởng chế độ
                      phúc lợi đó hoặc tích chọn từng người. Sử dụng thanh công
                      cụ tìm kiếm để việc tìm người cần chọn nhanh chóng hơn.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cài thời điểm áp dụng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Cài thời hạn kết thúc: phần này sẽ không bắt buộc
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhấn <em>Thêm</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      * Các thiết lập khác
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Ngoài thêm nhân viên, tại phúc lợi đã cài, bạn có thể:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chỉnh sửa lại: Nhấn chọn hình răng cưa &gt; Chỉnh sửa
                      &gt; tiến hành thay đổi, điều chỉnh các giá trị, nội dung
                      bên trong&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Chỉnh sửa phúc lợi'
                  height={362}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/chinh-sua-phuc-loi(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Chỉnh sửa phúc lợi</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Xem danh sách nhân viên đã được add vào chế độ phúc lợi
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Xem danh sách nhân viên sẽ được hưởng phúc lợi'
                  height={323}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/xem-danh-sach-nhan-vien-huong-phuc-loi(1).jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Xem danh sách nhân viên sẽ được hưởng phúc lợi
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tại chi tiết danh sách nhân viên hưởng phúc lợi, bạn còn
                      có thể chỉnh sửa lại chế độ cho từng người ở thời gian
                      thiết đặt hoặc xóa người đó ra khỏi danh sách.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Chỉnh sửa danh sách nhân viên được hưởng phúc lợi'
                  height={374}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/chinh-sua-danh-sach-nhan-vien-huong-phuc-loi(1).jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Chỉnh sửa danh sách nhân viên được hưởng phúc lợi
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-phu-cap-khac'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_5'>
                      3.5. Cài đặt phụ cấp khác
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn có thể set phụ cấp theo các trường hợp sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      * Cài đặt danh sách phụ cấp
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tại danh mục Dữ liệu tính lương &gt; chọn{' '}
                      <em>Phúc lợi </em>&gt; thiết lập Danh sách phụ cấp
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 1:</u> Nhấn Thêm mới&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt danh sách phụ cấp'
                  height={271}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-danh-sach-phu-cap(2).jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt danh sách phụ cấp</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 2:</u> Điền thông tin phụ cấp cần thêm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Điền phụ cấp'
                  height={649}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/dien-phu-cap(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Điền phụ cấp</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhập tên phụ cấp
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Số tiền phụ cấp
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Thời gian áp dụng và thời hạn kết thúc (phần thời hạn
                      không bắt buộc)
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn loại thu nhập áp dụng phụ cấp
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Điền ghi chú (không bắt buộc)
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 3:</u> Thêm nhân viên/sửa/xóa/xem phụ cấp
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn có thể tùy chọn với phụ cấp đã thêm bao gồm add nhân
                      viên vào phụ cấp, Chỉnh sửa lại phụ cấp, Xem danh sách
                      nhân viên trong phụ cấp hoặc xóa bỏ phụ cấp đã tạo tại các
                      tính năng được show ra trong phần cài đặt của phụ cấp
                      đó.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Chỉnh sửa phụ cấp'
                  height={289}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/them-sua-xoa-phu-cap(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Chỉnh sửa phụ cấp</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      * Cài phụ cấp theo ca
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Là loại phụ cấp cho các ca mà công ty đã cài. Tùy chính
                      sách của công ty có áp dụng loại phụ cấp này không để
                      thiết lập tại mục Phụ cấp theo ca.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Ví dụ, ở nhiều doanh nghiệp có cả ca đêm. Đây là ca làm
                      việc thường được hỗ trợ phụ cấp, do đó, doanh nghiệp có
                      thể sử dụng tính năng này để cài đặt và phục vụ cho việc
                      tính lương dễ dàng hơn.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để cài phụ cấp theo ca, bạn làm như sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn <em>Phúc lợi </em>&gt; <em>Phụ cấp theo ca</em>{' '}
                      &gt; <em>Thêm mới</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Điền thông tin vào bảng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn ca làm việc áp dụng tính phụ cấp
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Cài phụ cấp theo ca không cần add nhân viên vì nhân viên
                      đã được add vào ca làm việc đó. Bạn chọn phụ cấp cho ca
                      nào thì có nghĩa là các nhân viên ở trong ca đó sẽ được
                      nhận.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      * Cài đặt các khoản tiền khác
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Truy cập phần mềm tinhluong &gt; chọn Dữ liệu tính lương
                      &gt; Các khoản tiền khác.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://tinhluong.timviec365.vn/quan-ly-cac-khoan-tien-khac.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://tinhluong.timviec365.vn/quan-ly-cac-khoan-tien-khac.html
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Tạo các khoản tiền khác'
                  height={546}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/tao-cac-khoan-tien-khac(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Tạo các khoản tiền khác</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn lệnh Tạo khoản tiền mới
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Chọn tạo khoản tiền mới'
                  height={141}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/chon-tao-khoan-tien-moi(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Chọn tạo khoản tiền mới</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Xuất hiện popup &gt; nhập tên của khoản tiền &gt; miêu
                      tả &gt; Thiết lập công thức tính cho khoản tiền
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Thêm nhân viên áp dụng cho chính sách hỗ trợ các khoản
                      tiền khác
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Nhấn vào dấu ba chấm ở popup khoản tiền cụ thể &gt; chọn
                      Thêm nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm nhân viên vào khoản tiền khác'
                  height={352}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/them-nhan-vien-vao-khoan-tien-khac(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm nhân viên vào khoản tiền khác</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Muốn Chỉnh sửa, xem danh sách nhân viên áp dụng hoặc xóa
                      khoản tiền nhấn vào các lựa chọn tiếp theo tương ứng.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Các nhân viên được thêm sẽ tự động xuất hiện trong Danh
                      sách nhân viên áp dụng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Danh sách nhân viên áp dụng khoản tiền đã tạo'
                  height={241}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/danh-sach-nhan-vien-ap-dung-khoan-tien.jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Danh sách nhân viên áp dụng khoản tiền đã tạo
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-thue'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_6'>
                      3.6. Cài đặt thuế
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Phần mềm tinhluong &gt; chọn Tính lương &gt; Thuế
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài đặt thuế'
                  height={610}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-dat-thue(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cài đặt thuế</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Hệ thống thiết lập mặc định sẵn hai loại thuế: thuế theo
                      hệ số cố định và theo lũy tiến
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tìm hiểu kiến thức và cách tính hai loại thuế này tại
                      popup hiển thị &gt; áp dụng tính cho nhân viên.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Thêm nhân viên vào thuế: Chọn dấu ba chấm &gt; Thêm nhân
                      viên &gt; Tích chọn nhân viên &gt; Cài đặt thời gian áp
                      dụng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Tạo loại thuế mới: Chọn Tạo mới &gt; viết tên chính sách
                      thuế &gt; miêu tả cụ thể, dễ hiểu &gt; Nhập công thức tính
                      &gt; thêm nhân viên vào danh sách hoặc có thể điều chỉnh
                      lại chính sách.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cong-cong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_7'>
                      3.7. Cộng công
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bước 1: Truy cập phần mềm chamcong:{' '}
                    </span>
                    <a
                      style={{ color: 'blue' }}
                      href='https://chamcong.timviec365.vn/quan-ly-cong-ty/ghi-nhan-cong.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://chamcong.timviec365.vn/quan-ly-cong-ty/ghi-nhan-cong.html
                      </span>
                    </a>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      {' '}
                      &gt;&nbsp; Chọn danh mục Cộng công &gt; danh sách nhân
                      viên ghi nhận công xuất hiện
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Duyệt cộng công'
                  height={291}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/Duyet-cong-cong(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Duyệt cộng công</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để duyệt cho nhân viên, bạn chỉ cần tích vào ô trống thuộc
                      về nhân viên đó, ngay lập tức công của nhân viên sẽ được
                      ghi nhận.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thông báo duyệt cộng công thành công'
                  height={394}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/duyet-cong-cong-thanh-cong(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thông báo duyệt cộng công thành công</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='thuong-phat'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_8'>
                      3.8. Thưởng, phạt
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Truy cập phần mềm tinhluong &gt; chọn Dữ liệu tính
                      lương/Thưởng phạt
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <ul dir='ltr'>
              {' '}
              <li
                role='presentation'
                style={{
                  listStyleType: 'disc',
                  fontSize: '11pt',
                  fontFamily: 'Arial',
                  fontVariantNumeric: 'normal',
                  fontVariantEastAsian: 'normal',
                  fontVariantAlternates: 'normal',
                  verticalAlign: 'baseline',
                  whiteSpace: 'pre',
                  lineHeight: '1.38',
                  marginTop: '0pt',
                  marginBottom: '0pt',
                }}>
                <span style={{}}>
                  <span>
                    <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',
                        }}>
                        Link truy cập nhanh:
                      </span>
                    </span>
                  </span>
                </span>
              </li>{' '}
            </ul>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://tinhluong.timviec365.vn/quan-ly-thuong-phat-nhan-vien.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://tinhluong.timviec365.vn/quan-ly-thuong-phat-nhan-vien.html
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Xuất hiện danh sách thưởng phạt nhân viên &gt; Bạn cần cài
                      đặt thưởng, phạt theo từng tháng.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 1</u>: Chọn nhân viên cần nhập thưởng/phạt
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn có thể kéo tìm tên nhân viên trong danh sách
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tuy nhiên, nên sử dụng bộ lọc tìm kiếm tìm theo tên nhân
                      viên hoặc phòng ban để quá trình tìm nhân viên cần nhập
                      thưởng/phạt nhanh chóng hơn
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Lọc tìm kiếm nhân viên trong danh sách thưởng phạt'
                  height={259}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/loc-tim-nhan-vien-trong-danh-sach-thuong-phat(1).jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Lọc tìm kiếm nhân viên trong danh sách thưởng phạt
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 2</u>: Cài đặt thưởng/phạt cho nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn vào lệnh Thưởng phạt ở lề phải của danh sách nhân
                      viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Chọn nhân viên cần cài đặt thưởng phạt'
                  height={384}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/chon-nhan-vien-can-cai-dat-thuong-phat(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Chọn nhân viên cần cài đặt thưởng phạt</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Popup thưởng phạt xuất hiện&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thưởng phạt'
                  height={416}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/thuong-phat(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thưởng phạt</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Nhập số tiền theo đơn vị VNĐ
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Tích chọn vào loại tiền: tiền thưởng hoặc tiền phạt
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Chọn thời gian áp dụng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Viết lý do cho việc thưởng/phạt
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      =&gt; Nhấn Thêm thưởng phạt
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sau đó, các thưởng/phạt được thêm vào sẽ xuất hiện ngay
                      tại danh sách thưởng, danh sách phạt hiển thị kèm cùng
                      popup. Bạn vẫn có thể điều chỉnh lại hoặc xóa các thiết
                      lập
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Danh sách thưởng phạt'
                  height={430}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/danh-sach-thuong-phat(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Danh sách thưởng phạt</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Theo dõi tổng tiền thưởng, tổng tiền phạt theo tháng ở
                      danh sách bên ngoài
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Danh sách tổng thưởng phạt'
                  height={399}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/danh-sach-tong-thuong-phat(1).jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Danh sách toàn bộ nhân viên có thưởng phạt
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='hoa-hong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_9'>
                      3.9. Hoa hồng
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Truy cập như sau để cài đặt hoa hồng:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Phần mềm tính lương &gt; Dữ liệu tính lương &gt; Hoa hồng
                      &gt; chọn các loại hoa hồng cần thiết lập trong 5 loại
                      sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_9_1'>
                      + Hoa hồng tiền
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_9_2'>
                      + Hoa hồng doanh thu&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Hoa hồng lợi nhuận
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Hoa hồng lệ phí
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      + Hoa hồng kế hoạch
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      (Tùy theo doanh nghiệp bạn áp dụng loại hoa hồng nào thì
                      bạn chọn vào loại đó để thiết lập.)
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Hoặc trập cập đường link để thực hiện:&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://tinhluong.timviec365.vn/quan-ly-hoa-hong.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://tinhluong.timviec365.vn/quan-ly-hoa-hong.html
                      </span>
                    </a>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Cách thiết lập cụ thể của từng loại hoa hồng như sau:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h4
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-hoa-hong-tien'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      3.9.1. Cài hoa hồng tiền
                    </span>
                  </span>
                </span>
              </span>
            </h4>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Hoa hồng tiền'
                  height={426}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/hoa-hong-tien(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Hoa hồng tiền</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Cách 1: Bạn có thể tải lên hệ thống tính lương file hoa
                      hồng đã có sẵn nhưng cần làm file theo mẫu quy định mà hệ
                      thống cung cấp. Để lấy mẫu, bạn chọn: ô lệnh File excel
                      &gt; Tải file mẫu &gt; điền thông tin theo file mẫu và lưu
                      file trên máy &gt; chọn lệnh Add file hoa hồng để tải file
                      lên hoặc kéo thả file từ máy tính đưa vào vùng cho
                      phép.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Tải file hoa hồng tiền'
                  height={476}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/Tai-file-hoa-hong-tien(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Tải file hoa hồng tiền</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Cách 2: Thêm trực tiếp hoa hồng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn lệnh <em>Thêm hoa hồng</em> để chuyển đến màn Hoa
                      hồng cá nhân, với mỗi nhân viên được thiết lập hoa hồng
                      thì sẽ hiển thị theo danh sách tại giao diện này.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để thêm hoa hồng cho cá nhân, bạn thực hiện:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn lệnh <em>Thêm mới</em> &gt; Popup xuất hiện
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn đối tượng cần thêm hoa hồng tiền là Cá nhân hay
                      nhóm:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      (Lưu ý: với nhóm, tích chọn nhóm có những nhân viên sẽ
                      cùng hưởng một loại hoa hồng như nhau, mục đích để áp dụng
                      hoa hồng cho nhiều người cùng một lúc thay vì phải cài đặt
                      nhiều lần. Nếu chỉ cần cài cho cá nhân thì bạn chọn cá
                      nhân.)
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn nhân viên/nhóm nhân viên cần cài hoa hồng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn thời gian áp dụng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhập số tiền hoa hồng
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Thêm ghi chú (nếu có)
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Nhấn vào lệnh Thêm hoa hồng để lưu các cài đặt.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h4
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cai-dat-hoa-hong-doanh-thu'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      3.9.2. Cài đặt hoa hồng doanh thu
                    </span>
                  </span>
                </span>
              </span>
            </h4>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 1</u>: Cài đặt hoa hồng doanh thu
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn biểu tượng cài đặt hình răng cưa phân Hoa hồng doanh
                      thu
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Popup cài đặt hoa hồng doanh thu xuất hiện &gt; chọn Thêm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Thêm hoa hồng doanh thu'
                  height={245}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/them-hoa-hong-doanh-thu(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Thêm hoa hồng doanh thu</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Điền thông tin: tên của doanh thu &gt; tiền doanh thu nhỏ
                      nhất &gt; tiền doanh thu lớn nhất &gt; % hoa hồng &gt; Lưu
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Cài hoa hồng doanh thu'
                  height={719}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/cai-hoa-hong-doanh-thu(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Cài hoa hồng doanh thu</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      <u>Bước 2</u>: Nhập hoa hồng cho nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn <em>Nhập</em> &gt; <em>Thêm mới</em>
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn đối tượng: nhân viên hoặc nhóm
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Set chu kỳ áp dụng theo tháng cụ thể
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Điền doanh thu theo thời điểm &gt; chọn ngày (phần này có
                      thể chọn nhiều thời điểm nếu có nhiều doanh thu ở các thời
                      điểm)
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sau khi nhập xong các doanh thu theo thời điểm, Tổng doanh
                      thu sẽ được tự động tính toán và hiển thị tại ô Tổng doanh
                      thu &gt; cần chọn mức doanh thu cần áp dụng đã được cài
                      đặt ở bước 1.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Ghi chú lại nếu có vấn đề cần ghi nhớ hoặc bỏ qua.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Nhấn lệnh Thêm hoa hồng để hoàn thiện việc nhập hoa hồng
                      cho các cá nhân cụ thể.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sau khi doanh thu được thêm cho cá nhân hoặc nhóm sẽ xuất
                      hiện chi tiết doanh thu ở ngoài bảng danh sách nhân viên
                      hưởng hoa hồng doanh thu. Bạn có thể sửa hoặc xóa trực
                      tiếp tại doanh sách này.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Từ tổng doanh thu theo chu kỳ tháng và số phần trăm được
                      hưởng hoa hồng, hệ thống sẽ tự động tính toán và cộng vào
                      lương cho nhân viên được cài hoa hồng theo doanh
                      thu.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Các bước vừa hướng dẫn trên cho hoa hồng doanh thu cũng
                      được áp dụng thực hiện tương tự cho các loại hoa hồng khác
                      gồm hoa hồng lợi nhuận, hoa hồng lệ phí vị trí, hoa hồng
                      kế hoạch.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tuy nhiên, ở mỗi loại hoa hồng có thông tin thiết lập
                      riêng theo mỗi loại nên bạn xây dựng các cài đặt theo đúng
                      nội dung điều hướng ở mỗi loại.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='xuat-luong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='3_10'>
                      3.10. Xuất lương
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Xuất lương được thực hiện tại phần mềm tinhluong phần quản
                      lý bảng lương nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://tinhluong.timviec365.vn/quan-ly-bang-luong-nhan-vien.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://tinhluong.timviec365.vn/quan-ly-bang-luong-nhan-vien.html
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Bạn có thể tùy chọn lọc xuất theo thời gian (từ ngày đến
                      ngày của tháng), theo phòng ban. Đồng thời có thể sắp xếp
                      danh sách hiển thị khi xuất file lương ở 1 trong 3 chế độ:
                      sắp xếp theo mới nhất, cũ nhất và theo phòng ban.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Sau khi đã lựa chọn xong theo nhu cầu xuất lương, bạn chọn
                      Thống kê &gt; chọn Xuất tổng lương để tải file lương excel
                      về máy.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Danh sách ứng viên (Thêm ứng viên; thêm giai đoạn) {'{'}
                      chỉ có ở web, ko làm app{'}'}
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{ fontSize: '22px' }}>
                <strong>
                  <span>
                    <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                      <span
                        style={{
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          verticalAlign: 'baseline',

                          fontSize: '22px !important',
                        }}>
                        II. Đối với bản chấm công nhân viên&nbsp;
                      </span>
                    </span>
                  </span>
                </strong>
              </span>
            </p>{' '}
            <h2
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cham-cong-nhan-vien'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='4'>
                      1. Chấm công nhân viên
                    </span>
                  </span>
                </span>
              </span>
            </h2>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tài khoản nhân viên thuộc công ty trên hệ thống chamcong
                      của timviec365.vn sẽ được chấm công theo các cấu hình đã
                      cài đặt. Hệ thống chấm công cho phép chấm được công ở các
                      ứng dụng liên kết gồm PC365 nhân viên, chamcong365 và
                      chat365. Ngoài ra, nhân viên cũng có thể chấm công bằng
                      phần mềm chamcong365 qua tài khoản công ty.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Trong đó, nhân viên có thể chấm công bằng các hình thức
                      sau:&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cham-cong-bang-qr'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='4_1'>
                      1.1. Chấm công bằng QR
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Hình thức này doanh nghiệp có thể cài đặt ở cả chat365,
                      PC365 nhân viên và chamcong365 với cách thức:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Công ty sẽ tạo QR chấm công và gửi mã đến cho nhân viên,
                      nhân viên sử dụng ứng dụng chấm công mobile theo quy định
                      của công ty ở một trong 3 app vừa nêu để chấm công bằng mã
                      QR. Chỉ cần đăng nhập tài khoản nhân viên trên hệ thống
                      chuyển đổi số 365 thì sẽ truy cập được cả 3 ứng dụng để
                      chấm công. Sau đó bạn nhấn vào biểu tượng chấm công bằng
                      mã QR, đưa màn hình quét QR đến mã QR của công ty để chấm
                      công.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cham-cong-bang-nhan-dien-khuon-mat'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='4_2'>
                      1.2. Chấm công bằng nhận diện khuôn mặt
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Đưa camera điện thoại ra trước mặt, điều chỉnh để khung
                      hình chấm công lấy hết phần khuôn mặt của bạn, với công
                      nghệ AI, các phần mềm sẽ nhận diện được khuôn mặt của nhân
                      viên nhanh chóng ngay cả khi thay đổi kiểu tóc, trang điểm
                      hay thậm chí là đeo khẩu trang để ghi nhận việc chấm công
                      cho nhân viên.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='cham-cong-bang-tai-khoan-cong-ty'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='4_3'>
                      1.3. Chấm công bằng tài khoản công ty
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Đăng nhập chamcong bằng tài khoản công ty, toàn bộ nhân
                      viên sẽ chấm công nhận diện khuôn mặt. Cách thức vẫn giống
                      như khi chấm công nhận diện khuôn mặt bằng tài khoản nhân
                      viên.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h2
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='tao-de-xuat'>
              <span style={{}} id='5'>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='5'>
                      2. Tạo đề xuất&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </h2>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Nhân viên công ty tạo đề xuất tại phần mềm Văn thư lưu
                      trữ.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Truy cập vanthu.timviec365.vn &gt; chọn Đề xuất
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://vanthu.timviec365.vn/trang-quan-ly-de-xuat.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://vanthu.timviec365.vn/trang-quan-ly-de-xuat.html
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Chọn đề xuất cần tạo'
                  height={221}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/chon-de-xuat(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Chọn đề xuất cần tạo</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Chọn loại đề xuất cần tạo
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Các mẫu đề xuất'
                  height={439}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/cac-mau-de-xuat(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Các mẫu đề xuất</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      - Thực hiện tạo đề xuất&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Các đề xuất được tạo xong sẽ được bắt thông báo và yêu cầu
                      duyệt đến tài khoản chat365 của người duyệt. Người duyệt
                      chỉ bấm vào thông báo gửi về sẽ được dẫn tới trang chi
                      tiết đề xuất và xem thông tin để duyệt.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <h2
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='lich-su'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='6'>
                      3. Lịch sử&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </h2>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='lich-su-cham-cong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}
                      id='6_1'>
                      3.1. Lịch sử chấm công
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Để xem lịch sử chấm công, nhân viên truy cập từ phần mềm
                      chamcong365 → Chọn Quản lý chấm công
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      * Xem lịch sử chấm công lọc theo ngày cụ thể
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chọn Lọc theo ngày &gt; Nhấp chuột vào ngày muốn xem lịch
                      sử chấm công trên bảng lịch &gt; xuất hiện chi tiết tình
                      trạng chấm công: thời gian chấm, ca chấm, địa chỉ chấm và
                      ghi chú nếu có.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Xem lịch sử chấm công theo ngày'
                  height={313}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/xem-lich-su-cham-cong-theo-ngay(1).jpg'
                  width={800}
                />{' '}
                <figcaption>Xem lịch sử chấm công theo ngày</figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      * Xem các ngày khác nhau theo khoảng thời gian
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &gt; Chọn mục Các ngày khác nhau
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      &gt; Chọn thời gian theo khoảng muốn check lại lịch sử
                      chấm công
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <div style={{ textAlign: 'center' }}>
              {' '}
              <figure style={{ display: 'inline-block' }}>
                <img
                  style={{
                    marginLeft: '0px',
                    marginTop: '10px',
                    width: '100%',
                    height: 'auto',
                  }}
                  alt='Xem lịch sử chấm công theo khoảng thời gian'
                  height={345}
                  className='lazyload'
                  // src='/images/load.gif'
                  src='https://timviec365.vn/pictures/images_06_2023/xem-lich-su-cham-cong-theo-khoang-thoi-gian(1).jpg'
                  width={800}
                />{' '}
                <figcaption>
                  Xem lịch sử chấm công theo khoảng thời gian
                </figcaption>{' '}
              </figure>{' '}
            </div>{' '}
            <h3
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}
              id='xem-luong'>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      id='6_1'
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      3.2. Xem lương
                    </span>
                  </span>
                </span>
              </span>
            </h3>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Hệ thống chuyển đổi số 365 tích hợp nhiều ứng dụng, hướng
                      tới phục vụ toàn diện nhu cầu quản trị trong một doanh
                      nghiệp. Nhân viên của doanh nghiệp trong hệ sinh thái
                      chuyển đổi số 365 sẽ có thể tự theo dõi công và lương của
                      mình hàng ngày thay vì phải chờ đợi tới cuối tháng mới
                      nhận được bảng lương.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Việc xem lương rất dễ dàng tại phần mềm Tính lương.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <a
                      style={{ color: 'blue' }}
                      href='https://tinhluong.timviec365.vn/quan-ly-nhan-vien.html'>
                      <span
                        style={{
                          color: 'rgb(17, 85, 204)',
                          fontVariantNumeric: 'normal',
                          fontVariantEastAsian: 'normal',
                          fontVariantAlternates: 'normal',
                          textDecorationLine: 'underline',
                          textDecorationSkipInk: 'none',
                          verticalAlign: 'baseline',
                        }}>
                        https://tinhluong.timviec365.vn/quan-ly-nhan-vien.html
                      </span>
                    </a>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Các bước thực hiện để xem lương:
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Vào danh mục Tính lương &gt; xuất hiện Bảng lương theo chu
                      kỳ gồm 30 yếu tố liên quan để bạn theo dõi.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Tại đây, bạn có thể check được bảng lương hiện tại hoặc có
                      thể check lại bảng lương theo tháng tại bộ lọc tìm
                      kiếm.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Chú ý quan sát cho các khoản lương gồm: Lương cơ bản, Công
                      chuẩn được cài đặt cố định; công thực, công ghi nhận, công
                      sau phạt sẽ thay đổi dựa theo thực tế tính lương; các vấn
                      đề về lương, thưởng, hoa hồng, bảo hiểm, phạt, phạt đi
                      muộn về sớm, tổng lương thực nhận.&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span id='docs-internal-guid-86c67cd3-7fff-c945-7eb5-a81725520fb7'>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Xuất công: Nhân viên có thể xuất công bất cứ khi nào tại
                      lệnh Xuất công ngay ở phía dưới bảng lương chu kỳ.
                    </span>
                  </span>
                </span>
              </span>
            </p>{' '}
            <p
              dir='ltr'
              style={{
                lineHeight: '1.38',
                marginTop: '0pt',
                marginBottom: '0pt',
              }}>
              <span style={{}}>
                <span>
                  <span>
                    <span
                      style={{
                        fontVariantNumeric: 'normal',
                        fontVariantEastAsian: 'normal',
                        fontVariantAlternates: 'normal',
                        verticalAlign: 'baseline',
                      }}>
                      Nhìn chung, nội dung nêu trên đã cung cấp đến bạn đọc là
                      nhà quản trị doanh nghiệp và nhân viên cách dùng sử dụng
                      phần mềm Chấm công, Tính lương và các ứng dụng trong hệ
                      sinh thái chuyển đổi số. Qua đó, doanh nghiệp sẽ dễ dàng
                      kiểm soát nguồn nhân lực và điều phối, kiểm soát tốt mọi
                      vấn đề trong hoạt động của doanh nghiệp. timviec365.vn hứa
                      hẹn sẽ còn mang đến nhiều hơn nữa các sản phẩm công nghệ
                      số tốt nhất giúp doanh nghiệp ứng dụng cho mọi mặt của
                      hoạt động phát triển doanh nghiệp.
                    </span>
                  </span>
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
