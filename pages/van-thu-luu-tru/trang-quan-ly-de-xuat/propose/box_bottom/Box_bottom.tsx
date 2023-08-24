import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Box_bottom.module.css";
interface ItemBox {
  id: number;
  title: string;
  desc: string;
  image: string;
  time: string;
  day: string;
  acceptance: boolean;
}
interface ListBoxs {
  listboxs?: ItemBox[];
}

const Box_bottom_propose: React.FC<ListBoxs> = ({ listboxs }) => {
  const ListBoxs = listboxs?.map((item, index) => {
    return (
      <Link
        href={`/van-thu-luu-tru/trang-quan-ly-de-xuat/${item.id}`}
        className={styles.propose}
        key={index}
      >
        <div className={styles.div_img}>
          <Image
            src={"/icon/i_dexuat.png"}
            width={50}
            height={50}
            alt="Đề xuất"
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.desc}>{item.desc}</p>
          <div className={styles.send_success}>
            {item.acceptance ? (
              <div className={styles.send_check}>
                <div className={styles.div_icon}>
                  <Image
                    src={"/icon/i_agree.png"}
                    width={50}
                    height={50}
                    alt="Icon check"
                    className={styles.obj_img}
                  />
                </div>

                <span className={styles.notifi} style={{ color: "#63b814" }}>
                  Chấp thuận
                </span>
              </div>
            ) : (
              <div className={styles.send_check}>
                <div className={styles.div_icon}>
                  <Image
                    src={"/icon/wait_agree.png"}
                    width={50}
                    height={50}
                    alt="Icon check"
                    className={styles.obj_img}
                  />
                </div>

                <span className={styles.notifi} style={{ color: "#4c5bd4" }}>
                  Đã gửi
                </span>
              </div>
            )}

            <div className={styles.div_time}>
              <p className={styles.time}>
                {item.time} AM, {item.day}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  return <>{ListBoxs}</>;
};

export default Box_bottom_propose;
