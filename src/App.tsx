import { StyledChart } from "./components/chart";
import { useAppSelector } from "./redux/hooks";
import { theme } from "./redux/themeSlice";
import { ThemeProvider } from "@emotion/react";
// ----------------------------------------------------------------------
import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

export default function App() {
  const themeState = useAppSelector((state) => state.theme);
  return (
    <ThemeProvider theme={theme(themeState.mode)}>
      <StyledChart />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}
