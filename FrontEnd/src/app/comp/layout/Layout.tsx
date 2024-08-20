import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarMenu from './comp/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from './comp/Header';
import './layout.css'

const queryClient = new QueryClient();
const Layout = () => {
  const [isSidebar, setIsSidebar] = useState('');
  return (
    <div className=" app">
      <SidebarMenu />
      <div className="app-content">
        <Header />
          <div className="text-center" style={{height:"1cm"}}></div>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
      </div>
    </div>
  );
};
export default Layout;