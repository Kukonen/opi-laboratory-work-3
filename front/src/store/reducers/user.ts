import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService from '@/services/user.service';

export interface User {
    name: string;
    number: string;
    authtorized: boolean;
}

const initialState:User = {
    name: "",
    number: "",
    authtorized: false
}

export const getUserInformation = createAsyncThunk(
    'getUserInformation',
    async () => {
        const resp = await UserService.getUserInformation();

        if (resp instanceof Error) {
            return initialState;
        }

        return {
            ...resp,
            authtorized: true
        };
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            return initialState;
        }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInformation.fulfilled, (state, action) => {
                return action.payload;
            })
    },
});
  
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;