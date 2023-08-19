interface MenuItem {
  id: number;
  title: string;
  image: string;
  href: string;
  content: string;
  subMenuItems?: MenuItem[];
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    image: "img_vanbanden",
    title: "Văn bản đến",
    href: "/VanThu/",
    content: "content 121",
    subMenuItems: [
      {
        id: 1,
        title: "Menu 1",
        image: "123",
        href: "/VanThu/van-ban-den/van-ban-moi",
        content: "Văn bản mới",
      },
      {
        id: 2,
        title: "Menu 1",
        image: "123",
        href: "/VanThu/van-ban-den/van-ban-da-xu-ly",
        content: "Văn bản đã xử lý",
      },
      {
        id: 3,
        title: "Menu 1",
        image: "123",
        href: "/VanThu/van-ban-den/van-ban-can-duyet",
        content: "Văn bản cần duyệt",
      },
      {
        id: 4,
        title: "Menu 1",
        image: "123",
        href: "/VanThu/van-ban-den/van-ban-thu-hoi",
        content: "Văn bản thu hồi",
      },
      {
        id: 5,
        title: "Menu 1",
        image: "123",
        href: "/VanThu/van-ban-den/van-ban-cap-nhat",
        content: "Văn bản cập nhật",
      },
      {
        id: 6,
        title: "Menu 1",
        image: "123",
        href: "/VanThu/van-ban-den/van-ban-thay-the",
        content: "Văn bản thay thế",
      },
    ],
  },
  {
    id: 2,
    image: "vanbandi",
    title: " Văn bản đi",
    href: "test href",
    content: "content 121",
    subMenuItems: [
      {
        id: 1,
        title: "Menu 2",
        image: "123",
        href: "/VanThu/van-ban-di/them-van-ban-di-noi-bo",
        content: "Thêm văn bản đi",
      },
      {
        id: 2,
        title: "Menu 2",
        image: "123",
        href: "/VanThu/van-ban-di/van-ban-di-da-gui",
        content: "Văn bản đi đã gửi",
      },
      {
        id: 3,
        title: "Menu 2",
        image: "123",
        href: "/VanThu/van-ban-di/van-ban-di-cho-duyet",
        content: "Văn bản đi chờ duyệt",
      },
    ],
  },
  {
    id: 3,
    image: "img_dexuatcuatoi",
    title: "Đề xuất của tôi",
    href: "/VanThu/",
    content: "content 121",
    subMenuItems: [
      {
        id: 1,
        title: "Menu 3",
        image: "123",
        href: "/VanThu/trang-quan-ly-de-xuat/toi-gui-di",
        content: "Tôi gửi đi",
      },
      {
        id: 2,
        title: "Menu 3",
        image: "123",
        href: "/VanThu/trang-quan-ly-de-xuat/gui-den-toi",
        content: "Gửi đến tôi",
      },
      {
        id: 3,
        title: "Menu 3",
        image: "123",
        href: "/VanThu/trang-quan-ly-de-xuat/dang-theo-doi",
        content: "Đang theo dõi",
      },
    ],
  },
  {
    id: 4,
    image: "img_dexuatcuatoi",
    title: "Danh sách văn bản",
    href: "/VanThu/",
    content: "content 121",
    subMenuItems: [
      {
        id: 1,
        title: "Menu 3",
        image: "123",
        href: "/VanThu/ds-van-ban/vb-den",
        content: "Văn bản đến",
      },
      {
        id: 2,
        title: "Menu 3",
        image: "123",
        href: "/VanThu/ds-van-ban/vb-di/",
        content: "Văn bản đi",
      },
    ],
  },
  {
    id: 5,
    image: "img_dexuatcuatoi",
    title: "Danh sách hợp đồng",
    href: "/VanThu/",
    content: "content 121",
    subMenuItems: [
      {
        id: 1,
        title: "Menu 3",
        image: "123",
        href: "/VanThu/ds-hop-dong/hop-dong-den",
        content: "Hợp đồng đến",
      },
      {
        id: 2,
        title: "Menu 3",
        image: "123",
        href: "/VanThu/ds-hop-dong/hop-dong-di",
        content: "Hợp đồng đi",
      },
    ],
  },
];
