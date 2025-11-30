import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { JSX, useEffect, useMemo, useState } from 'react'
import Header from './Header'
import Toolbar from './Toolbar'
import { DayOfWeek, ICalendarEvent } from './types'
import processEvents from './utils/processEvents'
import Week from './Week'

interface ICalendarProps<E> {
    minColumnWidth?: number
    startDate: DateTime
    timezone?: string
    events: E[]
    showNowMarker: boolean
    onChange?: (newDate: DateTime) => void
    renderHeaderContent: (dayOfWeek: DayOfWeek) => JSX.Element
    renderEventContent: (event: E, index: number) => JSX.Element
    onNewEvent?: (date: DateTime) => void
}

const Calendar: <EventData extends ICalendarEvent>(
    props: ICalendarProps<EventData>,
) => JSX.Element = (props) => {
    const {
        startDate: s,
        events,
        minColumnWidth = 100,
        renderEventContent,
        renderHeaderContent,
        onChange,
        onNewEvent,
    } = props

    const [startDate, setStartDate] = useState<DateTime>(s)

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
                    currentMonth={startDate.month}
                    minColumnWidth={minColumnWidth}
                    startOfWeek={weekStart}
                    eventsByDay={weekEvents}
                    renderEventContent={renderEventContent}
                    onNewEvent={onNewEvent}
                />
            )
        })
    }, [
        eventsByWeekByDay,
        minColumnWidth,
        numberOfWeeks,
        onNewEvent,
        renderEventContent,
        startDate.month,
        startOfCalendar,
    ])

    useEffect(() => {
        if (onChange !== undefined) {
            onChange(startOfMonth)
        }
    }, [onChange, startOfMonth])

    return (
        <div className="grid grid-rows-[max-content_minmax(0px,100%)] grid-cols-[minmax(0px,100%)] gap-2 overflow-hidden h-full w-full min-w-0 min-h-0">
            <Toolbar startDate={startDate} setStartDate={setStartDate} />
            <div className="relative grid grid-rows-[max-content_minmax(0px,100%)] gap-2 w-full h-full overflow-auto min-w-0 min-h-0">
                <Header
                    minColumnWidth={minColumnWidth}
                    renderHeaderContent={renderHeaderContent}
                />
                <div
                    className={`grid grid-rows-[repeat(${numberOfWeeks})] gap-2 w-full h-fit min-h-0`}
                >
                    {weeks}
                </div>
            </div>
        </div>
    )
}

export default React.memo(
    Calendar,
    arePropsEqual(['renderEventContent', 'renderHeaderContent']),
) as typeof Calendar
