import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setToastDefaultMessage } from '@/store/reducers/toast';

import './Toast.css';

export default () => {
    const toast = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();
    const [alreadyCloseing, setAlreadyCloing] = useState<boolean>(false);

    const close = () => {
        dispatch(setToastDefaultMessage());
    }

    useEffect(() => {
        if (!alreadyCloseing) {
            setAlreadyCloing(true);
            setTimeout(() => {
                setAlreadyCloing(false);
                dispatch(setToastDefaultMessage());
            }, 2000);
        }
        
    }, [toast])

    return (
        <>
            {toast.active && 
                <div id="toast" className={
                        toast.type === 'ERROR' ? 'toast_error' : 
                        toast.type === 'SUCCESS' ? 'toast_success' :
                        ''
                    }
                    onClick={close}
                >
                    {toast.message}
                </div>
            }
        </>
    )
}
