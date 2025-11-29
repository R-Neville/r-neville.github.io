import Button from '#/components/Button'
import DatePicker from '#/components/DatePicker'
import Icon from '#/components/Icon'
import icons from '#/icons'
import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { FC, useMemo } from 'react'

interface IToolbarProps {
    startDate: DateTime
    setStartDate: (date: DateTime) => void
}

const Toolbar: FC<IToolbarProps> = (props) => {
    const { startDate, setStartDate } = props

    const isCurrentMonth = useMemo(() => {
        return (
            startDate.startOf('month').toUnixInteger() ===
            DateTime.now().startOf('month').toUnixInteger()
        )
    }, [startDate])

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-2">
                {!isCurrentMonth && (
                    <Button
                        theme="secondary"
                        onClick={() => {
                            const now = DateTime.now().setZone(startDate.zone)
                            setStartDate(now)
                        }}
                    >
                        <div>
                            <Icon icon={icons.crosshairs} />
                        </div>
                    </Button>
                )}
                <Button
                    theme="secondary"
                    onClick={() => {
                        setStartDate(startDate.minus({ month: 1 }))
                    }}
                >
                    <div className="flex items-center gap-2 px-2 py-1">
                        <Icon icon={icons.chevronLeft} />
                    </div>
                </Button>
                <DatePicker
                    showValue
                    value={startDate}
                    onChange={(date) => {
                        setStartDate(date)
                    }}
                />
                <Button
                    theme="secondary"
                    onClick={() => {
                        setStartDate(startDate.plus({ month: 1 }))
                    }}
                >
                    <div className="flex items-center gap-2 px-2 py-1">
                        <Icon icon={icons.chevronRight} />
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default React.memo(Toolbar, arePropsEqual([]))
