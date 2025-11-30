import icons from '#/icons'
import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { JSX, useMemo, useState } from 'react'
import Button from '../Button'
import Icon from '../Icon'
import Header from './Header'
import Week from './Week'

interface ICalendarProps {
    startDate: DateTime
    timezone?: string
    onChange: (newDate: DateTime) => void
}

const Calendar: (props: ICalendarProps) => JSX.Element = (props) => {
    const { startDate: s, onChange } = props

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

    const weeks = useMemo(() => {
        return Array.from(Array(numberOfWeeks)).map((_zero, i) => {
            const weekStart = startOfCalendar.plus({ weeks: i })
            return (
                <Week
                    key={i}
                    currentMonth={startOfMonth.month}
                    startOfWeek={weekStart}
                    onChange={onChange}
                />
            )
        })
    }, [numberOfWeeks, onChange, startOfCalendar, startOfMonth.month])

    return (
        <div className="grid grid-rows-[max-content_minmax(0px,100%)] grid-cols-[minmax(0px,100%)] gap-2 overflow-hidden h-fit w-full min-w-0 min-h-0 p-2 rounded border border-primary-100 shadow">
            <div className="flex relative flex-col gap-2 w-full h-full overflow-auto min-w-0 min-h-0">
                <div className="flex justify-between items-center">
                    <div className="text-primary-500">
                        {startOfMonth.toFormat('MMMM, yyyy')}
                    </div>
                    <div className="flex justify-between">
                        {startOfMonth.month !== s.month && (
                            <Button
                                theme="transparent"
                                onClick={() => {
                                    setStartDate(s)
                                }}
                            >
                                <div>
                                    <Icon icon={icons.crosshairs} />
                                </div>
                            </Button>
                        )}
                        <Button
                            theme="transparent"
                            onClick={() => {
                                setStartDate((prev) => prev.minus({ month: 1 }))
                            }}
                        >
                            <div>
                                <Icon icon={icons.chevronLeft} />
                            </div>
                        </Button>
                        <Button
                            theme="transparent"
                            onClick={() => {
                                setStartDate((prev) => prev.plus({ month: 1 }))
                            }}
                        >
                            <div>
                                <Icon icon={icons.chevronRight} />
                            </div>
                        </Button>
                    </div>
                </div>
                <Header />
                <div className="flex flex-col gap-2 w-full">{weeks}</div>
            </div>
        </div>
    )
}

export default React.memo(Calendar, arePropsEqual([])) as typeof Calendar
