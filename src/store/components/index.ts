import { IExampleCalendarEvent } from '#/components/Calendar/types'
import { createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { setMaxCalendarEventsPerDay } from './thunks'
import { setCalendarEventModalState } from './thunks/setCalendarEventModalState'

export interface ICalendarEventModalState {
    open: boolean
    date: DateTime | null
    event: IExampleCalendarEvent | null
    mode: 'new' | 'edit' | 'view'
}

interface IComponentsState {
    calendar: {
        maxEventsPerDay: number
        eventModalState: ICalendarEventModalState
    }
}

const initialState: IComponentsState = {
    calendar: {
        maxEventsPerDay: 5,
        eventModalState: {
            open: false,
            date: null,
            event: null,
            mode: 'new',
        },
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

        builder.addCase(
            setCalendarEventModalState.fulfilled,
            (state, action) => {
                state.calendar.eventModalState = action.payload
            },
        )
    },
})

export * from './thunks'

export default configSlice.reducer
