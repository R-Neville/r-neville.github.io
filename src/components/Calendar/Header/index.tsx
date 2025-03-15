import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, JSX, useMemo } from 'react'
import { DayOfWeek, daysOfWeek } from '../types'

interface IHeaderProps {
    renderHeaderContent: (date: DayOfWeek) => JSX.Element
}

const Header: FC<IHeaderProps> = (props: IHeaderProps) => {
    const { renderHeaderContent } = props
    const headers = useMemo(() => {
        return daysOfWeek.map((day) => {
            return (
                <div key={day} className="w-full">
                    {renderHeaderContent(day)}
                </div>
            )
        })
    }, [renderHeaderContent])

    return <div className="flex w-full">{headers}</div>
}

export default React.memo(Header, arePropsEqual(['renderHeaderContent']))
