import { StyledChart } from "./components/chart";
import { useAppSelector } from "./redux/hooks";
import { theme } from "./redux/themeSlice";
import { ThemeProvider } from "@emotion/react";
import { Paper } from "@mui/material";
// ----------------------------------------------------------------------
import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  const themeState = useAppSelector((state) => state.theme);
  return (
    <ThemeProvider theme={theme(themeState.mode)}>
      <Paper sx={{ p: 0, m: 0 }}>
        {/* <ScrollToTop /> */}
        <StyledChart />
        <RouterProvider router={routes} />
      </Paper>
    </ThemeProvider>
  );
}
