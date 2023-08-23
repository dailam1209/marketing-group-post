import styles from "./index.module.css";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../components/tinh-luong/components/big-component/head-nav-res";
import HeadNavResCongTy from "../../../../../components/tinh-luong/components/big-component/head-nav-res-cong-ty";
import { useState } from "react";
import FirstPage from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nghi-phep/FirstPage";
import SecondPage from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nghi-phep/SecondPage";
import ThirdPage from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nghi-phep/ThirdPage";
import FourthPage from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nghi-phep/FourthPage";
import FifthPage from "../../../../../components/tinh-luong/components/big-component/cai-dat-new/nghi-phep/FifthPage";

export default function NghiPhep() {
  const [selected, setSelected] = useState(1);
  const handleSelected = (a) => {
    setSelected(a);
  };
  return (
    <div className={styles.idx_ttnv}>
      <HeadNav></HeadNav>
      {/* <HeadNavRes></HeadNavRes> */}
      <HeadNavResCongTy></HeadNavResCongTy>
      <div className={styles.part_tax}>
        {selected === 1 && <FirstPage handleSelected={handleSelected} />}

        {selected === 2 && <SecondPage handleSelected={handleSelected} />}
        {selected === 3 && <ThirdPage handleSelected={handleSelected} />}
        {selected === 4 && <FourthPage handleSelected={handleSelected} />}
        {selected === 5 && <FifthPage handleSelected={handleSelected} />}
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
