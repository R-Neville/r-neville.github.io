import arePropsEqual from '#/utils/arePropsEqual'
import { debounce } from 'lodash-es'
import React, { useState } from 'react'

interface ITextInputProps {
    value: string
    label?: string
    debounceWait?: number
    onChange?: (value: string) => void
}

const TextInput = (props: ITextInputProps) => {
    const { value, label, debounceWait = 0, onChange } = props

    const [_value, setValue] = useState<string>(value)

    return (
        <div className="flex flex-col">
            {label !== undefined && <div>{label}</div>}
            <input
                className="w-20"
                type="text"
                value={_value}
                onChange={(event) => {
                    setValue(event.target.value)

                    if (onChange === undefined) {
                        return
                    }

                    let update = onChange
                    if (debounceWait !== 0) {
                        update = debounce(onChange, debounceWait)
                    }

                    update(event.target.value)
                }}
            />
        </div>
    )
}

export default React.memo(TextInput, arePropsEqual([])) as typeof TextInput
