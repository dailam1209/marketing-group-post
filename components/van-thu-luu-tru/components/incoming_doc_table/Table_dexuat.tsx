import React from "react";
import styles from "./Table_dexuat.module.css";
import Image from "next/image";
import Link from "next/link";
interface ItemDoc {
  id: number;
  status: string;
}
interface ListDocs {
  listdocs?: ItemDoc[];
  inTrack: boolean;
}
const filter_elemnents = [
  { key: 1, title: "Tất cả", text_class: "table_btn_text" },
  { key: 2, title: "Đang chờ duyệt", text_class: "table_btn_text" },
  { key: 3, title: "Quá hạn duyệt", text_class: "table_btn_text" },
  { key: 4, title: "Đã phê duyệt", text_class: "table_btn_text" },
  { key: 5, title: "Đã từ chối", text_class: "table_btn_text" },
];
const FilterElement = ({
  key,
  title,
  text_class,
  handle_function,
}: {
  key: number;
  title: string;
  text_class: string;
  handle_function: any;
}) => {
  return (
    <li
      key={key}
      onClick={() => handle_function(key)}
      className={`${styles.table_btn_filter}`}
    >
      <p className={styles[text_class]}>{title}</p>
    </li>
  );
};
const Table_dexuat: React.FC<ListDocs> = ({ listdocs, inTrack }) => {
  let [active_filter, setactive_filter] = React.useState(filter_elemnents);
  if (!inTrack) {
    active_filter = filter_elemnents.filter((elem) => elem.key !== 3);
  }
  const handleFilter = (id: number) => {
    setactive_filter((prevState) => {
      const updatedFilters = [...prevState];
      updatedFilters[id - 1].text_class = "table_btn_text_active";
      for (var i = 0; i < updatedFilters.length; i++) {
        if (i === id - 1) {
          continue;
        }
        updatedFilters[i].text_class = "table_btn_text";
      }
      return updatedFilters;
    });
  };
  const Listdocs = listdocs?.map((item, index) => {
    return (
      <Link href={"/"} key={index}>
        <div className={styles.tab_infor}>
          <p className={styles.infor_name}>
            Nguyễn Viết Hoàng{" "}
            <span>Đề xuất xin nghỉ phép ca chiều ngày 14/06/2023</span>
          </p>
          <div className={styles.infor_btn}>
            <div className={styles.div_img}>
              <Image
                src={"/icon/create_propose/luunhap.png"}
                width={50}
                height={50}
                alt=""
              />
            </div>
            <span>Đã gửi</span>
          </div>
          <div className={styles.infor_date}>
            <span>13/06/2023</span>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className={`${styles.incoming_doc_table}`}>
      <div className={`${styles.table}`}>
        <ul className={styles.table_filter_box}>
          {active_filter.map((p) => (
            <FilterElement
              key={p.key}
              title={p.title}
              text_class={p.text_class}
              handle_function={() => handleFilter(p.key)}
            />
          ))}
        </ul>
        <div className={`${styles.tab_content} `}>
          <div className={styles.tab_main}>{Listdocs}</div>
        </div>
      </div>
    </div>
  );
};

export default Table_dexuat;
