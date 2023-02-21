import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "../component/Auth/Login";
import Register from "../component/Auth/Register";
import DetailProduct from "../pages/DetailProduct";
import Home from "../pages/Home";

const router = [
  {
    path: "/",
    component: <App />,
    child: [
      {
        key: "product-detail",
        path: "/product-detail/:id",
        component: <DetailProduct />,
      },
      { key: "home-page", path: "/", component: <Home /> },
      { key: "login-page", path: "/login", component: <Login /> },
      { key: "register-page", path: "/register", component: <Register /> },
    ],
  },
];

export const renderRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((e, index) => (
          <Route key={index} path={e.path} element={e.component}>
            {e?.child?.map((i, index) => (
              <Route key={i.key} path={i.path} element={i.component} />
            ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};
