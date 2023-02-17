import Router from "./routes";
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { useAppSelector } from "./redux/hooks";
import { theme } from "./redux/themeSlice";
import { ThemeProvider } from "@emotion/react";
import { Paper } from "@mui/material";
// ----------------------------------------------------------------------

export default function App() {
  const themeState = useAppSelector((state) => state.theme);
  return (
    <ThemeProvider theme={theme(themeState.mode)}>
      <Paper>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </Paper>
    </ThemeProvider>
  );
}
