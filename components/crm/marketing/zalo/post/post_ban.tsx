import React, { useRef, useState } from "react";
import styles from "./post.module.css";
import styleGroup from '../group/group.module.css'
import PostListFriend from "./post_list_friend";

const PostBan = () => {
    const fileRef = useRef(null);
    const valueImageRef = useRef(null);
    const valueLinkRef = useRef(null);
    const [ isImage, setIsImage ] = useState<boolean>(true);
  return (
    <section className={styles.post_bg_full}>
      <div className={`${styles.tilte__post} ${styles.move_marginbottom}`}>
        <span>Thêm lệnh đăng bài</span>
      </div>
      <div className={styles.wrapper__content}>
        {/* left */}
        <div className={styles.post_padding}>
            <div className={styles.suggest}>
                <p className={styles.suggest_title}>Lệnh đăng bài</p>
            </div>
            <div className={styles.post_information}>
                {/* content */}
                <div className={styles.post_content}>
                <p className={styles.left__add_des}>
                    Nội dung<span className={`${styles.left__add_star} ${styles.post_hidden}`}>*</span>
                </p>
                <textarea rows={5} placeholder="Nhập nội dung cho chiến dịch ..." />
                </div>
                {/* type post */}
                <div className={styles.post_type}>
                <p className={styles.left__add_des}>
                    Kiểu đăng<span className={`${styles.left__add_star} ${styles.post_hidden}`}>*</span>
                </p>
                <div style={{ height: '0.96144rem', display: 'flex', justifyContent: 'center', marginBottom: '0.62rem'}}>
                    <input onClick={() => setIsImage(true)} checked={isImage}  className={styles.radio} type="radio"></input>
                    
                    <span className={styles.title_radio}>Văn bản kèm hình ảnh</span>
                </div>
                <div style={{  height: '0.96144rem', display: 'flex', justifyContent: 'center', marginBottom: '0.62rem'}}>
                    <input onClick={() => setIsImage(false)} checked={!isImage}  className={styles.radio} type="radio"></input>
                    <span className={styles.title_radio}>Văn bản kèm link</span>
                </div>
                {/* choose type */}
                <div className={styles.choose_input}>
                    <input ref={fileRef} type={isImage ? 'file' : 'text'}   style={{ display: 'none'}}/>
                    <input type="text" onClick={() => fileRef.current.click()} placeholder={isImage ? 'Chọn ảnh' : 'Link chia sẻ'} className={styles.post__time_input}></input>
                  {
                    isImage &&  <svg
                    onClick={() => fileRef.current.click()}
                    className={styles.choose_image}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    >
                    <path
                        d="M25.2923 0.726562H21.3714C19.6776 0.726562 18.6641 1.73993 18.6641 3.43333V7.35348C18.6641 9.04688 19.6776 10.0602 21.3714 10.0602H25.2923C26.986 10.0602 27.9996 9.04688 27.9996 7.35348V3.43333C27.9996 1.73993 26.986 0.726562 25.2923 0.726562ZM25.5857 5.14006C25.4257 5.30007 25.2123 5.38007 24.9989 5.38007C24.7855 5.38007 24.5721 5.30007 24.4121 5.14006L24.172 4.90005V7.88683C24.172 8.35352 23.7986 8.72687 23.3318 8.72687C22.8651 8.72687 22.4916 8.35352 22.4916 7.88683V4.90005L22.2516 5.14006C21.9315 5.46007 21.398 5.46007 21.078 5.14006C20.7579 4.82005 20.7579 4.2867 21.078 3.96669L22.745 2.29996C22.8117 2.23329 22.9051 2.17995 22.9984 2.13995C23.0251 2.12662 23.0518 2.12662 23.0784 2.11328C23.1451 2.08661 23.2118 2.07328 23.2918 2.07328C23.3185 2.07328 23.3452 2.07328 23.3718 2.07328C23.4652 2.07328 23.5452 2.08661 23.6386 2.12662C23.6519 2.12662 23.6519 2.12662 23.6652 2.12662C23.7586 2.16662 23.8386 2.21995 23.9053 2.28662C23.9186 2.29996 23.9186 2.29996 23.932 2.29996L25.599 3.96669C25.9191 4.2867 25.9191 4.82005 25.5857 5.14006Z"
                        fill="#4C5BD4"
                    />
                    <path
                        d="M9.33229 13.2331C11.0853 13.2331 12.5064 11.8123 12.5064 10.0597C12.5064 8.30703 11.0853 6.88623 9.33229 6.88623C7.57929 6.88623 6.1582 8.30703 6.1582 10.0597C6.1582 11.8123 7.57929 13.2331 9.33229 13.2331Z"
                        fill="#4C5BD4"
                    />
                    <path
                        d="M25.2993 10.0594H24.6725V16.2063L24.4991 16.0596C23.4589 15.1662 21.7785 15.1662 20.7382 16.0596L15.1902 20.8198C14.15 21.7131 12.4696 21.7131 11.4294 20.8198L10.9759 20.4464C10.029 19.6197 8.52201 19.5397 7.45509 20.2597L2.46725 23.6065C2.17384 22.8598 2.00047 21.9931 2.00047 20.9798V9.80603C2.00047 6.04589 3.98761 4.05915 7.74849 4.05915H18.6711V3.43247C18.6711 2.89911 18.7644 2.44576 18.9778 2.05908H7.74849C2.89401 2.05908 0 4.95252 0 9.80603V20.9798C0 22.4332 0.253393 23.6999 0.746842 24.7666C1.89378 27.3 4.34769 28.7267 7.74849 28.7267H18.9245C23.7789 28.7267 26.6729 25.8333 26.6729 20.9798V9.7527C26.2862 9.96604 25.8327 10.0594 25.2993 10.0594Z"
                        fill="#4C5BD4"
                    />
                    </svg>
                  }  
                 
                </div>
                </div>
            </div>
            <p className={styles.note}>
                Lưu ý: Phần mềm hiện tại không đăng ảnh trực tiếp lên tường Zalo, chỉ
                đăng ảnh thông qua link website.
                <br></br>Vui lòng cân nhắc trước khi sử dụng!
            </p>
            {/* time post */}
            <div className={styles.post__time_detail}>
                <div className={styles.post__time_left}>
                <p className={styles.left__add_des}>
                    Ngày đăng<span className={`${styles.left__add_star} ${styles.post_hidden}`}>*</span>
                </p>
                <input
                    className={styles.post__time_input}
                    placeholder="ngày/tháng/năm"
                    type="text"
                ></input>
                </div>
                <div className={styles.post__time_right}>
                <p className={styles.left__add_des}>
                    Giờ đăng<span className={styles.post_hidden}> (định dạng giờ:phút)</span>
                    <span className={`${styles.left__add_star} ${styles.post_hidden}`}>*</span>
                </p>
                <input className={styles.post__time_input} placeholder=" VD: 19:00 là đăng bài lúc 7 giờ tối"></input>
                </div>
            </div>
            {/* button */}
            <div className={`${styleGroup.btn} ${styles.padding_btn}`}>
                    <button className={styleGroup.btn__not_bg}>Hủy</button>
                    <button className={styleGroup.btn__bg}>Lưu</button>
                </div>
        </div>
        {/* right */}
        <div className={styles.post_right}>
            <PostListFriend/>
        </div>
      </div>
    </section>
  );
};

export default PostBan;
