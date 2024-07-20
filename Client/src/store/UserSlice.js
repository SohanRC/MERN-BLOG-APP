import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated : false,
    userData : null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true,
            state.userData = action.payload
        },
        logout: (state, action) => {
            state.isAuthenticated = false,
            state.userData = null
        }
    }
})

export default userSlice.reducer; // to inform store

export const { login, logout } = userSlice.actions; // for personal usage