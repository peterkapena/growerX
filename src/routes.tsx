import { createBrowserRouter, Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import { PAGES } from "./common";
// ----------------------------------------------------------------------

export const routes = createBrowserRouter([
  {
    errorElement: <Page404></Page404>,
    path: PAGES.HOME,
    element: <DashboardLayout />,
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
    element: <LoginPage />,
  },
  // {
  //   path: PAGES.REGISTER,
  //   element: <Register />,
  // },
]);
