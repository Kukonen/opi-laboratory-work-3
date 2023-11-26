import AuthService from '@/services/auth.service';
import { useState } from 'react'

export default () => {
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
