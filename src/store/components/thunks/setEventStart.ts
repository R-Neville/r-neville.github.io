import { createAsyncThunk } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

export const setEventStart = createAsyncThunk(
    'components/setEventStart',
    (value: DateTime) => {
        return value
    },
)
