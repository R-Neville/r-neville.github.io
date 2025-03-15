import { DateTime } from 'luxon'

export const daysOfWeek = [0, 1, 2, 3, 4, 5, 6] as const

export type DayOfWeek = (typeof daysOfWeek)[number]

export interface ICalendarEvent {
    start: DateTime
    end: DateTime
}
