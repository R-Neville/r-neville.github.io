import Heading from '#/components/Heading'
import ViewWrapper from '#/components/ViewWrapper'
import { useAppDispatch } from '#/store'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { FC } from 'react'
import ComponentCard from './ComponentCard'

const IndexView: FC = () => {
    const dispatch = useAppDispatch()

    return (
        <ViewWrapper
            headerContent={
                <div className="flex items-center gap-2 justify-between w-full">
                    <div>
                        <Heading rank="h1">Components</Heading>
                    </div>
                </div>
            }
        >
            <div className="flex flex-col gap-2 h-full overflow-y-auto">
                <p>
                    Here are a few components that I've created to showcase my
                    skills:
                </p>
                <ComponentCard
                    title="VerticalVirtualiser"
                    description="A component for rendering vertically virtualised lists of items."
                    onClick={() => {
                        void dispatch(
                            setCurrentModule(
                                new ModuleDefinition(
                                    'components',
                                    'VerticalVirtualiser',
                                ),
                            ),
                        )
                    }}
                ></ComponentCard>
                <ComponentCard
                    title="HorizonalVirtualiser"
                    description="A component for rendering horizontally virtualised lists of items."
                    onClick={() => {
                        void dispatch(
                            setCurrentModule(
                                new ModuleDefinition(
                                    'components',
                                    'HorizontalVirtualiser',
                                ),
                            ),
                        )
                    }}
                ></ComponentCard>
                <ComponentCard
                    title="Calendar"
                    description="A simple month view calendar component."
                    onClick={() => {
                        void dispatch(
                            setCurrentModule(
                                new ModuleDefinition('components', 'Calendar'),
                            ),
                        )
                    }}
                ></ComponentCard>
            </div>
        </ViewWrapper>
    )
}

export default IndexView
