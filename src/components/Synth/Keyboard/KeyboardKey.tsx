import arePropsEqual from '#/utils/arePropsEqual'
import React, { useEffect } from 'react'
import { useSynthContext } from '../Context'
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
}

const KeyboardKeyComponent = ({ keyIndex }: KeyboardKeyProps) => {
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
    const isBlack = blackKeyIndices.includes(toneIndex)
    const noteLabel = keyLabels[toneIndex]

    useEffect(() => {
        const abortController = new AbortController()

        if (oscillator !== null) {
            const onMouseUp = () => {
                oscillator?.stopTone()
                setOscillator(null)
            }
            window.addEventListener('mouseup', onMouseUp, abortController)
        }

        return () => abortController.abort()
    }, [oscillator, setOscillator])

    let keyClassName = 'bg-white'
    if (isBlack) {
        keyClassName = 'bg-black'
    }

    if (audioContext === null) {
        return null
    }

    return (
        <div
            className={`${keyClassName} flex items-center justify-center w-4 h-10 cursor-pointer rounded border`}
            title={noteLabel}
            onMouseDown={() => {
                const oscillator = new Oscillator(
                    audioContext,
                    type,
                    numberOfVoices,
                    detuneAmount,
                    panAmount,
                )
                oscillator.playTone(keyIndex)
                setOscillator(oscillator)
            }}
        ></div>
    )
}

export const KeyboardKey = React.memo(KeyboardKeyComponent, arePropsEqual([]))
