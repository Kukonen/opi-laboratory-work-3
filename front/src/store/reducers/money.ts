import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MoneyService from '@/services/money.service';
import { setToastMessage } from './toast';

export interface Money {
    rubles: string;
    dollars: string;
    euro: string;
}

const initialState:Money = {
    rubles: "0",
    dollars: "0",
    euro: "0"
}

export const getBalance = createAsyncThunk(
    'getBalance',
    async (_, dispatch) => {
        return MoneyService.getMoney().then((money) => {
            return money;
        }).catch(() => { 
            dispatch.dispatch((setToastMessage({
                active: true,
                message: "Не получилось получить баланс",
                type: 'ERROR'
            })));

            return initialState;
        })
    }
);

export const transferBalance = createAsyncThunk(
    'transferBalance',
    async (data: {
        amount: string, 
        number: string, 
        currency: '$' | '₽' | '€'
    }, dispatch) => {
        return MoneyService.transfer(data.amount, data.number, data.currency).then(money => {
            dispatch.dispatch((setToastMessage({
                active: true,
                message: "Деньги переведены",
                type: 'SUCCESS'
            })));

            return money;
        }).catch(money => {
            dispatch.dispatch((setToastMessage({
                active: true,
                message: "Не удалось перевести деньги",
                type: 'ERROR'
            })));

            if (money.rubles && money.dollars && money.euro) {
                return money;
            }

            return initialState;
        })
    }
)

export const exchangeBalance = createAsyncThunk(
    'exchangeBalance',
    async (data: {
        amount: string,
        currencyFrom: '$' | '₽' | '€',
        currencyTo: '$' | '₽' | '€'
    }, dispatch) => {
        return MoneyService.exchange(data.amount, data.currencyFrom, data.currencyTo).then(money => {
            dispatch.dispatch((setToastMessage({
                    active: true,
                    message: "Деньги конветированы",
                    type: 'SUCCESS'
                }))
            );

                return money;
            }).catch(money => {
                dispatch.dispatch((setToastMessage({
                    active: true,
                    message: "Не удалось конвертировать",
                    type: 'ERROR'
                })));

                if (money.rubles && money.dollars && money.euro) {
                    return money;
                }

                return initialState;
            })
    }
)
const moneySlice = createSlice({
    name: 'money',
    initialState,
    reducers: {
        clearMoney: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(transferBalance.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(exchangeBalance.fulfilled, (state, action) => {
                return action.payload;
            })
        },
  });
  
  export const { clearMoney } = moneySlice.actions;
  export default moneySlice.reducer;