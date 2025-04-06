import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, JSX, useMemo } from 'react'
import { DayOfWeek, daysOfWeek } from '../types'

interface IHeaderProps {
    minColumnWidth: number
    renderHeaderContent: (date: DayOfWeek) => JSX.Element
}

const Header: FC<IHeaderProps> = (props: IHeaderProps) => {
    const { minColumnWidth, renderHeaderContent } = props
    const headers = useMemo(() => {
        return daysOfWeek.map((day) => {
            return (
                <div
                    key={day}
                    className="w-full p-2"
                    style={{
                        minWidth: `${minColumnWidth}px`,
                    }}
                >
                    {renderHeaderContent(day)}
                </div>
            )
        })
    }, [minColumnWidth, renderHeaderContent])

    return (
        <div className="flex gap-2 w-full sticky top-0 z-[99] bg-primary-50 text-primary-600 shadow">
            {headers}
        </div>
    )
}

export default React.memo(Header, arePropsEqual(['renderHeaderContent']))
