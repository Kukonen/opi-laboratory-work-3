import { useState, useEffect } from 'react'

import HomeTemplateWithTitle from '../HomeWithTitle/HomeTemplateWithTitle';

interface ReplenishBank {
    id: number;
    title: string;
    path: string;
}

export default () => {
    const [banks, setBanks] = useState<ReplenishBank[]>()
    const [amount, setAmount] = useState<string>("");
    const [currentBank, setCurrentBank] = useState<number>();

    const replenish = () => {
        const path = banks?.find(bank => bank.id === currentBank)?.path;

        if (path && amount) {
            window.location.replace(
                path + `?amount=${amount}`
            );
        }
    }

    useEffect(() => {
        setBanks([
            {
                id: 1,
                title: 'Сбербанк',
                path: 'https://sberbank.com/'
            },
            {
                id: 2,
                title: 'Тинькофф',
                path: 'https://tinkoff.com/'
            },
        ]);

        if (banks?.length) {
            setCurrentBank(banks[0].id)
        }
    }, []);

    return (
        <HomeTemplateWithTitle
            headline={"Пополнение счёта"}
        >
            <input 
                type="text"
                pattern='\d+(,\d{3})*(\.\d*)?$'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Сумма пополнения"
            />
            <select 
                value={currentBank}
                onChange={e => setCurrentBank(Number(e.target.value))}
            >
                {banks?.map(bank => 
                    <option 
                        key={bank.id}
                        value={bank.id}
                    >
                    {
                        bank.title
                    }
                </option>
                )}
            </select>

            <button 
                type="button"
                onClick={replenish}
                className='button-primary'
            >
                Оплатить
            </button>
        </HomeTemplateWithTitle>
    )
}
