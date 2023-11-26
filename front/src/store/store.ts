import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import user from "./reducers/user";
import history from "./reducers/history";
import money from "./reducers/money";
import toast from "./reducers/toast";
import suggestion from "./reducers/suggestion";

export const store = configureStore({
    reducer: {
        user,
        history,
        money,
        toast,
        suggestion
    }
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>