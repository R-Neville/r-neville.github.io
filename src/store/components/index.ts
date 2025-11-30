import { ICalendarEvent } from '#/components/Calendar/types'
import { createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import {
    addCalendarEvent,
    setEventEnd,
    setEventStart,
    setEventTitle,
    setMaxCalendarEventsPerDay,
} from './thunks'
import { setCalendarEventDrawerState } from './thunks/setCalendarEventDrawerState'

export interface ICalendarEventDrawerState {
    open: boolean
    date: DateTime | null
    event: ICalendarEvent | null
    mode: 'new' | 'edit' | 'view'
}

interface IComponentsState {
    calendar: {
        maxEventsPerDay: number
        eventModalState: ICalendarEventDrawerState
        events: ICalendarEvent[]
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
        events: [],
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
            setCalendarEventDrawerState.fulfilled,
            (state, action) => {
                state.calendar.eventModalState = action.payload
            },
        )

        builder.addCase(addCalendarEvent.fulfilled, (state, action) => {
            state.calendar.events = [...state.calendar.events, action.payload]
        })

        builder.addCase(setEventEnd.fulfilled, (state, action) => {
            if (state.calendar.eventModalState.event) {
                state.calendar.eventModalState.event.end = action.payload
            }
        })

        builder.addCase(setEventStart.fulfilled, (state, action) => {
            if (state.calendar.eventModalState.event) {
                state.calendar.eventModalState.event.start = action.payload
            }
        })

        builder.addCase(setEventTitle.fulfilled, (state, action) => {
            if (state.calendar.eventModalState.event) {
                state.calendar.eventModalState.event.title = action.payload
            }
        })
    },
})

export * from './thunks'

export default configSlice.reducer
