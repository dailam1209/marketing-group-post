import styles from "./index.module.css";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";

import HeadNavResCongTy from "../../../../../components/tinh-luong/components/big-component/head-nav-res-cong-ty";
import { useState } from "react";
import NhomLamViec1st from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nhom-lam-viec/NhomLamViec1st";
import NhomLamViec2nd from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nhom-lam-viec/NhomLamViec2nd";
import NhomLamViec3rd from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nhom-lam-viec/NhomLamViec3rd";
import NhomLamViec4th from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nhom-lam-viec/NhomLamViec4th";

export default function NhomLamViecPage() {
  const [selected, setSelected] = useState(1);
  const [resetPage1, setResetPage1] = useState(false);
  const [resetPage2, setResetPage2] = useState(false);
  const [resetPage3, setResetPage3] = useState(false);
  const [resetPage4, setResetPage4] = useState(false);
  const handleSelected = (a) => {
    setSelected(a);
  };
  const handleResetPage3 = (a) => {
    console.log("Đã chạy vào hàm handleReset và kết quả là : ", a);
    setResetPage3(a);
  };
  console.log("Reset Page 3 ở Global: ", resetPage3);
  return (
    <div className={styles.idx_ttnv}>
      <HeadNav></HeadNav>
      {/* <HeadNavRes></HeadNavRes> */}
      <HeadNavResCongTy></HeadNavResCongTy>
      <div className={styles.part_tax}>
        {selected === 1 && (
          <NhomLamViec1st
            selected1={selected}
            handleSelected={handleSelected}
          />
        )}
        {selected === 2 && (
          <NhomLamViec2nd
            selected1={selected}
            resetPage3={resetPage3}
            setResetPage3={handleResetPage3}
            handleSelected={handleSelected}
          />
        )}
        {selected === 3 && (
          <NhomLamViec3rd
            selected1={selected}
            resetPage={resetPage3}
            handleSelected={handleSelected}
          />
        )}
        {selected === 4 && (
          <NhomLamViec4th
            selected1={selected}
            handleSelected={handleSelected}
          />
        )}
      </div>
      <div className={styles.youtube_tong}>
        <div className={styles.youtubes}>
          <iframe
            className={styles.video_hd}
            width="680"
            height="430"
            src="https://www.youtube.com/embed/DihcKlS19WQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className={styles.youtubes}>
          <iframe
            className={styles.video_hd}
            width="680"
            height="430"
            src="https://www.youtube.com/embed/D3448E0YSmA"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className={styles.youtubes}>
          <iframe
            className={styles.video_hd}
            width="680"
            height="430"
            src="https://www.youtube.com/embed/vvZQdL7ihp0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
