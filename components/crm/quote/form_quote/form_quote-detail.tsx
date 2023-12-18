import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ButtonControlForm from "../quote_detail/quote_button_form_quote";
import SimpleQuoteReport from '@/components/crm/quote/quote_report_form/simple_quote_report_form'

type Props = {};

// 07-12-2023: Hệ thống chưa có giao diện nào của mẫu báo giá được cắt,
// Giải pháp tình thế: Tạo 1 mẫu cơ bản, chỉ đủ để cung cấp thông tin
// TODO Cắt các giao diện báo giá theo mẫu cơ bản (để đổ dữ liệu)
// TODO Chỉnh sửa để form có thể lựa chọn và đổi mẫu, bao gồm:
// 1. Lưu một key/id/... của mẫu được chọn ở base 
// 2. Truyền key/id/... đó để chọn mẫu tương ứng cho các thao tác (xem, in, tải)
// 3. Thao tác đổi mẫu

// TODO Nếu site chậm, cân nhắc việc đổi sang lấy link tải từ backend

const Form_quote_detail = (props: Props) => {
  const router = useRouter();

  const path = router.query.id;

  return (
    <div>
      <ButtonControlForm />
      {/* <img
        width={"100%"}
        style={{
          padding: "0 100px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
        src={`/crm/mau_bg${path == "ĐH-0000" ? 1 : path}.svg`}
        alt="hungha365.com"
      /> */}
      <div style={{maxWidth: 'fit-content', margin: '0px auto'}}>
        <SimpleQuoteReport />
      </div>
    </div>
  );
};
export default Form_quote_detail;
