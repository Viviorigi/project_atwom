import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
        <GlobalStyles />
        <Routes>
          {/* main screens */}
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="/book" element={<BookListItem />} />
            <Route path="/book/details" element={<BookDetail />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/order_detail" element={<OrderDetail />} />
            <Route path="/account" element={<AccountScreen />} />
          </Route>


           <Route path="/" element={<AuthLayout />}>
            <Route path="sign_in" element={<SignIn />} />
            <Route path="sign_up" element={<SignUp />} />
            <Route path="change_password" element={<ChangePassword />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route path="verification" element={<VerificationToken />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
