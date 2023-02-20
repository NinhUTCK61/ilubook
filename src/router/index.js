import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

const router = [
  {
    path: "/",
    component: <App />,
    child: [{ key: "home-page", path: "/", component: <Home /> }],
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
