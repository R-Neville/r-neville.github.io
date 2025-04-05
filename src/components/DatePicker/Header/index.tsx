import arePropsEqual from '#/utils/arePropsEqual'
import { Info } from 'luxon'
import React, { FC, useMemo } from 'react'
import { daysOfWeek } from '../types'

const Header: FC = () => {
    const headers = useMemo(() => {
        return daysOfWeek.map((day) => {
            return (
                <div
                    key={day}
                    className="flex items-center justify-center w-full p-1.5 rounded bg-primary-50 text-primary-600 shadow"
                >
                    {Info.weekdays('narrow')[day]}
                </div>
            )
        })
    }, [])

    return <div className="flex gap-2 w-full sticky top-0">{headers}</div>
}

export default React.memo(Header, arePropsEqual([]))
