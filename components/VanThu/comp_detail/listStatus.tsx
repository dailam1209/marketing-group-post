interface ItemChoose {
  id: number;
  status: string;
}

export const listStatus: ItemChoose[] = [
  {
    id: -1,
    status: "Tất cả",
  },
  {
    id: 0,
    status: "Đã nhận",
  },
  {
    id: 3,
    status: "Đã duyệt",
  },
  {
    id: 4,
    status: "Chờ xử lý",
  },
  {
    id: 5,
    status: "Quá hạn",
  },
];
