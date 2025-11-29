import arePropsEqual from '#/utils/arePropsEqual'
import React, { useEffect } from 'react'
import Oscillator from '../model/Oscillator'

const blackKeyIndices = [1, 3, 6, 8, 10]

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
    parentWidth: number
}

const KeyboardKeyComponent = ({
    keyIndex,
    oscillator,
    parentWidth,
}: KeyboardKeyProps) => {
    const toneIndex = keyIndex % 12
    const blackToneIndex = toneIndex + 1
    const hasBlack = blackKeyIndices.includes(blackToneIndex)
    const noteLabel = keyLabels[toneIndex]
    const blackNoteLabel = keyLabels[blackToneIndex]

    useEffect(() => {
        const onMouseUp = () => {
            oscillator?.stopTone()
        }

        const abortController = new AbortController()

        window.addEventListener('mouseup', onMouseUp, abortController)

        return () => abortController.abort()
    }, [oscillator])

    const itemWidth = parentWidth / 14

    return (
        <div
            className={`relative h-[100px] flex items-center justify-center cursor-pointer border border-primary-600 rounded-b bg-white`}
            style={{
                width: `${itemWidth}px`,
            }}
            title={noteLabel}
            onMouseDown={() => {
                oscillator?.playTone(keyIndex, 4)
            }}
        >
            {hasBlack && keyIndex !== 23 && (
                <div
                    className="absolute top-0 bg-black h-[50px] z-[99] rounded-b"
                    style={{
                        width: `${itemWidth / 2}px`,
                        left: `${itemWidth / 2 + itemWidth / 4}px`,
                    }}
                    title={blackNoteLabel}
                    onMouseDown={(event) => {
                        event.stopPropagation()
                        oscillator?.playTone(keyIndex + 1, 4)
                    }}
                ></div>
            )}
        </div>
    )
}

export const KeyboardKey = React.memo(KeyboardKeyComponent, arePropsEqual([]))
