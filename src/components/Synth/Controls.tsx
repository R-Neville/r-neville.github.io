import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'
import Button from '../Button'
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
                <Button
                    variant={type === 'sawtooth' ? 'active' : 'normal'}
                    onClick={() => {
                        setType('sawtooth')
                    }}
                >
                    Saw
                </Button>
                <Button
                    variant={type === 'sine' ? 'active' : 'normal'}
                    onClick={() => {
                        setType('sine')
                    }}
                >
                    Sine
                </Button>
                <Button
                    variant={type === 'square' ? 'active' : 'normal'}
                    onClick={() => {
                        setType('square')
                    }}
                >
                    Square
                </Button>
                <Button
                    variant={type === 'triangle' ? 'active' : 'normal'}
                    onClick={() => {
                        setType('triangle')
                    }}
                >
                    Triangle
                </Button>
            </div>
            <div className="flex flex-row gap-2">
                <Knob
                    numberOfSteps={16}
                    label="Voices"
                    value={numberOfVoices}
                    onChange={(value) => {
                        const voices = Math.round(value)
                        setNumberOfVoices(voices)
                    }}
                />
                <Knob
                    numberOfSteps={10}
                    label="Detune"
                    value={detuneAmount}
                    onChange={(value) => {
                        const detune = Math.round(value)
                        setDetuneAmount(detune)
                    }}
                />
                <Knob
                    numberOfSteps={100}
                    label="Panning"
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
