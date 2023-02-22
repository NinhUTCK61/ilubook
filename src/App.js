import "./App.css";
import * as React from "react";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";
import "aos/dist/aos.css";

function App() {
  return (
    <MainLayout>
      <Outlet data-aos="fade-up" />
    </MainLayout>
  );
}
export default App;
