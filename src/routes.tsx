import { createBrowserRouter } from "react-router-dom";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import { PAGES } from "./common";
import Signin from "./pages/Signin";
import Dashboard from "./layouts/dashboard/Dashboard";

export const routes = createBrowserRouter([
  {
    errorElement: <Page404></Page404>,
    path: PAGES.HOME,
    element: <Dashboard />,
    children: [
      {
        path: PAGES.HOME,
        element: <DashboardAppPage></DashboardAppPage>,
      },
      {
        path: PAGES.PRODUCTS,
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: PAGES.SIGNIN,
    element: <Signin />,
  },
  // {
  //   path: PAGES.REGISTER,
  //   element: <Register />,
  // },
]);
