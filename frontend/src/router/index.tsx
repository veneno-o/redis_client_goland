import { RouterProvider, createHashRouter } from "react-router-dom";
import CRUD from "../pages/crud";
import Details from "../pages/details";
import Home from "../pages/home";
import NoFound from "../pages/nofound";

const routers = createHashRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      // {
      //     index: true, // default child outlet
      //     element: <Hello></Hello>,
      // },
    ],
  },
  {
    path: "/details",
    element: <Details></Details>,
  },
  {
    path: "/crud",
    element: <CRUD></CRUD>,
  },
  { path: "*", element: <NoFound></NoFound> },
]);

const Router = () => {
  return <RouterProvider router={routers} />;
};

export default Router;
