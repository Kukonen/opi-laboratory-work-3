import './Person.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default () => {
    const user = useSelector((state: RootState) => state.user)

    const copyNumber = () => {
        if (user.number) {
            navigator.clipboard.writeText(user.number);
        }
    }

    return (
        <div
        className='block'
        >
        <div>
            {user.name}
        </div>
        <div>
            <span
            onClick={copyNumber}
            id="profile__person__number"
            >
            Счёт для оплаты: {user.number}
            </span>
        </div>
        </div>
    )
}
