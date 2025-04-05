import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { FC, useMemo } from 'react'
import { daysOfWeek } from '../types'

interface IWeekProps {
    currentMonth: number
    startOfWeek: DateTime
    onChange: (newDate: DateTime) => void
}

const Week: FC<IWeekProps> = (props) => {
    const { startOfWeek, currentMonth, onChange } = props

    const days = useMemo(() => {
        return daysOfWeek.map((day) => {
            const date = startOfWeek.plus({ day })
            const today = DateTime.now().startOf('day')

            const isToday = date.toUnixInteger() === today.toUnixInteger()

            let themeClasses = 'text-primary-400'
            if (isToday) {
                themeClasses = 'bg-primary-400 text-white'
            } else if (date.month !== currentMonth) {
                themeClasses = 'text-primary-200'
            }

            return (
                <div
                    className={`flex justify-center items-center gap-1 p-1.5 w-full h-fit border border-primary-100 rounded hover:bg-primary-100 cursor-pointer ${themeClasses}`}
                    onClick={() => {
                        onChange(date)
                    }}
                >
                    {date.day}
                </div>
            )
        })
    }, [currentMonth, onChange, startOfWeek])

    return <div className="flex gap-1 w-full">{days}</div>
}

export default React.memo(Week, arePropsEqual([])) as typeof Week
