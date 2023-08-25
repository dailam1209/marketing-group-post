// export const HOST = "http://localhost:3001/"

export const sidebar_button_group = [
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/home.svg',
    link: `/crm`,
    children: [],
    content: 'Trang chủ',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_potential.svg',
    link: `/crm/potential/crmlist`,
    children: [],
    content: 'Tiềm năng',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/chance.svg',
    link: '/crm/campaign/list',
    children: [],
    content: 'Cơ hội',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/contract.svg',
    link: '/crm/contract/list',
    children: [],
    content: 'Hợp đồng',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/chiendich.svg',
    link: '/crm',
    children: [],
    content: 'Chiến dịch',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/baogia.svg',
    link: '/crm/quote/list',
    children: [],
    content: 'Báo giá',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/nav-price-promotion.svg',
    link: '/crm/promotion/list',
    content: 'Quản lý khuyến mại',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/cart.svg',
    link: '/crm/order/list',
    children: [],
    content: 'Quản lý đơn hàng',
  },
  {
    img_link: '	https://crm.timviec365.vn/assets/icons/bill.svg',
    link: '/crm/bill/list',
    children: [],
    content: 'Quản lý hoá đơn',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_price_policy.svg',
    link: '/crm/price_policy/list',
    children: [],
    content: 'Chính sách giá',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_product_return.svg',
    link: '/crm/product_return/list',
    children: [],
    content: 'Trả lại hàng bán',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_bin.svg',
    link: '/crm/delete_data/list',
    children: [],
    content: 'Dữ liệu đã xoá',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_setting.svg',
    link: '/crm',
    children: [],
    content: 'Cài đặt',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/i_cds365.svg',
    link: 'https://quanlychung.timviec365.vn/quan-ly-ung-dung-nhan-vien.html',
    children: [],
    content: 'Chuyển đổi số',
  },
]

export const sidebar_button_group_company = [
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/home.svg',
    link: `/crm/home`,
    children: [],
    content: 'Trang chủ',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/role.svg',
    link: `/crm`,
    content: 'Phân quyền',
    children: [
      {
        blank: '',
        label: 'Thiết lập quyền',
        link: '/crm/thiet-lap-quyen',
      },
      {
        blank: '_blank',
        label: 'Bổ nhiệm, quy hoạch',
        link: 'https://phanmemnhansu.timviec365.vn/bien-dong-nhan-su.html?tab=1',
      },
    ],
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_potential.svg',
    link: `/crm/potential/list`,
    children: [],
    content: 'Tiềm năng',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/customer.svg',
    link: '/crm',
    children: [
      {
        blank: '',
        label: 'Danh sách khách hàng',
        link: '/crm/customer/list',
      },
      {
        blank: '',
        label: 'Nhóm khách hàng',
        link: '/crm/customer/group/list',
      },
      {
        blank: '',
        label: 'Tình trạng khách hàng',
        link: '/crm/tinh-trang-khach-hang',
      },
      {
        blank: '',
        label: 'Nhập liệu',
        link: '/crm/customer/input/add',
      },
    ],
    content: 'Khách hàng',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/chance.svg',
    link: '/crm/chance/list',
    children: [],
    content: 'Cơ hội',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/hotline.svg',
    link: '/crm',
    children: [
      {
        blank: '',
        label: 'Khảo sát',
        link: '/crm/khao-sat',
      },
      {
        blank: '',
        label: 'Lịch chăm sóc khách hàng',
        link: '/crm/lich-cham-soc-khach-hang',
      },
      {
        blank: '',
        label: 'Lịch hẹn',
        link: '/crm/lich-hen',
      },
      {
        blank: '',
        label: 'Tổng đài',
        link: '/crm/tong-dai',
      },
    ],
    content: 'Chăm sóc khách hàng',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/contract.svg',
    link: '/crm/contract/list',
    children: [],
    content: 'Hợp đồng',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/form.svg',
    link: '/crm',
    children: [],
    content: 'Báo cáo',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/chiendich.svg',
    link: '/crm/campaign/list',
    children: [],
    content: 'Chiến dịch',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/baogia.svg',
    link: '/crm/quote/list',
    children: [],
    content: 'Báo giá',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/img/nav-price-promotion.svg',
    link: '/crm/promotion/list',
    children: [],
    content: 'Quản lý khuyến mãi',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/marketing.svg',
    link: '/crm',
    children: [
      {
        blank: '',
        label: 'Email',
        link: '/crm/marketing/email',
      },
      {
        blank: '',
        label: 'SMS',
        link: '/crm/marketing/sms',
      },
    ],
    content: 'Marketing',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/cart.svg',
    link: '/crm/order/list',
    children: [],
    content: 'Quản lý đơn hàng',
  },
  {
    img_link: '	https://crm.timviec365.vn/assets/icons/bill.svg',
    link: '/crm/bill/list',
    children: [],
    content: 'Quản lý hoá đơn',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/supplier.svg',
    link: '/crm/price_policy/list',
    children: [
      {
        blank: '',
        label: 'Danh sách nhà cung cấp',
        link: '/crm/supplier/list',
      },
      {
        blank: '',
        label: 'Nhóm nhà cung cấp',
        link: '/crm/supplier/group',
      },
    ],
    content: 'Nhà cung cấp',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_price_policy.svg',
    link: '/crm/price_policy/list',
    children: [],
    content: 'Chính sách giá',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_product_return.svg',
    link: '/crm/product_return/list',
    children: [],
    content: 'Trả lại hàng bán',
  },
  {
    img_link: '	https://crm.timviec365.vn/assets/icons/re-expen.svg',
    link: '/crm',
    children: [
      {
        blank: '',
        label: 'Theo dõi thu chi',
        link: '/crm/theo-doi-thu-chi',
      },
      {
        blank: '',
        label: 'Phiếu thu',
        link: '/crm/phieu-thu',
      },
      {
        blank: '',
        label: 'Phiếu chi',
        link: '/crm/phieu-chi',
      },
      {
        blank: '',
        label: 'Sổ quỹ',
        link: '/crm/so-quy',
      },
      {
        blank: '',
        label: 'Công nợ',
        link: '/crm/cong-no-nha-cung-cap',
      },
      {
        blank: '',
        label: 'Sản phẩm',
        link: '/crm/san-pham',
      },
    ],
    content: 'Quản lý thu chi',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_bin.svg',
    link: '/crm/delete_data/list',
    children: [],
    content: 'Dữ liệu đã xoá',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/nav_setting.svg',
    link: '/crm/setting/main',
    children: [],
    content: 'Cài đặt',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/i_cds365.svg',
    link: 'https://quanlychung.timviec365.vn/quan-ly-ung-dung-cong-ty.html',
    children: [],
    content: 'Chuyển đổi số',
  },
  {
    img_link: 'https://crm.timviec365.vn/assets/icons/i_cds365.svg',
    link: 'https://quanlychung.timviec365.vn/quan-ly-ung-dung-nhan-vien.html',
    children: [],
    content: '',
  },
]

export const boxDesPrimaryCustomer = {
  title: 'Tổng khách hàng: ',
  amount: 453203,
}

export const boxDesWarningCustomer = {
  title: 'Tổng nhóm khách hàng: ',
  amount: 41,
}

export const boxDesPrimaryOrder = {
  title: 'Tổng đơn hàng:  ',
  amount: 5605,
}

export const boxDesSucessOrder = {
  title: 'Đơn hàng thành công: ',
  amount: 32,
}

export const boxDesWarningOrder = {
  title: 'Đơn hàng chưa thanh toán ',
  amount: 41,
}

export const boxDesPrimaryMarketing = {
  title: 'Tổng chiến dịch: ',
  amount: 0,
}

export const boxDesWarningMarketing = {
  title: 'Email đã gửi: ',
  amount: 0,
}

export const messages_data_box = [
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-mess.svg',
    name: 'Nguyễn Đào Lực',
    message: 'Hihihi',
    timestamp: '10:07 AM',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-mess.svg',
    name: 'Minh Anh',
    message: 'Test',
    timestamp: '10:07 AM',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-mess.svg',
    name: 'Duc Long',
    message: 'Xin chao',
    timestamp: '10:07 AM',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-mess.svg',
    name: 'Nguyễn Đào Lực',
    message: 'Hihihi',
    timestamp: '10:07 AM',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-mess.svg',
    name: 'Nguyễn Đào Lực',
    message: 'Hihihi',
    timestamp: '10:07 AM',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-mess.svg',
    name: 'Nguyễn Đào Lực',
    message: 'Hihihi',
    timestamp: '10:07 AM',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-mess.svg',
    name: 'Nguyễn Đào Lực',
    message: 'Hihihi',
    timestamp: '10:07 AM',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-mess.svg',
    name: 'Nguyễn Đào Lực',
    message: 'Hihihi',
    timestamp: '10:07 AM',
  },
]

export const warning_header_box = [
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-help.svg',
    children: [],
    content: 'Mọi người đi làm nền đeo khẩu trang để phòng ngừa Virus Corona',
    timestamp: '3 giờ trước',
    name: 'Chấm công 365',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-help.svg',
    children: [],
    content: 'Mọi người đi làm nền đeo khẩu trang để phòng ngừa Virus Corona',
    timestamp: '3 giờ trước',
    name: 'Chấm công 365',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-help.svg',
    children: [],
    content: 'Mọi người đi làm nền đeo khẩu trang để phòng ngừa Virus Corona',
    timestamp: '3 giờ trước',
    name: 'Chấm công 365',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-help.svg',
    children: [],
    content: 'Mọi người đi làm nền đeo khẩu trang để phòng ngừa Virus Corona',
    timestamp: '3 giờ trước',
    name: 'Chấm công 365',
  },
  {
    img: 'https://crm.timviec365.vn/assets/icons/icon-avatar-help.svg',
    children: [],
    content: 'Mọi người đi làm nền đeo khẩu trang để phòng ngừa Virus Corona',
    timestamp: '3 giờ trước',
    name: 'Chấm công 365',
  },
]

export const dataOptions = [
  {
    type: 'status',
    data: [
      'Khách hàng XYZ',
      'Khách hàng thượng lưu',
      'Khách hàng tốt bụng',
      'Khách hàng phổ thông',
      'Khách hàng VIP',
    ],
  },
  {
    type: 'source',
    data: ['Facebook', 'Zalo', 'SMS', 'Chăm sóc khách hàng', 'Website'],
  },
  {
    type: 'parrent',
    data: ['XYZ', 'ABC'],
  },
  {
    type: 'child',
    data: ['XYZ', 'ABC'],
  },
]

export const dataActionPotential = [
  {
    link: '',
    name: 'Gọi điện',
    img: 'bi bi-telephone',
    type: 'call',
  },
  {
    link: '#',
    name: 'Chọn vào chiến dịch',
    img: 'bi bi-check-square',
    type: 'campaign',
  },
  {
    link: '#',
    name: 'Email marketing',
    img: `bi bi-envelope`,
    type: 'email',
  },
  {
    link: '/crm/marketing/sms/add',
    name: 'Gửi sms',
    img: `bi bi-chat-left-dots`,
    type: 'sms',
  },
  {
    link: '#',
    name: 'Chia sẻ',
    img: `bi bi-reply-fill`,
    type: 'share',
  },
  {
    link: '#',
    name: 'Bàn giao công việc',
    img: `bi bi-bag`,
    type: 'hand_over',
  },
  {
    link: '/crm/potential/add_file',
    name: 'Nhân bản',
    img: `bi bi-back`,
    type: 'blank',
  },
  {
    link: '/crm/potential/check_merge',
    name: 'Kiểm tra trùng',
    img: `bi bi-search`,
    type: '',
  },
  {
    link: '/crm/potential/merge',
    name: 'Gộp trùng',
    img: `bi bi-share`,
    type: '',
  },
]
export const dataActionQuote = [
  {
    link: '#',
    name: 'Cập nhật tình trạng',
    img: 'bi bi-arrow-up-circle',
    type: 'update-status',
  },
  {
    link: '#',
    name: 'Chia sẻ',
    img: `bi bi-reply-fill`,
    type: 'share',
  },
  {
    link: '#',
    name: 'Bàn giao công việc',
    img: `bi bi-bag`,
    type: 'hand_over',
  },
  {
    link: '/crm/quote/edit',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: 'edit',
  },
  {
    link: '#',
    name: 'Xóa',
    img: `bi bi-trash3`,
    type: 'delete',
  },
  {
    link: '#',
    name: 'Gửi qua chát',
    img: 'bi bi-send',
    type: 'send',
  },
  {
    link: '#',
    name: 'Tải xuống',
    img: 'bi bi-download',
    type: 'download',
  },
  {
    link: '#',
    name: 'In',
    img: 'bi bi-printer',
    type: 'printer',
  },
]
export const dataActionLichHenQuote = [
  {
    link: '#',
    name: 'Gọi điện',
    img: 'bi bi-telephone-outbound-fill',
    type: 'call',
  },
  {
    link: '#',
    name: 'Hoàn thành',
    img: `bi bi-check2-circle`,
    type: 'complete',
  },
  {
    link: '#',
    name: 'Hủy lịch hẹn',
    img: `bi bi-x-circle`,
    type: 'cancel',
  },
  {
    link: '#',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: 'edit',
  },
  {
    link: '#',
    name: 'Xóa',
    img: `bi bi-trash3`,
    type: 'delete',
  },
]
export const dataActionEmailPotential = [
  {
    link: '#',
    name: 'Xem trước',
    img: 'bi bi-eye',
    type: 'view',
  },
  {
    link: '#',
    name: 'Gửi lại',
    img: `bi bi-send`,
    type: 'reSend',
  },
  {
    link: '#',
    name: 'Gửi thử',
    img: `bi bi-envelope`,
    type: 'cancel',
  },
  {
    link: '#',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: 'edit',
  },
  {
    link: '#',
    name: 'Xóa',
    img: `bi bi-trash3`,
    type: 'delete',
  },
]

export const dataActionForm = [
  {
    link: '#',
    name: 'Gửi qua chát',
    img: 'bi bi-send',
    type: 'send',
  },
  {
    link: '#',
    name: 'Tải xuống',
    img: 'bi bi-download',
    type: 'download',
  },
  {
    link: '#',
    name: 'In',
    img: 'bi bi-printer',
    type: 'printer',
  },
]

export const dataActionOrder = [
  {
    link: '#',
    name: 'Duyệt',
    img: 'bi bi-check2-circle',
    type: 'order_browsing',
  },
  {
    link: '#',
    name: 'Từ chối',
    img: 'bi bi-x-circle',
    type: 'deny',
  },
  {
    link: '#',
    name: 'Hủy',
    img: 'bi bi-x',
    type: 'cancel',
  },
  {
    link: '#',
    name: 'Chia sẻ',
    img: `bi bi-reply-fill`,
    type: 'share',
  },
  {
    link: '#',
    name: 'Bàn giao công việc',
    img: `bi bi-bag`,
    type: 'hand_over',
  },
  {
    link: '/crm/order/edit',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: 'edit',
  },
  {
    link: '#',
    name: 'Xóa',
    img: `bi bi-trash3`,
    type: 'delete',
  },
]

export const dataActionBill = [
  {
    link: '#',
    name: 'Duyệt',
    img: 'bi bi-check2-circle',
    type: 'bill_browsing',
  },
  {
    link: '#',
    name: 'Từ chối',
    img: 'bi bi-x-circle',
    type: 'deny',
  },
  {
    link: '#',
    name: 'Hủy',
    img: 'bi bi-x',
    type: 'cancel',
  },
  {
    link: '#',
    name: 'Chia sẻ',
    img: `bi bi-reply-fill`,
    type: 'share',
  },
  {
    link: '#',
    name: 'Bàn giao công việc',
    img: `bi bi-bag`,
    type: 'hand_over',
  },
  {
    link: '/crm/bill/edit',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: 'edit',
  },
  {
    link: '#',
    name: 'Xóa',
    img: `bi bi-trash3`,
    type: 'delete',
  },
]

export const dataActionOrderDetailGiveback = [
  {
    link: '#',
    name: 'Duyệt',
    img: 'bi bi-check2-circle',
    type: 'order_browsing',
  },
  {
    link: '#',
    name: 'Từ chối',
    img: 'bi bi-x-circle',
    type: 'deny',
  },
  {
    link: '#',
    name: 'Hủy',
    img: 'bi bi-x',
    type: 'cancel',
  },
  {
    link: '#',
    name: 'Cập nhật tình trạng thực hiện',
    img: `bi bi-bag`,
    type: 'hand_over',
  },
  {
    link: '/crm/order/edit',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: 'edit',
  },
  {
    link: '#',
    name: 'Xóa',
    img: `bi bi-trash3`,
    type: 'delete',
  },
]

export const dataCustomerListAction = [
  {
    link: '',
    name: 'Gọi điện',
    img: 'bi bi-telephone',
    type: 'call',
  },
  {
    link: '#',
    name: 'Chia sẻ',
    img: `bi bi-reply-fill`,
    type: 'share',
  },
  {
    link: '#',
    name: 'Bàn giao công việc',
    img: `bi bi-bag`,
    type: 'hand_over',
  },
  {
    link: '/crm/customer/check_merge',
    name: 'Kiểm tra trùng',
    img: `bi bi-search`,
    type: '',
  },
  {
    link: '/crm/customer/same_filter',
    name: 'Gộp trùng',
    img: `bi bi-share`,
    type: '',
  },
  {
    link: '/crm/customer/edit_file',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: '',
  },
  {
    link: '#',
    name: 'Xóa',
    img: `bi bi-trash3`,
    type: 'delete',
  },
]

export const dataCampaginCustomerAction = [
  {
    link: '#',
    name: 'Thêm lịch hẹn',
    img: `bi bi-calendar`,
    type: 'add_calendar',
  },
  {
    link: '#',
    name: 'Thêm lịch chăm sóc',
    img: `bi bi-headphones`,
    type: 'add_care',
  },
  {
    link: '#',
    name: 'Gọi điện',
    img: 'bi bi-telephone',
    type: 'call',
  },
  {
    link: '#',
    name: 'Cập nhật trạng thái',
    img: `bi bi-menu-up`,
    type: 'status',
  },
  {
    link: '#',
    name: 'Phân công',
    img: `bi bi-person-check-fill`,
    type: 'hand_over',
  },
  {
    link: '/crm/customer/edit',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: '',
  },
  {
    link: '#',
    name: 'Loại bỏ',
    img: `bi bi-trash3`,
    type: 'delete',
  },
]

export const dataActionPricePolicy = [
  {
    link: '/crm/price_policy/update',
    name: 'Chỉnh Sửa',
    img: `bi bi-pencil-square`,
    type: '',
  },
  {
    link: '#',
    name: 'Xóa',
    img: `bi bi-trash3`,
    type: 'delete',
  },
]
