import Heading from '#/components/Heading'
import { Synth } from '#/components/Synth'
import { FC } from 'react'

const SynthView: FC = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                    <Heading rank="h2">Synth</Heading>
                </div>
                <p>
                    Very much a work in progress. If the synth gets stuck, just
                    refresh the page!
                </p>
            </div>
            <div className="p-4 h-full">
                <Synth />
            </div>
        </div>
    )
}

export default SynthView
