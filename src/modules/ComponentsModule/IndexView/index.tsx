import Button from '#/components/Button'
import Heading from '#/components/Heading'
import ViewWrapper from '#/components/ViewWrapper'
import { useAppDispatch } from '#/store'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { FC } from 'react'

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
            <div className="flex flex-col h-full overflow-y-auto">
                <p>
                    Here are a few components that I've created to showcase my
                    skills:
                </p>
                <Button
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
                >
                    Horizontal Virtualiser
                </Button>
            </div>
        </ViewWrapper>
    )
}

export default IndexView
