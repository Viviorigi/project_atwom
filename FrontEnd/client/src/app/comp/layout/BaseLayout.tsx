import { PageWrapper } from "../../styles/styles";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";

const BaseLayout = () => {
  return (
    <PageWrapper>
      <Header />
      <Sidebar />
      <div
        style={{
          minHeight: "calc(100vh - 545px)",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default BaseLayout;
