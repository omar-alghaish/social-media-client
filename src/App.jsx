import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/themeConfigs";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ForgetPassword from "./pages/ForgetPassword";
import SendResetCode from "./pages/SendResetCode";
import ChangeForgetPassword from "./pages/ChangeForgetPassword";
import routes from "./routes/router";
import MainLayout from "./components/layout/MainLayout";
import PageWrapper from "./components/common/PageWrapper";
import { Box } from "@mui/material";
import Reals from "./pages/Reals";

import "./sass/style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <Box className="app">
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<Signup />} path="/signup" />
            <Route element={<Signin />} path="/signin" />
            <Route element={<ForgetPassword />} path="/forgetpassword" />
            <Route element={<SendResetCode />} path="/resetcode" />
            <Route element={<ChangeForgetPassword />} path="/changepassword" />
            <Route element={<Reals />} path="/reals" />
            <Route path="/" element={<MainLayout />}>
              {routes.map((route, index) =>
                route.index ? (
                  <Route
                    index
                    key={index}
                    element={
                      route.state ? (
                        <PageWrapper state={route.state}>
                          {route.element}
                        </PageWrapper>
                      ) : (
                        route.element
                      )
                    }
                  />
                ) : (
                  <Route
                    path={route.path}
                    key={index}
                    element={
                      route.state ? (
                        <PageWrapper state={route.state}>
                          {route.element}
                        </PageWrapper>
                      ) : (
                        route.element
                      )
                    }
                  />
                )
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
