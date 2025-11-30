import arePropsEqual from '#/utils/arePropsEqual'
import React, { useCallback, useEffect } from 'react'
import { useSynthContext } from '../Context'
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
    parentWidth: number
}

const KeyboardKeyComponent = ({ keyIndex, parentWidth }: KeyboardKeyProps) => {
    const {
        audioContext,
        oscillator,
        detuneAmount,
        numberOfVoices,
        panAmount,
        type,
        setOscillator,
    } = useSynthContext()

    const toneIndex = keyIndex % 12
    const blackToneIndex = toneIndex + 1
    const hasBlack = blackKeyIndices.includes(blackToneIndex)
    const noteLabel = keyLabels[toneIndex]
    const blackNoteLabel = keyLabels[blackToneIndex]

    useEffect(() => {
        const abortController = new AbortController()

        const onMouseUp = () => {
            oscillator?.stopTone()
        }
        window.addEventListener('mouseup', onMouseUp, abortController)

        return () => abortController.abort()
    }, [oscillator])

    const playTone = useCallback(
        (keyIndex: number) => {
            if (audioContext === null) {
                return
            }
            const oscillator = new Oscillator(
                audioContext,
                type,
                numberOfVoices,
                detuneAmount,
                panAmount,
            )
            oscillator.playTone(keyIndex, 4)
            setOscillator(oscillator)
        },
        [
            audioContext,
            detuneAmount,
            numberOfVoices,
            panAmount,
            setOscillator,
            type,
        ],
    )

    const stopTone = () => {
        oscillator?.stopTone()
    }

    const itemWidth = parentWidth / 14

    if (audioContext === null) {
        return null
    }

    return (
        <div
            className={`relative h-[100px] flex items-center justify-center cursor-pointer border border-primary-600 rounded-b bg-white`}
            style={{
                width: `${itemWidth}px`,
            }}
            title={noteLabel}
            onMouseDown={() => {
                stopTone()
                playTone(keyIndex)
            }}
            onTouchStart={() => {
                stopTone()
                playTone(keyIndex)
            }}
            onTouchEnd={stopTone}
            onMouseLeave={stopTone}
            onMouseUp={stopTone}
            onContextMenu={(event) => {
                event.preventDefault()
                oscillator?.stopTone()
            }}
        >
            {hasBlack && keyIndex !== 23 && (
                <div
                    className="absolute top-0 bg-black h-[50px] z-99 rounded-b"
                    style={{
                        width: `${itemWidth / 2}px`,
                        left: `${itemWidth / 2 + itemWidth / 4}px`,
                    }}
                    title={blackNoteLabel}
                    onMouseDown={(event) => {
                        event.stopPropagation()
                        stopTone()
                        playTone(keyIndex + 1)
                    }}
                    onTouchStart={(event) => {
                        event.stopPropagation()
                        stopTone()
                        playTone(keyIndex + 1)
                    }}
                    onTouchEnd={stopTone}
                    onMouseLeave={stopTone}
                    onMouseUp={stopTone}
                    onContextMenu={(event) => {
                        event.preventDefault()
                        oscillator?.stopTone()
                    }}
                ></div>
            )}
        </div>
    )
}

export const KeyboardKey = React.memo(KeyboardKeyComponent, arePropsEqual([]))
