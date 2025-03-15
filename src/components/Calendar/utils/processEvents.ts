import { ICalendarEvent } from '../types'

export default function processEvents<Event extends ICalendarEvent>(
    events: Event[],
) {
    const byWeekByDay: Record<number, Record<number, Event[]>> = {}

    events.forEach((event) => {
        const subEvents = splitEvents(event)

        subEvents.forEach((e) => {
            const { start } = event

            const startOfWeek = start.startOf('week').toUnixInteger()
            const startOfDay = start.startOf('day').toUnixInteger()

            if (byWeekByDay[startOfWeek] === undefined) {
                byWeekByDay[startOfWeek] = {}
            }

            if (byWeekByDay[startOfDay] === undefined) {
                byWeekByDay[startOfWeek][startOfDay] = []
            }

            byWeekByDay[startOfWeek][startOfDay].push(e)
        })
    })

    return byWeekByDay
}

function splitEvents<Event extends ICalendarEvent>(event: Event): Event[] {
    const split: Event[] = []

    const { start, end } = event

    if (start >= end) {
        return split
    }

    let newStart = start

    while (newStart.day < end.day) {
        split.push({
            ...event,
            start: newStart,
            end: newStart.endOf('day'),
        })
        newStart = newStart.plus({ days: 1 }).startOf('day')
    }

    split.push({
        ...event,
        start: newStart,
        end,
    })

    return split
}
