export const getVocative = [
  { value: 0, label: "Chọn" },
  { value: 1, label: "Anh" },
  { value: 2, label: "Chị" },
  { value: 3, label: "Ông" },
  { value: 4, label: "Bà" },
];
export const renderVocative = (id) => {
  const option = {
    0: "Chưa cập nhập",
    1: "Anh",
    2: "Chị",
    3: "Ông",
    4: "Bà",
  };
  if (!option.id) {
    return "";
  }
  return option.id;
};
export const getPotentialPosition = [
  { value: 0, label: "Chọn" },
  { value: 1, label: "Chủ tịch" },
  { value: 2, label: "Phó chủ tịch" },
  { value: 3, label: "Tổng giám đốc" },
  { value: 4, label: "Phó tổng giám đốc" },
  { value: 5, label: "Giám đốc" },
  { value: 6, label: "kế toán trưởng" },
  { value: 7, label: "Trưởng phòng" },
  { value: 8, label: "Trợ lý" },
  { value: 9, label: "Nhân viên" },
];
export const renderPotentialPositon = (id) => {
  const option = {
    0: "Không có dữ liệu",
    1: "Chủ tịch",
    2: "Phó chủ tịch",
    3: "Tổng giám đốc",
    4: "Phó tổng giám đốc",
    5: "Giám đốc",
    6: "kế toán trưởng",
    7: "Trưởng phòng",
    8: "Trợ lý",
    9: "Nhân viên",
  };
  if (!option.id) {
    return "";
  }
  return option.id;
};

export const getPotentialDepartment = [
  { value: 0, label: "Chọn" },
  { value: 1, label: "Ban giám đốc" },
  { value: 2, label: "Phòng tài chính" },
  { value: 3, label: "Phòng nhân sự " },
  { value: 4, label: "Phòng marketing" },
  { value: 5, label: "Phòng CSKH" },
  { value: 6, label: "Phòng hành chính tổng hợp" },
  { value: 7, label: "Phòng kỹ thuật" },
  { value: 8, label: "Phòng kinh doanh" },
];
export const renderPotentialDepartment = (id) => {
  const option = {
    0: "Không có dữ liệu",
    1: "Ban giám đốc",
    2: "Phòng tài chính",
    3: "Phòng nhân sự ",
    4: "Phòng marketing",
    5: "Phòng CSKH",
    6: "Phòng hành chính tổng hợp",
    7: "Phòng kỹ thuật",
    8: "Phòng kinh doanh",
  };
  if (!option.id) {
    return "";
  }
  return option.id;
};

export const getPotentialResource = [
  { value: 0, label: "Chọn" },
  { value: 1, label: "Facebook" },
  { value: 2, label: "Zalo" },
  { value: 3, label: "Website" },
  { value: 4, label: "Dữ liệu bên thứ 3" },
  { value: 5, label: "Khách hàng giới thiệu" },
  { value: 6, label: "Giới thiệu" },
  { value: 7, label: "Chăm sóc khách hàng" },
  { value: 8, label: "Email" },
];

export const renderPotentialResource = (id) => {
  const option = {
    0: "Không có dữ liệu",
    1: "Facebook",
    2: "Zalo",
    3: "Website",
    4: "Dữ liệu bên thứ 3",
    5: "Khách hàng giới thiệu",
    6: "Giới thiệu",
    7: "Chăm sóc khách hàng",
    8: "Email",
  };
  if (!option.id) {
    return "";
  }
  return option.id;
};

export const getPotentialType = [
  { value: 0, label: "Chọn" },
  { value: 1, label: "Khách hàng bán lẻ " },
  { value: 2, label: "Khách hàng dự án" },
];
export const renderPotentialType = (id) => {
  const option = {
    0: "Không có dữ liệu",
    1: "Khách hàng bán lẻ",
    2: "Khách hàng dự án",
  };
  if (!option.id) {
    return "";
  }
  return option.id;
};
//Bản chất -add
export const getCategory = [
  { value: 1, label: "Hàng hóa" },
  { value: 2, label: "Thành phẩm" },
  { value: 3, label: "Bán thành phẩm" },
  { value: 4, label: "Nguyên vật hiệu" },
  { value: 5, label: "Dịch vụ" },
  { value: 6, label: "Công cụ dịch vụ" },
];

export const renderCategory = (id) => {
  const option = {
    0: "Không có dữ liệu",
    1: "Hàng hóa",
    2: "Thành phẩm",
    3: "Bán thành phẩm",
    4: "Nguyên vật hiệu",
    5: "Dịch vụ",
    6: "Công cụ dịch vụ",
  };
  if (!option[id]) {
    return "";
  }
  return option[id];
};
export const getListDate = [
  { value: 1, label: "Ngày" },
  { value: 2, label: "Tháng" },
  { value: 3, label: "Năm" },
];
export const renderListDate = (id) => {
  const option = {
    0: "Không có dữ liệu",
    1: "Ngày",
    2: "Tháng",
    3: "Năm",
  };
  if (!option.id) {
    return "";
  }
  return option.id;
};
