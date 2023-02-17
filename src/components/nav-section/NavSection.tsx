import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------
import DangerousIcon from "@mui/icons-material/Dangerous";
import { PAGES } from "../../common";
import { ReactElement } from "react";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const menus: NavItemProps[] = [
  {
    title: "dashboard",
    path: PAGES.HOME,
    icon: <AnalyticsIcon />,
  },
  {
    title: "product",
    path: PAGES.PRODUCTS,
    icon: <AddShoppingCartIcon />,
  },
  {
    title: "login",
    path: PAGES.SIGNIN,
    icon: <LockOpenIcon />,
  },
  {
    title: "Not found",
    path: PAGES.NOTFOUND,
    icon: <DangerousIcon></DangerousIcon>,
  },
];

type NavSectionProps = {
  menus: NavItemProps[];
};

export default function NavSection() {
  const navigate = useNavigate();

  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {menus.map((menu) => (
          <NavItem
            key={menu.title}
            icon={menu.icon}
            path={menu.path}
            title={menu.title}
            info={menu.info}
            onClick={() => navigate(menu.path || "")}
          />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

type NavItemProps = {
  title: string;
  path?: string;
  icon: ReactElement;
  info?: string;
  onClick?: () => void;
};

export function NavItem(props: NavItemProps) {
  const { title, path, icon, info, onClick } = props;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      onClick={onClick}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
