import { createAsyncThunk } from '@reduxjs/toolkit'

export const showErrorModal = createAsyncThunk(
    'error/showErrorModal',
    (messages: string[]) => {
        return {
            messages,
            open: true,
        }
    },
)
