import arePropsEqual from '#/utils/arePropsEqual'
import React, { useCallback, useEffect, useState } from 'react'
import { useSynthContext } from '../Context'
import Synthesizer from '../model/Synthesizer'
import BlackKey from './BlackKey'
import { KeyLabels } from './KeyLabels'

interface WhiteKeyProps {
    keyIndex: number
    parentWidth: number
}

const WhiteKey = ({ keyIndex, parentWidth }: WhiteKeyProps) => {
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

    if (audioContext === null) {
        return null
    }

    return (
        <div
            className={`relative h-[100px] flex items-center justify-center cursor-pointer border border-primary-600 rounded-b`}
            style={{
                width: `${itemWidth}px`,
                backgroundColor: mouseDown ? '#EAEAEA' : '#FFFFFF',
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
                synthesizer?.stopTone()
            }}
        >
            {keyIndex !== 23 && (
                <BlackKey keyIndex={keyIndex + 1} parentWidth={parentWidth} />
            )}
        </div>
    )
}

export default React.memo(WhiteKey, arePropsEqual([]))
