import { faClock } from '@fortawesome/free-regular-svg-icons'
import { DateTime } from 'luxon'
import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import Icon from './Icon'

interface ITimePickerProps {
    value: DateTime
    onChange: (value: DateTime) => void
    label?: string
}

const TimePicker: FC<ITimePickerProps> = (props) => {
    const { value, label, onChange } = props

    const [invalid, setInvalid] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const debouncedOnChange = useDebounceCallback(
        (hours: number, minutes: number) => {
            if (hours !== null) {
                if (minutes !== null) {
                    onChange(value.set({ hour: hours, minute: minutes }))
                }
                onChange(value.set({ hour: hours }))
            }
        },
        300,
    )

    const onInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            let hoursValid = true
            let minutesValid = true

            const value = event.target.value

            const parts = value.split(':')
            const hoursStr = parts.shift() ?? ''
            const minutesStr = parts.shift() ?? ''

            if (hoursStr.length < 0 || hoursStr.length > 2) {
                hoursValid = false
            }

            if (minutesStr.length < 0 || minutesStr.length > 2) {
                minutesValid = false
            }

            const [hoursNum, minutesNum] = value
                .split(':')
                .map((p) => Number(p))

            if (isNaN(hoursNum) || hoursNum < 0 || hoursNum > 23) {
                hoursValid = false
            }

            if (isNaN(minutesNum) || minutesNum < 0 || minutesNum > 59) {
                minutesValid = false
            }

            if (hoursValid && minutesValid) {
                setInvalid(false)
                debouncedOnChange(hoursNum, minutesNum)
            }

            if (!hoursValid || !minutesValid) {
                setInvalid(true)
            }
        },
        [debouncedOnChange],
    )

    const borderColour = invalid ? 'border-red-400' : 'border-primary-200'

    return (
        <div className="flex flex-col gap-1">
            {label !== undefined && (
                <div className="pl-1 font-semibold">{label}</div>
            )}
            <div
                className={`flex items-center justify-between p-2 border rounded ${borderColour}`}
            >
                <input
                    ref={inputRef}
                    placeholder="hh:mm"
                    defaultValue={value.toFormat('HH:mm')}
                    type="text"
                    className="flex items-center border-none outline-none"
                    onChange={onInputChange}
                />
                <Icon icon={faClock} />
            </div>
        </div>
    )
}

export default TimePicker
