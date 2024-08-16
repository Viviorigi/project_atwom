import React from 'react'
import AuthLayout from '../comp/layout/AuthLayout';
import SignIn from '../page/auth/SignIn';
import SignUp from '../page/auth/SignUp';
import ChangePassword from '../page/auth/ChangePassword';
import ResetPassword from '../page/auth/ResetPassword';
import RegisterSuccess from '../page/auth/RegisterSuccess';

export const authRouter: any = {
  path: '',
  element: (
    <AuthLayout />
  ),
  children: [
    { path: 'login', element: <SignIn /> },
    { path: 'register', element: <SignUp /> },
    { path: 'change_password', element: <ChangePassword /> },
    { path: 'forgot-password', element: <ResetPassword /> },
    { path: 'register-success', element: <RegisterSuccess /> }
  ],
};