import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import { KeyboardKey } from './KeyboardKey'

const KeyboardComponent: FC = () => {
    const ref = useRef<HTMLDivElement>(null)

    const { width = 0 } = useResizeObserver({ ref })

    const keys = Array.from({ length: 24 }).map((_, index) => {
        if ([1, 3, 6, 8, 10].includes(index % 12)) {
            return <></>
        }
        return <KeyboardKey parentWidth={width} key={index} keyIndex={index} />
    })

    return (
        <div ref={ref} className="relative flex flex-row">
            {keys}
        </div>
    )
}

export const Keyboard = React.memo(KeyboardComponent, arePropsEqual([]))
