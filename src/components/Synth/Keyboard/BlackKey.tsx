import arePropsEqual from '#/utils/arePropsEqual'
import React, { useCallback, useEffect, useState } from 'react'
import { useSynthContext } from '../Context'
import Synthesizer from '../model/Synthesizer'
import { KeyLabels } from './KeyLabels'

interface BlackKeyProps {
    keyIndex: number
    parentWidth: number
}

const blackKeyIndices = [1, 3, 6, 8, 10]

const BlackKey = ({ keyIndex, parentWidth }: BlackKeyProps) => {
    const {
        audioContext,
        synthesizer,
        detuneAmount,
        numberOfVoices,
        panAmount,
        type,
        setSynthesizer,
        octave,
        gain,
    } = useSynthContext()

    const [mouseDown, setMouseDown] = useState<boolean>(false)

    const toneIndex = keyIndex % 12
    const noteLabel = KeyLabels[toneIndex]
    const isBlackKey = blackKeyIndices.includes(toneIndex)

    useEffect(() => {
        const abortController = new AbortController()

        const onMouseUp = () => {
            synthesizer?.stopTone()
        }

        const onTouchEnd = () => {
            synthesizer?.stopTone()
        }

        window.addEventListener('mouseup', onMouseUp, abortController)
        window.addEventListener('touchend', onTouchEnd, abortController)

        return () => abortController.abort()
    }, [synthesizer])

    const playTone = useCallback(
        (keyIndex: number) => {
            setMouseDown(true)
            if (audioContext === null) {
                return
            }
            const synth = new Synthesizer(
                audioContext,
                type,
                numberOfVoices,
                detuneAmount,
                panAmount,
                gain,
            )
            synth.playTone(keyIndex, octave)
            setSynthesizer(synth)
        },
        [
            audioContext,
            detuneAmount,
            gain,
            numberOfVoices,
            octave,
            panAmount,
            type,
            setSynthesizer,
        ],
    )

    const stopTone = () => {
        synthesizer?.stopTone()
        setMouseDown(false)
    }

    const itemWidth = parentWidth / 14

    if (audioContext === null || !isBlackKey) {
        return null
    }

    return (
        <div
            className={`absolute top-0 h-[50px] z-99 rounded-b`}
            style={{
                width: `${itemWidth / 2}px`,
                left: `${itemWidth / 2 + itemWidth / 4}px`,
                backgroundColor: mouseDown ? '#000000' : '#222222',
            }}
            title={noteLabel}
            onMouseDown={(event) => {
                event.stopPropagation()
                stopTone()
                playTone(keyIndex)
                setMouseDown(true)
            }}
            onTouchStart={(event) => {
                event.stopPropagation()
                stopTone()
                playTone(keyIndex)
            }}
            onTouchEnd={stopTone}
            onMouseLeave={stopTone}
            onMouseUp={stopTone}
            onContextMenu={(event) => {
                event.preventDefault()
                synthesizer?.stopTone()
            }}
        ></div>
    )
}

export default React.memo(BlackKey, arePropsEqual([]))
