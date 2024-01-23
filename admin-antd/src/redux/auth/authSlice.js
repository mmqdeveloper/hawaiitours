import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLogin: false,
    loading: true,
    error: null
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading =true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isLogin = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.isLogin = false;
            state.user = null;
            state.error = action.payload;
        }
    }
})

export const {loginStart, loginSuccess, loginFailure} = auth.actions;
export default auth.reducer;