import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigate, useRoutes } from 'react-router-dom';
import { indexRouter } from './app/routers/indexRouter';
import NotPermission from './app/pages/NotPermission';
import NotFound from './app/pages/NotFound';

export const spinner = (
  <div className="progress-spinner text-center">
    <div className="swm-loader"></div>
  </div>
);
function App() {
  let router = useRoutes([
    { path: 'not-permission', element: <NotPermission /> }, //403
    { path: '/', element: <Navigate to="dashboard" replace /> },
    indexRouter,
    { path: '*', element: <NotFound /> } //404
  ]);
  
  return (
    
    <div className="App">
      {/* <ToastContainer></ToastContainer> */}
      <Suspense fallback={spinner}>{router}</Suspense>
    </div>

  );
}

export default App;
