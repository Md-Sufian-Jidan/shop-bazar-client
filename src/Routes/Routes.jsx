import { createBrowserRouter, } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Shop from "../Pages/Shop/Shop";
import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage";
import AboutPage from "../Pages/AboutPage/AboutPage";
import Login from "../Components/Login/Login";

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
                path: '/about',
                element: <AboutPage />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
]);