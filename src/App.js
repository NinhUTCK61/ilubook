import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
export default App;
