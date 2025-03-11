import Clickable from '#/components/Clickable'
import Icon from '#/components/Icon'
import icons from '#/icons'
import { setSidebarState, useAppDispatch, useAppSelector } from '#/store'
import { FC, useEffect } from 'react'

const AppSidebar: FC = () => {
    const dispatch = useAppDispatch()

    const { sidebarState } = useAppSelector((state) => state.config)

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

    let dynamicClassNames = 'w-[200px]'
    if (sidebarState.float) {
        dynamicClassNames = 'absolute w-full z-[999]'
    }

    return (
        <div
            className={`flex flex-col h-full border-r border-r-primary-100 bg-primary-50 text-primary-800 ${dynamicClassNames}`}
        >
            <div className="flex items-center justify-between p-4">
                <div className="text-lg">Projects</div>
                {sidebarState.float && (
                    <Clickable
                        variant="secondary"
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
                    </Clickable>
                )}
            </div>
        </div>
    )
}

export default AppSidebar
