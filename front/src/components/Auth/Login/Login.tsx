import AuthService from '@/services/auth.service';
import { setToastMessage } from '@/store/reducers/toast';
import Validator from '@/utils/Validator';
import {useState} from 'react'
import { useDispatch } from 'react-redux';

export default () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const requstToService = () => {
        if (!(login && password)) {
            return;
        }

        if (!Validator.login(login)) {
            dispatch(setToastMessage({
                active: true,
                message: 'Некорректный логин',
                type: 'ERROR'
            }))
            return;
        }

        if (!Validator.password(password)) {
            dispatch(setToastMessage({
                active: true,
                message: 'Некорректный пароль',
                type: 'ERROR'
            }))
            return;
        }

        AuthService.login(login, password)
            .then()
            .catch(error => {
                if (error.status === 400) {
                    dispatch(setToastMessage({
                        active: true,
                        message: 'Попробуйте ввести данные заново',
                        type: 'ERROR'
                    }))
                    return;
                }
            })
    }

    return (
        <>
            <form 
                method="post" 
                onSubmit={e => e.preventDefault()}
                className="block"
            >
                <h2>Вход в банк</h2>
                <input 
                    type="text" 
                    placeholder='логин'
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder='пароль'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button 
                    type="submit"
                    onClick={requstToService}
                    className='button-primary'
                >
                    Войти
                </button>
            </form>
        </>
    )
}
