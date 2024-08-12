import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./app/comp/layout/comp/Header";
import { ColorModeContext, useMode } from "./app/comp/commons/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import NotPermission from "./app/pages/error/NotPermission";
import Error500 from "./app/pages/error/Error500";
import NotFound from "./app/pages/error/NotFound";
import { indexRouter } from "./app/routers/indexRouter";

const router = createBrowserRouter([
    { path: 'not-permission', element: <NotPermission /> }, //403
    { path: '/', element: <Navigate to="/manager" replace /> },
    indexRouter,
    { path: 'err-network', element: <Error500 /> }, //500
    { path: '*', element: <NotFound /> },

]);

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
