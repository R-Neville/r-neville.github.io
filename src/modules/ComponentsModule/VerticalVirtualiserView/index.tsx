import Button from '#/components/Button'
import Heading from '#/components/Heading'
import Icon from '#/components/Icon'
import VerticalVirtualiser from '#/components/VerticalVirtualiser.tsx'
import icons from '#/icons'
import { useAppDispatch } from '#/store'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { FC, useMemo } from 'react'

const VerticalVirtualiserView: FC = () => {
    const dispatch = useAppDispatch()

    const data = useMemo(() => {
        return Array.from(Array(100000)).map((_, i) => {
            return {
                name: `Item ${i + 1}`,
            }
        })
    }, [])

    return (
        <div className="grid grid-rows-[max-content_minmax(0px,_100%)] w-full h-full overflow-hidden">
            <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                    <Heading rank="h2">VerticalVirtualiser</Heading>
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
            <div className="grid p-4 overflow-hidden">
                <VerticalVirtualiser<(typeof data)[number]>
                    minItemHeight={80}
                    items={data}
                    overscan={100}
                    renderItem={(data, index) => {
                        return (
                            <div key={index} className="flex p-2 h-full w-full">
                                <div className="rounded bg-primary-50 p-2 w-full">
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

export default VerticalVirtualiserView
