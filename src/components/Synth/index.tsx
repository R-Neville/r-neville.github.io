import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'
import { SynthProvider } from './Context/Provider'
import { Controls } from './Controls'
import { Keyboard } from './Keyboard'
import { Oscilloscope } from './Oscilloscope'

const SynthComponent: FC = () => {
    return (
        <SynthProvider>
            <div className="flex flex-col gap-2 w-full min-h-0 overflow-auto">
                <div className="flex flex-row gap-2 w-full">
                    <Oscilloscope numberOfSamples={2048} />
                </div>
                <Controls />
                <Keyboard />
            </div>
        </SynthProvider>
    )
}

export const Synth = React.memo(SynthComponent, arePropsEqual([]))
