import { Route } from "react-router-dom";
import { listRouter, listRouterPrivate } from "../data";

export const renderRouter = isPrivate => {
  const routerMap = isPrivate
    ? listRouter.concat(listRouterPrivate)
    : listRouter;
  return routerMap.map((e, index) => (
    <Route key={index} path={e.path} element={e.component} />
  ));
};
