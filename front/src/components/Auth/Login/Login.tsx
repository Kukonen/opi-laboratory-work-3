import AuthService from '@/services/auth.service';
import {useState} from 'react'

export default () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const requstToService = () => {
        if (login && password) {
            AuthService.login(login, password);
        }
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
