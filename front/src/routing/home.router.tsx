import { RouteObject } from "react-router-dom";

import Home from "@/pages/Home/Home";
import Suggestion from "@/components/Home/Suggestion/Suggestion";
import Replenish from "@/components/Home/Replenish/Replenish";
import Transfer from "@/components/Home/Transfer/Transfer";
import Exchange from "@/components/Home/Exchange/Exchange";
import History from "@/components/Home/History/History";

const homeRouter: RouteObject = {
    path: '/',
    element: <Home />,
    children: [
        {
            path: '/',
            element: <Suggestion />
        },
        {
            path: 'replenish',
            element: <Replenish />
        },
        {
            path: 'transfer',
            element: <Transfer />
        },
        {
            path: 'exchange',
            element: <Exchange />
        },
        {
            path: 'history',
            element: <History />
        }
    ]
}

export default homeRouter;