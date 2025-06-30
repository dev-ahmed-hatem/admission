import React from "react";
import { Layout } from "antd";
import Logo from "@/components/Logo";
import { Outlet, useMatch } from "react-router";
import AdmissionsHome from "./AdmissionsHome";

const { Header, Footer } = Layout;

const AdmissionsPage: React.FC = () => {
  const isAdmissions = useMatch("admissions");
  return (
    <Layout
      className="min-h-screen flex flex-col bg-gray-100 text-calypso-800"
      dir="rtl"
    >
      {/* HEADER */}
      <Header className="padding-container flex justify-center items-center bg-orange py-4 h-20">
        <div className="logo h-12 md:h-16">
          <Logo className="fill-calypso-900 hover:fill-calypso-950" />
        </div>
      </Header>

      {/* CONTENT */}
      {isAdmissions ? <AdmissionsHome /> : <Outlet />}

      {/* FOOTER */}
      <Footer className="bg-calypso-950 text-center text-white py-4 h-16 items-center flex justify-center">
        © 2025 Menofia University – Egypt
      </Footer>
    </Layout>
  );
};

export default AdmissionsPage;
