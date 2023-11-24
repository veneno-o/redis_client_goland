import { RouterProvider, createHashRouter } from "react-router-dom";
import Add from "../pages/add";
import Details from "../pages/details";
import Home from "../pages/home";
import Look from "../pages/look";
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
    path: "/add",
    element: <Add></Add>,
  },
  {
    path: "/look",
    element: <Look></Look>,
  },
  { path: "*", element: <NoFound></NoFound> },
]);

const Router = () => {
  return <RouterProvider router={routers} />;
};

export default Router;
