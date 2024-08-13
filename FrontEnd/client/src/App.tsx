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

function App() {
  return (
    <BrowserRouter>
        <GlobalStyles />
        <Routes>
          {/* main screens */}
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/order_detail" element={<OrderDetail />} />
            <Route path="/account" element={<AccountScreen />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
