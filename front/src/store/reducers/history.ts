import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HistoryService from '@/services/histoty.service';

export interface Story {
    id: number;
    description: string;
    type: StoryType;
}

export type StoryType = 'plus' | 'minus';

export interface History {
    history: Story[];
}

const initialState:History = {
    history: []
}

export const getHistory = createAsyncThunk(
    'getHistory',
    async () => {
        const resp = await HistoryService.getHistory();

        return {
            // если пришёл объект объектов переводим в массив объектов
            history: Object.values(resp)
        };
    }
);

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        clearHistory: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHistory.fulfilled, (state, action) => {
                return action.payload;
            })
        },
    });

export const { clearHistory } = historySlice.actions;
export default historySlice.reducer;