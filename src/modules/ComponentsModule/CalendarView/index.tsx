import Calendar from '#/components/Calendar'
import Heading from '#/components/Heading'
import { DateTime, Interval } from 'luxon'
import { FC } from 'react'

const CalendarView: FC = () => {
    return (
        <div className="flex flex-col w-full h-full min-w-0 min-h-0">
            <div className="p-4">
                <Heading rank="h2">HorizontalVirtualiser</Heading>
                <p></p>
            </div>
            <div className="p-4 h-full w-full min-w-0 min-h-0 overflow-auto">
                <Calendar
                    startDate={DateTime.now()}
                    showNowMarker
                    events={[
                        {
                            start: DateTime.now(),
                            end: DateTime.now().plus({ hours: 1 }),
                        },
                    ]}
                    renderEventContent={(event, index) => {
                        const int = Interval.fromDateTimes(
                            event.start,
                            event.end,
                        )
                        return (
                            <div key={index} className="p-2 bg-neutral-100">
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
                />
            </div>
        </div>
    )
}

export default CalendarView
