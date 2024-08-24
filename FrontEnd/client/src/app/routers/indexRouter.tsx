import path from "path";
import BaseLayout from "../comp/layout/BaseLayout";
import AuthGuard from "../guard/authGuard";
import RoleGuard from "../guard/roleGuard";
import About from "../page/about/About";
import ChangePassword from "../page/auth/ChangePassword";
import BookDetail from "../page/book/BookDetail";
import BookListItem from "../page/book/BookList";
import CartScreen from "../page/cart/CartScreen";
import Contact from "../page/contact/Contact";
import Home from "../page/home/Home";
import AccountScreen from "../page/user/AccountScreen";
import OrderDetail from "../page/user/OrderDetail";
import OrderList from "../page/user/OrderList";
import Wishlist from "../comp/wishlist/Wishlist";



export const indexRouter: any = {
  path: '',
  element: (
    <BaseLayout />
  ),
  children: [
    { path: 'home', element: <Home /> },
    { path: 'about', element: <About /> },
    { path: 'book', element: <BookListItem /> },
    { path: 'book/details', element: <BookDetail /> },
    { path: 'change_password', element: <AuthGuard><RoleGuard role={["ADMIN", "STUDENT"]}><ChangePassword /></RoleGuard></AuthGuard> },
    { path: 'order', element: <OrderList /> },
    { path: 'order/:tabId', element: <OrderList /> },
    { path: 'cart', element: <CartScreen /> },
    { path: 'contact', element: <Contact /> },
    { path: 'order_detail', element: <OrderDetail /> },
    { path: 'wishlist', element: <Wishlist /> },
    { path: 'account', element: <AuthGuard><RoleGuard role={["ADMIN", "STUDENT"]}><AccountScreen /></RoleGuard></AuthGuard> },
    { path: 'wishlist', element: <Wishlist /> },
    { path: 'account', element: <AuthGuard><RoleGuard role={["ADMIN", "STUDENT"]}><AccountScreen /></RoleGuard></AuthGuard> },
  ],
};