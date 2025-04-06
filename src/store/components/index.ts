import { createSlice } from '@reduxjs/toolkit'
import { setMaxCalendarEventsPerDay } from './thunks'

interface IComponentsState {
    calendar: {
        maxEventsPerDay: number
    }
}

const initialState: IComponentsState = {
    calendar: {
        maxEventsPerDay: 5,
    },
}

const configSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            setMaxCalendarEventsPerDay.fulfilled,
            (state, action) => {
                state.calendar.maxEventsPerDay = action.payload
            },
        )
    },
})

export * from './thunks'

export default configSlice.reducer
