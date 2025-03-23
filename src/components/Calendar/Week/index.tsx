import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { JSX, useMemo } from 'react'
import { daysOfWeek } from '../types'

interface IWeekProps<E> {
    minColumnWidth: number
    startOfWeek: DateTime
    eventsByDay: Record<number, E[]>
    renderEventContent: (event: E, index: number) => JSX.Element
}

const Week: <EventType>(props: IWeekProps<EventType>) => JSX.Element = (
    props,
) => {
    const { minColumnWidth, startOfWeek, eventsByDay, renderEventContent } =
        props

    const days = useMemo(() => {
        return daysOfWeek.map((day) => {
            const date = startOfWeek.plus({ day })
            const today = DateTime.now().startOf('day')
            const events = eventsByDay[date.toUnixInteger()] ?? []

            const isToday = date.toUnixInteger() === today.toUnixInteger()

            return (
                <div
                    className="flex flex-col p-2 gap-1 w-full border border-primary-100 rounded"
                    style={{
                        minWidth: `${minColumnWidth}px`,
                    }}
                >
                    {isToday && (
                        <div className="px-1 w-fit rounded bg-primary-50 text-primary-600 border border-primary-100">
                            {date.day}
                        </div>
                    )}
                    {!isToday && (
                        <div className="text-primary-400">{date.day}</div>
                    )}
                    <div className="flex flex-col">
                        {events.map((event, i) => {
                            return renderEventContent(event, i)
                        })}
                    </div>
                </div>
            )
        })
    }, [eventsByDay, minColumnWidth, renderEventContent, startOfWeek])

    return <div className="flex gap-2 min-h-20 w-full">{days}</div>
}

export default React.memo(
    Week,
    arePropsEqual(['renderEventContent']),
) as typeof Week
