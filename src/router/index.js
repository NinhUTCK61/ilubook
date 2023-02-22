import { BrowserRouter, Route, Routes } from "react-router-dom";
import { listRouter } from "../data";

export const renderRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {listRouter.map((e, index) => (
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
