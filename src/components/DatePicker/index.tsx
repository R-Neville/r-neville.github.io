import useOnClickAwayClass from '#/hooks/useOnClickAwayClass'
import icons from '#/icons'
import { Theme } from '#/theme'
import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { FC, useState } from 'react'
import Button from '../Button'
import Icon from '../Icon'
import Calendar from './Calendar'

interface IDatePickerProps {
    theme?: Theme
    value: DateTime
    onChange: (newValue: DateTime) => void
}

const DatePicker: FC<IDatePickerProps> = (props) => {
    const { value, theme = 'secondary', onChange } = props

    const [open, setOpen] = useState<boolean>(false)

    const onClickAwayClass = useOnClickAwayClass(() => {
        setOpen(false)
    }, !open)

    return (
        <div className={`${onClickAwayClass} relative`}>
            <Button theme={theme} onClick={() => setOpen((prev) => !prev)}>
                <div className="flex items-center gap-2">
                    <Icon icon={icons.calendar} />
                    {value.toFormat('MMM yyyy')}
                </div>
            </Button>
            {open && (
                <div className="absolute right-0 bg-white z-[9999] w-[300px] h-fit">
                    <Calendar startDate={value} onChange={onChange} />
                </div>
            )}
        </div>
    )
}

export default React.memo(DatePicker, arePropsEqual([]))
