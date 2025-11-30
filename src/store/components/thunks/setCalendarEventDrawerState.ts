import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICalendarEventDrawerState } from '..'

export const setCalendarEventDrawerState = createAsyncThunk(
    'components/setCalendarEventDrawerState',
    async (state: ICalendarEventDrawerState) => {
        return state
    },
)
