interface ItemTemp {
  id: number;
  num: number;
  nametemp: string;
  temp: number;
}
export const listTemps: ItemTemp[] = [
  {
    id: 1,
    num: 0,
    nametemp: "Tổng số văn bản",
    temp: 20,
  },
  {
    id: 2,
    num: 0,
    nametemp: "Văn bản đến",
    temp: 0,
  },
  {
    id: 3,
    num: 0,
    nametemp: "Văn bản gửi đi",
    temp: 0,
  },
  {
    id: 4,
    num: 0,
    nametemp: "Đang chờ duyệt",
    temp: 100,
  },
];

export const listTemps_Admin: ItemTemp[] = [
  {
    id: 1,
    num: 24,
    nametemp: "Tổng số văn bản",
    temp: 20,
  },
  {
    id: 2,
    num: 18,
    nametemp: "Văn bản đến",
    temp: 67,
  },
  {
    id: 3,
    num: 7,
    nametemp: "Văn bản gửi đi",
    temp: 71,
  },
  {
    id: 4,
    num: 2,
    nametemp: "Đang chờ duyệt",
    temp: 100,
  },
];
