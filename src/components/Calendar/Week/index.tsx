import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { JSX, useMemo } from 'react'
import { daysOfWeek } from '../types'

interface IWeekProps<E> {
    startOfWeek: DateTime
    eventsByDay: Record<number, E[]>
    renderEventContent: (event: E, index: number) => JSX.Element
}

const Week: <EventType>(props: IWeekProps<EventType>) => JSX.Element = (
    props,
) => {
    const { startOfWeek, eventsByDay, renderEventContent } = props

    const days = useMemo(() => {
        return daysOfWeek.map((day) => {
            const date = startOfWeek.plus({ day })
            const events = eventsByDay[date.toUnixInteger()] ?? []
            return (
                <div className="flex flex-col p-2 w-full border">
                    <div>{date.day}</div>
                    <div className="flex flex-col">
                        {events.map((event, i) => {
                            return renderEventContent(event, i)
                        })}
                    </div>
                </div>
            )
        })
    }, [eventsByDay, renderEventContent, startOfWeek])

    return <div className="flex gap-2 min-h-20 w-full">{days}</div>
}

export default React.memo(
    Week,
    arePropsEqual(['renderEventContent']),
) as typeof Week
