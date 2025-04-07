import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICalendarEventModalState } from '..'

export const setCalendarEventModalState = createAsyncThunk(
    'components/setCalendarEventModalState',
    async (state: ICalendarEventModalState) => {
        return state
    },
)
