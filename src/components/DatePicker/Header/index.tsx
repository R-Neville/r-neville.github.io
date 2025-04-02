import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { FC, useMemo } from 'react'
import { daysOfWeek } from '../types'

const Header: FC = () => {
    const headers = useMemo(() => {
        return daysOfWeek.map((day) => {
            return (
                <div
                    key={day}
                    className="w-full p-2 rounded bg-primary-50 text-primary-600 shadow"
                >
                    {DateTime.now().set({ weekday: day }).toFormat('DD')}
                </div>
            )
        })
    }, [])

    return <div className="flex gap-2 w-full sticky top-0">{headers}</div>
}

export default React.memo(Header, arePropsEqual([]))
