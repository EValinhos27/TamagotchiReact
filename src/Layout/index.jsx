import { Outlet } from "react-router";
import Footer from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
