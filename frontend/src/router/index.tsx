import { RouterProvider, createHashRouter } from "react-router-dom";
import Details from "../pages/details";
import Home from "../pages/home";
import NoFound from "../pages/nofound";
import Test from "../pages/test";

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
    path: "/:identity",
    element: <Details></Details>,
    children: [
      // {
      //     index: true, // default child outlet
      //     element: <Hello></Hello>,
      // },
    ],
  },
  {
    path: "/test",
    element: <Test></Test>,
  },
  { path: "*", element: <NoFound></NoFound> },
]);

const Router = () => {
  return <RouterProvider router={routers} />;
};

export default Router;
