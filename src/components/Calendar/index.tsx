import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { JSX, useMemo } from 'react'
import Header from './Header'
import { DayOfWeek, ICalendarEvent } from './types'
import processEvents from './utils/processEvents'
import Week from './Week'

interface ICalendarProps<E> {
    minColumnWidth?: number
    startDate: DateTime
    timezone?: string
    events: E[]
    showNowMarker: boolean
    renderHeaderContent: (dayOfWeek: DayOfWeek) => JSX.Element
    renderEventContent: (event: E, index: number) => JSX.Element
}

const Calendar: <EventData extends ICalendarEvent>(
    props: ICalendarProps<EventData>,
) => JSX.Element = (props) => {
    const {
        startDate,
        events,
        minColumnWidth = 100,
        renderEventContent,
        renderHeaderContent,
    } = props

    const startOfMonth = useMemo(() => {
        return startDate.startOf('month')
    }, [startDate])

    const startOfCalendar = useMemo(() => {
        return startOfMonth.startOf('week')
    }, [startOfMonth])

    const endOfMonth = useMemo(() => {
        return startDate.endOf('month')
    }, [startDate])

    const endOfCalendar = useMemo(() => {
        return endOfMonth.endOf('week')
    }, [endOfMonth])

    const numberOfWeeks = useMemo(() => {
        return Math.ceil(endOfCalendar.diff(startOfCalendar, 'weeks').weeks)
    }, [startOfCalendar, endOfCalendar])

    const eventsByWeekByDay = useMemo(() => {
        return processEvents(events)
    }, [events])

    const weeks = useMemo(() => {
        return Array.from(Array(numberOfWeeks)).map((_zero, i) => {
            const weekStart = startOfCalendar.plus({ weeks: i })
            const weekEvents =
                eventsByWeekByDay[weekStart.toUnixInteger()] ?? {}
            return (
                <Week
                    key={i}
                    minColumnWidth={minColumnWidth}
                    startOfWeek={weekStart}
                    eventsByDay={weekEvents}
                    renderEventContent={renderEventContent}
                />
            )
        })
    }, [
        eventsByWeekByDay,
        minColumnWidth,
        numberOfWeeks,
        renderEventContent,
        startOfCalendar,
    ])

    return (
        <div className="grid grid-rows-[minmax(0px,100%)] grid-cols-[minmax(0px,100%)] overflow-hidden h-fit w-full min-w-0 min-h-0">
            <div className="flex relative flex-col gap-2 w-full h-full overflow-auto min-w-0 min-h-0">
                <Header
                    minColumnWidth={minColumnWidth}
                    renderHeaderContent={renderHeaderContent}
                />
                <div className="flex flex-col gap-2 w-full">{weeks}</div>
            </div>
        </div>
    )
}

export default React.memo(
    Calendar,
    arePropsEqual(['renderEventContent', 'renderHeaderContent']),
) as typeof Calendar
