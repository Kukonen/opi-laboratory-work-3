import { useEffect, useState } from 'react';
import { RootState, useStoreDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";

import './Home.css';
import Profile from '@/components/Home/Profile/Profile';
import { getUserInformation } from '@/store/reducers/user';

export default () => {
    const dispatch = useStoreDispatch();
    const location = useLocation();
    const authtorized = useSelector((state: RootState) => state.user).authtorized;
    const [askServer, setAskServer] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getUserInformation()).then(() => {
            setAskServer(true);
        });
    }, [])

    return !askServer ?
        <></> :
     authtorized ? (
        <div id="home">
            <div id="home__left-section">
                <Profile />
            </div>
            <div id="home__right-section">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/auth/login" state={{ from: location }} />
    );
}
