import { Link } from 'react-router-dom'

import './Navigation.css';

export default () => {

    return (
        <nav 
            id = "navigation"
            className = "block"
        >
            <Link to="/replenish">
                Пополнить счёт
            </Link>
            <Link to="/transfer">
                Перевести деньги
            </Link>
            <Link to="/exchange">
                Обмен валюты
            </Link>
            <Link to="/history">
                История операций
            </Link>
        </nav>
  )
}
