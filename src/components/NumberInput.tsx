import arePropsEqual from '#/utils/arePropsEqual'
import { debounce } from 'lodash-es'
import React, { useState } from 'react'

interface INumberInputProps {
    value?: number
    label?: string
    debounceWait?: number
    allowNegatives?: boolean
    onChange?: (value: number) => void
}

const NumberInput = (props: INumberInputProps) => {
    const {
        value = 0,
        label,
        debounceWait = 0,
        allowNegatives = false,
        onChange,
    } = props

    const [_value, setValue] = useState<string>(value.toString())

    return (
        <div className="flex flex-col">
            {label !== undefined && <div>{label}</div>}
            <input
                className="p-1 rounded border border-primary-100 outline-none"
                type="text"
                value={_value}
                onChange={(event) => {
                    if (event.target.value.length === 0) {
                        setValue('')
                        return
                    }

                    let newValue = Number(event.target.value)
                    if (isNaN(newValue)) {
                        newValue = Number(_value)
                    }

                    if (!allowNegatives && newValue < 0) {
                        newValue = 0
                    }

                    setValue(newValue.toString())

                    if (onChange === undefined) {
                        return
                    }

                    let update = onChange
                    if (debounceWait !== 0) {
                        update = debounce(onChange, debounceWait)
                    }

                    update(newValue)
                }}
            />
        </div>
    )
}

export default React.memo(NumberInput, arePropsEqual([])) as typeof NumberInput
