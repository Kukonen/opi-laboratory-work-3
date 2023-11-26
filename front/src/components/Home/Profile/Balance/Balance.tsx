import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getBalance } from '@/store/reducers/money';
import './Balance.css';
import { RootState, useStoreDispatch } from '@/store/store';

export default () => {
    const dispatch = useStoreDispatch();

    const money = useSelector((state: RootState) => state.money);

    useEffect(() => {
        dispatch(getBalance());
    }, [])

    return (
        <div id="balance" className="block">
            <label >
                <span>
                   $ 
                </span>
                <input 
                    type='text'
                    readOnly
                    value={money.dollars}
                />
            </label>

            <label >
                <span>
                    ₽
                </span>
                <input 
                    type='text'
                    readOnly
                    value={money.rubles}
                />
            </label>

            <label >
                <span>
                    €
                </span>
                <input 
                    type='text'
                    readOnly
                    value={money.euro}
                />
            </label>
        </div>
    )
}
