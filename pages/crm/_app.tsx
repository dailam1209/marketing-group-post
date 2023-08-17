import { AccessContextComponent } from "@/components/crm/context/accessContext";
import { SidebarResize } from "@/components/crm/context/resizeContext";
import Header from "@/components/crm/header/header";
import useModal from "@/components/crm/hooks/useModal";
import Sidebar from "@/components/crm/sidebar/sidebar";
import styles from "@/components/crm/sidebar/sidebar.module.css";
import type { AppProps } from "next/app";
import ChatBusiness from "@/components/crm/chat/chat";
import { NavigateContextComponent } from "@/components/crm/context/navigateContext";
import TitleHeaderMobile from "@/components/crm/header/title_header_mobile";
export default function App({ Component, pageProps }: AppProps) {
  const { isOpen, toggleModal } = useModal("icon_menu_nav", [styles.sidebar]);
  return (
    <>
      <AccessContextComponent>
        <SidebarResize>
          <NavigateContextComponent>
            <Header toggleModal={toggleModal} />
            <Sidebar isOpened={isOpen} />
            <ChatBusiness />
            <TitleHeaderMobile />
            <Component {...pageProps} />
          </NavigateContextComponent>
        </SidebarResize>
      </AccessContextComponent>
    </>
  );
}
