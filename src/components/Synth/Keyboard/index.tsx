import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import Oscillator from '../model/Oscillator'
import { KeyboardKey } from './KeyboardKey'

interface KeyboardProps {
    oscillator: Oscillator | null
}

const KeyboardComponent: FC<KeyboardProps> = ({ oscillator }) => {
    const ref = useRef<HTMLDivElement>(null)

    const { width = 0 } = useResizeObserver({ ref })

    const keys = Array.from({ length: 24 }).map((_, index) => {
        if ([1, 3, 6, 8, 10].includes(index % 12)) {
            return <></>
        }
        return (
            <KeyboardKey
                parentWidth={width}
                key={index}
                keyIndex={index}
                oscillator={oscillator}
            />
        )
    })

    return (
        <div ref={ref} className="relative flex flex-row">
            {keys}
        </div>
    )
}

export const Keyboard = React.memo(KeyboardComponent, arePropsEqual([]))
