import { createBrowserRouter, } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Shop from "../Pages/Shop/Shop";
import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage";

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
        ]
    },
]);