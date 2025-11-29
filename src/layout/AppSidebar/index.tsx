import Button from '#/components/Button'
import Icon from '#/components/Icon'
import icons from '#/icons'
import { setSidebarState, useAppDispatch, useAppSelector } from '#/store'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { FC, useCallback, useEffect, useState } from 'react'
import SidebarOption from './SidebarOption'
import SidebarSection from './SidebarSection'

const MIN_WIDTH = 300

const AppSidebar: FC = () => {
    const dispatch = useAppDispatch()

    const { sidebarState } = useAppSelector((state) => state.config)

    const [width, setWidth] = useState<number>(MIN_WIDTH)

    const { float } = sidebarState

    const resize = useCallback(() => {
        const controller = new AbortController()

        const onMouseMove = (event: MouseEvent) => {
            const { pageX } = event
            setWidth(Math.min(Math.max(pageX, MIN_WIDTH), 500))
        }

        const onMouseUp = () => {
            controller.abort()
        }

        document.addEventListener('mousemove', onMouseMove, controller)
        document.addEventListener('mouseup', onMouseUp, controller)
    }, [])

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            const width = document.body.clientWidth
            if (sidebarState.float && width > 700) {
                void dispatch(
                    setSidebarState({ ...sidebarState, float: false }),
                )
            } else if (!sidebarState.float && width <= 700) {
                void dispatch(setSidebarState({ ...sidebarState, float: true }))
            }
        })

        observer.observe(document.body)

        return () => {
            observer.disconnect()
        }
    }, [dispatch, sidebarState])

    if (!sidebarState.open) {
        return <></>
    }

    let dynamicClassNames = 'relative w-[200px]'
    if (sidebarState.float) {
        dynamicClassNames = 'absolute w-full z-[999]'
    }

    return (
        <div
            className={`flex flex-col h-full border-r border-r-primary-100 bg-primary-50 text-primary-800 ${dynamicClassNames} select-none`}
            style={{
                width: float ? undefined : `${width}px`,
            }}
        >
            {!float && (
                <div
                    className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary-100"
                    onMouseDown={resize}
                ></div>
            )}
            <div className="flex items-center justify-between p-4">
                <div className="text-lg">Projects</div>
                {sidebarState.float && (
                    <Button
                        theme="secondary"
                        variant="normal"
                        onClick={() => {
                            void dispatch(
                                setSidebarState({
                                    ...sidebarState,
                                    open: false,
                                }),
                            )
                        }}
                    >
                        <Icon icon={icons.times} />
                    </Button>
                )}
            </div>
            <div className="flex flex-col p-4">
                <SidebarSection title="Components">
                    <div className="flex flex-col">
                        <SidebarOption
                            text="VerticalVirtualiser"
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
                        />
                        <SidebarOption
                            text="HorizontalVirtualiser"
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
                        />
                        <SidebarOption
                            text="Calendar"
                            onClick={() => {
                                void dispatch(
                                    setCurrentModule(
                                        new ModuleDefinition(
                                            'components',
                                            'Calendar',
                                        ),
                                    ),
                                )
                            }}
                        />
                        <SidebarOption
                            text="Synth"
                            onClick={() => {
                                void dispatch(
                                    setCurrentModule(
                                        new ModuleDefinition(
                                            'components',
                                            'Synth',
                                        ),
                                    ),
                                )
                            }}
                        />
                    </div>
                </SidebarSection>
            </div>
        </div>
    )
}

export default AppSidebar
