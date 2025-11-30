import { createSlice } from '@reduxjs/toolkit'
import { showErrorModal } from './thunks'
import { hideErrorModal } from './thunks/hideErrorModal'

interface IErrorModalState {
    open: boolean
    messages: string[]
}

interface IErrorState {
    errorModalState: IErrorModalState
}

const initialState: IErrorState = {
    errorModalState: {
        open: false,
        messages: [],
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(showErrorModal.fulfilled, (state, action) => {
            state.errorModalState = action.payload
        })

        builder.addCase(hideErrorModal.fulfilled, (state) => {
            state.errorModalState = {
                messages: [],
                open: false,
            }
        })
    },
})

export default authSlice.reducer
