import styles from "./index.module.css";
import React, { FC, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  Home,
  People,
  Coin,
  Dollar,
  Traluong,
  CircleChart,
  Setting,
  Share,
  Taivemaytinh,
} from "../Data/Icon";
import Link from "next/link";

interface LeftNavIconProps {
  path1?: string;
  title: string;
  href1: string;
}
const LeftNavIcon: FC<LeftNavIconProps> = ({ path1, title, href1 }) => {
  return (
    <li>
      <div className={styles.hps_icon}>
        <svg
          className={styles.icon}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#68798B   "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path1}></path>
        </svg>
        <a className={styles.hps_icon_title} href={href1}>
          {" "}
          {title}
        </a>
      </div>
    </li>
  );
};
const items: MenuProps["items"] = [
  {
    label: <Link href="/tinh-luong/cong-ty/trang-chu">Trang chủ</Link>,
    key: "1",
    icon: <Home />,
  },
  {
    label: (
      <Link href="/tinh-luong/cong-ty/nhap-luong-co-ban-va-che-do">
        Nhập luơng cơ bản & chế độ
      </Link>
    ),
    key: "2",
    icon: <People />,
  },

  {
    label: "Dữ liệu tính lương",
    key: "dulieutinhluong",
    icon: <Coin />,
    children: [
      {
        label: (
          <Link href="/tinh-luong/cong-ty/du-lieu-tinh-luong/cham-cong">
            Chấm công
          </Link>
        ),
        key: "3",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/du-lieu-tinh-luong/thuong-phat">
            Thưởng phạt
          </Link>
        ),
        key: "3",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/du-lieu-tinh-luong/phuc-loi">
            Phúc lợi
          </Link>
        ),
        key: "3",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/du-lieu-tinh-luong/hoa-hong">
            Hoa hồng
          </Link>
        ),
        key: "3",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/du-lieu-tinh-luong/cac-khoan-tien-khac">
            Các khoản tiền khác
          </Link>
        ),
        key: "3",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/du-lieu-tinh-luong/bao-hiem">
            Bảo hiểm
          </Link>
        ),
        key: "3",
      },
    ],
  },
  {
    label: "Tính lương",
    key: "tinhluong",
    icon: <Dollar />,
    children: [
      {
        label: (
          <Link href="/tinh-luong/cong-ty/tinh-luong/bang-luong">
            Bảng lương
          </Link>
        ),
        key: "4",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/tinh-luong/tam-ung">Tạm ứng</Link>
        ),
        key: "4",
      },
      {
        label: <Link href="/tinh-luong/cong-ty/tinh-luong/thue">Thuế</Link>,
        key: "4",
      },
    ],
  },
  {
    label: <Link href="/tinh-luong/cong-ty/chi-tra-luong">Chi trả lương</Link>,
    key: "5",
    icon: <Traluong />,
  },
  {
    label: (
      <Link href="/tinh-luong/cong-ty/bao-cao-cong-luong">
        Báo cáo công lương
      </Link>
    ),
    key: "6",
    icon: <CircleChart />,
  },
  {
    label: "Cài Đặt",
    key: "caidat",
    icon: <Setting />,
    children: [
      {
        label: (
          <Link href="/tinh-luong/cong-ty/cai-dat/nhom-lam-viec">
            Nhóm làm việc
          </Link>
        ),
        key: "7",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/cai-dat/cai-ca-va-lich-lam-viec-1">
            Cài đặt ca và lịch làm việc
          </Link>
        ),
        key: "7",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/cai-dat/di-muon-ve-som">
            Đi muộn về sớm
          </Link>
        ),
        key: "7",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/cai-dat/nghi-phep">Nghỉ phép</Link>
        ),
        key: "7",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/cai-dat/ngay-nghi-le">
            Ngày nghỉ lễ
          </Link>
        ),
        key: "7",
      },
      {
        label: (
          <Link href="/tinh-luong/cong-ty/cai-dat/bieu-mau-de-xuat">
            Biểu mẫu đề xuất
          </Link>
        ),
        key: "7",
      },
    ],
  },
  {
    label: <Link href="/tinh-luong/cong-ty/phan-quyen">Phân quyền</Link>,
    key: "8",
    icon: <Share />,
  },
  {
    label: "Chuyển đổi số",
    key: "9",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Tải app về máy tính tại đây",
    key: "10",
    icon: <Taivemaytinh />,
  },
];

export default function LeftNavCongty() {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className={styles.main}>
      <div className={styles.shell}>
        <div className={styles.hps_part_one}>
          <div className={styles.hps_part_one_avt}>
            <a>
              <img src="/logo.png" />
            </a>
          </div>
        </div>
        <div className={styles.hps_part_three}>
          <h3></h3>
          <div className={styles.hps_nav}>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="inline"
              items={items}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
