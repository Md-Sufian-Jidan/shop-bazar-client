import { createBrowserRouter, } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Shop from "../Pages/Shop/Shop";
import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage";
import AboutPage from "../Pages/AboutPage/AboutPage";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import CategoryProducts from "../Components/CategoryProducts/CategoryProducts";
import Cart from "../Pages/Cart/Cart";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <Shop />
            },
            {
                path: '/categories',
                element: <CategoriesPage />
            },
            {
                path: '/products/category/:name',
                element: <CategoryProducts />
            },
            {
                path: '/about',
                element: <AboutPage />
            },
            {
                path: '/cart',
                element: <PrivateRoute><Cart /></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                // index: true,
                index: true, element: <Navigate to="profile" />
            },
            {
                path: "profile",
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
        ]
    }
]);