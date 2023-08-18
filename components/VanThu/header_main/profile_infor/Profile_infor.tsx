import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Profile_infor.module.css";
import { useRouter } from "next/router";
type Profile_inforProps = {
  isOpen?: boolean;
  img?: string;
  fullname?: string;
  job?: string;
  id_staff?: string;
};
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
const Profile_infor: React.FC<Profile_inforProps> = ({ ...props }) => {
  const router = useRouter();

  if (props.isOpen === false) return <></>;
  return (
    <div className={`${styles.block_profile}`}>
      <div className={`${styles.profile_infor}`}>
        <div className={`${styles.profile_div_img}`}>
          <a href="">
            <Image src={`${props.img}`} width={102} height={102} alt="Avatar" />
          </a>
        </div>
        <div className={`${styles.profile_infor_name}`}>
          <p className={`${styles.fullname}`}>{props.fullname}</p>
          <p className={`${styles.job}`}>{props.job}</p>
          <p className={`${styles.id_staff}`}> ID : {props.id_staff} </p>
        </div>
        <div className={`${styles.profile_infor_list}`}>
          <div className={`${styles.profile_infor_list_detail}`}>
            <div className={`${styles.item_left}`}>
              <Link
                target="_blank"
                rel="nofollow"
                href="https://chamcong.timviec365.vn/quan-ly-cong-ty/thong-tin-tai-khoan.html"
              >
                <Image
                  src={"/icon/icon_profile.png"}
                  width={25}
                  height={25}
                  alt="Information"
                />
                Thông tin cá nhân
              </Link>
            </div>
            <div className={`${styles.item_right}`}>
              <Image
                src={"/icon/icon_toggle.png"}
                width={25}
                height={25}
                alt="Information"
              />
            </div>
          </div>
          <div className={`${styles.profile_infor_list_detail}`}>
            <div className={`${styles.item_left}`}>
              <Link
                target="_blank"
                rel="nofollow"
                href="https://chamcong.timviec365.vn/quan-ly-cong-ty/thong-tin-tai-khoan.html"
              >
                <Image
                  src={"/icon/icon_profile.png"}
                  width={25}
                  height={25}
                  alt="Information"
                />
                Báo lỗi
              </Link>
            </div>
            <div className={`${styles.item_right}`}>
              <Image
                src={"/icon/icon_toggle.png"}
                width={25}
                height={25}
                alt="Information"
              />
            </div>
          </div>
          <div className={`${styles.profile_infor_list_detail}`}>
            <div className={`${styles.item_left}`}>
              <Link
                target="_blank"
                rel="nofollow"
                href="https://chamcong.timviec365.vn/quan-ly-cong-ty/thong-tin-tai-khoan.html"
              >
                <Image
                  src={"/icon/icon_set.png"}
                  width={25}
                  height={25}
                  alt="Information"
                />
                Đánh giá
              </Link>
            </div>
            <div className={`${styles.item_right}`}>
              <Image
                src={"/icon/icon_toggle.png"}
                width={25}
                height={25}
                alt="Information"
              />
            </div>
          </div>
          <div className={`${styles.profile_infor_list_detail}`}>
            <div className={`${styles.item_left}`}>
              <Link
                target="_blank"
                rel="nofollow"
                href="https://chamcong.timviec365.vn/quan-ly-cong-ty/thong-tin-tai-khoan.html"
              >
                <Image
                  src={"/icon/icon_set.png"}
                  width={25}
                  height={25}
                  alt="Information"
                />
                Cài đặt
              </Link>
            </div>
            <div className={`${styles.item_right}`}>
              <Image
                src={"/icon/icon_toggle.png"}
                width={25}
                height={25}
                alt="Information"
              />
            </div>
          </div>
          <div className={`${styles.profile_infor_list_detail}`}>
            <div
              className={`${styles.item_left}`}
              onClick={() => {
                router.push("/");
                sessionStorage.setItem("layout", "");
                document.cookie =
                  "token_test=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=lax";
                deleteCookie("token_first");
                deleteCookie("token_hafl");
              }}
            >
              <Link rel="nofollow" href="">
                <Image
                  src={"/icon/icon_logout.png"}
                  width={25}
                  height={25}
                  alt="Information"
                />
                Đăng xuất
              </Link>
            </div>
            <div className={`${styles.item_right}`}>
              <Image
                src={"/icon/icon_toggle.png"}
                width={25}
                height={25}
                alt="Information"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_infor;
