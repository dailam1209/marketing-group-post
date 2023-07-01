import Header from "./header/Header"
import head from "./head/Head"
import Footer from "./footer/Footer"
export default function Layout({ children, isLoggedIn }) {
  return (
    <>
      {!isLoggedIn && <Header />}
      {children}
      {!isLoggedIn && <Footer />}
    </>
  );
}