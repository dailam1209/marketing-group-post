import { sidebar_button_group } from "../ultis/consntant";
import Link from "next/link";
import style from "./sidebar.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AccessContext } from "../context/accessContext";
import React from "react";
import Cookies from "js-cookie";
export default function SiebarContent({ isOpen, toggleModal }: any) {
  const tokenBase = Cookies.get("token_base365");
  const btnResize = useRef<HTMLDivElement>(null);
  const [accessRoleOpen, setAccessRoleOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isCustomCareOpen, setIsCustomCareOpen] = useState(false);
  const [isMKTOpen, setIsMKTOpen] = useState(false);
  const [isManageCostOpen, setIsManageCostOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [isCommodity, setIsCommodity] = useState(false);

  const { accessAcountRole, setAccessAcountRole }: any =
    useContext(AccessContext);

  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 1024) {
        btnResize.current?.classList.remove("active_resize");
        btnResize.current?.querySelector("img")?.classList.remove("rotateBtn");
        document?.querySelectorAll(".none")?.forEach((node) => {
          node.classList.remove("none");
        });
      }
    }
  };

  const handleResizeSIdeBar = () => {
    toggleModal(!isOpen);
    setAccessRoleOpen(false);
    setIsCustomCareOpen(false);
    setIsCustomOpen(false);
    setIsMKTOpen(false);
    setIsManageCostOpen(false);
    setProviderOpen(false);
  };

  const handleOpenChild = (label: string) => {
    if (isOpen) {
      toggleModal(false);
    }
    if (label === "Phân quyền") {
      setAccessRoleOpen(!accessRoleOpen);
    }
    if (label === "Vật tư hàng hóa") {
      setIsCommodity(!isCommodity);
    }
    if (label === "Thông tin khách hàng") {
      setIsCustomOpen(!isCustomOpen);
    }
    if (label === "Chăm sóc khách hàng") {
      setIsCustomCareOpen(!isCustomCareOpen);
    }
    if (label === "Marketing") {
      setIsMKTOpen(!isMKTOpen);
    }
    if (label === "Quản lý thu chi") {
      setIsManageCostOpen(!isManageCostOpen);
    }

    if (label === "Nhà cung cấp") {
      setProviderOpen(!providerOpen);
    }
  };

  const isOpenChild = (label: string) => {
    if (label === "Phân quyền") {
      return accessRoleOpen;
    }
    if (label === "Thông tin khách hàng") {
      return isCustomOpen;
    }
    if (label === "Chăm sóc khách hàng") {
      return isCustomCareOpen;
    }
    if (label === "Marketing") {
      return isMKTOpen;
    }
    if (label === "Quản lý thu chi") {
      return isManageCostOpen;
    }
    if (label === "Nhà cung cấp") {
      return providerOpen;
    }
    if (label === "Vật tư hàng hóa") {
      return isCommodity;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      btnResize.current?.classList.remove("active_resize");
      btnResize.current?.querySelector("img")?.classList.remove("rotateBtn");
    } else {
      btnResize.current?.classList.add("active_resize");
      btnResize.current?.querySelector("img")?.classList.add("rotateBtn");
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebar_button_group_company = [
    {
      img_link: "/crm/home.svg",
      link: `/home`,
      children: [],
      content: "Trang chủ",
    },
    {
      img_link: "/crm/role.svg",
      link: `#`,
      content: "Phân quyền",
      children: [
        {
          blank: "",
          label: "Thiết lập quyền",
          link: "/thiet-lap-quyen",
        },
        {
          blank: "_blank",
          label: "Bổ nhiệm, quy hoạch",
          link: "https://phanmemnhansu.timviec365.vn/bien-dong-nhan-su.html?tab=1",
        },
      ],
    },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Danh sách khách hàng",
          link: "/customer/list",
        },
        {
          blank: "",
          label: "Nhóm khách hàng",
          link: "/customer/group/list",
        },
        {
          blank: "",
          label: "Tình trạng khách hàng",
          link: "/tinh-trang-khach-hang",
        },
        {
          blank: "",
          label: "Nhập liệu",
          link: "/customer/input/add",
        },
      ],
      content: "Thông tin khách hàng",
    },
    {
      img_link: "/crm/hotline.svg",
      link: "/crm",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Tổng đài",
          link: "/tong-dai",
        },
        {
          blank: "",
          label: "Khảo sát",
          link: "/khao-sat",
        },
        {
          blank: "",
          label: "Lịch chăm sóc khách hàng",
          link: "/lich-cham-soc-khach-hang",
        },
        {
          blank: "",
          label: "Lịch hẹn",
          link: "/lich-hen",
        },
      ],
      content: "Chăm sóc khách hàng",
    },
    {
      img_link: "/crm/contract.svg",
      link: "/contract/list",
      children: [],
      content: "Hợp đồng",
    },

    {
      img_link: "/crm/nav_potential.svg",
      link: `/potential/list`,
      children: [],
      content: "Tiềm năng",
    },
    {
      img_link: "/crm/chance.svg",
      link: "/chance/list",
      children: [],
      content: "Cơ hội",
    },
    {
      img_link: "/crm/chiendich.svg",
      link: "/campaign/list",
      children: [],
      content: "Chiến dịch",
    },
    {
      img_link: "/crm/form.svg",
      link: "#",
      // role: "seen",
      children: [],
      content: "Báo cáo",
    },
    {
      img_link: "/crm/baogia.svg",
      link: "/quote/list",
      children: [],
      content: "Báo giá",
    },
    {
      img_link: "/crm/nav-price-promotion.svg",
      link: "/promotion/list",
      children: [],
      content: "Quản lý khuyến mãi",
    },
    {
      img_link: "/crm/warehouse.png",
      link: "#",
      children: [
        {
          blank: "",
          label: "Danh sách vật tư, hàng hóa",
          link: "/commodity/list",
        },
        {
          blank: "",
          label: "Nhóm vật tư, hàng hóa",
          link: "/commodity/group",
        },
        {
          blank: "",
          label: "Đơn vị tính",
          link: "/commodity/unit",
        },
      ],
      content: "Vật tư hàng hóa",
    },
    {
      img_link: "/crm/marketing.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Email",
          link: "/marketing/email",
        },
        {
          blank: "",
          label: "SMS",
          link: "/marketing/sms",
        },
      ],
      content: "Marketing",
    },
    {
      img_link: "/crm/cart.svg",
      link: "/order/list",
      children: [],
      content: "Quản lý đơn hàng",
    },

    {
      img_link: "/crm/bill.svg",
      link: "/bill/list",
      children: [],
      content: "Quản lý hoá đơn",
    },
    {
      img_link: "/crm/supplier.svg",
      link: "/price_policy/list",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Danh sách nhà cung cấp",
          link: "/supplier/list",
        },
        {
          blank: "",
          label: "Nhóm nhà cung cấp",
          link: "/supplier/group",
        },
      ],
      content: "Nhà cung cấp",
    },
    {
      img_link: "/crm/nav_price_policy.svg",
      link: "/price_policy/list",
      children: [],
      content: "Chính sách giá",
    },
    {
      img_link: "/crm/nav_product_return.svg",
      link: "/product_return/list",
      children: [],
      content: "Trả lại hàng bán",
    },
    {
      img_link: "/crm/re-expen.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Theo dõi thu chi",
          link: "/theo-doi-thu-chi",
        },
        {
          blank: "",
          label: "Phiếu thu",
          link: "/phieu-thu",
        },
        {
          blank: "",
          label: "Phiếu chi",
          link: "/phieu-chi",
        },
        {
          blank: "",
          label: "Sổ quỹ",
          link: "/so-quy",
        },
        {
          blank: "",
          label: "Công nợ",
          link: "/cong-no-nha-cung-cap",
        },
        {
          blank: "",
          label: "Sản phẩm",
          link: "/san-pham",
        },
      ],
      content: "Quản lý thu chi",
    },
    {
      img_link: "/crm/nav_bin.svg",
      link: "/delete_data/list",
      children: [],
      content: "Dữ liệu đã xoá",
    },
    {
      img_link: "/crm/nav_setting.svg",
      link: "/setting/main",
      // role: "seen",
      children: [],
      content: "Cài đặt",
    },
    {
      img_link: "/crm/i_cds365.svg",
      link: "https://hungha365.com/",
      children: [],
      content: "Chuyển đổi số",
    },
    {
      img_link: "/crm/i_cds365.svg",
      link: "https://hungha365.com/",
      children: [],
      content: "",
    },
  ];
  const [infoRole, setInfoRole] = useState([]);

  const handleGetThongTinQuyen = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/role/show-role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenBase}`,
          },

          body: JSON.stringify({
            id_user: "10000168",
          }),
        }
      );
      const data = await res.json();
      if (data && data?.data) {
        setInfoRole(data?.data?.roles);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleGetThongTinQuyen();
  }, []);
  return (
    <>
      <div className={style.sidebar_content}>
        {(accessAcountRole.role === "company"
          ? sidebar_button_group_company
          : sidebar_button_group
        )?.map((items: any, i) => (
          <>
            {/* {items?.role === "seen" ? ( */}
            <div className={style.item_parent} key={i}>
              {items && items.children && items.children.length > 0 ? (
                <>
                  <div
                    onClick={() => handleOpenChild(items.content)}
                    className={style.item_link}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={items.img_link} className={style.img_link} />
                    <div
                      className={`${style.title} ${!isOpen ? null : "none"}`}
                    >
                      {items.content}
                    </div>
                  </div>
                  {isOpenChild(items.content) && (
                    <ul className={style.navbar_treeview}>
                      {items.children.length > 0 &&
                        items?.children.map((child, index) => (
                          <li key={index}>
                            <Link
                              target={child.blank}
                              href={child.link}
                              className={style.navbar__item_link}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={items.link}
                  className={style.item_link}
                  style={{ cursor: "pointer" }}
                >
                  <img src={items.img_link} className={style.img_link} />
                  <div className={`${style.title} ${!isOpen ? null : "none"}`}>
                    {items.content}
                  </div>
                </Link>
              )}
            </div>
            {/* ) : ( */}
            {/* <></> */}
            {/* )} */}
          </>
        ))}
      </div>
      <button
        ref={btnResize as any}
        type="button"
        className={style.btn_zoom}
        onClick={handleResizeSIdeBar}
      >
        <img src="/crm/navBarZoom.svg" alt="btn" />
      </button>
    </>
  );
}
