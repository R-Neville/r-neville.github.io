import Calendar from '#/components/Calendar'
import Heading from '#/components/Heading'
import { DateTime, Interval } from 'luxon'
import { FC, useMemo } from 'react'

const CalendarView: FC = () => {
    const data = useMemo(() => {
        return Array.from(Array(100000)).map((_, i) => {
            return {
                name: `Item ${i + 1}`,
            }
        })
    }, [])

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-4">
                <Heading rank="h2">HorizontalVirtualiser</Heading>
                <p></p>
            </div>
            <div className="p-4 h-full">
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
                        return <div></div>
                    }}
                />
            </div>
        </div>
    )
}

export default CalendarView
