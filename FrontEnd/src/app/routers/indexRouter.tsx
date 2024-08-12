import Manager from "../pages/admin/Manager";
import SidebarMenu from "../comp/layout/comp/Sidebar";
import Layout from "../comp/layout/Layout";
import User from "../pages/users/User";
import Book from "../pages/book/Book";
import NotFound from "../pages/error/NotFound";
import Order from "../pages/order/Order";

export const indexRouter: any = {
    path: '/',
    element: (
        <Layout />
    ),
    children: [
      { path: '/manager', element: <Manager /> },
      { path: '/user', element: <User /> },
      { path: '/books', element: <Book /> },
      { path: '/order', element: <Order /> },
      { path: '/*', element: <NotFound /> },
    ],
  };