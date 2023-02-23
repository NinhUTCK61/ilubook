import { Route } from "react-router-dom";
import { listRouter } from "../data";

export const renderRouter = () => {
  return listRouter.map((e, index) => (
    <Route key={index} path={e.path} element={e.component} />
  ));
};
