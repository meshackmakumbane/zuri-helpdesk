import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
    user: null,
    status: "idle",
    error: null
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userData, {rejectWithValue})=>{
        try {
            const { data } = api.post('/api/auth/login', userData)
            return data
        } catch (error) {
            return rejectWithValue(
                response?.data?.message || "Error logging in"
            )
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async({rejectWithValue})=>{
        try {
            const { data } = api.post('/api/auth/logout')
            return data
        } catch (error) {
            return rejectWithValue(
                response?.data?.message || "Error logging out"
            )
        }
    }
)

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async({rejectWithValue})=>{
        try {
            const { data } = api.post('/api/auth/profile')
            return data
        } catch (error) {
            return rejectWithValue(
                response?.data?.message || "Error fetching profile"
            )
        }
    }
)

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async(password, {rejectWithValue})=>{
        try {
            const { data } = api.post('/api/auth/reset-password', password)
            return data
        } catch (error) {
            return rejectWithValue(response?.data?.message || "Error resetting password")
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        clearError: (state)=>{
            state.error = null
        }
    },
    extraReducers:(builder)=>{
        builder
        /* Login user------------------------------- */
        .addCase('loginUser.pending',(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase('loginUser.fulfilled', (state, action)=>{
            state.user = action.payload.user
            state.status = 'successful',
            state.error = null
        })
        .addCase('loginUser.rejected', (state, action)=>{
            state.status = 'failed',
            state.error = action.payload.message
        })
        /* Logout user------------------------------- */
        .addCase('logoutUser.pending',(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase('logoutUser.fulfilled', (state, action)=>{
            state.user = action.payload.user
            state.status = 'successful',
            state.error = null
        })
        .addCase('logoutUser.rejected', (state, action)=>{
            state.status = 'failed',
            state.error = action.payload.message
        })
        /* Profile ------------------------------- */
        .addCase('getProfile.pending',(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase('getProfile.fulfilled', (state, action)=>{
            state.user = action.payload.user
            state.status = 'successful',
            state.error = null
        })
        .addCase('getProfile.rejected', (state, action)=>{
            state.status = 'failed',
            state.error = action.payload.message
        })
        /* Reset Password ------------------------------- */
        .addCase('resetPassword.pending',(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase('resetPassword.fulfilled', (state, action)=>{
            state.user = action.payload.user
            state.status = 'successful',
            state.error = null
        })
        .addCase('resetPassword.rejected', (state, action)=>{
            state.status = 'failed',
            state.error = action.payload.message
        })
    }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer