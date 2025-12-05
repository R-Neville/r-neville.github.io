import icons from '#/icons'
import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'
import Button from '../Button'
import Icon from '../Icon'
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
        octave,
        setOctave,
        setGain,
        gain,
    } = useSynthContext()

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="w-fit flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col items-center bg-primary-800 rounded p-2 border border-black">
                        <Button
                            theme="transparent"
                            variant="active"
                            onClick={() => {
                                setOctave(octave + 2)
                            }}
                        >
                            <Icon icon={icons.chevronUp} />
                        </Button>
                        <div className="text-primary-200 p-2">C{octave}</div>
                        <Button
                            theme="transparent"
                            variant="active"
                            onClick={() => {
                                setOctave(octave - 2)
                            }}
                        >
                            <Icon icon={icons.chevronDown} />
                        </Button>
                    </div>
                    <Knob
                        label="Gain"
                        numberOfSteps={100}
                        displayValue={`${Math.round(gain * 100)}/100`}
                        value={Math.round(gain * 100)}
                        onChange={(value) => {
                            setGain(value / 100)
                        }}
                    />
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
                        numberOfSteps={100}
                        label={`Detune`}
                        displayValue={`${Math.round(detuneAmount)}/100`}
                        value={detuneAmount / 100}
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
        </div>
    )
}

export const Controls = React.memo(ControlsComponent, arePropsEqual([]))
