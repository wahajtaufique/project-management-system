import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColorModeContext, useMode } from "./theme";
import Authmiddleware from "./routes/middleware/Authmiddleware";
import { userRoutes, authRoutes } from "./routes/allRoutes";

function App() {
  const [theme, colorMode] = useMode();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  let location = useLocation()

  useEffect(() => {
    if (matches === true) {
      setIsCollapsed(false);
    } else if (matches === false) {
      setIsCollapsed(true);
    }
  }, [matches])

  useEffect(() => {
    if (localStorage.getItem("authUser")) setIsSidebar(true);
    if (location.pathname == "/register" || location.pathname == "/login") setIsSidebar(false);
  }, [location])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isSidebar && (
            <Sidebar collapsed={isCollapsed} />
          )}
          <main className="content">
            {isSidebar && (
              <Topbar setIsSidebar={setIsSidebar} />
            )}
            <Routes>
            {authRoutes.map((route, idx) => {
                const Component = route.component;
                return (
                  <Route 
                    key={idx}
                    path={route.path}
                    element={
                      <Authmiddleware isAuthProtected={false}>
                        <Component />
                      </Authmiddleware>
                    }
                  />
                )
              })}
              {userRoutes.map((route, idx) => {
                const Component = route.component;
                return (
                  <Route 
                    key={idx}
                    path={route.path}
                    element={
                      <Authmiddleware isAuthProtected={true}>
                        <Component />
                      </Authmiddleware>
                    }
                  />
                )
              })}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
