import React, { useEffect } from "react";
import styles from "./bodyFrame_footer.module.css";
import lazyLoadVideos from "../../lazyloading";

export interface BodyFrameFooterProps {
  src: string;
}
export default function BodyFrameFooter({ src }: BodyFrameFooterProps) {
  useEffect(() => {
    lazyLoadVideos();
  }, []);
  return (
    <>
      <div
        style={{
          float: "left",
          width: "100%",
          margin: "35px 0",
          textAlign: "center",
          borderRadius: "20px",
          display: "flex",

        }}
      >
        <iframe
          loading="lazy"
          data-src={src}
          className={`${styles.video}`}
          width="800"
          height="420"
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </>
  );
}
