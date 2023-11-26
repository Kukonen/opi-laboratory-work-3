import {RouteObject, createBrowserRouter} from "react-router-dom";

import Layout from "../layout/Layout/Layout";
import Error from "../pages/Error/Error";
import ErrorNotFound from "../pages/ErrorNotFound/ErrorNotFound";

import homeRouter from "./home.router";
import authRouter from "./auth.router";

const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            authRouter,
            homeRouter,
            {
                path: '*',
                element: <ErrorNotFound />,
                errorElement: <Error />
            }
        ]
    }
    
];

export const routing = createBrowserRouter(routes);