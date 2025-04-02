import Button from '#/components/Button'
import Calendar from '#/components/Calendar'
import Heading from '#/components/Heading'
import Icon from '#/components/Icon'
import icons from '#/icons'
import { useAppDispatch } from '#/store'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { DateTime, Interval } from 'luxon'
import { FC } from 'react'

const CalendarView: FC = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col w-full h-full min-w-0 min-h-0">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <Heading rank="h2">Calendar</Heading>
                    <Button
                        theme="secondary"
                        variant={'normal'}
                        onClick={() => {
                            void dispatch(
                                setCurrentModule(
                                    new ModuleDefinition('components', 'index'),
                                ),
                            )
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <Icon icon={icons.arrowLeft} />
                            Back
                        </div>
                    </Button>
                </div>
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
