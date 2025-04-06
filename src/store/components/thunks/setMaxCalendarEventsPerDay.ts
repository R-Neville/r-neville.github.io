import { createAsyncThunk } from '@reduxjs/toolkit'

const setMaxCalendarEventsPerDay = createAsyncThunk(
    'components/setMaxCalendarEventsPerDay',
    (value: number) => value,
)

export { setMaxCalendarEventsPerDay }
