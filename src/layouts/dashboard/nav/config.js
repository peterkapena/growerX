// component
import { PAGES } from "../../../common";
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: PAGES.HOME,
    icon: icon("ic_analytics"),
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: "product",
    path: PAGES.PRODUCTS,
    icon: icon("ic_cart"),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: "login",
    path: PAGES.SIGNIN,
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: PAGES.NOTFOUND,
    icon: icon("ic_disabled"),
  },
];

export default navConfig;
