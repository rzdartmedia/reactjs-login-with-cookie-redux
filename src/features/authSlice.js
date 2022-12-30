import {
    createSlice
} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        refreshToken: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const {
                refreshToken
            } = action.payload
            state.refreshToken = refreshToken;
        },
        logOut: (state, action) => {
            state.user = null
            state.refreshToken = null
        }
    },
});

export const {
    setCredentials,
    logOut
} = authSlice.actions

export const selectRefreshToken = (state) => state.auth.refreshToken;

export default authSlice.reducer;