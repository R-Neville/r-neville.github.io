import { createAsyncThunk } from '@reduxjs/toolkit'

export const setEventTitle = createAsyncThunk(
    'components/setEventTitle',
    (value: string) => {
        return value
    },
)
