import {useEffect, useState} from 'react'
import HomeTemplateWithTitle from '../HomeWithTitle/HomeTemplateWithTitle'
import MoneyService from '@/services/money.service';
import { useStoreDispatch } from '@/store/store';
import { exchangeBalance } from '@/store/reducers/money';

type currencyType = '$' | '€' | '₽';

export default () => {
    const dispatch = useStoreDispatch();

    const [amount, setAmount] = useState<string>('0');
    const [rate, setRate] = useState<string>('1 $ = 1 $');
 
    const [currencyFrom, setСurrencyFrom] = useState<currencyType>("$");
    const [currencyTo, setСurrencyTo] = useState<currencyType>("$");

    const [dollarRate, setDollarRate] = useState<string>("0");
    const [euroRate, setEuroRate] = useState<string>("0");

    const changeRate = () => {
        let updatedRate = `0 ${currencyFrom} = 0 ${currencyTo}`

        if (currencyFrom === currencyTo) {
            updatedRate = `1`
        } else if (currencyFrom === '₽') {
            updatedRate = `${
                currencyTo === '$' ? dollarRate :
                currencyTo === '€' ? euroRate :
                0
        }`;
        } else if (currencyTo === '₽') {
            updatedRate = `${
                currencyFrom === '$' ? 1 / Number(dollarRate) :
                currencyFrom === '€' ? 1 / Number(euroRate) :
                0
            }`;
        } else {
            updatedRate = `${
                currencyFrom === '$' ? Number(euroRate) / Number(dollarRate) :
                currencyFrom === '€' ? Number(dollarRate) / Number(euroRate) :
                0
            }`;
        }

        setRate(`
            1 ${currencyFrom} = ${updatedRate.replace(/\.(\d{1,3}).*$/, '.$1')} ${currencyTo}
        `);
    }

    const exchange = () => {
        if (
            amount &&
            currencyTo !== currencyFrom
        ) {
            const exchangeData = {
                amount, 
                currencyFrom, 
                currencyTo
            }

            dispatch(exchangeBalance(exchangeData));
        }
    }

    useEffect(() => {
        MoneyService.rate().then( rate => {
            setDollarRate(rate.dollarRate);
            setEuroRate(rate.euroRate);
        })
    }, [])

    useEffect(() => {
        changeRate();
    }, [currencyFrom, currencyTo])

    return (
        <HomeTemplateWithTitle
            headline={"Обмен валюты"}
        >
            <input 
                type="text"
                placeholder='Сколько перевести'
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />

            <select
                value={currencyFrom}
                onChange={e => setСurrencyFrom(e.target.value as currencyType)}
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

            <input 
                type="text"
                placeholder='Курс'
                value={rate}
                readOnly
            />

            <select
                value={currencyTo}
                onChange={e => setСurrencyTo(e.target.value as currencyType)}
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
                onClick={exchange}
            >
                Перевести
            </button>

        </HomeTemplateWithTitle>
    )
}
