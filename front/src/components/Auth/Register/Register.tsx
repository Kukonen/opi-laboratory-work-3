import AuthService from '@/services/auth.service';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import Validator from '@/utils/Validator';
import { setToastMessage } from '@/store/reducers/toast';

export default () => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordAgain, setPasswordAgain] = useState<string>();

    const requstToService = () => {
        if (!(name && surname && email && password && passwordAgain)) {
            return;
        }

        if (!(password === passwordAgain)) {
            dispatch(setToastMessage({
                active: true,
                message: 'Пароли не совпадают',
                type: 'ERROR'
            }))
            return;
        }

        if (!(Validator.name(name))) {
            dispatch(setToastMessage({
                active: true,
                message: 'Некорректное имя',
                type: 'ERROR'
            }))
            return;
        }

        if (!(Validator.name(surname))) {
            dispatch(setToastMessage({
                active: true,
                message: 'Некорректная фамилия',
                type: 'ERROR'
            }))
            return;
        }

        if (!(Validator.email(email))) {
            dispatch(setToastMessage({
                active: true,
                message: 'Некорректная почта',
                type: 'ERROR'
            }))
            return;
        }

        if (!(Validator.password(password))) {
            dispatch(setToastMessage({
                active: true,
                message: 'Некорректный пароль',
                type: 'ERROR'
            }))
            return;
        }

        AuthService.register(name, surname, email, password, passwordAgain);
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
                placeholder='имя'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder='фамилия'
                value={surname}
                onChange={e => setSurname(e.target.value)}
            />
            <input 
                type="email" 
                placeholder='почта'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder='пароль'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <input 
                type="password" 
                placeholder='пароль ещё раз'
                value={passwordAgain}
                onChange={e => setPasswordAgain(e.target.value)}
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
