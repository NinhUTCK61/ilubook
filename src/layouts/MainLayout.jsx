import React from "react";
import FooterMainLayout from "./footer/Footer";
import Header from "./header/Header";
import HeaderBot from "./header/HeaderBot";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <HeaderBot />
      {children}
      <FooterMainLayout />
    </>
  );
};

export default MainLayout;
