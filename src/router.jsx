import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './layouts/DashboardLayout';
import BooksPage from './pages/BooksPage';
import AuthLayout from './layouts/AuthLayout';
import CreateBook from './pages/CreateBook';
import SingleBookPage from './pages/SingleBookPage';
import UpdateBook from './pages/UpdateBook';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard/books" />,
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'account',
                element: <DashBoard />,
            },
            {
                path: 'books',
                element: <BooksPage />,
            },
            {
                path: 'books/:id',
                element: <SingleBookPage />,
            },
            {
                path: 'books/create',
                element: <CreateBook />,
            },
            {
                path: 'books/update/:id',
                element: <UpdateBook />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'Signup',
                element: <SignupPage />,
            },
        ],
    },
]);

export default router;