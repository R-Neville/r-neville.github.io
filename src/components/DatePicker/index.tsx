import useOnClickAwayClass from '#/hooks/useOnClickAwayClass'
import icons from '#/icons'
import { Theme, Variant } from '#/theme'
import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { FC, useState } from 'react'
import Button from '../Button'
import Icon from '../Icon'
import Calendar from './Calendar'

interface IDatePickerProps {
    asButton?: boolean
    theme?: Theme
    variant?: Variant
    value: DateTime
    showValue?: boolean
    onChange: (newValue: DateTime) => void
}

const DatePicker: FC<IDatePickerProps> = (props) => {
    const {
        value,
        theme = 'secondary',
        variant = 'normal',
        onChange,
        showValue = false,
        asButton = false,
    } = props

    const [open, setOpen] = useState<boolean>(false)

    const onClickAwayClass = useOnClickAwayClass(() => {
        setOpen(false)
    }, !open)

    return (
        <div className={`${onClickAwayClass} relative`}>
            {asButton && (
                <Button onClick={() => setOpen((prev) => !prev)}>
                    {showValue && value.toFormat('MMM yyyy')}
                    <Icon icon={icons.calendar} />
                </Button>
            )}
            <div onClick={() => setOpen((prev) => !prev)}>
                <Icon icon={icons.calendar} />
            </div>
            {open && (
                <div className="absolute right-0 bg-white z-[9999] w-[300px] h-fit">
                    <Calendar startDate={value} onChange={onChange} />
                </div>
            )}
        </div>
    )
}

export default React.memo(DatePicker, arePropsEqual([]))
