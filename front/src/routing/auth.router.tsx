import { RouteObject } from "react-router-dom";

import Auth from "@/pages/Auth/Auth";
import Login from "@/components/Auth/Login/Login";
import Register from "@/components/Auth/Register/Register";

const authRouter: RouteObject = {
    path: '/auth',
    element: <Auth />,
    children: [
        {
            path: '/auth/login',
            element: <Login />
        },
        {
            path: '/auth/register',
            element: <Register />
        }
    ]
}

export default authRouter;