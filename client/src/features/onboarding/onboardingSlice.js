import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
    business: null,
    status: "idle",
    error: null
}

export const createBusiness = createAsyncThunk(
    'business/createBusiness',
    async (businessData, { rejectWithValue }) => {
        try {
            const { data } = api.post("/api/business", businessData)
            return data
        } catch (error) {
            return rejectWithValue(response?.data?.error.message || "Error creating business")
        }
    }
)

export const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers:{
        clearError: (state)=>{
            state.error = null
        }
    }, 
    extraReducers:(builder)=>{
        builder
        .addCase('createBusiness.pending', (state)=>{
            state.status = "loading",
            state.error = null
        })
        .addCase('createBusiness.fulfilled', (state, action)=>{
            state.business = action.payload.business
            state.status = 'success'
            state.error = null
        })
        .addCase('createBusiness.rejected', (state, action)=>{
            state.status = 'failed'
            state.error = action.payload.message
        })
    }
})

export const { clearError } = businessSlice.actions
export default businessSlice.reducer