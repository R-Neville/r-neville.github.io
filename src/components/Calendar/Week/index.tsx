import Button from '#/components/Button'
import Icon from '#/components/Icon'
import icons from '#/icons'
import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { JSX, useMemo } from 'react'
import { daysOfWeek, ICalendarEvent } from '../types'
import sortEvents from '../utils/sortEvents'

interface IWeekProps<E> {
    currentMonth: number
    minColumnWidth: number
    startOfWeek: DateTime
    eventsByDay: Record<number, E[]>
    renderEventContent: (event: E, index: number) => JSX.Element
    onNewEvent?: (date: DateTime) => void
    onShowEvent?: (event: E) => void
    onDeleteEvent?: (event: E) => void
}

const Week: <EventType extends ICalendarEvent>(
    props: IWeekProps<EventType>,
) => JSX.Element = (props) => {
    const {
        currentMonth,
        minColumnWidth,
        startOfWeek,
        eventsByDay,
        renderEventContent,
        onNewEvent,
    } = props

    const days = useMemo(() => {
        return daysOfWeek.map((day) => {
            const date = startOfWeek.plus({ day })
            const today = DateTime.now().startOf('day')
            const events = sortEvents(eventsByDay[date.toUnixInteger()] ?? [])

            const isToday = date.toUnixInteger() === today.toUnixInteger()
            const isCurrentMonth = date.month === currentMonth

            const todayClasses =
                isToday && isCurrentMonth
                    ? 'rounded bg-neutral-500 text-white'
                    : isToday && !isCurrentMonth
                      ? 'rounded bg-neutral-500 text-white'
                      : ''

            const monthClasses = isCurrentMonth
                ? 'text-primary-600 bg-white'
                : isToday
                  ? 'bg-primary-50'
                  : 'text-primary-300 bg-primary-50'

            return (
                <div
                    className={`${monthClasses} group relative flex flex-col p-2 gap-1 w-full h-full border border-primary-100 rounded`}
                    style={{
                        minWidth: `${minColumnWidth}px`,
                    }}
                >
                    <div className={`flex px-2 w-fit ${todayClasses}`}>
                        {date.day}
                    </div>
                    <div className="flex flex-col gap-2 h-full min-h-10">
                        {events.map((event, i) => {
                            return renderEventContent(event, i)
                        })}
                    </div>
                    {onNewEvent !== undefined && (
                        <div className="absolute bottom-2 right-2 hidden group-hover:!flex">
                            <Button
                                theme="secondary"
                                onClick={() => {
                                    onNewEvent(date)
                                }}
                            >
                                <Icon icon={icons.plus} />
                            </Button>
                        </div>
                    )}
                </div>
            )
        })
    }, [
        currentMonth,
        eventsByDay,
        minColumnWidth,
        onNewEvent,
        renderEventContent,
        startOfWeek,
    ])

    return <div className="flex items-stretch gap-2 h-full w-full">{days}</div>
}

export default React.memo(
    Week,
    arePropsEqual(['renderEventContent']),
) as typeof Week
