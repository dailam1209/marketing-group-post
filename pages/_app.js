import React, { useEffect, useState } from "react";
// import "@/styles/globals.css";
import { AccessContextComponent } from "@/components/crm/context/accessContext";
import { SidebarResize } from "@/components/crm/context/resizeContext";
import Header from "@/components/crm/header/header";
import useModal from "@/components/crm/hooks/useModal";
import Sidebar from "@/components/crm/sidebar/sidebar";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ConfigProvider, Spin } from "antd";
import Bodyframe from "@/components/bodyFrameNs/bodyFrame.tsx";
import { useRouter } from "next/router.js";
import ChatBusiness from "@/components/crm/chat/chat";
import { NavigateContextComponent } from "@/components/crm/context/navigateContext";
import TitleHeaderMobile from "@/components/crm/header/title_header_mobile";
import styles from "@/components/crm/sidebar/sidebar.module.css";
// import "@/styles/crm/stylecrm.css";
// import "@/styles/crm/styles.css"
// import "@/styles/crm/hight_chart.css"
import Layout from "@/components/hr/Layout";
import Head from "next/head";
import Seo from "@/components/head";
import { Provider } from "react-redux";
import { TongDaiContext } from "@/components/crm/context/tongdaiContext";
import Layout_admin from "@/components/VanThu/Layout_admin";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Layout_user from "@/components/VanThu/Layout_user";
import { setCookie } from "cookies-next";
import { store } from "@/components/crm/redux/store";
import io from "socket.io-client";

export const LoadingComp = () => {
  return (
    <Spin
      // indicator={<LoadingOutlined rev={null} />}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
      }}
    />
  );
};

export default function App({ Component, pageProps }) {
  const { isOpen, toggleModal } = useModal("icon_menu_nav", [styles.sidebar]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(
    router?.pathname?.includes("/phan-mem-nhan-su/") ? false : true
  );
  useEffect(() => {
    const doLoading = () => {
      const start = () => {
        setLoading(true);
      };
      const end = () => {
        setLoading(false);
      };
      setTimeout(() => {
        router.events.on("routeChangeStart", start);
      }, 200);
      setTimeout(() => {
        router.events.on("routeChangeComplete", end);
      }, 200);
      router.events.on("routeChangeError", end);
      return () => {
        router.events.off("routeChangeStart", start);
        router.events.off("routeChangeComplete", end);
        router.events.off("routeChangeError", end);
      };
    };
    if (!router?.pathname?.includes("/phan-mem-nhan-su/")) {
      doLoading();
    } else {
    }
  }, [router?.pathname]);















  //socket io











  // useEffect(() => {
  //   // Tạo kết nối đến máy chủ Socket.IO
  //   const socket = io.connect("https://socket.timviec365.vn", {
  //     secure: true,
  //     enabledTransports: ["https"],
  //     transports: ["websocket", "polling"],
  //   });
  //   // Đoạn mã xử lý sự kiện và giao tiếp với máy chủ Socket.IO
  //   socket.on("connect", () => {
  //     console.log("Connected to Socket.IO");
  //     // Thêm xử lý sự kiện hoặc truyền tải dữ liệu ở đây
  //   });
  //   console.log("check soc:", socket);
  //   const role2 = Cookies.get("role");
  //   const userId = Cookies.get("userID");
  //   console.log("1ne", role2);
  //   console.log("1ne", userId);
  //   function call__now(e) {
  //     var elm = $(e),
  //         id = elm.attr('data-id');
  //     if (id != undefined) {
  //         // $('.call').addClass('orange');
  //         var url = "/Handles/Appointment_schedule/get_infor_old";
  //         var data = {
  //             id: id
  //         };
  //         var responseObject = callAjax(url, data);
  //         if (responseObject != undefined) {
  //             $('#box_add_appontment input[name="id"]').val(id);
  //             $('#box_add_appontment input[name="cus_id"]').val(responseObject.data.item.cus_id);
  //             $('#box_add_appontment input[name="business_assistant_cus_phone"]').val(responseObject.data.item.phone_number);
  //             $('#box_add_appontment input[name="business_assistant_cus_name"]').val(responseObject.data.item.name);
  //             $('#box_add_appontment input[name="business_assistant_cus_email"]').val(responseObject.data.item.email);
  //             $('#box_add_appontment textarea[name="business_assistant_desc"]').val(responseObject.data.item.description);
  //             var status = responseObject.data.item.status != 0 ? responseObject.data.item.status : "";
  //             $('#box_add_appontment select[name="business_assistant_cus_status"]').val(status).change();
  //             var group_id = responseObject.data.item.group_id != 0 ? responseObject.data.item.group_id : "";
  //             $('#box_add_appontment select[name="business_assistant_cus_group"]').val(group_id).change();
  //             var resoure = responseObject.data.item.resoure != 0 ? responseObject.data.item.resoure : "";
  //             $('#box_add_appontment select[name="business_assistant_cus_resoure"]').val(resoure).change();
  //             var content_call = '';
  //             if (responseObject.data.appointment_content_call.length > 0) {
  //                 $.each(responseObject.data.appointment_content_call, function(index, item) {
  //                     content_call += `<div class="item">
  //                                         <p class="times">` + item.created_at + `</p>
  //                                         <div>` + item.content_call + `</div>
  //                                         <div class="box_button"><button type="button">Xem thĂªm ></button></div>
  //                                     </div>`;
  //                 });
  //             }
  //             $('#box_content').html(content_call);
  //             $('#contentAppontment').modal('show');
  //         }
  //     }
  // }

  //   if (role2 == 2) {
  //     socket.emit('CRMJoin', userId);
  //     socket.on('CRMNotification', (content, customerName, customerId, groupName, link, type, phone) => {
  //         var alert = '';
  //         if (type == 1) {
  //             var contentAlert = 'Báº¡n cĂ³ khĂ¡ch hĂ ng <span class="alert__item__customer__name">' + customerName + '</span> vá»«a Ä‘Æ°á»£c thĂªm';
  //             if (groupName != 'crm365NULL') {
  //                 contentAlert += ' vĂ o nhĂ³m khĂ¡ch hĂ ng <i class="alert__item__group__name">' + groupName + '</i>';
  //             }
  //         }
  //         if (type == 2) {
  //             var contentAlert = 'KhĂ¡ch hĂ ng <span class="alert__item__customer__name">' + customerName + '</span> vá»«a cáº­p nháº­t thĂ´ng tin';
  //         }
  //         if (contentAlert != undefined) {
  //             alert = `<div class="alert__item">
  //             <div class="alert__item__header"><button type="button" onclick="delete_alert(this)">X</button></div>
  //             <div class="alert__item__content">
  //               ` + contentAlert + `
  //             </div>
  //             <div class="alert__item__footer">
  //             <button type="button" class="alert__call__now" onClick={()=>call__now(this)} data-id="` + customerId + `">
  //             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                   <path d="M9.65504 3.67583C10.3084 3.80331 10.9089 4.12286 11.3797 4.59359C11.8504 5.06432 12.1699 5.66481 12.2974 6.3182M9.65504 1C11.0125 1.15081 12.2784 1.75871 13.2448 2.72391C14.2112 3.6891 14.8207 4.95421 14.9732 6.31151M14.3043 11.6498V13.6567C14.305 13.843 14.2669 14.0274 14.1922 14.1981C14.1176 14.3688 14.0081 14.522 13.8709 14.648C13.7336 14.7739 13.5715 14.8698 13.395 14.9295C13.2185 14.9892 13.0315 15.0113 12.846 14.9946C10.7875 14.7709 8.81014 14.0675 7.07286 12.9409C5.45655 11.9138 4.0862 10.5434 3.05913 8.92713C1.92858 7.18196 1.22501 5.19502 1.00543 3.12728C0.988713 2.94229 1.0107 2.75585 1.06998 2.57982C1.12927 2.4038 1.22456 2.24204 1.34979 2.10486C1.47501 1.96768 1.62743 1.85808 1.79733 1.78303C1.96724 1.70798 2.15091 1.66913 2.33665 1.66896H4.34352C4.66817 1.66576 4.98291 1.78072 5.22906 1.99242C5.47522 2.20411 5.636 2.49809 5.68144 2.81956C5.76614 3.4618 5.92323 4.0924 6.14971 4.69933C6.23971 4.93876 6.25919 5.19898 6.20583 5.44915C6.15248 5.69932 6.02853 5.92895 5.84867 6.11083L4.9991 6.9604C5.9514 8.63517 7.33808 10.0218 9.01284 10.9741L9.86241 10.1246C10.0443 9.94471 10.2739 9.82076 10.5241 9.76741C10.7743 9.71405 11.0345 9.73353 11.2739 9.82354C11.8808 10.05 12.5114 10.2071 13.1537 10.2918C13.4786 10.3376 13.7754 10.5013 13.9876 10.7517C14.1997 11.0021 14.3124 11.3217 14.3043 11.6498Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  //                 </svg>
  //                 Gọi ngay
  //               </button>
  //             </div>
  //           </div>`;
  //           const boxAlertElement = document.getElementById("box_alert");
  //           if (boxAlertElement) {
  //             boxAlertElement.insertAdjacentHTML("afterbegin", alert);
  //         }
  //         }
  //     });
  // }
  
  // function loading() {
  //     $('body').append('<div id="loading"><img src="/assets/img/load_data.gif"></div>');
  // }
  
  // function removeLoading() {
  //     $('#loading').remove();
  // }
  
  // function number_format(number) {
  //     number = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     return number != NaN ? number : '';
  // }
  
  // function get_district(e, elm_show) {
  //     var elm = $(e);
  //     var item = '<option value="0">Chá»n quáº­n huyá»‡n</option>';
  //     if (elm.val() != 0) {
  //         var data = { id: elm.val() };
  //         var url = "/Handles/Manager/get_district";
  //         var response = callAjax(url, data);
  
  //         response.data.forEach(element => {
  //             item += `<option value="` + element.cit_id + `">` + element.cit_name + `</option>`;
  //         });
  //     }
  //     $('#' + elm_show).html(item);
  // }
  
  // function get_ward(e, elm_show) {
  //     var elm = $(e);
  //     var item = '<option value="0">Chá»n PhÆ°á»ng/XĂ£</option>';
  //     if (elm.val() != 0) {
  //         var data = { id: elm.val() };
  //         var url = "/Handles/Manager/get_ward";
  //         var response = callAjax(url, data);
  
  //         response.data.forEach(element => {
  //             item += `<option value="` + element.ward_id + `">` + element.ward_name + `</option>`;
  //         });
  //     }
  //     $('#' + elm_show).html(item);
  // }
  
  // function success_notify(msg, url = null) {
  //     $('#notify_content').html(msg);
  //     $('#modalNotify').modal('show');
  
  //     if (url != null) {
  //         setTimeout(() => {
  //             window.location.href = url;
  //         }, 2000);
  //     } else {
  //         setTimeout(() => {
  //             reloadPage();
  //         }, 2000);
  //     }
  // }
  
  // function error_notify(msg,load = false) {
  //     $('#notify_error_content').html(msg);
  //     $('#modalErrorNotify').modal('show');
  //     if(load != false){
  //         setTimeout(() => {
  //             reloadPage();
  //         },2000);
  //     }
  
  // }
  //   // Thoát khỏi kết nối khi component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);






  
  useEffect(() => {
    if (!router.pathname.includes("/phan-mem-nhan-su/")) {
      const timeout = setTimeout(() => {
        setFirstLoad(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [router?.pathname]);

  const shouldShowSidebarAndHeader = router.pathname.includes("/crm/");

  const importGlobalStyles = () => {
    if (router.pathname?.includes("/phan-mem-nhan-su/")) {
      import("../styles/globals_hr.css");
    } else if (router.pathname?.includes("crm")) {
      import("../styles/crm/stylecrm.css");
      import("../styles/crm/styles.css");
      import("../styles/crm/hight_chart.css");
    } else if (router.pathname?.includes("VanThu")) {
      import("../styles/globals_vanthu.css");
    } else if (router.pathname.includes("/quan-ly-nhan-luc")) {
      import("@/styles/globals.css");
    } else {
    }
  };

  useEffect(() => {
    importGlobalStyles();
  }, [router.pathname]);

  const role = Cookies.get("role");
  const VanThu_token = Cookies.get("token_base365");
  if (VanThu_token) {
    const user_infor = jwtDecode(VanThu_token);
    sessionStorage.setItem("token", VanThu_token);
    const halfLength = Math.ceil(VanThu_token?.length / 2);
    const firstHalf = VanThu_token?.slice(0, halfLength);
    const secondHalf = VanThu_token?.slice(halfLength);
    setCookie("token_first", firstHalf, { maxAge: 60 * 60 * 1 });
    setCookie("token_hafl", secondHalf, { maxAge: 60 * 60 * 1 });
    setCookie("userName", user_infor?.data.userName);
    setCookie("userID", user_infor?.data.idQLC);
    setCookie("com_id", user_infor?.data.com_id);
  }

  return (
    <>
      <Seo />
      {loading ? (
        <LoadingComp />
      ) : !firstLoad ? (
        <ConfigProvider
          theme={{
            token: {
              screenLG: 1025,
              screenLGMin: 1025,
              screenLGMax: 1025,
              screenMD: 769,
              screenMDMin: 769,
            },
          }}
        >
          {router.pathname?.includes("cham-cong") ? (
            <Bodyframe>
              <Component {...pageProps} />
            </Bodyframe>
          ) : router.pathname?.includes("crm") ? (
            <Provider store={store}>
              <AccessContextComponent>
                <SidebarResize>
                  <NavigateContextComponent>
                    {
                      <>
                        <Header toggleModal={toggleModal} />
                        <Sidebar isOpened={isOpen} />
                        <ChatBusiness />
                      </>
                    }
                    <TitleHeaderMobile />
                    <TongDaiContext>
                      <Component {...pageProps} />
                    </TongDaiContext>
                  </NavigateContextComponent>
                </SidebarResize>
              </AccessContextComponent>
            </Provider>
          ) : router.pathname?.includes("/phan-mem-nhan-su/") ? (
            <Layout>
              <DndProvider backend={HTML5Backend}>
                <Component {...pageProps} />
              </DndProvider>
            </Layout>
          ) : router.pathname?.includes("VanThu") ? (
            <Provider store={store}>
              {/* 
              -  Khi đăng nhập sẽ lưu session giá trị để duy trì các phiên trong site
              -  Giá trị này có thể thay đổi tùy theo tài khoản của công ty hoặc nhân viên
              */}
              {!VanThu_token ? (
                <>
                  <p>Vui lòng đăng nhập</p>
                </>
              ) : (
                <>
                  {role && role === "2" && (
                    <Layout_user>
                      <Component {...pageProps} />
                    </Layout_user>
                  )}
                  {role && role === "1" && (
                    <Layout_admin>
                      <Component {...pageProps} />
                    </Layout_admin>
                  )}
                </>
              )}
            </Provider>
          ) : (
            <Component {...pageProps} />
          )}
        </ConfigProvider>
      ) : (
        <LoadingComp />
      )}
    </>
  );
}
