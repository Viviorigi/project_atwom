import React, { Suspense } from 'react';
import './App.css';
import {  Navigate, useRoutes } from 'react-router-dom';
import { GlobalStyles } from './app/styles/global/GlobalStyles';
import { indexRouter } from './app/routers/indexRouter';
import { authRouter } from './app/routers/authRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './app/comp/error/NotFound';

export const spinner = (
  <div className="progress-spinner text-center">
    <div className="swm-loader"></div>
  </div>
);
function App() {
  let router = useRoutes([
    { path: '/', element: <Navigate to="home" replace /> },
    indexRouter,
    authRouter,
    { path: '*', element: <NotFound  /> }
  ])
  return (
    <div className="App">
      <GlobalStyles />
      <ToastContainer></ToastContainer>
      <Suspense fallback={spinner}>{router}</Suspense>
    </div>

  );
}

export default App;
