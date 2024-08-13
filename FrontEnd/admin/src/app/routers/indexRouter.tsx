import React from 'react'
import Layout from "../comp/layouts/Layout";
import DashBoard from '../pages/DashBoard';
import Category from '../pages/category/Category';
import Book from '../pages/book/Book';
import Student from '../pages/student/Student';
import Order from '../pages/order/Order';
import Return from '../pages/return/Return';
import AuthGuard from '../guard/AuthGuard';
export const indexRouter: any = {
    path: '',
    element: (
        <AuthGuard><Layout /></AuthGuard>
    ),
    children: [
        { path: 'dashboard', element: <DashBoard /> },
        { path: 'category', element: <Category /> },
        { path: 'book', element: <Book /> },
        { path: 'student', element: <Student /> },
        { path: 'order', element: <Order /> },
        { path: 'returnbook', element: <Return /> }
    ],
};