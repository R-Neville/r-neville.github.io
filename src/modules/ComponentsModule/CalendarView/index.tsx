import Calendar from '#/components/Calendar'
import Heading from '#/components/Heading'
import { useAppDispatch, useAppSelector } from '#/store'
import { setCalendarEventDrawerState } from '#/store/components/thunks'
import { DateTime, Interval } from 'luxon'
import { FC, useState } from 'react'
import { v4 } from 'uuid'

const CalendarView: FC = () => {
    const dispatch = useAppDispatch()

    const { events } = useAppSelector((state) => state.components.calendar)

    const [calendarStart] = useState<DateTime>(DateTime.now())

    return (
        <div className="flex flex-col w-full h-full min-w-0 min-h-0 overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <Heading rank="h2">Calendar</Heading>
                </div>
                <p>Here's a simple calendar that I'm working on.</p>
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
                                    void dispatch(
                                        setCalendarEventDrawerState({
                                            open: true,
                                            date: null,
                                            mode: 'edit',
                                            event,
                                        }),
                                    )
                                }}
                            >
                                {event.title && <div>{event.title}</div>}
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
                            setCalendarEventDrawerState({
                                open: true,
                                date,
                                event: {
                                    id: v4(),
                                    start: date,
                                    end: date,
                                    title: '',
                                },
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
