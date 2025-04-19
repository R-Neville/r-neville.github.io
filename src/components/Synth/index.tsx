import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, useEffect, useState } from 'react'
import Button from '../Button'
import { Keyboard } from './Keyboard'
import Oscillator from './model/Oscillator'

const SynthComponent: FC = () => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
    const [oscillator, setOscillator] = useState<Oscillator | null>(null)
    const [gain, setGain] = useState<GainNode | null>(null)

    useEffect(() => {
        setAudioContext(new AudioContext())
    }, [])

    useEffect(() => {
        if (audioContext !== null) {
            setGain(audioContext.createGain())
        }
    }, [audioContext])

    console.log({ oscillator, audioContext, gain })

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <Button
                    variant={
                        oscillator?.getType() === 'sawtooth'
                            ? 'active'
                            : 'normal'
                    }
                    onClick={() => {
                        if (audioContext !== null) {
                            const oscillator = new Oscillator(
                                audioContext,
                                'sawtooth',
                            )
                            setOscillator(oscillator)
                        }
                    }}
                >
                    Saw Oscillator
                </Button>
                <Button
                    variant={
                        oscillator?.getType() === 'sine' ? 'active' : 'normal'
                    }
                    onClick={() => {
                        if (audioContext !== null) {
                            const oscillator = new Oscillator(
                                audioContext,
                                'sine',
                            )
                            setOscillator(oscillator)
                        }
                    }}
                >
                    Sine Oscillator
                </Button>
                <Button
                    variant={
                        oscillator?.getType() === 'square' ? 'active' : 'normal'
                    }
                    onClick={() => {
                        if (audioContext !== null) {
                            const oscillator = new Oscillator(
                                audioContext,
                                'square',
                            )
                            setOscillator(oscillator)
                        }
                    }}
                >
                    Square Oscillator
                </Button>
                <Button
                    variant={
                        oscillator?.getType() === 'triangle'
                            ? 'active'
                            : 'normal'
                    }
                    onClick={() => {
                        if (audioContext !== null) {
                            const oscillator = new Oscillator(
                                audioContext,
                                'triangle',
                            )
                            setOscillator(oscillator)
                        }
                    }}
                >
                    Triangle Oscillator
                </Button>
            </div>
            {oscillator && <Keyboard oscillator={oscillator} />}
        </div>
    )
}

export const Synth = React.memo(SynthComponent, arePropsEqual([]))
