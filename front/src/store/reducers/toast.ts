import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Toast {
    active: boolean;
    'type': 'ERROR' | 'SUCCESS';
    'message': string;
}

const initialState:Toast = {
    active: false,
    type: 'ERROR',
    message: 'Что-то пошло не так'
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToastMessage(state, action: PayloadAction<Toast>) {
            return action.payload;
        },
        setToastDefaultMessage(state) {
            return initialState;
        }
    },
})

export const { setToastMessage, setToastDefaultMessage } = toastSlice.actions
export default toastSlice.reducer