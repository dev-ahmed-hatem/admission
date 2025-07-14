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
      {/* <Header className="padding-container flex justify-center items-center bg-orange py-4 h-20">
        <div className="logo h-12 md:h-16">
          <Logo className="fill-calypso-900 hover:fill-calypso-950" />
        </div>
      </Header> */}

      {/* CONTENT */}
      {isAdmissions ? <AdmissionsHome /> : <Outlet />}

      {/* FOOTER */}
      <Footer className="bg-calypso-950 text-white py-6 flex flex-wrap gap-1 justify-center items-center text-center">
        {/* <div className="flex gap-2 text-sm"> */}
          <span>
            ©2025 كلية تكنولوجيا العلوم الصحية التطبيقية - جامعة المنوفية - جميع
            الحقوق محفوظة | تم التطوير بواسطة
          </span>
          <a
            href="https://kaffo.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Kaffo
          </a>
        {/* </div> */}
      </Footer>
    </Layout>
  );
};

export default AdmissionsPage;
