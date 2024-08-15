import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useRoutes } from 'react-router-dom';
import { GlobalStyles } from './app/styles/global/GlobalStyles';
import BaseLayout from './app/comp/layout/BaseLayout';
import Home from './app/page/home/Home';
import OrderList from './app/page/user/OrderList';
import OrderDetail from './app/page/user/OrderDetail';
import AccountScreen from './app/page/user/AccountScreen';
import NotFound from './app/comp/error/NotFound';
import BookListItem from './app/page/book/BookList';
import BookDetail from './app/page/book/BookDetail';
import AuthLayout from './app/comp/layout/AuthLayout';
import SignIn from './app/page/auth/SignIn';
import SignUp from './app/page/auth/SignUp';
import ChangePassword from './app/page/auth/ChangePassword';
import ResetPassword from './app/page/auth/RestePassword';
import VerificationToken from './app/page/auth/VerificationToken';
import { indexRouter } from './app/routers/indexRouter';
import { authRouter } from './app/routers/authRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    { path: '*', element: <NotFound /> }
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
