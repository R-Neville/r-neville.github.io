import Button from '#/components/Button'
import Calendar from '#/components/Calendar'
import Heading from '#/components/Heading'
import Icon from '#/components/Icon'
import icons from '#/icons'
import { useAppDispatch, useAppSelector } from '#/store'
import { setCalendarEventModalState } from '#/store/components/thunks/setCalendarEventModalState'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { DateTime, Interval } from 'luxon'
import { FC, useMemo, useState } from 'react'

const CalendarView: FC = () => {
    const dispatch = useAppDispatch()

    const { maxEventsPerDay } = useAppSelector(
        (state) => state.components.calendar,
    )

    const [calendarStart] = useState<DateTime>(DateTime.now())

    const events = useMemo(() => {
        const start = calendarStart.startOf('month').startOf('week')
        const end = calendarStart.endOf('month').endOf('week')

        const days = Math.round(end.diff(start, 'days').days)

        return Array.from(Array(days))
            .map((_zero, i) => {
                const date = start.plus({ days: i })
                const eventCount = Math.floor(
                    Math.random() * (maxEventsPerDay + 1),
                )
                const events = Array.from(Array(eventCount)).map(() => {
                    const eventStartHour = Math.floor(Math.random() * 23)
                    return {
                        start: date.set({ hour: eventStartHour }),
                        end: date.set({ hour: eventStartHour + 1 }),
                    }
                })
                return events
            })
            .flat()
    }, [calendarStart, maxEventsPerDay])

    return (
        <div className="flex flex-col w-full h-full min-w-0 min-h-0 overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <Heading rank="h2">Calendar</Heading>
                    <div className="flex items-center gap-2">
                        <Button
                            theme="secondary"
                            variant={'normal'}
                            onClick={() => {
                                void dispatch(
                                    setCurrentModule(
                                        new ModuleDefinition(
                                            'components',
                                            'index',
                                        ),
                                    ),
                                )
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Icon icon={icons.arrowLeft} />
                                Back
                            </div>
                        </Button>
                        <Button theme="secondary">
                            <div className="flex items-center gap-2 py-1 px-2">
                                <Icon icon={icons.cog} />
                            </div>
                        </Button>
                        <Button theme="secondary">
                            <div className="flex items-center gap-2 py-1 px-2">
                                <Icon icon={icons.code} />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="p-4 h-full w-full overflow-hidden">
                <Calendar
                    showNowMarker
                    startDate={calendarStart}
                    events={events}
                    renderEventContent={(event, index) => {
                        const int = Interval.fromDateTimes(
                            event.start,
                            event.end,
                        )
                        return (
                            <div
                                key={index}
                                className="p-2 bg-white rounded border border-primary-200 text-sm cursor-pointer select-none shadow"
                                onClick={() => {
                                    console.log(event)
                                }}
                            >
                                {int.toFormat('HH:mm')}
                            </div>
                        )
                    }}
                    renderHeaderContent={(day) => {
                        const proxyDate = DateTime.now()
                            .startOf('week')
                            .plus({ day })
                        return <div>{proxyDate.toFormat('EEE')}</div>
                    }}
                    onNewEvent={(date) => {
                        void dispatch(
                            setCalendarEventModalState({
                                open: true,
                                date,
                                event: null,
                                mode: 'new',
                            }),
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default CalendarView
