import MainLayout from "./layouts/MainLayout";
import { renderRouter } from "./router";
import { BrowserRouter, Routes } from "react-router-dom";
import "aos/dist/aos.css";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>{renderRouter()}</Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
export default App;
