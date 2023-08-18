import { useRouter } from "next/router";

const DetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Sử dụng id để lấy dữ liệu từ API hoặc từ nguồn dữ liệu khác

  return (
    <div>
      <h1>Chi tiết tạo: {id}</h1>
      {/* Hiển thị chi tiết dữ liệu */}
    </div>
  );
};

export default DetailsPage;
