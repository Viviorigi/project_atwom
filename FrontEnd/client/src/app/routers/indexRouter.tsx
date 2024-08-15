import BaseLayout from "../comp/layout/BaseLayout";
import BookDetail from "../page/book/BookDetail";
import BookListItem from "../page/book/BookList";
import Home from "../page/home/Home";
import AccountScreen from "../page/user/AccountScreen";
import OrderDetail from "../page/user/OrderDetail";
import OrderList from "../page/user/OrderList";



export const indexRouter: any = {
  path: '',
  element: (
      <BaseLayout />  
  ),
  children: [
      { path: 'home', element: <Home /> },
      { path: 'book', element: <BookListItem /> },
      { path: 'book/details', element: <BookDetail />},
      { path: 'order', element: <OrderList /> },
      { path: 'order_detail', element: <OrderDetail />},
      { path: 'account', element: <AccountScreen />},
  ],
};