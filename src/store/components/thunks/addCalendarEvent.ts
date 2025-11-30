import { ICalendarEvent } from '#/components/Calendar/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addCalendarEvent = createAsyncThunk(
    'components/addCalendarEvent',
    (event: ICalendarEvent) => {
        return event
    },
)
