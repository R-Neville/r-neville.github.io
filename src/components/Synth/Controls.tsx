import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'
import { useSynthContext } from './Context'
import { Knob } from './Knob'

const ControlsComponent: FC = () => {
    const {
        detuneAmount,
        numberOfVoices,
        panAmount,
        type,
        setDetuneAmount,
        setNumberOfVoices,
        setPanAmount,
        setType,
    } = useSynthContext()

    return (
        <div className="flex flex-row gap-2 w-full">
            <div className="flex flex-row gap-2">
                <Knob
                    label="Waveform"
                    numberOfSteps={4}
                    displayValue={type}
                    value={0}
                    onChange={(value) => {
                        const waveForm = {
                            0: 'sine',
                            1: 'triangle',
                            2: 'square',
                            3: 'sawtooth',
                        }[value]
                        if (waveForm !== undefined) {
                            setType(waveForm as OscillatorType)
                        }
                    }}
                />
                <Knob
                    numberOfSteps={16}
                    label={`Voices`}
                    displayValue={`${numberOfVoices}/16`}
                    value={numberOfVoices}
                    onChange={(value) => {
                        const voices = Math.round(value)
                        setNumberOfVoices(voices)
                    }}
                />
                <Knob
                    numberOfSteps={10}
                    label={`Detune`}
                    displayValue={`${detuneAmount}/10`}
                    value={detuneAmount}
                    onChange={(value) => {
                        const detune = Math.round(value)
                        setDetuneAmount(detune)
                    }}
                />
                <Knob
                    numberOfSteps={100}
                    label={`Pan`}
                    displayValue={`${panAmount}/100`}
                    value={panAmount}
                    onChange={(value) => {
                        setPanAmount(Number(value.toFixed(2)))
                    }}
                />
            </div>
        </div>
    )
}

export const Controls = React.memo(ControlsComponent, arePropsEqual([]))
