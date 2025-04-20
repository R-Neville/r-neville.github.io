import Button from '#/components/Button'
import Heading from '#/components/Heading'
import Icon from '#/components/Icon'
import { Synth } from '#/components/Synth'
import icons from '#/icons'
import { useAppDispatch } from '#/store'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { FC } from 'react'

const SynthView: FC = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                    <Heading rank="h2">Synth</Heading>
                    <Button
                        theme="secondary"
                        variant={'normal'}
                        onClick={() => {
                            void dispatch(
                                setCurrentModule(
                                    new ModuleDefinition('components', 'index'),
                                ),
                            )
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <Icon icon={icons.arrowLeft} />
                            Back
                        </div>
                    </Button>
                </div>
            </div>
            <div className="p-4 h-full">
                <Synth context={new AudioContext()} />
            </div>
        </div>
    )
}

export default SynthView
