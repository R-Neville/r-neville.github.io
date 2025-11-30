import { DateTime } from 'luxon'
import { FC, useMemo, useState } from 'react'
import DatePicker from './DatePicker'

interface IDateInputProps {
    label?: string
    value?: DateTime
    onChange?: (value: DateTime) => void
}

const DateInput: FC<IDateInputProps> = (props) => {
    const { label, value, onChange } = props
    const [_value, setValue] = useState<DateTime>(value ?? DateTime.now())
    const [inputValue, setInputValue] = useState<string>(_value.toFormat('DD'))
    const [isInvalid, setIsInvalid] = useState<boolean>(false)

    const border = isInvalid ? 'border-red-400' : 'border-primary-200'

    useMemo(() => {
        const initial = value ?? DateTime.now()
        setValue(initial)
        setInputValue(initial.toFormat('DD'))
    }, [value])

    return (
        <div className="flex flex-col gap-1">
            {label !== undefined && (
                <div className="pl-1 font-semibold">{label}</div>
            )}
            <div
                className={`flex items-center justify-between border ${border} rounded p-2`}
            >
                <input
                    className="w-full outline-none"
                    type="text"
                    value={inputValue}
                    onChange={(event) => {
                        setInputValue(event.target.value)
                        const newDate = DateTime.fromFormat(
                            event.target.value,
                            'd LLL yyyy',
                        )
                        if (newDate.isValid) {
                            setIsInvalid(false)
                            setValue(newDate)
                            if (onChange === undefined) {
                                return
                            }
                            onChange(newDate)
                        } else {
                            setIsInvalid(true)
                        }
                    }}
                />
                <DatePicker
                    theme="transparent"
                    value={_value}
                    onChange={(value) => {
                        setValue(value)
                        if (onChange === undefined) {
                            return
                        }
                        onChange(value)
                    }}
                />
            </div>
        </div>
    )
}

export default DateInput
