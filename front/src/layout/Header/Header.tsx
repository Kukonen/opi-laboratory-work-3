import { Link } from 'react-router-dom';

import './Header.css';
import { RootState, useStoreDispatch } from '@/store/store';
import { useSelector } from 'react-redux';

import { clearHistory } from '@/store/reducers/history';
import { clearMoney } from '@/store/reducers/money';
import { clearUser } from '@/store/reducers/user';
import { clearSuggestion } from '@/store/reducers/suggestion';

export default () => {
    const dispatch = useStoreDispatch();
    const authtorized = useSelector((state: RootState) => state.user).authtorized;

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        dispatch(clearHistory());
        dispatch(clearMoney());
        dispatch(clearUser());
        dispatch(clearSuggestion());
    }

    return (
        <header>
            <Link to="/">
            Интернет Банк
            </Link>
            <div>
                {
                    authtorized ?
                    <>
                        <Link 
                            onClick={logout}
                            to="auth/login"
                        >
                            Выйти из аккаунта
                        </Link>
                    </> :
                    <>
                        <Link to="auth/login">
                            Войти
                        </Link>
                        <span> / </span>
                        <Link to="/auth/register">
                            Зарегистироваться
                        </Link>
                    </>
                }
            </div>
        </header>
    )
}
