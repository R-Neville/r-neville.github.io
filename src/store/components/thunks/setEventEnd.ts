import { createAsyncThunk } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

export const setEventEnd = createAsyncThunk(
    'components/setEventEnd',
    (value: DateTime) => {
        return value
    },
)
