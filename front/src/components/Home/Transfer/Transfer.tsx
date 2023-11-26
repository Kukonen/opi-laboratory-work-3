import {useState} from 'react'

import HomeTemplateWithTitle from '../HomeWithTitle/HomeTemplateWithTitle'
import { useStoreDispatch } from '@/store/store';
import { transferBalance } from '@/store/reducers/money';

type currencyType = '$' | '€' | '₽';

export default () => {
    const dispatch = useStoreDispatch();

    const [amount, setAmount] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [currency, setСurrency] = useState<currencyType>("$");

    const transfer = () => {
        if (!(amount && number && currency)) {
            return;
        }

        const data = {
            amount, 
            number, 
            currency
        }

        dispatch(transferBalance(data));
    }

    return (
        <HomeTemplateWithTitle
            headline={"Перевести деньги"}
        >
            <input 
                type="text"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder='Сумма'
            />
            <input 
                type="text" 
                value={number}
                onChange={e => setNumber(e.target.value)}
                placeholder='Номер счёта'
            />

            <select
                value={currency}
                onChange={e => setСurrency(e.target.value as currencyType)}
            >
                <option 
                    value="$"
                >
                    $ счёт
                </option>
                <option 
                    value="₽"
                >
                    ₽ счёт
                </option>
                <option 
                    value="€"
                >
                    € счёт
                </option>
            </select>

            <button
                className='button-primary'
                onClick={transfer}
            >
                Перевести
            </button>
        </HomeTemplateWithTitle>
    )
}
