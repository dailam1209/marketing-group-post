import { ModalDetailsLLV } from "@/components/tao-de-xuat/de-xuat-lich-lam-viec/chi-tiet-de-xuat/modal";
import { useState } from "react";

export default function Page() {
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState<boolean>(true);
  const [data, setData] = useState<any>({
    shiftType: "theo-ca",
    apply_month: "2023-08-01",
    cy_detail: [
      { date: "2023-08-01", shift_id: "123,154" },
      { date: "2023-08-02", shift_id: "123" },
      { date: "2023-08-07", shift_id: "154" },
      { date: "2023-08-09", shift_id: "123,154" },
      { date: "2023-08-10", shift_id: "123,154" },
      { date: "2023-08-17", shift_id: "123,154" },
      { date: "2023-08-27", shift_id: "123,154" },
    ],
  });

  return (
    <div>
      {ModalDetailsLLV({
        open: isModalDetailsOpen,
        setOpen: setIsModalDetailsOpen,
        data: data,
        shiftType: data?.shiftType,
      })}
    </div>
  );
}
