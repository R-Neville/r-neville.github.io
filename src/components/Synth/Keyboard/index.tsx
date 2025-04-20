import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'
import { KeyboardKey } from './KeyboardKey'

const KeyboardComponent: FC = () => {
    const keys = Array.from({ length: 88 }).map((_, index) => {
        return <KeyboardKey key={index} keyIndex={index} />
    })

    return <div className="flex flex-row">{keys}</div>
}

export const Keyboard = React.memo(KeyboardComponent, arePropsEqual([]))
