import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { FC, useMemo } from 'react'
import { daysOfWeek } from '../types'

interface IWeekProps {
    startOfWeek: DateTime
    onChange: (newDate: DateTime) => void
}

const Week: FC<IWeekProps> = (props) => {
    const { startOfWeek, onChange } = props

    const days = useMemo(() => {
        return daysOfWeek.map((day) => {
            const date = startOfWeek.plus({ day })
            const today = DateTime.now().startOf('day')

            const isToday = date.toUnixInteger() === today.toUnixInteger()

            return (
                <div
                    className="flex flex-col p-2 gap-1 w-full border border-primary-100 rounded"
                    onClick={() => {
                        onChange(date)
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
                </div>
            )
        })
    }, [onChange, startOfWeek])

    return <div className="flex gap-2 min-h-20 w-full">{days}</div>
}

export default React.memo(Week, arePropsEqual([])) as typeof Week
