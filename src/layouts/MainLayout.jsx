import React from "react";
import FooterMainLayout from "./footer/Footer";
import Header from "./header/Header";
import HeaderBot from "./header/HeaderBot";
import "./mainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="main">
      <Header />
      <HeaderBot />
      {children}
      <FooterMainLayout />
    </div>
  );
};

export default MainLayout;
