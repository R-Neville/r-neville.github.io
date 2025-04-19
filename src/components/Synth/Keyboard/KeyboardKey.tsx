import arePropsEqual from '#/utils/arePropsEqual'
import React, { useEffect } from 'react'
import Oscillator from '../model/Oscillator'

const blackKeyIndices = [1, 4, 6, 9, 11]

const keyLabels = [
    'C',
    'C#/Db',
    'D',
    'D#/Eb',
    'E',
    'F',
    'F#/Gb',
    'G',
    'G#/Ab',
    'A',
    'A#/Bb',
    'B',
] as const

export type KeyLabel = (typeof keyLabels)[number]

interface KeyboardKeyProps {
    keyIndex: number
    oscillator: Oscillator | null
}

const KeyboardKeyComponent = ({ keyIndex, oscillator }: KeyboardKeyProps) => {
    const toneIndex = keyIndex % 12
    const isBlack = blackKeyIndices.includes(toneIndex)
    const noteLabel = keyLabels[toneIndex]

    useEffect(() => {
        const onMouseUp = () => {
            oscillator?.stopTone()
        }

        const abortController = new AbortController()

        window.addEventListener('mouseup', onMouseUp, abortController)

        return () => abortController.abort()
    }, [oscillator])

    let keyClassName = 'bg-white'
    if (isBlack) {
        keyClassName = 'bg-black'
    }

    return (
        <div
            className={`${keyClassName} flex items-center justify-center w-4 h-10 cursor-pointer rounded border`}
            title={noteLabel}
            onMouseDown={() => {
                oscillator?.playTone(keyIndex)
            }}
        ></div>
    )
}

export const KeyboardKey = React.memo(KeyboardKeyComponent, arePropsEqual([]))
