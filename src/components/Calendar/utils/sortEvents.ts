import { ICalendarEvent } from '../types'

export default function sortEvents<Event extends ICalendarEvent>(
    events: Event[],
) {
    const sorted = events.slice().sort((a, b) => {
        return a.start.diff(b.start, 'minutes').minutes
    })

    return sorted
}
