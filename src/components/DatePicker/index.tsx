import usePosition from '#/hooks/useBoundingRect'
import icons from '#/icons'
import { Theme, Variant } from '#/theme'
import arePropsEqual from '#/utils/arePropsEqual'
import { DateTime } from 'luxon'
import React, { FC, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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

    const ref = useRef<HTMLDivElement>(null)

    const { x, y, width, height } = usePosition(ref)

    return (
        <div ref={ref} className="w-fit">
            {asButton && (
                <Button
                    theme={theme}
                    variant={variant}
                    onClick={() => setOpen(true)}
                >
                    {showValue && value.toFormat('MMM yyyy')}
                    <Icon icon={icons.calendar} />
                </Button>
            )}
            {!asButton && (
                <div onClick={() => setOpen(true)}>
                    <Icon icon={icons.calendar} />
                </div>
            )}
            {open &&
                createPortal(
                    <div
                        className="fixed top-0 bottom-0 right-0 left-0 z-[9999]"
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                        <div
                            className="absolute bg-white w-[300x]"
                            style={{
                                left: `${x - 300 + width}px`,
                                top: `${y + height}px`,
                            }}
                            onClick={(event) => {
                                event.stopPropagation()
                            }}
                        >
                            <Calendar startDate={value} onChange={onChange} />
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    )
}

export default React.memo(DatePicker, arePropsEqual([]))
