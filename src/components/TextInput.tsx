import arePropsEqual from '#/utils/arePropsEqual'
import { debounce } from 'lodash-es'
import React, { useState } from 'react'

interface ITextInputProps {
    value?: string
    label?: string
    debounceWait?: number
    onChange?: (value: string) => void
}

const TextInput = (props: ITextInputProps) => {
    const { value, label, debounceWait = 0, onChange } = props

    const [_value, setValue] = useState<string>(value ?? '')

    return (
        <div className="flex flex-col">
            {label !== undefined && (
                <div className="pl-1 font-semibold">{label}</div>
            )}
            <div
                className={`flex items-center justify-between border border-primary-200 rounded p-2`}
            >
                <input
                    className="outline-none w-full"
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
        </div>
    )
}

export default React.memo(TextInput, arePropsEqual([])) as typeof TextInput
