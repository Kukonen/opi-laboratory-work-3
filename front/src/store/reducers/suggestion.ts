import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SuggestionService from '@/services/suggestion.service';

export interface Offer {
    id: number;
    img?: string;
    title: string;
    text: string;
    link?: {
        text: string;
        path: string;
    }
}

export interface Suggestion {
    offers: Offer[];
}

const initialState:Suggestion = {
    offers: []
}

export const getSuggestions = createAsyncThunk(
    'getSuggestions',
    async () => {
        const resp = await SuggestionService.getSuggestions();
        
        return {
            // если пришёл объект объектов переводим в массив объектов
            offers: Object.values(resp)
        };
    }
);

const suggestionSlice = createSlice({
    name: 'suggestion',
    initialState,
    reducers: {
        clearSuggestion: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSuggestions.fulfilled, (state, action) => {
                return action.payload;
            })
        },
    });

export const { clearSuggestion } = suggestionSlice.actions;
export default suggestionSlice.reducer;