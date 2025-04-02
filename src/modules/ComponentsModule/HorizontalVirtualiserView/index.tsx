import Button from '#/components/Button'
import Heading from '#/components/Heading'
import HorizontalVirtualiser from '#/components/HorizontalVirtualiser'
import Icon from '#/components/Icon'
import NumberInput from '#/components/NumberInput'
import icons from '#/icons'
import { useAppDispatch } from '#/store'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { FC, useMemo } from 'react'

const HorizontalVirtualiserView: FC = () => {
    const dispatch = useAppDispatch()

    const data = useMemo(() => {
        return Array.from(Array(100000)).map((_, i) => {
            return {
                name: `Item ${i + 1}`,
            }
        })
    }, [])

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                    <Heading rank="h2">HorizontalVirtualiser</Heading>
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
                <p>
                    Try scrolling horizontally - this list contains 100000
                    items!
                </p>
                <div className="flex gap-2 items-center">
                    <NumberInput value={20} />
                </div>
            </div>
            <div className="p-4 h-full">
                <HorizontalVirtualiser<(typeof data)[number]>
                    minItemWidth={150}
                    items={data}
                    overscan={100}
                    renderItem={(data, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col h-full p-2"
                            >
                                <div className="rounded bg-primary-50 h-full p-2">
                                    {data.name}
                                </div>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default HorizontalVirtualiserView
