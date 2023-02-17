import { createBrowserRouter } from "react-router-dom";
import Page404 from "./pages/other/Page404";
import ProductsPage from "./pages/other/ProductsPage";
import DashboardAppPage from "./pages/other/DashboardAppPage";
import { PAGES } from "./common";
import Signin from "./pages/other/Signin";
import Dashboard from "./layouts/dashboard/Dashboard";
import Order from "./pages/order";
import AddProduct from "./pages/product/AddProduct";

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
        path: PAGES.ADDPRODUCT,
        element: <AddProduct></AddProduct>,
      },
      {
        path: PAGES.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: PAGES.ORDERS,
        element: <Order />,
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
