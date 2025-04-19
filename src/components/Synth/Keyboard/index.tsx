import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'
import Oscillator from '../model/Oscillator'
import { KeyboardKey } from './KeyboardKey'

interface KeyboardProps {
    oscillator: Oscillator | null
}

const KeyboardComponent: FC<KeyboardProps> = ({ oscillator }) => {
    const keys = Array.from({ length: 88 }).map((_, index) => {
        return (
            <KeyboardKey key={index} keyIndex={index} oscillator={oscillator} />
        )
    })

    return <div className="flex flex-row">{keys}</div>
}

export const Keyboard = React.memo(KeyboardComponent, arePropsEqual([]))
